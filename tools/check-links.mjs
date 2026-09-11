/* Checks that every external link in the generated site still resolves.

   Articles cite Microsoft product documentation, which moves. A cited URL that
   has started 404ing undermines the claim it supports, so this is worth running
   before publishing an update and every so often afterwards.

   Network-dependent, so it is deliberately kept out of `npm run build`.
   Run with: npm run links */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function htmlFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.git', 'src', 'assets', 'tools'].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, found);
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

/* Own-domain URLs are canonicals and feed references, which only resolve once
   the site is deployed. Internal routes are already checked by verify.mjs.
   Font origins appear as preconnect hints and answer nothing at their root. */
const SKIP_HOSTS = new Set([
  'copilot-training.com.au',
  'www.copilot-training.com.au',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]);

/* Collect each outbound URL once, remembering every page that uses it. */
const usage = new Map();

for (const file of htmlFiles(ROOT)) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    let host;
    try {
      host = new URL(url).hostname;
    } catch {
      console.log(`  MALFORMED  ${url}`);
      continue;
    }
    if (SKIP_HOSTS.has(host)) continue;
    if (!usage.has(url)) usage.set(url, new Set());
    usage.get(url).add(relative(ROOT, file));
  }
}

const urls = [...usage.keys()].sort();
console.log(`Checking ${urls.length} external links.\n`);

/* Some documentation sites reject HEAD but answer GET. Try HEAD first because
   it is cheaper, then fall back before reporting a failure. */
async function check(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15' },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return { ok: true, status: res.status, finalUrl: res.url };
      if (method === 'GET') return { ok: false, status: res.status, finalUrl: res.url };
    } catch (err) {
      if (method === 'GET') return { ok: false, status: err.name === 'TimeoutError' ? 'timeout' : err.message };
    }
  }
  return { ok: false, status: 'unknown' };
}

const failures = [];
const moved = [];

for (const url of urls) {
  const result = await check(url);
  const pages = [...usage.get(url)].join(', ');

  if (!result.ok) {
    failures.push({ url, status: result.status, pages });
    console.log(`  BROKEN  ${result.status}  ${url}`);
    continue;
  }

  /* A redirect is not a failure, but a cited source that has moved is worth
     updating so the link in the article points where the reader ends up. */
  const normalise = (u) => u.replace(/\/$/, '');
  if (normalise(result.finalUrl) !== normalise(url)) {
    moved.push({ url, to: result.finalUrl, pages });
    console.log(`  MOVED   ${url}\n          -> ${result.finalUrl}`);
    continue;
  }

  console.log(`  ok      ${url}`);
}

console.log('');

if (moved.length) {
  console.log(`${moved.length} link(s) now redirect. Consider updating them:`);
  for (const m of moved) console.log(`  ${m.url}\n    -> ${m.to}\n    used on: ${m.pages}`);
  console.log('');
}

if (failures.length) {
  console.log(`${failures.length} link(s) failed:`);
  for (const f of failures) console.log(`  ${f.status}  ${f.url}\n    used on: ${f.pages}`);
  process.exit(1);
}

console.log(`All ${urls.length} external links resolve.`);
