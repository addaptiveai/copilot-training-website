import { renderPage, breadcrumbs, faqBlock, ctaBand } from '../layout.mjs';
import { abs, ORG_URL } from '../site.mjs';

const path = '/copilot-workshop';
const url = abs(path);

const crumbs = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/copilot-workshop' },
  { label: 'Copilot Workshop', path },
];

const faqs = [
  {
    q: 'Half day or full day, which should we book?',
    a: `<p>A half day suits a single team covering three or four tasks properly. A full day suits a mixed group, or a team that wants to go into Excel and document workflows in depth as well as the everyday basics.</p>
        <p>If you are unsure, we will tell you after discovery. We would rather run a half day that changes something than a full day that covers more and lands less.</p>`,
  },
  {
    q: 'Do you run a session specifically for executives?',
    a: `<p>Yes, and it is a different session. Executives are not usually the people building spreadsheets. The work is reading and reacting to material other people produced, preparing for meetings, drafting sensitive correspondence, and deciding what the organisation should let Copilot do.</p>
        <p>The executive format is shorter, usually 90 minutes to two hours, and spends more time on judgement and delegation than on features.</p>`,
  },
  {
    q: 'How many people can attend?',
    a: `<p>Up to about 20 in a room. Past that, people stop typing and start watching, which is the point at which a workshop turns into a webinar. Larger rollouts are better served by the <a href="/capability-program">Copilot Capability Program</a>, which splits people by experience level.</p>`,
  },
  {
    q: 'Can you deliver the workshop virtually?',
    a: `<p>Yes. Virtual works well for a single team in one time zone and we cap the group smaller, around 12, because it is harder to see who is stuck. In person is better for mixed groups and for anyone who needs help over their shoulder.</p>`,
  },
  {
    q: 'What do attendees need on the day?',
    a: `<p>Their own laptop, their Microsoft 365 sign-in, and an active Copilot licence or Copilot Chat access. We confirm licensing with your IT contact before the day, because the fastest way to lose a session is to discover at 9:05 that half the room cannot sign in.</p>`,
  },
  {
    q: 'Do you use our documents or generic examples?',
    a: `<p>Yours. We ask for a handful of representative files ahead of the session, a report, a client email, a deck, a messy export. Nothing confidential is required, and we will work from redacted versions if that is easier.</p>`,
  },
  {
    q: 'What happens after the workshop?',
    a: `<p>You get the exercise material and the prompts that worked for your team. Most of the useful questions arrive two or three weeks later, so teams that want those answered add <a href="/embedded-adoption-support">Embedded Adoption Support</a> or a follow-up session.</p>`,
  },
];

const body = `<section class="page-hero">
  <div class="container">
    <div class="page-hero__inner">
${breadcrumbs(crumbs)}
      <span class="label">Workshop</span>
      <h1>Copilot Workshop</h1>
      <p class="page-hero__lede">A half-day or full-day hands-on session built around your team's actual work. People leave having used Copilot on their own documents, not having watched someone else use it on a demo file.</p>
      <div class="page-hero__ctas">
        <a href="/#contact" class="btn-primary" data-track="cta_primary_click">Talk to us about a workshop</a>
        <a href="#agenda" class="btn-ghost">See a sample agenda</a>
      </div>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="overview-h">
  <div class="container">
    <div class="prose">
      <h2 id="overview-h">Who it's for</h2>
      <p>Two situations, mostly.</p>
      <p>The first is a team that has just been given Copilot and needs a proper start rather than a link to a support article. The second is a team that has had it for months, uses it for summarising the occasional email, and knows there is more there.</p>
      <p>Both get the same structure. What changes is how much time we spend on the fundamentals before moving into the work that takes real time.</p>

      <h2>What we cover</h2>
      <p>The list is deliberately short. Three or four tasks per role, agreed with you before the day, practised properly. A session that demonstrates forty features produces four that anyone remembers.</p>
    </div>

    <div class="stack" style="margin-top:36px">
      <div class="stack-item">
        <span class="stack-item__tag">Session one</span>
        <h3>How Copilot actually works, and where it goes wrong</h3>
        <p>What it can see, what it cannot, and why it will confidently give you a number that is not in the file. Fifteen minutes, and it saves weeks of people quietly deciding the tool is unreliable.</p>
      </div>
      <div class="stack-item">
        <span class="stack-item__tag">Session two</span>
        <h3>Outlook and everyday communication</h3>
        <p>Summarising long threads, drafting replies from a short instruction rather than a full brief, checking tone before something goes out. This is where scepticism usually turns, because the value is obvious immediately.</p>
      </div>
      <div class="stack-item">
        <span class="stack-item__tag">Session three</span>
        <h3>Documents and decks</h3>
        <p>Drafting from source material you point it at, rewriting the passages that are not landing, getting a rough deck structure out of a long report. Plus a clear line on where Copilot's draft stops and your judgement starts.</p>
      </div>
      <div class="stack-item">
        <span class="stack-item__tag">Session four</span>
        <h3>Excel, on your own data</h3>
        <p>Asking questions of a dataset in plain language, getting formulas written and explained, cleaning an inconsistent export into something usable. The largest time saving, and the place where verification matters most.</p>
      </div>
      <div class="stack-item">
        <span class="stack-item__tag">Close</span>
        <h3>Your three tasks</h3>
        <p>Everyone leaves with three named tasks they will use Copilot for in the next fortnight, written down. Vague intent produces no change. A short specific list produces some.</p>
      </div>
    </div>
  </div>
</section>


<section class="section section--grey" id="agenda" aria-labelledby="agenda-h">
  <div class="container">
    <div class="section-head">
      <span class="label">Format</span>
      <h2 id="agenda-h">A sample full-day agenda</h2>
    </div>

    <div class="table-wrap" style="max-width:820px">
      <table>
        <caption class="sr-only">Sample full-day Copilot Workshop agenda</caption>
        <thead>
          <tr><th scope="col">Time</th><th scope="col">Session</th></tr>
        </thead>
        <tbody>
          <tr><td>9:00</td><td>How Copilot works, what it can see, where it gets things wrong</td></tr>
          <tr><td>9:45</td><td>Outlook: threads, replies, tone</td></tr>
          <tr><td>10:45</td><td>Break</td></tr>
          <tr><td>11:00</td><td>Word and PowerPoint on your own material</td></tr>
          <tr><td>12:30</td><td>Lunch</td></tr>
          <tr><td>1:15</td><td>Excel: questions, formulas, cleaning real exports</td></tr>
          <tr><td>2:45</td><td>Break</td></tr>
          <tr><td>3:00</td><td>Checking the work: what a person must verify, and when</td></tr>
          <tr><td>3:45</td><td>Your three tasks, and what happens next</td></tr>
          <tr><td>4:30</td><td>Close</td></tr>
        </tbody>
      </table>
    </div>

    <p style="margin-top:20px;font-size:0.85rem;color:var(--grey-muted);max-width:820px">A half day runs the same shape, compressed, and usually drops either Excel or the documents session depending on what discovery shows matters most. Agendas are adjusted after discovery, so treat this as the pattern rather than a fixed timetable.</p>

    <dl class="facts" style="margin-top:36px">
      <div>
        <dt>Format</dt>
        <dd>Half day or full day</dd>
      </div>
      <div>
        <dt>Group size</dt>
        <dd>Up to 20 in person, up to 12 virtual</dd>
      </div>
      <div>
        <dt>Delivery</dt>
        <dd>In person or virtual, Australia wide</dd>
      </div>
      <div>
        <dt>Materials</dt>
        <dd>Your documents, not demo files</dd>
      </div>
    </dl>
  </div>
</section>


<section class="section" aria-labelledby="next-h">
  <div class="container">
    <div class="prose">
      <h2 id="next-h">Where a workshop is the wrong answer</h2>
      <p>If you are rolling out to several hundred people across functions with very different starting points, one workshop will not carry it. That is what the <a href="/capability-program">Copilot Capability Program</a> is for, because it separates people by experience level rather than putting a nervous first-time user next to someone already building agents.</p>
      <p>And if the problem is that adoption stalled months ago rather than that training has not happened yet, more training may not be the fix. We have written about <a href="/insights/why-teams-stop-using-copilot">why teams stop using Copilot after the licences are bought</a>, which is worth reading before booking anything.</p>
      <p>We will tell you which of these you need. Addaptive is an independent AI consultancy, not a Microsoft partner, so there is no licence revenue riding on the answer. More on the wider practice at <a href="${ORG_URL}" target="_blank" rel="noopener noreferrer" data-track="outbound_addaptive_click">addaptive.com.au</a>.</p>
    </div>
  </div>
</section>


${faqBlock(faqs, 'Workshop format and logistics')}


${ctaBand(
  'Tell us what your team is stuck on.',
  'A short conversation is usually enough to work out whether a workshop is the right shape, and which format fits.',
)}`;

export default renderPage({
  path,
  title: 'Microsoft Copilot Workshop, Half or Full Day | Addaptive',
  description:
    "A half-day or full-day hands-on Microsoft Copilot workshop built around your team's own documents. Session outline, sample agenda, group sizes and formats.",
  crumbs,
  faqs,
  body,
  nodes: [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Copilot Workshop',
      serviceType: 'Microsoft Copilot training workshop',
      description:
        "A half-day or full-day hands-on Microsoft Copilot workshop for Australian teams, delivered using the team's own documents and workflows.",
      url,
      provider: { '@id': `${abs('/')}/#organisation` },
      areaServed: { '@type': 'Country', name: 'Australia' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Australian organisations using Microsoft 365' },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Copilot Workshop',
      inLanguage: 'en-AU',
      isPartOf: { '@id': `${abs('/')}/#website` },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
    },
  ],
});
