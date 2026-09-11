/* The page shell: head, navigation, footer and the shared JSON-LD graph.
   Every generated page is complete, static HTML. Nothing in the body depends
   on JavaScript to become readable. */

import {
  SITE_URL, SITE_NAME, ORG_NAME, ORG_LEGAL_NAME, ORG_URL, ORG_ABN, EMAIL,
  GA_MEASUREMENT_ID, SERVICES, abs,
} from './site.mjs';

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* Serialised with < escaped so a stray sequence in copy can never close the
   script element early. */
const jsonLd = (data) =>
  `<script type="application/ld+json">\n${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}\n</script>`;

const ORG_ID = `${SITE_URL}/#organisation`;
const SITE_ID = `${SITE_URL}/#website`;

/* The ProfessionalService entity from the original build, kept as the site's
   primary node and given a stable @id so other pages can reference it. */
export const organisationNode = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Addaptive: Microsoft Copilot Training',
  legalName: ORG_LEGAL_NAME,
  url: SITE_URL,
  description:
    'Microsoft Copilot training and adoption programs for Australian businesses, delivered by Addaptive.',
  areaServed: 'AU',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: EMAIL,
    contactType: 'customer service',
  },
  sameAs: [ORG_URL],
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-AU',
  publisher: { '@id': ORG_ID },
};

function breadcrumbNode(crumbs, url) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.path),
    })),
  };
}

/* FAQPage is only emitted when the questions are actually rendered on the
   page, which the caller guarantees by passing the same array to both. */
function faqNode(faqs, url) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  };
}

function navigation(currentPath) {
  const isService = SERVICES.some((s) => s.path === currentPath);
  const current = (path) => (path === currentPath ? ' aria-current="page"' : '');

  const serviceLinks = SERVICES.map(
    (s) =>
      `          <li><a href="${s.path}"${current(s.path)}>${esc(s.navLabel)}<span>${esc(s.navBlurb)}</span></a></li>`,
  ).join('\n');

  const mobileServiceLinks = SERVICES.map(
    (s) => `      <li><a href="${s.path}"${current(s.path)}>${esc(s.navLabel)}</a></li>`,
  ).join('\n');

  /* On the homepage the anchors stay as fragments. Everywhere else they point
     back at the homepage so the link still resolves. */
  const home = currentPath === '/' ? '' : '/';

  return `<a class="skip-link" href="#main">Skip to content</a>

<header class="nav" id="nav" role="banner">
  <div class="container">
    <div class="nav__inner">

      <a href="/" class="nav__logo" aria-label="${esc(ORG_NAME)} Copilot training, home">
        <img src="/assets/logo-blue-teal.svg" alt="${esc(ORG_NAME)}" width="152" height="34">
      </a>

      <nav aria-label="Primary navigation">
        <ul class="nav__links">
          <li class="nav__item">
            <button type="button" class="nav__toggle" id="services-toggle"
                    aria-expanded="false" aria-controls="services-menu"${isService ? ' aria-current="page"' : ''}>Services</button>
            <ul class="nav__dropdown" id="services-menu" data-open="false">
${serviceLinks}
            </ul>
          </li>
          <li><a href="${home}#how-it-works">How It Works</a></li>
          <li><a href="/insights"${currentPath.startsWith('/insights') ? ' aria-current="page"' : ''}>Insights</a></li>
          <li><a href="${home}#clients">Clients</a></li>
          <li><a href="${home}#contact">Contact</a></li>
        </ul>
      </nav>

      <a href="${home}#contact" class="btn-primary nav__cta-d" data-track="cta_primary_click">Get in Touch</a>

      <button class="nav__hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="nav__mobile" id="mobileMenu" aria-label="Mobile navigation">
  <ul>
    <li>Services
      <ul class="sub">
${mobileServiceLinks}
      </ul>
    </li>
    <li><a href="${home}#how-it-works">How It Works</a></li>
    <li><a href="/insights">Insights</a></li>
    <li><a href="${home}#clients">Clients</a></li>
    <li><a href="${home}#contact">Contact</a></li>
  </ul>
  <a href="${home}#contact" class="btn-primary" data-track="cta_primary_click">Get in Touch</a>
</div>`;
}

function footer(currentPath) {
  const home = currentPath === '/' ? '' : '/';
  const serviceLinks = SERVICES.map(
    (s) => `            <li><a href="${s.path}">${esc(s.navLabel)}</a></li>`,
  ).join('\n');

  return `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">

      <div>
        <div class="footer__logo">
          <img src="/assets/logo-white.svg" alt="${esc(ORG_NAME)}" width="134" height="30">
        </div>
        <p class="footer__desc">Specialist Microsoft Copilot training and adoption programs for Australian organisations.</p>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Services</h2>
        <nav aria-label="Services navigation">
          <ul class="footer__nav">
${serviceLinks}
          </ul>
        </nav>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Navigation</h2>
        <nav aria-label="Footer navigation">
          <ul class="footer__nav">
            <li><a href="${home}#how-it-works">How It Works</a></li>
            <li><a href="/insights">Insights</a></li>
            <li><a href="${home}#clients">Clients</a></li>
            <li><a href="${home}#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Contact</h2>
        <div class="footer__contact">
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <a href="${ORG_URL}" target="_blank" rel="noopener noreferrer" data-track="outbound_addaptive_click">addaptive.com.au</a>
          <span>ABN: ${ORG_ABN}</span>
        </div>
      </div>

    </div>

    <div class="footer__bar">
      <p>&copy; 2026 ${esc(ORG_LEGAL_NAME)} &nbsp;&middot;&nbsp; <a href="${ORG_URL}" target="_blank" rel="noopener noreferrer">addaptive.com.au</a> &nbsp;&middot;&nbsp; All rights reserved</p>
    </div>
  </div>
</footer>`;
}

/**
 * Assemble one complete HTML document.
 *
 * @param {object} page
 * @param {string} page.path         Canonical path, e.g. '/copilot-workshop'.
 * @param {string} page.title        <title> text.
 * @param {string} page.description  Meta description.
 * @param {string} page.body         Page markup, inserted inside <main>.
 * @param {Array}  [page.crumbs]     Breadcrumb trail, including the current page.
 * @param {Array}  [page.faqs]       Visible FAQs, also emitted as FAQPage.
 * @param {Array}  [page.nodes]      Extra JSON-LD nodes for this page.
 * @param {string} [page.ogType]     Open Graph type, defaults to 'website'.
 * @param {string} [page.ogExtra]    Extra head markup for article metadata.
 */
export function renderPage(page) {
  const url = abs(page.path);
  const graph = [organisationNode, websiteNode];

  if (page.crumbs && page.crumbs.length > 1) graph.push(breadcrumbNode(page.crumbs, url));
  if (page.faqs && page.faqs.length) graph.push(faqNode(page.faqs, url));
  if (page.nodes) graph.push(...page.nodes);

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:locale" content="en_AU">
  <meta property="og:site_name" content="${esc(SITE_NAME)}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE_URL}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Addaptive, Microsoft Copilot training for Australian organisations">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${SITE_URL}/og-image.png">
${page.ogExtra || ''}
  <link rel="icon" href="/copilot-icon.png" type="image/png">
  <link rel="alternate" type="application/rss+xml" title="Addaptive Copilot Insights" href="${SITE_URL}/feed.xml">

  ${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles.css">

  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  </script>
  <script src="/assets/app.js" defer></script>
</head>
<body>

${navigation(page.path)}

<main id="main">
${page.body}
</main>

${footer(page.path)}

</body>
</html>
`;
}

/* Rendered breadcrumb trail. Sits inside the dark page hero. */
export function breadcrumbs(crumbs) {
  const items = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `      <li><span aria-current="page">${esc(c.label)}</span></li>`
        : `      <li><a href="${c.path}">${esc(c.label)}</a></li>`,
    )
    .join('\n');

  return `  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
${items}
    </ol>
  </nav>`;
}

/* Visible FAQ block. The same array is passed to renderPage so the schema and
   the rendered questions can never drift apart. */
export function faqBlock(faqs, heading = 'Common questions') {
  const items = faqs
    .map(
      (f) => `      <details>
        <summary>${esc(f.q)}</summary>
        <div class="faq__body">${f.a}</div>
      </details>`,
    )
    .join('\n');

  return `<section class="section section--grey" aria-labelledby="faq-h">
  <div class="container">
    <div class="section-head">
      <span class="label">FAQ</span>
      <h2 id="faq-h">${esc(heading)}</h2>
    </div>
    <div class="faq">
${items}
    </div>
  </div>
</section>`;
}

/* Closing conversion band used on every inner page. */
export function ctaBand(heading, copy) {
  return `<section class="cta-band" aria-labelledby="cta-band-h">
  <div class="container">
    <div class="cta-band__inner">
      <div>
        <h2 id="cta-band-h">${esc(heading)}</h2>
        <p>${esc(copy)}</p>
      </div>
      <div class="cta-band__actions">
        <a href="/#contact" class="btn-primary" data-track="cta_primary_click">Get in Touch</a>
      </div>
    </div>
  </div>
</section>`;
}
