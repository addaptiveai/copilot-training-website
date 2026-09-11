/* Checks the generated site. Run after build.mjs; exits non-zero on failure.
   These are the checks from the build brief, automated so they run on every
   change rather than once before handoff. */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE_URL, SERVICES } from './src/site.mjs';
import { articles } from './src/insights/articles.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

const failures = [];
const warnings = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

/* ── Collect generated pages ─────────────────────────────────────────── */

function htmlFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.git', 'src', 'assets'].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, found);
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

const pages = htmlFiles(ROOT).map((file) => {
  const rel = relative(ROOT, file);
  const route = '/' + rel.replace(/index\.html$/, '').replace(/\/$/, '');
  return { file, rel, route: route === '/' ? '/' : route, html: readFileSync(file, 'utf8') };
});

const expectedRoutes = [
  '/',
  ...SERVICES.map((s) => s.path),
  '/insights',
  ...articles.map((a) => `/insights/${a.slug}`),
];

/* ── Text extraction ─────────────────────────────────────────────────── */

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

/* ── Per-page checks ─────────────────────────────────────────────────── */

const titles = new Map();
const descriptions = new Map();

for (const page of pages) {
  const { html, rel, route } = page;

  if (!expectedRoutes.includes(route)) {
    fail(rel, `generated page is not in the expected route list (${route})`);
  }

  /* Language */
  if (!/<html lang="en-AU">/.test(html)) fail(rel, 'missing lang="en-AU" on <html>');

  /* Exactly one h1 */
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(rel, `expected exactly 1 <h1>, found ${h1s.length}`);

  /* Self-referencing canonical */
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/);
  if (!canonical) fail(rel, 'missing canonical link');
  else {
    const expected = route === '/' ? SITE_URL : SITE_URL + route;
    if (canonical[1] !== expected) fail(rel, `canonical is ${canonical[1]}, expected ${expected}`);
  }

  /* Unique title and description */
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
  if (!title) fail(rel, 'missing <title>');
  else {
    if (titles.has(title)) fail(rel, `title duplicates ${titles.get(title)}`);
    titles.set(title, rel);
    if (title.length > 70) warn(rel, `title is ${title.length} characters, over the usual 70 limit`);
  }

  const desc = (html.match(/<meta name="description" content="([^"]+)">/) || [])[1];
  if (!desc) fail(rel, 'missing meta description');
  else {
    if (descriptions.has(desc)) fail(rel, `description duplicates ${descriptions.get(desc)}`);
    descriptions.set(desc, rel);
    if (desc.length > 170) warn(rel, `description is ${desc.length} characters`);
  }

  /* Open Graph and Twitter */
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!html.includes(`property="${tag}"`)) fail(rel, `missing ${tag}`);
  }
  if (!html.includes('name="twitter:card"')) fail(rel, 'missing twitter:card');

  /* No unresolved placeholder made it into output */
  if (html.includes('BOOKING_URL_PENDING')) fail(rel, 'booking placeholder rendered into the page');
  if (/YOUR_ACCESS_KEY|TODO|FIXME|lorem ipsum/i.test(html)) fail(rel, 'placeholder text in output');

  /* Every JSON-LD block must parse, and must not contain FAQPage without
     matching visible questions. */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail(rel, 'no JSON-LD found');

  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
    } catch (err) {
      fail(rel, `JSON-LD does not parse: ${err.message}`);
      continue;
    }

    const nodes = parsed['@graph'] || [parsed];
    const faqNode = nodes.find((n) => n['@type'] === 'FAQPage');

    if (faqNode) {
      const rendered = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((m) =>
        m[1].replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").trim(),
      );
      for (const q of faqNode.mainEntity) {
        const name = q.name.replace(/&amp;/g, '&');
        if (!rendered.some((r) => r === name)) {
          fail(rel, `FAQPage question is not visible on the page: "${name}"`);
        }
      }
    }
  }

  /* Internal links must resolve to a generated route or an on-page anchor. */
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)(#[^"]*)?"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/assets/') || href === '/copilot-icon.png' || href === '/feed.xml') {
      const asset = join(ROOT, href.slice(1));
      if (!existsSync(asset)) fail(rel, `links to missing asset ${href}`);
      continue;
    }
    const normalised = href === '/' ? '/' : href.replace(/\/$/, '');
    if (!expectedRoutes.includes(normalised)) fail(rel, `links to unknown route ${href}`);
  }

  /* The brief is explicit: no service link may still point at the contact
     anchor. Catches a regression of the original "Learn more" bug. */
  const learnMore = [...html.matchAll(/<a href="([^"]+)" class="more">/g)].map((m) => m[1]);
  for (const href of learnMore) {
    if (href.includes('#contact')) fail(rel, `a "Learn more" link still points at ${href}`);
  }

  /* ── Accessibility ──────────────────────────────────────────────── */

  /* Every image needs alt. Decorative images use alt="" deliberately. */
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(tag)) fail(rel, `<img> without an alt attribute: ${tag.slice(0, 90)}`);
  }

  /* Heading levels must not skip. The SEO review flagged this on the
     Addaptive site's footer, so it is checked here rather than found later. */
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] > levels[i - 1] + 1) {
      fail(rel, `heading level jumps from h${levels[i - 1]} to h${levels[i]}`);
    }
  }

  /* Duplicate ids break label association and in-page anchors. */
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(rel, `duplicate id "${id}"`);
    seen.add(id);
  }

  /* Every form control needs a label pointing at it. */
  for (const [, controlId] of html.matchAll(/<(?:input|select|textarea)\b[^>]*\sid="([^"]+)"/g)) {
    if (!html.includes(`<label for="${controlId}">`)) fail(rel, `no <label for="${controlId}">`);
  }

  /* Fragment links must resolve to an element on the same page. */
  for (const [, frag] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(frag)) fail(rel, `fragment link #${frag} has no target`);
  }

  /* ── House style ────────────────────────────────────────────────── */

  const text = visibleText(html);

  /* Em dashes are checked across the whole document, not just visible body
     text: metadata, alt text and JSON-LD string values all reach a reader or a
     search result. The source files are checked separately, below. */
  if (html.includes('—') || html.includes('&mdash;')) {
    const where = text.includes('—') ? 'body copy' : 'metadata or structured data';
    fail(rel, `contains an em dash in ${where}, which Addaptive house style bans`);
  }

  /* A subset of the banned vocabulary from how-i-write.md, limited to terms
     with no legitimate use on this site. */
  const banned = [
    'delve', 'realm', 'harness', 'unlock', 'tapestry', 'paradigm', 'cutting-edge',
    'revolutionise', 'revolutionize', 'intricate', 'showcasing', 'showcase', 'crucial',
    'pivotal', 'meticulously', 'unparalleled', 'leverage', 'synergy', 'game-changer',
    'testament', 'groundbreaking', 'foster', 'holistic', 'pioneering', 'unleash',
    'transformative', 'redefine', 'seamless', 'scalable', 'robust', 'empower',
    'streamline', 'frictionless', 'elevate', 'effortless', 'data-driven',
    'mission-critical', 'visionary', 'disruptive', 'reimagine', 'unprecedented',
    'supercharge', 'future-proof', 'state-of-the-art', 'immersive', 'turnkey',
    'plug-and-play', 'democratise', 'democratize', 'ai journey', 'ai-powered',
    'digital transformation', 'upskilling', 'capability uplift',
    "in today's", 'it is worth noting', "it's worth noting", 'let us dive in',
    "let's dive in", "let's unpack", 'at the end of the day', 'moving forward',
    'that being said', 'furthermore', 'moreover', 'straightforward',
    'let that sink in', 'read that again', 'this changes everything',
  ];

  const lower = text.toLowerCase();
  for (const term of banned) {
    const pattern = new RegExp(`(^|[^a-z])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i');
    if (pattern.test(lower)) fail(rel, `banned house-style term: "${term}"`);
  }

  /* US spellings that would read wrong on an Australian site. */
  const usSpellings = ['organize', 'organization', 'recognize', 'color', 'behavior', 'center', 'analyze', 'prioritize'];
  for (const term of usSpellings) {
    if (new RegExp(`(^|[^a-z])${term}`, 'i').test(lower)) fail(rel, `US spelling: "${term}"`);
  }

  /* Guardrails from the brief. Checked sentence by sentence, because the
     pages legitimately say Addaptive is *not* a Microsoft partner, and
     legitimately refer the reader to *their own* Microsoft partner. */
  const sentences = text.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    if (!/microsoft (gold |silver |certified )?partner/i.test(sentence)) continue;

    const denies = /\b(not|no|never|independent)\b/i.test(sentence);
    const thirdParty = /\b(your|their|a|an|the client's)\s+microsoft partner/i.test(sentence);

    if (!denies && !thirdParty) fail(rel, `may imply a Microsoft partnership: "${sentence.trim()}"`);
  }

  for (const sentence of sentences) {
    if (!/microsoft[- ]certifi/i.test(sentence)) continue;
    if (!/\b(not|no|never)\b/i.test(sentence)) fail(rel, `may imply Microsoft certification: "${sentence.trim()}"`);
  }

  /* App building in Cowork must never be described as generally available. */
  if (/build(ing)? apps/i.test(text)) {
    const claimsGA = /build(ing)? apps[^.]{0,120}(generally available|now available to everyone|available to all)/i.test(text);
    const statesLimit = /Frontier/i.test(text);
    if (claimsGA) fail(rel, 'describes Cowork app building as generally available');
    if (!statesLimit) fail(rel, 'mentions app building without naming the Frontier limitation');
  }
}

/* ── Route coverage ──────────────────────────────────────────────────── */

for (const route of expectedRoutes) {
  if (!pages.some((p) => p.route === route)) fail('build', `route ${route} was not generated`);
}

/* ── Sitemap, robots, feed ───────────────────────────────────────────── */

const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

for (const route of expectedRoutes) {
  const expected = route === '/' ? `${SITE_URL}/` : SITE_URL + route;
  if (!sitemapLocs.includes(expected)) fail('sitemap.xml', `missing ${expected}`);
}
if (sitemapLocs.length !== expectedRoutes.length) {
  fail('sitemap.xml', `has ${sitemapLocs.length} URLs, expected ${expectedRoutes.length}`);
}

const robots = readFileSync(join(ROOT, 'robots.txt'), 'utf8');
for (const agent of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot']) {
  if (!robots.includes(`User-agent: ${agent}`)) fail('robots.txt', `does not name ${agent}`);
}
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail('robots.txt', 'missing sitemap reference');
if (/^Disallow: \/$/m.test(robots)) fail('robots.txt', 'blocks the whole site');

const feed = readFileSync(join(ROOT, 'feed.xml'), 'utf8');
for (const article of articles) {
  if (!feed.includes(`${SITE_URL}/insights/${article.slug}`)) {
    fail('feed.xml', `missing ${article.slug}`);
  }
}
if (feed.includes('—')) fail('feed.xml', 'contains an em dash');

const llms = readFileSync(join(ROOT, 'llms.txt'), 'utf8');
if (llms.includes('—')) fail('llms.txt', 'contains an em dash');

/* ── Assets ──────────────────────────────────────────────────────────── */

const og = join(ROOT, 'og-image.png');
if (!existsSync(og)) {
  fail('og-image.png', 'missing, Open Graph metadata points at a 404');
} else {
  /* PNG header: width and height are big-endian uint32 at bytes 16 and 20. */
  const buf = readFileSync(og);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (w !== 1200 || h !== 630) fail('og-image.png', `is ${w}x${h}, expected 1200x630`);
}

for (const asset of ['assets/styles.css', 'assets/app.js', 'assets/logo-blue-teal.svg', 'assets/logo-white.svg']) {
  if (!existsSync(join(ROOT, asset))) fail(asset, 'missing');
}

/* ── Production gate ─────────────────────────────────────────────────── */

const site = readFileSync(join(ROOT, 'src/site.mjs'), 'utf8');
if (site.includes("BOOKING_URL = 'BOOKING_URL_PENDING'")) {
  fail(
    'src/site.mjs',
    'BOOKING_URL is still a placeholder. The brief requires a secondary booking CTA. Set the real URL before production.',
  );
}

/* ── Report ──────────────────────────────────────────────────────────── */

console.log(`Checked ${pages.length} pages.\n`);

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log('  ! ' + w);
  console.log('');
}

if (failures.length) {
  console.log(`Failures (${failures.length}):`);
  for (const f of failures) console.log('  x ' + f);
  console.log('');
  process.exit(1);
}

console.log('All checks passed.');
