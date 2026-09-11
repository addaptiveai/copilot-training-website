import { renderPage, breadcrumbs, ctaBand, esc } from '../layout.mjs';
import { abs, AUTHORS } from '../site.mjs';
import { articles, formatDate } from '../insights/articles.mjs';

const path = '/insights';
const url = abs(path);

const crumbs = [
  { label: 'Home', path: '/' },
  { label: 'Insights', path },
];

const cards = articles
  .map(
    (a) => `      <article class="article-card">
        <p class="article-card__meta">${esc(a.eyebrow)} &middot; <time datetime="${a.datePublished}">${formatDate(a.datePublished)}</time> &middot; ${esc(a.readTime)}</p>
        <h3><a href="/insights/${a.slug}">${esc(a.title)}</a></h3>
        <p>${esc(a.description)}</p>
        <span class="more">Read the article</span>
      </article>`,
  )
  .join('\n\n');

const body = `<section class="page-hero">
  <div class="container">
    <div class="page-hero__inner">
${breadcrumbs(crumbs)}
      <span class="label">Insights</span>
      <h1>Insights on Microsoft Copilot adoption</h1>
      <p class="page-hero__lede">What we are seeing in Copilot rollouts across Australian organisations. Written by the people delivering the work, checked against Microsoft's own sources, and updated when the product moves.</p>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="articles-h">
  <div class="container">
    <h2 id="articles-h" class="sr-only">All articles</h2>
    <div class="insights__grid">

${cards}

    </div>
  </div>
</section>


${ctaBand(
  'Working through one of these yourself?',
  'If something here matches what is happening in your organisation, tell us about it. We will give you a straight read on what would help.',
)}`;

export default renderPage({
  path,
  title: 'Insights on Microsoft Copilot adoption | Addaptive',
  description:
    'Articles on Microsoft Copilot adoption, training and licensing for Australian organisations, written by the Addaptive team delivering the work.',
  crumbs,
  body,
  nodes: [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Insights on Microsoft Copilot adoption',
      inLanguage: 'en-AU',
      isPartOf: { '@id': `${abs('/')}/#website` },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(`/insights/${a.slug}`),
          name: a.title,
        })),
      },
    },
  ],
});

export { AUTHORS };
