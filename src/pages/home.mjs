import { renderPage, esc } from '../layout.mjs';
import { SERVICES, EMAIL, WEB3FORMS_KEY, abs } from '../site.mjs';
import { articles } from '../insights/articles.mjs';

/* Service card icons, lifted unchanged from the original build. */
const ICONS = {
  '/copilot-workshop': `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="5" y="8" width="34" height="22" rx="2.5" stroke="#5271FF" stroke-width="2"/>
            <line x1="22" y1="30" x2="22" y2="36" stroke="#5271FF" stroke-width="2" stroke-linecap="round"/>
            <line x1="13" y1="36" x2="31" y2="36" stroke="#5271FF" stroke-width="2" stroke-linecap="round"/>
            <path d="M13 21 L17.5 16.5 L21.5 21 L26 17 L31 21" stroke="#5271FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>`,
  '/capability-program': `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="7" y="30" width="30" height="7" rx="2" stroke="#5271FF" stroke-width="2"/>
            <rect x="10" y="21" width="24" height="7" rx="2" stroke="#5271FF" stroke-width="2"/>
            <rect x="13" y="12" width="18" height="7" rx="2" stroke="#5271FF" stroke-width="2"/>
          </svg>`,
  '/embedded-adoption-support': `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M34 22C34 28.627 28.627 34 22 34C15.373 34 10 28.627 10 22C10 15.373 15.373 10 22 10" stroke="#5271FF" stroke-width="2" stroke-linecap="round"/>
            <path d="M28 10 L34 10 L34 16" stroke="#5271FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="34" y1="10" x2="26" y2="18" stroke="#5271FF" stroke-width="2" stroke-linecap="round"/>
            <circle cx="22" cy="22" r="4" stroke="#5271FF" stroke-width="2"/>
          </svg>`,
};

const CARD_COPY = {
  '/copilot-workshop':
    "Half-day or full-day. Practical and hands-on, built around your team's actual work. Covers core Copilot features across M365 with live exercises. Best for teams starting out or needing a structured reset.",
  '/capability-program':
    'A structured multi-session program tiered by experience level. Beginners, intermediate users, and experienced staff are trained separately. Includes workflow integration and a 30-day adoption checkpoint. Best for organisations rolling out at scale.',
  '/embedded-adoption-support':
    'An ongoing advisory retainer. Addaptive works alongside your team to embed Copilot into real workflows, track adoption, and solve problems as they surface. Best for organisations that want sustained capability, not a one-off event.',
};

/* Client proof. Logos already published on addaptive.com.au are reused here.
   The unnamed agency has no mark and stays as a wordmark, matching the
   fallback used on the Addaptive site's own logo ribbon. */
const CLIENTS = [
  { name: 'Property Council of Australia', file: 'property-council.png', aspect: 1.351, scale: 1.3 },
  { name: 'Committee for Brisbane', file: 'committee-for-brisbane.png', aspect: 3.41, scale: 0.97 },
  { name: 'Match & Wood', file: 'match-and-wood.png', aspect: 1.895, scale: 1.3 },
  { name: 'State Government Agency', file: null },
];

const MARK_HEIGHT = 34;

function logoStrip() {
  const items = CLIENTS.map((c) => {
    if (!c.file) {
      return `      <li class="logo-word">${esc(c.name)}</li>`;
    }
    const h = Math.round(MARK_HEIGHT * c.scale);
    const w = Math.round(h * c.aspect);
    return `      <li><span class="logo-mark" role="img" aria-label="${esc(c.name)}"
          style="width:${w}px;height:${h}px;mask-image:url(/assets/clients/${c.file});-webkit-mask-image:url(/assets/clients/${c.file})"></span></li>`;
  }).join('\n');

  return `    <ul class="logo-strip">\n${items}\n    </ul>`;
}

function serviceCards() {
  return SERVICES.map(
    (s) => `      <article class="card">
        <div class="card__icon">
          ${ICONS[s.path]}
        </div>
        <span class="card__tag">${esc(s.cardTag)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(CARD_COPY[s.path])}</p>
        <a href="${s.path}" class="more">Learn more<span class="sr-only"> about the ${esc(s.title)}</span></a>
      </article>`,
  ).join('\n\n');
}

function latestInsights() {
  return articles
    .slice(0, 3)
    .map(
      (a) => `      <article class="article-card">
        <p class="article-card__meta">${esc(a.eyebrow)} &middot; ${esc(a.readTime)}</p>
        <h3><a href="/insights/${a.slug}">${esc(a.title)}</a></h3>
        <p>${esc(a.description)}</p>
        <span class="more">Read the article</span>
      </article>`,
    )
    .join('\n\n');
}

const body = `<section class="hero" aria-label="Introduction">
  <div class="container">
    <div class="hero__inner">
      <div class="hero__badge">
        <img src="/copilot-icon.png" alt="" width="22" height="22">
        <span>Microsoft Copilot Specialist Training</span>
      </div>
      <h1>Microsoft Copilot training built around how your team works.</h1>
      <p>The licences were the easy part. Most teams stall somewhere between having Copilot and using it without thinking about it, and that gap is the work we do.</p>
      <div class="hero__ctas">
        <a href="#contact" class="btn-primary" data-track="cta_primary_click">Get in Touch</a>
        <a href="#how-it-works" class="btn-ghost">See How It Works</a>
      </div>
    </div>
  </div>
</section>


<section class="services" id="services" aria-labelledby="services-h">
  <div class="container">
    <div class="section-head">
      <span class="label">Services</span>
      <h2 id="services-h">Practical training,<br>built for real teams.</h2>
    </div>

    <div class="services__grid">

${serviceCards()}

    </div>
  </div>
</section>


<section class="how" id="how-it-works" aria-labelledby="how-h">
  <div class="container">
    <div class="section-head">
      <span class="label">How It Works</span>
      <h2 id="how-h">A process built around your team.</h2>
    </div>

    <div class="how__steps">
      <div class="step">
        <div class="step__num">1</div>
        <h3>Discovery</h3>
        <p>We start with a conversation about your team, your tools, and where adoption is breaking down. No assumptions.</p>
      </div>
      <div class="step">
        <div class="step__num">2</div>
        <h3>Design</h3>
        <p>We build a program around your workflows, not a generic Copilot demo. Tiered by role and experience where relevant.</p>
      </div>
      <div class="step">
        <div class="step__num">3</div>
        <h3>Deliver and Embed</h3>
        <p>Training is hands-on and practical. We follow up to make sure change sticks.</p>
      </div>
    </div>
  </div>
</section>


<section class="clients" id="clients" aria-labelledby="clients-h">
  <div class="container">
    <span class="label">Clients</span>
    <h2 id="clients-h" style="font-size: clamp(1.55rem, 2.8vw, 2.05rem); margin-bottom: 16px;">Work that speaks for itself.</h2>
    <p class="clients__intro">Addaptive has delivered AI training and capability programs for some of Australia's most respected organisations.</p>

${logoStrip()}

    <div class="quote-block">
      <blockquote>"Training significantly enhanced confidence in Copilot use and was most effective when tailored to the organisation's context."</blockquote>
      <cite>COO, Match &amp; Wood</cite>
    </div>
  </div>
</section>


<section class="section" id="insights-home" aria-labelledby="insights-home-h">
  <div class="container">
    <div class="section-head">
      <span class="label">Insights</span>
      <h2 id="insights-home-h">What we are seeing in Copilot rollouts.</h2>
    </div>

    <div class="insights__grid">

${latestInsights()}

    </div>

    <p style="margin-top:36px"><a href="/insights" class="btn-outline">Read all insights</a></p>
  </div>
</section>


<section class="contact" id="contact" aria-labelledby="contact-h">
  <div class="container">
    <div class="contact__inner">

      <div class="contact__copy">
        <span class="label">Get in Touch</span>
        <h2 id="contact-h">Let's talk about your team.</h2>
        <p>Whether you're planning a rollout, troubleshooting low adoption, or just figuring out where to start, get in touch and we'll point you in the right direction.</p>
      </div>

      <div>
        <form id="contact-form" method="POST" action="https://api.web3forms.com/submit">
          <input type="hidden" name="access_key" value="${WEB3FORMS_KEY}">
          <input type="hidden" name="subject" value="New Copilot Training Enquiry - copilot-training.com.au">
          <input type="hidden" name="from_name" value="Copilot Training Website">
          <input type="checkbox" name="botcheck" style="display:none;" tabindex="-1" autocomplete="off">

          <div class="form-row">
            <div class="form-group">
              <label for="f-name">Name</label>
              <input type="text" id="f-name" name="name" placeholder="Your name" autocomplete="name" required>
            </div>
            <div class="form-group">
              <label for="f-email">Email</label>
              <input type="email" id="f-email" name="email" placeholder="your@email.com" autocomplete="email" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="f-org">Organisation</label>
              <input type="text" id="f-org" name="organisation" placeholder="Your organisation" autocomplete="organization">
            </div>
            <div class="form-group">
              <label for="f-size">Team size</label>
              <select id="f-size" name="team-size">
                <option value="" disabled selected>Select&hellip;</option>
                <option value="under-50">Under 50</option>
                <option value="50-200">50&ndash;200</option>
                <option value="200-500">200&ndash;500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="f-msg">Message</label>
            <textarea id="f-msg" name="message" rows="4" placeholder="What are you working on?"></textarea>
          </div>

          <button type="submit" class="btn-submit" id="form-btn">Send Enquiry</button>

          <div class="form-feedback form-feedback--success" id="form-success" role="status" hidden>
            Message sent. We'll be in touch shortly.
          </div>
          <div class="form-feedback form-feedback--error" id="form-error" role="alert" hidden>
            Something went wrong. Please try again or email <a href="mailto:${EMAIL}">${EMAIL}</a>.
          </div>
        </form>
      </div>

    </div>
  </div>
</section>`;

export default renderPage({
  path: '/',
  title: 'Microsoft Copilot Training Australia | Addaptive',
  description:
    'Addaptive delivers Microsoft Copilot training and adoption programs for Australian businesses. Practical, tailored, built around how your team actually works.',
  crumbs: [{ label: 'Home', path: '/' }],
  body,
  nodes: [
    {
      '@type': 'WebPage',
      '@id': `${abs('/')}/#webpage`,
      url: abs('/'),
      name: 'Microsoft Copilot Training Australia | Addaptive',
      inLanguage: 'en-AU',
      isPartOf: { '@id': `${abs('/')}/#website` },
      about: { '@id': `${abs('/')}/#organisation` },
    },
  ],
});
