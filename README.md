# copilot-training.com.au

Addaptive's Microsoft Copilot training site. Plain static HTML, deployed on Vercel.

## How it works

There is no framework and no build step on Vercel. The deployed artefact is the
committed HTML in this repo.

Content lives once, in `src/`. `build.mjs` stamps it into the finished pages at
the repo root. If the script is never run, the site still deploys and works,
because the generated HTML is committed.

```
src/site.mjs                site constants (URL, GA id, booking URL, services)
src/layout.mjs              head, nav, footer, JSON-LD graph, shared blocks
src/pages/*.mjs             one module per page
src/insights/articles.mjs   all Insights content
src/pages/article.mjs       the article template
tools/make-og-image.mjs     regenerates og-image.png
build.mjs                   writes the HTML, robots.txt, sitemap.xml, feed.xml
verify.mjs                  checks the generated site
```

Generated, do not hand-edit: `index.html`, `*/index.html`, `robots.txt`,
`sitemap.xml`, `feed.xml`, `llms.txt`.

Hand-maintained: everything in `src/`, `assets/`, `tools/`.

## Commands

```bash
npm run build     # generate the site, then verify it
npm run lint      # verify only
npm run generate  # generate only
npm run links     # check every cited external link still resolves
npm run og        # regenerate og-image.png (macOS only)
npm run serve     # generate, then serve on http://localhost:4173
```

`npm run build` exits non-zero if any check fails. Nothing should be deployed
while it does.

`npm run links` is kept separate because it depends on the network. Run it
before publishing an article update. CI runs it monthly, since the Microsoft
documentation the articles cite does move: the Excel support URL had already
been redirected within a day of being cited.

## Making changes

**Edit copy on a page**: change the matching module in `src/pages/`, then
`npm run build`.

**Add an Insights article**: add an entry to the `articles` array in
`src/insights/articles.mjs`, then `npm run build`. The index page, the sitemap,
the RSS feed, the homepage's three latest cards and the related-content links
all follow from that one entry. Nothing is hardcoded to a fixed article count.

**Add a service page**: add it to `SERVICES` in `src/site.mjs`, add a module in
`src/pages/`, and register it in `build.mjs`. It then appears in the header
dropdown, the mobile menu, the footer and the sitemap.

## What verify.mjs checks

One `h1` per page, self-referencing canonicals, unique titles and descriptions,
Open Graph and Twitter tags, valid JSON-LD with no dangling `@id` references,
FAQPage entries matching visible questions, every internal link resolving,
sitemap covering exactly the generated routes, robots.txt naming the expected
crawlers, the feed listing every article, and `og-image.png` being 1200x630.

It also enforces the house rules from `About me/how-i-write.md`: no em dashes,
no banned vocabulary, Australian spelling. And the brief's guardrails: no
implied Microsoft partnership or certification, and no claim that building apps
in Copilot Cowork is generally available.

Accessibility: alt text on every image, no skipped heading levels, no duplicate
ids, a label for every form control, and every fragment link resolving.

## CI

`.github/workflows/quality.yml` runs on every pull request and push to `main`:

1. `npm run build`, which generates the site and runs every check.
2. A `git diff` guard confirming the committed HTML matches what the source
   currently produces. This catches a change to `src/` that was never rebuilt,
   and a hand-edit to a generated page that would be silently overwritten later.

The link check runs monthly on a schedule, and on demand from the Actions tab.
It is kept off pull requests so a slow third-party response never blocks a
merge.

## Local preview

`npm run serve` uses Python's static server, which does not do Vercel's clean
URLs. Locally, use a trailing slash: `http://localhost:4173/copilot-workshop/`.
In production `vercel.json` sets `cleanUrls` and `trailingSlash: false`, so the
canonical form is `/copilot-workshop`.

## Analytics

GA4 `G-25YBT0GGK9`, unchanged from the original build. Events:

| Event | Fires on |
|---|---|
| `cta_primary_click` | any primary "Get in Touch" CTA |
| `outbound_addaptive_click` | links out to addaptive.com.au |
| `form_start` | first keystroke in the contact form |
| `form_submitted` | successful submission (register as a key event in GA4) |
| `form_error` | failed submission |
| `article_read` | reader reaches the foot of an article body |

Any element with a `data-track` attribute fires that event on click, so adding
a tracked link means adding one attribute.

## The contact form

Posts to Web3Forms. The access key is in `src/site.mjs`. It is a public
submission key, not a secret, which is why it sits in client-side code, the
same as the original build.
