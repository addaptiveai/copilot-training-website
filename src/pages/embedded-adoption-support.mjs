import { renderPage, breadcrumbs, faqBlock, ctaBand } from '../layout.mjs';
import { abs } from '../site.mjs';

const path = '/embedded-adoption-support';
const url = abs(path);

const crumbs = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/copilot-workshop' },
  { label: 'Embedded Adoption Support', path },
];

const faqs = [
  {
    q: 'What does a typical month look like?',
    a: `<p>A standing office hours session every fortnight where people bring what broke, plus a monthly review with whoever owns adoption internally. Between those, we are reachable for the questions that are too small to schedule a meeting about.</p>
        <p>Inclusions vary by scope, so check the proposal you have been issued rather than assuming a standard shape.</p>`,
  },
  {
    q: 'Is this just ongoing training?',
    a: `<p>Some of it is. Most of it is the work training cannot do: answering the questions that surface in week three, deciding which team gets attention next, working out why Copilot cannot see a SharePoint site, and helping leadership decide what the organisation is comfortable delegating.</p>`,
  },
  {
    q: 'Do we need to have done a workshop or program first?',
    a: `<p>Usually, though not always. If your team has been using Copilot for a while and the problem is that progress has stalled rather than that nobody has been trained, starting here makes sense.</p>`,
  },
  {
    q: 'How do you handle governance and what Copilot is allowed to do?',
    a: `<p>We help you form a position and write it down: which work runs end to end, which needs a person at a defined checkpoint, and who is accountable when an output is wrong. We are not lawyers and we do not give legal or compliance advice. Where a decision needs your risk, legal or privacy people, we say so.</p>`,
  },
  {
    q: 'What do you measure?',
    a: `<p>The tasks each team committed to, and whether they are still happening. Licence utilisation tells you who opened the app, which is a weak proxy for whether anything changed. We would rather track three or four real tasks per function.</p>`,
  },
  {
    q: 'How long do organisations stay on it?',
    a: `<p>Commonly six to twelve months, which is roughly how long it takes for new habits to stop needing support. Some stay longer because the product keeps moving and they want someone tracking what is worth acting on.</p>`,
  },
];

const body = `<section class="page-hero">
  <div class="container">
    <div class="page-hero__inner">
${breadcrumbs(crumbs)}
      <span class="label">Ongoing Advisory</span>
      <h1>Embedded Adoption Support</h1>
      <p class="page-hero__lede">An ongoing retainer for organisations that want Copilot to keep improving after the training finishes. We work alongside your team as questions surface, and help you decide what to hand over to Copilot as it takes on more of the work itself.</p>
      <div class="page-hero__ctas">
        <a href="/#contact" class="btn-primary" data-track="cta_primary_click">Talk to us about a retainer</a>
        <a href="#delegation" class="btn-ghost">What to delegate</a>
      </div>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="why-h">
  <div class="container">
    <div class="prose">
      <h2 id="why-h">The questions arrive after the trainer leaves</h2>
      <p>Week one questions are about buttons. Week three questions are the ones that decide whether a rollout holds: why did it get this wrong, how do I stop it inventing a figure, why does it work for my colleague and not for me, can it see the finance SharePoint site.</p>
      <p>Most engagements have finished by week three. So those questions go unanswered, people form their own view about how reliable the tool is, and usage falls away. We have written about that pattern in <a href="/insights/why-teams-stop-using-copilot">why teams stop using Copilot after the licences are bought</a>.</p>
      <p>This service exists to be there for that part.</p>
    </div>
  </div>
</section>


<section class="section section--grey" id="delegation" aria-labelledby="delegation-h">
  <div class="container">
    <div class="section-head">
      <span class="label">What has changed</span>
      <h2 id="delegation-h">Copilot is becoming something you delegate to</h2>
    </div>

    <div class="prose">
      <p>For most of its life, Copilot has been an assistant beside one person doing one task. That is no longer the whole picture.</p>
      <p>Microsoft 365 Copilot Cowork, generally available worldwide since 16 June 2026, takes a job with several steps and tools in it and works through to a finished result rather than a draft. It runs across Word, Excel, PowerPoint, Outlook, Teams and SharePoint, grounded in your organisation's own systems through Work IQ (<a href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available/" target="_blank" rel="noopener noreferrer">Microsoft 365 Blog</a>).</p>
      <p>That changes the useful question. It stops being "which features should my team learn" and becomes "which work are we comfortable handing over, where does a person still need to look, and who is accountable when the output is wrong".</p>
      <p>Those are not questions a training day answers. They need someone who knows how your teams actually work, revisiting the position as the product moves.</p>
    </div>

    <div class="note" style="margin-top:32px;max-width:820px">
      <p><strong>Being precise about what is available.</strong> Building apps by conversation inside Cowork and Copilot Studio is a preview limited to organisations in Microsoft's Frontier program, which began rolling out in September 2026. It is not generally available, and we will not build you a plan that depends on it. The detail is in <a href="/insights/what-copilot-cowork-changes">what Copilot Cowork changes for teams still learning the basics</a>.</p>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="work-h">
  <div class="container">
    <div class="section-head">
      <span class="label">What we do</span>
      <h2 id="work-h">The work inside a retainer</h2>
    </div>

    <div class="stack">
      <div class="stack-item">
        <h3>Office hours</h3>
        <p>A standing session where people bring what broke this fortnight. It catches the week-three questions while they still matter, and the patterns that turn up repeatedly become the next thing we fix for everyone.</p>
      </div>
      <div class="stack-item">
        <h3>Delegation boundaries</h3>
        <p>A written position on which work Copilot runs end to end, which work needs a person at a defined checkpoint, and which work does not go near it yet. Revisited as the product changes, because it will.</p>
      </div>
      <div class="stack-item">
        <h3>Adoption tracking that means something</h3>
        <p>Three or four named tasks per function, reviewed monthly. When a team goes quiet we find out why rather than reporting a lower number.</p>
      </div>
      <div class="stack-item">
        <h3>Workflow work</h3>
        <p>Taking the recurring processes that surface in office hours and rebuilding them properly, rather than leaving each person to solve the same thing privately.</p>
      </div>
      <div class="stack-item">
        <h3>Keeping leadership current</h3>
        <p>A plain summary of what actually changed in the product this quarter and what is worth acting on, separated from what is still a preview. Most of the noise does not need a decision.</p>
      </div>
    </div>
  </div>
</section>


<section class="section section--grey" aria-labelledby="fit-h">
  <div class="container">
    <div class="prose">
      <h2 id="fit-h">Who it suits</h2>
      <p>Organisations that have trained people and want the change to hold. Organisations where adoption started well and has flattened. And organisations where leadership has realised that the delegation question is now a governance question and does not want to answer it from a standing start.</p>
      <p>If nobody has been trained yet, start with the <a href="/copilot-workshop">Copilot Workshop</a> or, for a larger rollout, the <a href="/capability-program">Copilot Capability Program</a>.</p>
      <p>Addaptive is an independent AI consultancy. We are not a Microsoft partner and we hold no Microsoft certification, so when the honest answer is that you do not need us for something, that is the answer you get.</p>
    </div>
  </div>
</section>


${faqBlock(faqs, 'Retainer questions')}


${ctaBand(
  'Adoption stalled, or ready to hand over more?',
  'Tell us where your team has got to and what has stopped working. We will tell you whether a retainer is the right shape.',
)}`;

export default renderPage({
  path,
  title: 'Copilot Adoption Support Retainer | Addaptive',
  description:
    'An ongoing Microsoft Copilot advisory retainer for Australian organisations. Office hours, adoption tracking, workflow work and clear delegation boundaries.',
  crumbs,
  faqs,
  body,
  nodes: [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Embedded Adoption Support',
      serviceType: 'Microsoft Copilot adoption advisory retainer',
      description:
        "An ongoing retainer where Addaptive works alongside an Australian organisation's team to embed Microsoft Copilot into real workflows, track adoption, and set delegation boundaries as Copilot's capability grows.",
      url,
      provider: { '@id': `${abs('/')}/#organisation` },
      areaServed: { '@type': 'Country', name: 'Australia' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Australian organisations with Microsoft Copilot already deployed' },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Embedded Adoption Support',
      inLanguage: 'en-AU',
      isPartOf: { '@id': `${abs('/')}/#website` },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
    },
  ],
});
