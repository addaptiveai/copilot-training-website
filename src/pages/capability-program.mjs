import { renderPage, breadcrumbs, faqBlock, ctaBand } from '../layout.mjs';
import { abs } from '../site.mjs';

const path = '/capability-program';
const url = abs(path);

const crumbs = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/copilot-workshop' },
  { label: 'Copilot Capability Program', path },
];

const faqs = [
  {
    q: 'How do you decide which tier someone belongs in?',
    a: `<p>A short survey before the program starts, plus what discovery tells us about each function. It asks what people actually do with Copilot in a normal week, not how confident they feel, because confidence and capability come apart in both directions.</p>
        <p>People can move between tiers after the first session. It happens often enough that we plan for it.</p>`,
  },
  {
    q: 'How long does the program run?',
    a: `<p>Usually four to six weeks of sessions, then the 30-day checkpoint after the last one. The exact shape depends on how many tiers you need and how many people are in each.</p>`,
  },
  {
    q: 'What is the 30-day adoption checkpoint?',
    a: `<p>A scheduled review 30 days after the final session. We look at the tasks each team committed to, what is actually happening, where usage has dropped, and what is blocking the teams that have stalled. You get a written summary with what we recommend next.</p>
        <p>It is a deliverable, not a courtesy call. It is also the point where most programs either take hold or quietly stop, which is why it is in the scope rather than optional.</p>`,
  },
  {
    q: 'Can you train people across different offices or states?',
    a: `<p>Yes. Tiered sessions work well virtually because the groups are smaller and more homogeneous. We usually run at least the first session for each tier in person where that is practical.</p>`,
  },
  {
    q: 'Do you need our IT team involved?',
    a: `<p>Briefly, and early. We need to confirm what is actually licensed, what is enabled in the tenant, and whether Copilot can reach the SharePoint sites people expect it to. Most of the "it does not work for me" problems in week two are configuration, not training.</p>`,
  },
  {
    q: 'What does the program leave behind?',
    a: `<p>Tier-specific materials, the prompt and task library built from your own work during the sessions, the 30-day checkpoint report, and a short set of recommendations for whoever owns adoption after we leave.</p>`,
  },
];

const body = `<section class="page-hero">
  <div class="container">
    <div class="page-hero__inner">
${breadcrumbs(crumbs)}
      <span class="label">Structured Program</span>
      <h1>Copilot Capability Program</h1>
      <p class="page-hero__lede">A multi-session program that trains beginners, intermediate users and experienced staff separately, because putting them in one room means everyone gets the wrong session. Built for organisations rolling Copilot out at scale.</p>
      <div class="page-hero__ctas">
        <a href="/#contact" class="btn-primary" data-track="cta_primary_click">Talk to us about a rollout</a>
        <a href="#tiers" class="btn-ghost">See the three tracks</a>
      </div>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="why-h">
  <div class="container">
    <div class="prose">
      <h2 id="why-h">Why the tiering matters</h2>
      <p>Put 40 people of mixed ability in one Copilot session and you lose both ends of the room. The nervous ones are still finding the button while the confident ones have already stopped listening. You end up teaching to the middle, which describes no one in particular.</p>
      <p>So we split them. Same overall program, three tracks, different content and pace in each. It costs more sessions and it is the difference between a program people talk about afterwards and one they endure.</p>
    </div>
  </div>
</section>


<section class="section section--grey" id="tiers" aria-labelledby="tiers-h">
  <div class="container">
    <div class="section-head">
      <span class="label">The three tracks</span>
      <h2 id="tiers-h">What each tier actually contains</h2>
    </div>

    <div class="stack">
      <div class="stack-item">
        <span class="stack-item__tag">Tier one</span>
        <h3>Beginner: getting to a first useful result</h3>
        <p>For people who have the licence and have opened Copilot once, or not at all. The goal for this track is narrow on purpose: three tasks they do every week, done with Copilot, reliably, by the end.</p>
        <ul>
          <li>What Copilot can and cannot see, in plain terms, and why that matters before they trust an answer</li>
          <li>Outlook first: summarising threads, drafting replies from a short instruction</li>
          <li>Drafting and rewriting in Word using their own documents</li>
          <li>How to tell when an answer is wrong, and what to do about it</li>
          <li>Three named tasks to practise between sessions, reviewed at the start of the next one</li>
        </ul>
      </div>

      <div class="stack-item">
        <span class="stack-item__tag">Tier two</span>
        <h3>Intermediate: from occasional use to routine</h3>
        <p>For people using Copilot a few times a week for the obvious things, who have not moved past them. This is the largest group in most organisations and the one where the time savings actually sit.</p>
        <ul>
          <li>Excel properly: questions in plain language, formulas written and explained, cleaning inconsistent exports</li>
          <li>Working across several documents rather than one at a time</li>
          <li>Writing instructions that produce a usable result first time, rather than three rounds of correction</li>
          <li>Building the team's shared prompt and task library from the work done in session</li>
          <li>Where a person must verify, and what a sensible review step looks like for their function</li>
        </ul>
      </div>

      <div class="stack-item">
        <span class="stack-item__tag">Tier three</span>
        <h3>Experienced: workflows, agents and judgement</h3>
        <p>For confident users, often the informal Copilot champions in each team. The work here is less about features and more about designing repeatable work and deciding what is safe to hand over.</p>
        <ul>
          <li>Turning a recurring manual process into a repeatable Copilot workflow</li>
          <li>Agents: what they are useful for, what they are not, and what your tenant allows</li>
          <li>Delegation boundaries: which work runs end to end, which needs a checkpoint, who is accountable for the output</li>
          <li>What the newer agentic capability changes, covered in <a href="/insights/what-copilot-cowork-changes">what Copilot Cowork changes for teams still learning the basics</a></li>
          <li>How to support colleagues without becoming the unpaid help desk</li>
        </ul>
      </div>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="shape-h">
  <div class="container">
    <div class="section-head">
      <span class="label">How it runs</span>
      <h2 id="shape-h">Discovery, sessions, checkpoint</h2>
    </div>

    <div class="stack">
      <div class="stack-item">
        <h3>1. Discovery and tiering</h3>
        <p>We work out what each function actually does every week, what is currently licensed and enabled, and where people sit. The output is the task list per role that the whole program is then built around.</p>
      </div>
      <div class="stack-item">
        <h3>2. Tiered sessions</h3>
        <p>Each track runs its own sessions over four to six weeks, using your documents. People move tier if the first session shows they are in the wrong one.</p>
      </div>
      <div class="stack-item">
        <h3>3. Workflow integration</h3>
        <p>Tier two and three sessions end with the team's own recurring work, mapped and rebuilt. This is where a program stops being training and starts changing how something gets done.</p>
      </div>
      <div class="stack-item">
        <h3>4. The 30-day adoption checkpoint</h3>
        <p>Thirty days after the final session we review what held and what did not, function by function, against the tasks each team committed to. You get a written report with specific recommendations, including which teams need another pass and which are ready to go further.</p>
      </div>
    </div>

    <div class="note" style="margin-top:32px;max-width:820px">
      <p><strong>On rolling out at scale.</strong> Sequencing across a large organisation, choosing which function goes first, and what leadership needs to do visibly is a subject in itself. We are writing that up separately and will link it here when it publishes.</p>
    </div>
  </div>
</section>


<section class="section section--grey" aria-labelledby="fit-h">
  <div class="container">
    <div class="prose">
      <h2 id="fit-h">When this is the right program</h2>
      <p>It fits organisations rolling Copilot out to more than about 40 people, across functions that work quite differently from one another, where the licences are already paid for and the pressure is on to show something for them.</p>
      <p>If you are one team wanting a proper start, the <a href="/copilot-workshop">Copilot Workshop</a> is a better fit and considerably cheaper. If the program has already run and what you need is someone alongside the team as questions surface, that is <a href="/embedded-adoption-support">Embedded Adoption Support</a>.</p>
      <p>Before committing to any of it, <a href="/insights/copilot-paid-licence-vs-free">check what you are actually comparing between the Copilot tiers</a>. More than one organisation has paid for training on a licence it did not need yet.</p>
    </div>
  </div>
</section>


${faqBlock(faqs, 'Program questions')}


${ctaBand(
  'Rolling Copilot out to a few hundred people?',
  'Tell us how many, across which functions, and what has happened so far. We will tell you what the program would need to look like.',
)}`;

export default renderPage({
  path,
  title: 'Microsoft Copilot Capability Program | Addaptive',
  description:
    'A multi-session Microsoft Copilot program tiered by experience level, with workflow integration and a 30-day adoption checkpoint. Built for rollouts at scale.',
  crumbs,
  faqs,
  body,
  nodes: [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Copilot Capability Program',
      serviceType: 'Microsoft Copilot capability program',
      description:
        'A structured multi-session Microsoft Copilot program for Australian organisations, tiered by user experience level, including workflow integration and a 30-day adoption checkpoint.',
      url,
      provider: { '@id': `${abs('/')}/#organisation` },
      areaServed: { '@type': 'Country', name: 'Australia' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Australian organisations rolling out Microsoft Copilot at scale' },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: 'Copilot Capability Program',
      inLanguage: 'en-AU',
      isPartOf: { '@id': `${abs('/')}/#website` },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
    },
  ],
});
