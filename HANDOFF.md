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

1. **Review the preview and merge PR #1.** Everything else is done. The preview
   is behind Vercel's deployment protection, so open it while signed in to
   Vercel.
4. **Move the repo to the Addaptive Enterprises GitHub account**, as David
   asked. It currently sits under `addaptiveai`. Transfer in the repo's
   settings; GitHub redirects the old remote automatically, and the Vercel
   integration needs reconnecting after the move.
5. **Run Google's Rich Results Test** against the preview URL. The Schema.org
   Validator has already passed, but Rich Results needs a public URL.
6. **After production deploy:** submit the sitemap in Search Console and Bing
   Webmaster Tools, and request indexing for each of the eight new URLs via URL
   Inspection. The property is already verified via the GA4 tag.
7. **Register `form_submitted` as a key event in GA4**, matching the other
   Addaptive sites. The event now fires; marking it as a key event is a change
   in the GA4 interface.
8. **Confirm logo permission** for Committee for Brisbane. Property Council and
   Match & Wood are already named on the live site and their logos are already
   published on addaptive.com.au. Committee for Brisbane's logo is also already
   on addaptive.com.au, so this is likely settled, but the brief asked for
   explicit sign-off and I have not seen it.
9. **Re-check article 3 close to publish.** The brief asked for this and the
   article says so on its face. The Frontier detail in particular is the part
   most likely to move.

---

## Open questions

- **A second testimonial.** The brief asked. Only the Match & Wood quote exists,
  so the page still carries one.
- **An anonymised example for article 1.** It publishes fine without one and
  would be stronger with one, as the brief noted.
- **Who approves production.** Not answered, and nothing has been deployed.
