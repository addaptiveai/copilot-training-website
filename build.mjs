/* Generates every page, robots.txt, sitemap.xml and feed.xml into the repo
   root. Output is plain static HTML, so Vercel needs no build step and the
   deployed site works whether or not this script has ever run. Committed
   output is the deployable artefact; this script keeps it consistent. */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE_URL, SERVICES, SITE_NAME, ORG_NAME, EMAIL } from './src/site.mjs';
import { articles } from './src/insights/articles.mjs';
import { renderArticle } from './src/pages/article.mjs';

import home from './src/pages/home.mjs';
import workshop from './src/pages/copilot-workshop.mjs';
import program from './src/pages/capability-program.mjs';
import support from './src/pages/embedded-adoption-support.mjs';
import insights from './src/pages/insights.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

function write(relPath, contents) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents, 'utf8');
  console.log('  wrote', relPath);
}

/* ── Pages ───────────────────────────────────────────────────────────── */

console.log('Pages:');
write('index.html', home);
write('copilot-workshop/index.html', workshop);
write('capability-program/index.html', program);
write('embedded-adoption-support/index.html', support);
write('insights/index.html', insights);

for (const article of articles) {
  write(`insights/${article.slug}/index.html`, renderArticle(article.slug));
}

/* ── Crawl controls ──────────────────────────────────────────────────── */

/* Search crawlers plus the AI crawlers whose user-agent tokens each vendor
   currently publishes. Verified against vendor documentation on 11 September
   2026; these names change, so recheck before relying on them.
   Deliberately omitted: Perplexity-User and ChatGPT-User style fetchers are
   user-initiated. They are listed here so they are not accidentally blocked
   by the wildcard rule, not because they drive discovery. */
const CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
];

const DISALLOW = ['/assets/clients/', '/src/'];

const block = (agent) =>
  [`User-agent: ${agent}`, 'Allow: /', ...DISALLOW.map((p) => `Disallow: ${p}`)].join('\n');

const robots = [
  '# Public marketing site. Everything here is intended to be crawled.',
  '',
  block('*'),
  '',
  ...CRAWLERS.flatMap((a) => [block(a), '']),
  `Host: ${SITE_URL}`,
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n');

console.log('Crawl controls:');
write('robots.txt', robots);

/* ── Sitemap ─────────────────────────────────────────────────────────── */

const today = new Date().toISOString().slice(0, 10);

const routes = [
  { loc: '/', changefreq: 'monthly', priority: '1.0', lastmod: today },
  ...SERVICES.map((s) => ({ loc: s.path, changefreq: 'monthly', priority: '0.9', lastmod: today })),
  { loc: '/insights', changefreq: 'weekly', priority: '0.8', lastmod: today },
  ...articles.map((a) => ({
    loc: `/insights/${a.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: a.dateModified,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc === '/' ? '/' : r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

write('sitemap.xml', sitemap);

/* ── Insights feed ───────────────────────────────────────────────────── */

const cdata = (s) => `<![CDATA[${String(s).replace(/]]>/g, ']]&gt;')}]]>`;
const rfc822 = (iso) => new Date(iso + 'T00:00:00Z').toUTCString();

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}: Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Articles on Microsoft Copilot adoption, training and licensing for Australian organisations, from ${ORG_NAME}.</description>
    <language>en-AU</language>
    <lastBuildDate>${rfc822(articles[0].dateModified)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${articles
  .map(
    (a) => `    <item>
      <title>${cdata(a.title)}</title>
      <link>${SITE_URL}/insights/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${a.slug}</guid>
      <description>${cdata(a.description)}</description>
      <pubDate>${rfc822(a.datePublished)}</pubDate>
      <author>${EMAIL}</author>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;

write('feed.xml', feed);

/* ── llms.txt ────────────────────────────────────────────────────────────
   Not an SEO requirement, and Google has stated it does not use it. The file
   already existed in this repo, so it is kept accurate rather than removed,
   at effectively no maintenance cost. */

const llms = `# ${ORG_NAME}: Microsoft Copilot Training

${ORG_NAME} is an Australian AI consultancy specialising in Microsoft Copilot training and adoption programs for mid-to-large organisations. ${ORG_NAME} is independent and is not a Microsoft partner.

## What we do

We deliver practical Copilot training built around how teams actually work, rather than generic product demos. Programs are tiered by experience level and aimed at measurable adoption.

${SERVICES.map((s) => `- ${s.title} (${SITE_URL}${s.path})`).join('\n')}

## Insights

${articles.map((a) => `- ${a.title} (${SITE_URL}/insights/${a.slug})`).join('\n')}

## Who we work with

Australian organisations already on Microsoft 365 that are moving from Copilot licence ownership to daily use. Clients named publicly include the Property Council of Australia, Committee for Brisbane and Match & Wood.

## Where we are based

Brisbane, Queensland, Australia. We deliver programs nationally.

## Contact

${EMAIL}
addaptive.com.au
copilot-training.com.au
`;

write('llms.txt', llms);

console.log('\nBuild complete.');

/* Surface the deployment blocker on every build rather than only in the
   verification step, so it cannot be missed. */
const site = readFileSync(join(ROOT, 'src/site.mjs'), 'utf8');
if (site.includes('BOOKING_URL_PENDING')) {
  console.log('\n  NOTE: BOOKING_URL is still a placeholder. The secondary');
  console.log('  booking CTA is omitted from every page until it is set.');
}
