# Handoff: copilot-training.com.au content release

**Date:** 11 September 2026
**Branch:** `release/content-depth`
**Repo:** `addaptiveai/copilot-training-website` (currently under David's personal GitHub account)

---

## Resolved: the canonical hostname now serves directly

Fixed in Vercel on 11 September 2026.

`copilot-training.com.au` used to return a 307 to `www`, while every canonical
tag pointed at the apex, so Google was told the canonical URL was one that
redirected away.

Search Console confirmed the apex was the right target. Inspecting the apex in
the `https://copilot-training.com.au/` property showed:

- Google-selected canonical: the inspected URL, i.e. the apex. Google had
  already settled there, because the `www` page's canonical tag pointed at it.
- Referring page: `https://www.copilot-training.com.au/`, so Google reached the
  apex through the `www` version.
- Sitemaps: "No referring sitemaps detected", which this release fixes.

So this was not a change of direction, it was making the server agree with the
canonical Google had already picked.

**What changed in the Vercel project's Domains settings:**

| Domain | Before | After |
|---|---|---|
| `copilot-training.com.au` | 307 redirect to `www` | Serves Production |
| `www.copilot-training.com.au` | Served Production | 308 permanent redirect to the apex |

The apex A record already pointed at Vercel (`216.198.79.1`), so no DNS change
was needed. Vercel still shows a "DNS Change Recommended" hint on the apex,
which is a suggestion to move to its newer per-project record; the current
record is valid and serving.

Verified live:

- `https://copilot-training.com.au/` returns 200 directly
- `https://www.copilot-training.com.au/` returns 308 to the apex
- `http://copilot-training.com.au/` returns 308 to HTTPS on the apex
- The canonical tag on the served page points at the apex, which now answers 200

---

## Decision: no secondary booking CTA

The brief asked for a direct booking link alongside the contact form. No such
link existed anywhere in the business, and on 11 September David decided against
creating one: the form is the single conversion path.

The CTA and its `cta_booking_click` event have been removed rather than left in
place disabled, so there is no dead code. Both are in the git history if the
decision changes. Re-adding means one constant and two template blocks.

The form itself remains the only enquiry route, with the email address in the
footer and in the form's error state as the fallback if a submission fails.

---

## What was built

### Navigation

Services is now a dropdown to three real pages. Insights is a new top-level
item. How It Works, Clients and Contact remain homepage anchors.

Every service card and every "Learn more" link now points at its real page.
`verify.mjs` fails the build if any of them regress to `#contact`.

The dropdown is an enhancement only. Its links are ordinary anchors in the
initial HTML and the footer lists the same three pages, so the service pages
are reachable with JavaScript disabled.

### Service pages

| Route | Contains |
|---|---|
| `/copilot-workshop` | Session-by-session outline, who it is for, sample full-day agenda, half vs full day, group sizes, virtual and in-person, 7 FAQs covering format and logistics including the executive session |
| `/capability-program` | What each of the three tiers actually contains rather than just that tiers exist, the four-stage shape, the 30-day adoption checkpoint written as a deliverable, 6 FAQs |
| `/embedded-adoption-support` | Reframed around delegation as Copilot takes on more of the work, Cowork covered explicitly and precisely, the retainer's actual contents, 6 FAQs |

Each has a unique title and description, one `h1`, `Service` schema, and
`FAQPage` schema generated from the same array that renders the visible
questions, so the two cannot drift apart.

The capability page carries a marked slot for the future rollout-at-scale
article, as the brief asked.

### Insights

`/insights` plus four articles. The index is generated from the article data,
so it grows without touching the template and has no hardcoded count.

1. **Why teams stop using Copilot after the licences are bought** (David)
2. **Copilot in Excel, PowerPoint and Outlook: what's actually worth training your team on** (Mariah)
3. **What Copilot Cowork changes for teams still learning the basics** (David)
4. **Copilot paid licence vs free: what you're actually comparing** (David)

All four are drafted in full, not outlined. Each carries named authorship,
dates, `Article` schema, a "In short" summary, FAQs, related service and
article links, and a cited sources block where product claims are made.

Article 4 uses the copy supplied in the brief, with the pricing paragraph
rewritten, see below.

### Homepage

- `og:image` placeholder replaced with a real branded 1200x630 image, generated
  from the site's own hero treatment and the Addaptive wordmark. Wired into
  Open Graph and Twitter metadata on every page.
- Hero supporting line rewritten to the adoption-gap framing. The `h1` is
  unchanged because it carries the "Microsoft Copilot training" search intent.
- Client name boxes replaced with real logos for Property Council of Australia,
  Committee for Brisbane and Match & Wood, reusing the normalised artwork
  already published on addaptive.com.au. Each is painted one flat tone through
  its own artwork as a CSS mask, the same technique as the Addaptive logo
  ribbon, so marks of different origin sit at one visual weight. The unnamed
  state government agency has no logo and stays as a wordmark.
- New section showing the three latest Insights articles.

### Crawl and discovery

- `robots.txt` and `sitemap.xml` now exist. Both previously 404'd.
- `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User,
  PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User,
  Google-Extended and Applebot. **Every user-agent token was confirmed against
  the vendor's own published documentation on 11 September 2026**, per the
  brief's instruction that these names change. OpenAI has since added a fourth,
  `OAI-AdsBot`, for ad-landing-page safety checks; it is not listed because it
  has nothing to do with discovery, and it is not blocked either.
- `/sitemap.xml` covers exactly the nine canonical indexable routes, verified
  against the generated pages on every build.
- `/feed.xml` RSS feed for Insights, linked from every page's `<head>`.
- The existing `llms.txt` is kept accurate rather than removed. It is not
  treated as an SEO requirement, per the brief and Google's own position.

### Structured data

`ProfessionalService` from the original build is preserved as the primary
entity and given a stable `@id` that every other node references. Added
`WebSite`, `WebPage`, `BreadcrumbList` site-wide, `Service` per service page,
`Article` per Insights piece, `CollectionPage` on the index, and `FAQPage` only
where questions are visible.

Validated with the Schema.org Validator: **0 errors, 0 warnings** on the
homepage, a service page, an article and the capability page. Graph integrity
is also checked on every build, no dangling `@id` references.

Google's Rich Results Test needs a public URL, so run it against the preview
deployment before merging.

---

## Corrections made to briefed content

**The AUD pricing in the supplied article 4 copy was wrong.** The brief flagged
that those figures came from a reseller rather than Microsoft and asked for them
to be verified. They were, against Microsoft's Australian pricing pages on
11 September 2026:

| Claim in the brief | Microsoft's listed price |
|---|---|
| "around $31 a user per month for the Business tier" | **AU$26.91** paid yearly, a promotional rate through December 2026, or **AU$37.68** paid monthly |
| "around $45 a user per month for the Enterprise tier" | **AU$44.90** paid yearly, close enough, now verified |

The paragraph was rewritten as a table with both commitment terms, an explicit
ex-GST note, the promotional caveat, and the brief's "starting point for the
conversation" framing kept.

Two smaller corrections in the same article: Copilot Chat's qualifying plans are
wider than the four the draft listed (Microsoft also includes Business Basic,
Apps for Business and Enterprise, F1, F3 and Office 365 E3 and E5), and
enterprise data protection applies to anyone signed in with a Microsoft Entra
account with no admin action needed. Both now cite Microsoft directly.

---

## Guardrail compliance

- **No implied Microsoft partnership or certification.** Two pages state
  plainly that Addaptive is independent and not a Microsoft partner. The build
  checks this sentence by sentence, so it distinguishes "we are not a Microsoft
  partner" from "talk to your Microsoft partner" and fails on an actual claim.
- **Cowork app building is never described as generally available.** It is
  named as a preview limited to Microsoft's Frontier program, which began
  rolling out to those organisations between 8 and 14 September 2026. The build
  fails if any page mentions app building without naming the Frontier limit.
- **No invented clients, results, statistics or testimonials.** The only quote
  on the site is the existing Match & Wood one. Only clients already public on
  the live site are named.
- **House style enforced by the build**, not by eye: no em dashes, no banned
  vocabulary, no US spellings.

Two deliberate notes on house style:

- **"program" is kept rather than "programme"**, because "Copilot Capability
  Program" is the established product name on the live site and in `llms.txt`,
  and the brief said not to restyle what exists.
- **One inherited em dash was removed.** The original `ProfessionalService`
  schema had `name: "Addaptive - Microsoft Copilot Training"` with an em dash,
  and the brief said to keep that schema. The em dash rule in `how-i-write.md`
  is absolute, so the separator is now a colon. Type, fields and meaning are
  unchanged; only the display name's punctuation moved. Say the word and I will
  put it back.

---

## Verification completed

| Check | Result |
|---|---|
| `npm run build` (generate + verify) | Passes |
| 9 routes at 1400px desktop | Rendered and reviewed |
| 9 routes at 375px mobile | Rendered and reviewed, no horizontal overflow on any route |
| Services dropdown, mouse and keyboard, Escape to close | Works |
| Mobile menu with Services sub-list | Works |
| Contact form success path | Posts all 8 fields to Web3Forms, clears inputs, preserves hidden fields, fires `form_start` and `form_submitted` |
| Contact form failure path | Shows the error with `role="alert"`, preserves what was typed, re-enables the button, fires `form_error` |
| Internal links | Every one resolves, checked on every build |
| Metadata, canonicals, sitemap, robots, feed | Verified on every build |
| JSON-LD | Schema.org Validator, 0 errors and 0 warnings |
| Accessibility | Alt text, heading order, duplicate ids, label association, fragment targets, all checked on every build |
| External sources | All 8 cited links resolve directly, no redirects. One Microsoft URL had already moved and was updated |
| CI workflow | YAML validated, drift guard confirmed to catch uncommitted output |
| Page weight | Homepage HTML 57.9 KB to 19.9 KB. Shared CSS, JS and logos now cache across all nine pages rather than being re-sent inline per page |
| Reduced motion | All transforms and transitions disabled under `prefers-reduced-motion` |

**Not done:** a live contact form submission. That sends a real enquiry email to
david@addaptive.com.au, so it is left for David to run once, or to approve. The
handler itself is verified against both a success and a failure response.

---

## Fixed after launch: the Services dropdown

David reported that the dropdown appeared on hover but vanished as soon as he
moved the cursor towards it, so no service page could be clicked.

The panel sits 14px below the button, and that gap was outside the hover
target. Moving down from the button crossed it, fired `mouseleave` on the
wrapper, and closed the menu mid-reach. It worked in automated testing because
that clicks the link directly rather than travelling to it, which is exactly
the kind of thing a real cursor catches and a script does not.

Two changes, both needed:

- A pseudo-element on the panel covers the gap, so the pointer never leaves the
  hover target on the way down.
- `mouseleave` now waits 220ms before closing, so a diagonal move towards a
  lower item is forgiven.

Verified by driving a real cursor along the failing path, button to gap to each
item, then clicking through to a service page. Also confirmed the invisible
bridge does not intercept clicks on the neighbouring nav links while the menu
is open: How It Works, Insights, Clients, Contact and Get in Touch all still
hit their own anchors.

## One thing that broke on first deploy

Adding `package.json` changed how Vercel sees the repo. It auto-detected a Node
project, ran a build, then failed with "No Output Directory named public found".
The build itself was fine, the logs show every page written; Vercel just expects
a `public` directory whenever a build command runs.

There is no build step here by design: the generated HTML is committed and the
repo root is the site. `vercel.json` now says so explicitly, and a
`.vercelignore` keeps the generator, the checker and their sources out of the
deployment, since they are not part of what the site serves.

Worth remembering if anyone adds dependencies later: the moment a real build
step is wanted on Vercel, that config needs revisiting.

## Still to do

1. **Mark `form_submitted` as a key event in GA4.** This one cannot be done
   ahead of time. This property's GA4 interface only lets you star an event it
   has already observed, and there is no "new key event by name" option.
   `form_start` is already showing under Recent events, so the taxonomy works.
   Once the first enquiry comes through, go to Admin, Data display, Events,
   Recent events, and click the star next to `form_submitted`. GA4 can take up
   to 24 hours to list a newly seen event.

2. **Move the repo to the Addaptive Enterprises GitHub account.** It still sits
   under `addaptiveai`. Transfer in the repo settings; GitHub redirects the old
   remote automatically, but the Vercel integration needs reconnecting
   afterwards, so do it at a quiet moment rather than before a release.

3. **Enable 2FA on the GitHub account.** GitHub gave a 4 day deadline on
   11 September 2026 before it starts interrupting sign-ins.

4. **Add Mariah to the Addaptive about page**, then set her `url` in
   `AUTHORS` in `src/site.mjs`. Google's Article guidance asks for an author
   URL that uniquely identifies the person. David's points at
   `addaptive.com.au/about/`, which names him. Hers is deliberately absent
   rather than pointed at a page that does not.

5. **Optional, and needs a decision:** the Organization entity is flagged for
   missing `streetAddress` and `postalCode`. Both are optional and both come
   from the original build's schema. The September SEO review asked whether
   Brisbane is a staffed physical location before changing Organization schema,
   so this is left alone rather than filled in with something unverified.

6. **Re-check the Cowork article close to any future update.** The Frontier
   detail is the part most likely to move.

## Launched

Merged and deployed on 11 September 2026. Verified live on
`https://copilot-training.com.au`:

- All 15 routes and assets return 200, including the three service pages, the
  Insights index, all four articles, `robots.txt`, `sitemap.xml`, `feed.xml`
  and `og-image.png`.
- `/src/`, `build.mjs` and `verify.mjs` return 404, so the generator and
  checker are not served.
- Clean URLs work without a trailing slash, and `/insights/` 308s to
  `/insights`.
- Every canonical is self-referencing and points at a URL that answers 200.
- JSON-LD parses on every page type.
- No em dashes anywhere in the served HTML.

**Google Search Console:** sitemap submitted and read successfully, 9 pages
discovered. Indexing requested for all eight new URLs; each is now in Google's
priority crawl queue.

**Bing Webmaster Tools:** site added and verified on 12 September 2026, sitemap
submitted with 0 errors and 0 warnings, and all nine URLs pushed through URL
Submission.

Verification used the HTML meta tag rather than the two methods Bing
recommends first. DNS auto-verification wants a GoDaddy sign-in, and the XML
file method requires downloading a file from Bing; the meta tag's value is
shown on screen and can simply be read. The tag is emitted site-wide rather
than on the homepage alone, so a later change to the home page cannot silently
drop verification. Bing's instruction is to leave it in place permanently.

The Google Search Console import was deliberately not used. It is the faster
path, but it grants Bing access to the whole Search Console account, which is
a much broader permission than this task needs.

**Google Rich Results Test:**

| Page | Result |
|---|---|
| `/copilot-workshop` | 3 valid items: Breadcrumbs, Local businesses, Organization |
| `/insights/what-copilot-cowork-changes` | 4 valid items: Articles, Breadcrumbs, Local businesses, Organization |

All valid and eligible. The only non-critical issues were optional fields:
`author.url`, now fixed for David, and `streetAddress`/`postalCode`, left alone
deliberately.

FAQPage does not appear as an eligible rich result, which is expected: Google
restricted FAQ rich results to government and health sites in 2023. The markup
is still valid and still helps machines read the page.

## Open questions

- **A second testimonial.** The brief asked. Only the Match & Wood quote exists,
  so the page still carries one.
- **An anonymised example for article 1.** It publishes fine without one and
  would be stronger with one, as the brief noted.
- **Who approves production.** Not answered, and nothing has been deployed.
