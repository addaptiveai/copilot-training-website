/* Renders one Insights article. */

import { renderPage, breadcrumbs, faqBlock, ctaBand, esc } from '../layout.mjs';
import { abs, AUTHORS, SERVICES, SITE_URL } from '../site.mjs';
import { bySlug, formatDate } from '../insights/articles.mjs';

/* Descriptions used when an article points back at a service page. */
const SERVICE_BLURB = {
  '/copilot-workshop': 'A half-day or full-day hands-on session built around your own documents.',
  '/capability-program': 'A multi-session program tiered by experience level, with a 30-day adoption checkpoint.',
  '/embedded-adoption-support': 'An ongoing retainer for teams that want the change to hold after training finishes.',
};

function relatedBlock(article) {
  const services = (article.related || []).map((p) => {
    const path = p.startsWith('/') ? p : `/${p}`;
    const service = SERVICES.find((s) => s.path === path);
    return `      <article class="related-card">
        <span class="related-card__kind">Service</span>
        <h3><a href="${path}">${esc(service.title)}</a></h3>
        <p>${esc(SERVICE_BLURB[path])}</p>
      </article>`;
  });

  const posts = (article.relatedArticles || []).map((slug) => {
    const other = bySlug[slug];
    return `      <article class="related-card">
        <span class="related-card__kind">Article</span>
        <h3><a href="/insights/${other.slug}">${esc(other.title)}</a></h3>
        <p>${esc(other.description)}</p>
      </article>`;
  });

  const all = [...services, ...posts];
  if (!all.length) return '';

  return `<section class="section section--tight section--grey" aria-labelledby="related-h">
  <div class="container">
    <div class="section-head" style="margin-bottom:32px">
      <span class="label">Related</span>
      <h2 id="related-h">Where to go next</h2>
    </div>
    <div class="related__grid">

${all.join('\n\n')}

    </div>
  </div>
</section>`;
}

function sourcesBlock(article) {
  if (!article.sources || !article.sources.length) return '';

  const items = article.sources
    .map(
      (s) =>
        `        <li><a href="${s.href}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`,
    )
    .join('\n');

  const checked = article.sourceChecked
    ? `      <p>Product claims on this page were checked against these sources on ${esc(article.sourceChecked)}. This part of Microsoft's product moves quickly, so verify anything you are about to act on.</p>`
    : '';

  return `    <div class="sources">
      <h2>Sources</h2>
      <ul>
${items}
      </ul>
${checked}
    </div>`;
}

export function renderArticle(slug) {
  const article = bySlug[slug];
  const path = `/insights/${slug}`;
  const url = abs(path);
  const author = AUTHORS[article.author];

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Insights', path: '/insights' },
    { label: article.title, path },
  ];

  const opening = article.opening.map((p) => `      <p>${p}</p>`).join('\n');

  const takeaways = `    <div class="takeaways">
      <h2>In short</h2>
      <ul>
${article.takeaways.map((t) => `        <li>${t}</li>`).join('\n')}
      </ul>
    </div>`;

  const sections = article.sections
    .map(
      (s) => `      <h2>${esc(s.heading)}</h2>
${s.html.trim().split('\n').map((l) => '      ' + l.trim()).join('\n')}`,
    )
    .join('\n\n');

  const body = `<section class="page-hero">
  <div class="container">
    <div class="page-hero__inner">
${breadcrumbs(crumbs)}
      <span class="label">${esc(article.eyebrow)}</span>
      <h1>${esc(article.title)}</h1>
      <p class="byline">
        <span>By <strong>${esc(author.name)}</strong>, ${esc(author.role)}</span>
        <span><time datetime="${article.datePublished}">${formatDate(article.datePublished)}</time></span>
        <span>${esc(article.readTime)}</span>
      </p>
    </div>
  </div>
</section>


<article class="section">
  <div class="container">
    <div class="prose" data-article-body="${slug}">

${opening}

${takeaways}

${sections}

${sourcesBlock(article)}

    </div>
  </div>
</article>


${article.faqs && article.faqs.length ? faqBlock(article.faqs, 'Questions people ask') + '\n\n\n' : ''}${relatedBlock(article)}


${ctaBand(
  'Want a straight read on your own rollout?',
  'Tell us where your team has got to with Copilot and what has stopped working. No pitch, just a view on what would actually help.',
)}`;

  return renderPage({
    path,
    title: `${article.metaTitle || article.title} | Addaptive`,
    description: article.description,
    crumbs,
    faqs: article.faqs,
    body,
    ogType: 'article',
    ogExtra: `  <meta property="article:published_time" content="${article.datePublished}">
  <meta property="article:modified_time" content="${article.dateModified}">
  <meta property="article:author" content="${esc(author.name)}">
  <meta property="article:section" content="${esc(article.eyebrow)}">
  <meta name="author" content="${esc(author.name)}">`,
    nodes: [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        image: `${SITE_URL}/og-image.png`,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: 'en-AU',
        author: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          worksFor: { '@id': `${abs('/')}/#organisation` },
        },
        publisher: { '@id': `${abs('/')}/#organisation` },
        isPartOf: { '@id': `${abs('/')}/#website` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: article.title,
        inLanguage: 'en-AU',
        isPartOf: { '@id': `${abs('/')}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
        publisher: { '@id': `${abs('/')}/#organisation` },
      },
    ],
  });
}
