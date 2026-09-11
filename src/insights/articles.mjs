/* Insights content. One entry per published article.
   Order in this array is the order shown on /insights and in the feed. */

export const articles = [
  /* ══════════════════════════════════════════════════════════════════ */
  {
    slug: 'why-teams-stop-using-copilot',
    title: 'Why teams stop using Copilot after the licences are bought',
    metaTitle: 'Why Copilot use stops after the licences are bought',
    description:
      'Copilot usage usually flatlines within weeks of a rollout. The cause is rarely resistance. It is that the rollout finished at the licence and never reached the work.',
    eyebrow: 'Adoption',
    author: 'david',
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    readTime: '6 min read',

    opening: [
      'There is a shape to this that repeats. A business buys Copilot for 80 people. Week one, the usage numbers look healthy. By week six it has settled into about a dozen regulars, and most of that dozen were already the sort of people who try new software on a Saturday.',
      'The read in the room is usually that staff are resistant, or too busy, or need more training. That has not been what I have found. The rollout finished at the licence and never reached the work.',
    ],

    takeaways: [
      'Usage falls away because no one decided what Copilot was for in each role, not because people are unwilling.',
      'A single product demo teaches the tool. It does not teach the job.',
      'The questions that matter turn up two or three weeks after the session, by which point the trainer has gone.',
      'Adoption holds when someone owns it past go-live and the work gets picked before the features do.',
    ],

    sections: [
      {
        heading: 'The pattern',
        html: `
<p>Licences get approved. IT enables them. An email goes out announcing that Copilot is now available, usually with a link to a Microsoft support page. There might be a lunchtime session.</p>
<p>Then everyone goes back to the work that was already on their desk.</p>
<p>What follows is predictable. People who were curious anyway keep using it. Everyone else opens it once, asks it something vague, gets something vague back, and quietly decides it is not for them. That decision is very hard to reverse. Six months later the renewal conversation starts with a finance question about cost per active user, and the honest answer is uncomfortable.</p>`,
      },
      {
        heading: 'Where it actually breaks',
        html: `
<h3>No one decided what it was for</h3>
<p>Copilot arrives as a capability rather than a job. That sounds like an advantage. In practice it means every person has to work out their own use case from scratch, in the middle of a week that is already full.</p>
<p>When the answer to "what should I use this for" is "anything", most people use it for nothing. The teams that get traction have three or four named tasks per role written down somewhere before the licences go live. Not twenty. Three or four, chosen because they happen every week and currently take too long.</p>

<h3>The demo was impressive and irrelevant</h3>
<p>Generic Copilot training tends to show the product at its best: summarise a meeting you were not in, draft an email to a person who does not exist, turn a document you have never read into slides.</p>
<p>Everyone nods. It looks clever. And none of it maps onto the report someone has to produce every Thursday from four spreadsheets that are formatted inconsistently, which is the task that would actually save them an afternoon.</p>
<p>Training that uses the client's own documents changes the room. People stop watching and start typing, because the example on screen is the thing sitting in their inbox.</p>

<h3>Training happened once, and the questions came later</h3>
<p>Week one questions are about buttons. Week three questions are the useful ones: why did it get this wrong, how do I stop it inventing a figure, can it see the SharePoint site, why does it work for my colleague and not for me.</p>
<p>By week three, most training engagements have finished. So the questions go unanswered, people draw their own conclusions about reliability, and usage drops.</p>

<h3>No one owned it after go-live</h3>
<p>Rollouts get a project owner. Adoption rarely does. Once the training is delivered and the invoice is paid, Copilot belongs to everyone, which means it belongs to no one in particular.</p>
<p>There is no one collecting the prompts that worked, no one deciding which team gets attention next, no one looking at the usage data and asking why finance is flat while marketing is not.</p>`,
      },
      {
        heading: 'What closes the gap',
        html: `
<p>Four things, roughly in order of how much difference they make.</p>
<p><strong>Pick the work before the features.</strong> Sit with each team and find the recurring tasks worth attacking. The output is a short list per role, written in their language, not Microsoft's. This takes a couple of hours per team and it is the part people are most tempted to skip.</p>
<p><strong>Train people in their own documents.</strong> Same session structure, different material. Bring the team's actual reports, actual client emails, actual decks. The learning transfers because there is nothing to transfer, they are already doing the job.</p>
<p><strong>Give the questions somewhere to go.</strong> A standing 45 minutes a fortnight where people bring what broke is worth more than a second full training day. It catches the week-three questions while they still matter and it surfaces the patterns worth fixing for everyone.</p>
<p><strong>Measure something a manager cares about.</strong> Licence utilisation tells you who opened the app. It does not tell you whether the Thursday report got faster. Pick two or three tasks at the start, note roughly how long they take, and check again at 30 days.</p>`,
      },
      {
        heading: 'The uncomfortable part',
        html: `
<p>Most of this is not about Copilot. It is about deciding what you want a team to do differently and then giving them enough support to actually do it, which is the same work any change takes.</p>
<p>The software has genuinely got better. The rollout method mostly has not.</p>`,
      },
    ],

    faqs: [
      {
        q: 'How long does Copilot adoption usually take to show up in the work?',
        a: '<p>Habits tend to form over weeks rather than days. We use a 30-day checkpoint because that is long enough for people to hit real problems and short enough to correct course before the team decides Copilot is not useful.</p>',
      },
      {
        q: 'Is low Copilot usage a training problem or a licensing problem?',
        a: '<p>It can be either. If your team is on an eligible Microsoft 365 plan and has never been shown that Copilot Chat is already included, that is a training problem and it costs nothing to fix. If people are hitting the limits of what they can do without work grounding, that is a licensing conversation. Our article on <a href="/insights/copilot-paid-licence-vs-free">what you are actually comparing between Copilot tiers</a> covers the difference.</p>',
      },
      {
        q: 'Do we need to retrain everyone or just the teams that have stalled?',
        a: '<p>Usually just the teams that have stalled, and usually not with the same session they had the first time. The gap is normally specific to how that team works, so the fix is specific too.</p>',
      },
    ],

    sources: [],
    related: ['embedded-adoption-support', 'capability-program'],
    relatedArticles: ['copilot-features-worth-training'],
  },

  /* ══════════════════════════════════════════════════════════════════ */
  {
    slug: 'copilot-features-worth-training',
    title: "Copilot in Excel, PowerPoint and Outlook: what's actually worth training your team on",
    metaTitle: 'Copilot features worth training your team on',
    description:
      'Copilot ships with dozens of features. Most teams use three of them badly instead of ten of them well. Here are the ones that earn the training time.',
    eyebrow: 'Training',
    author: 'mariah',
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    readTime: '7 min read',

    opening: [
      'Ask a team what Copilot does and you will usually get two answers: it writes emails, and it summarises Teams meetings. Both are real. Both are also the shallowest end of what people are paying for.',
      'The trap in the other direction is a training day that tries to cover everything. People leave with 40 features and a use for none of them. So here is the shorter list, by app, of what has been worth the training time in the sessions we run.',
    ],

    takeaways: [
      'Outlook is the best place to start because the work is short, frequent and low risk if Copilot gets it wrong.',
      'Excel gives the biggest single time saving and needs the most structure to be reliable.',
      'PowerPoint is best used to get to a rough draft fast, not to produce a finished deck.',
      'Coverage is the wrong goal. Three features used weekly beats twenty features demonstrated once.',
    ],

    sections: [
      {
        heading: 'Outlook: start here',
        html: `
<p>Outlook is where we start almost every session, for a practical reason. The tasks are small, they happen many times a day, and a bad output costs you fifteen seconds rather than a client relationship.</p>
<p>Three things earn their place:</p>
<ul>
  <li><strong>Summarising a long thread.</strong> The 40-message chain you have been added to on a Friday afternoon. This is the feature that converts sceptics, because the value is obvious in one click.</li>
  <li><strong>Drafting a reply from a short instruction.</strong> Not "write my email for me". More like "decline this, offer the week after, keep it warm". The instruction is the skill worth teaching.</li>
  <li><strong>Checking tone before it goes out.</strong> Useful for anyone who writes when they are annoyed, which is most of us.</li>
</ul>
<p>What we skip: the more elaborate scheduling and triage features. They demo well and get abandoned.</p>`,
      },
      {
        heading: 'Excel: the biggest saving, and the most setup',
        html: `
<p>Excel is where the hours are. It is also where Copilot most needs the underlying work to be tidy, and where a confidently wrong answer does the most damage.</p>
<p>Copilot in Excel can now edit the workbook directly rather than only talk about it. It will write and apply formulas across sheets, build charts and PivotTables, sort and filter, apply conditional formatting, and answer questions about what the data is doing (<a href="https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel" target="_blank" rel="noopener noreferrer">Microsoft Support</a>).</p>
<p>What we train:</p>
<ul>
  <li><strong>Asking questions about a dataset in plain language</strong> before touching a formula. This is the habit shift. Most people reach for a PivotTable out of muscle memory when a question would have been faster.</li>
  <li><strong>Getting a formula written and explained.</strong> The explanation matters more than the formula. It is how people stay able to check the work.</li>
  <li><strong>Cleaning and reshaping.</strong> Unmerging, splitting columns, making an inconsistent export usable. Unglamorous, and it is where the afternoons go.</li>
</ul>
<p>The rule we teach alongside it: Copilot does not get to be the only thing that checked a number. If a figure is going to a board, a client or the ATO, a person verifies it.</p>`,
      },
      {
        heading: 'PowerPoint: get to a rough draft, then take over',
        html: `
<p>PowerPoint generates the most excitement in a demo and the most disappointment afterwards. A deck built end to end by Copilot usually looks like a deck built end to end by Copilot.</p>
<p>Where it does earn its place is the first 60 per cent. Turning an existing document into a starting structure. Getting slides out of a long report so you can argue with the shape rather than stare at a blank file. Pulling a summary out of a deck someone else sent you.</p>
<p>We are direct about this in sessions: use it to stop staring at nothing, then do the thinking yourself. Teams that expect a finished deck stop using it within a fortnight.</p>`,
      },
      {
        heading: 'Word: fewer features than you would expect',
        html: `
<p>Word tends to get less attention than it deserves. The useful pattern is not "write this document for me". It is drafting from source material you point it at, then rewriting specific passages that are not landing.</p>
<p>For teams that produce proposals, reports or file notes from a consistent structure, this is the second biggest time saving after Excel.</p>`,
      },
      {
        heading: 'Why covering everything fails',
        html: `
<p>A full-day session can demonstrate forty features. People will remember four, and only if they used them on their own material during the session.</p>
<p>So we cut the list deliberately. Three or four tasks per role, chosen with the team before the day, practised on their actual documents. It looks like less training. It produces more change.</p>
<p>Coverage is a comfortable measure for whoever booked the training. It is a poor measure of whether anything is different in six weeks.</p>`,
      },
      {
        heading: 'Where this goes next',
        html: `
<p>All of the above is still Copilot as an assistant sitting beside one person doing one task.</p>
<p>The newer capability, where Copilot takes a multi-step job and runs it to a finished result, changes the question from "which features should my team learn" to "which work are we comfortable handing over, and who checks it". That is a team and governance question rather than a feature question, and we have written about it in <a href="/insights/what-copilot-cowork-changes">what Copilot Cowork changes for teams still learning the basics</a>.</p>
<p>The order still matters. Teams that have not made the basics routine do not get more out of the newer capability, they get more output they have not built the habit of checking.</p>`,
      },
    ],

    faqs: [
      {
        q: 'Which Microsoft 365 app should a team learn Copilot in first?',
        a: '<p>Outlook, in almost every case. The tasks are frequent and short, so people get repetitions quickly, and the cost of a poor output is low. Excel usually delivers the larger time saving but works better once people have built some judgement about when to trust the answer.</p>',
      },
      {
        q: 'How long should Copilot training be?',
        a: '<p>A half day is enough for one team to cover three or four tasks properly on their own material. A full day suits mixed groups or teams that want to go into Excel and document workflows in depth. Longer than that and retention drops. Our <a href="/copilot-workshop">Copilot Workshop</a> page sets out both formats.</p>',
      },
      {
        q: 'Can Copilot be trusted with numbers?',
        a: '<p>It can do the work, and a person still needs to check it. We train teams to treat any figure that leaves the building as requiring human verification, the same standard you would apply to a junior analyst on their first week.</p>',
      },
    ],

    sources: [
      {
        label: 'Microsoft Support: Get started with Copilot in Excel',
        href: 'https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel',
      },
    ],
    sourceChecked: '11 September 2026',
    related: ['copilot-workshop', 'capability-program'],
    relatedArticles: ['what-copilot-cowork-changes'],
  },

  /* ══════════════════════════════════════════════════════════════════ */
  {
    slug: 'what-copilot-cowork-changes',
    title: 'What Copilot Cowork changes for teams still learning the basics',
    metaTitle: 'What Microsoft Copilot Cowork changes for teams',
    description:
      'Copilot Cowork became generally available on 16 June 2026. What it does today, what is still limited to a preview, and what it means if your team is mid-rollout.',
    eyebrow: 'Product',
    author: 'david',
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    readTime: '6 min read',

    opening: [
      'Copilot Cowork is a real shift in what Microsoft 365 Copilot does, and the headlines around it are running well ahead of what most organisations can actually use today.',
      'Both things are true at once, so it is worth separating what is live, what is still in a preview program, and what either of those should change about a rollout that is only halfway through.',
    ],

    takeaways: [
      'Cowork became generally available worldwide on 16 June 2026 and runs multi-step work end to end across Microsoft 365.',
      'It needs a Microsoft 365 Copilot licence plus usage-based Copilot Credits, so cost scales with how much work you hand it.',
      'Building apps inside Cowork is a preview limited to organisations in Microsoft’s Frontier program, not a general release.',
      'If your team has not made the basics routine, Cowork produces more output to check rather than more capability.',
    ],

    sections: [
      {
        heading: 'What Cowork does today',
        html: `
<p>Microsoft announced general availability of Copilot Cowork worldwide on 16 June 2026 (<a href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available/" target="_blank" rel="noopener noreferrer">Microsoft 365 Blog</a>).</p>
<p>The difference from Copilot as most teams know it is scope. Ordinary Copilot helps with the task in front of you. Cowork takes a job that has several steps and tools in it, works through them, and hands back a finished result rather than a draft or a suggestion.</p>
<p>It works across Word, Excel, PowerPoint, Outlook, Teams and SharePoint, and Microsoft describes Work IQ as grounding each task in the systems the business already runs on. Work IQ reached general availability on the same day, and now covers Power BI reports and semantic models plus Dataverse records (<a href="https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/" target="_blank" rel="noopener noreferrer">Microsoft 365 Blog</a>).</p>
<p>The commercial model is worth understanding before anyone gets excited. Cowork requires a Microsoft 365 Copilot user subscription licence and then bills the work itself through Copilot Credits, priced by model use, context retrieval, tool calls and runtime. There is a cost management dashboard in the admin centre for budgets and monitoring. So unlike a per-seat licence, the more work you delegate, the more it costs, and that is a conversation finance should be in early.</p>`,
      },
      {
        heading: 'What is still emerging',
        html: `
<p>The capability generating most of the coverage is building apps through conversation inside Cowork and Copilot Studio. Describe what you want, refine it, test it, publish it to your colleagues.</p>
<p>That one is a preview, and it is limited to organisations enrolled in Microsoft’s Frontier program. It began rolling out to those organisations between 8 and 14 September 2026 (<a href="https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/build-apps-in-copilot-cowork-and-copilot-studio/" target="_blank" rel="noopener noreferrer">Microsoft Copilot Blog</a>). It is not generally available, and if you are not in Frontier you cannot plan around it yet.</p>
<p>We are making that point clearly because we have already sat in meetings where a leadership team believed this shipped to everyone in June. It did not. Building a business case on it right now means building on something you cannot get.</p>`,
      },
      {
        heading: 'What it means if you are still on the basics',
        html: `
<p>Here is the part that matters for most of the organisations we work with, which are somewhere between "we bought licences" and "people use it without being reminded".</p>
<p><strong>Do not wait for it.</strong> Pausing a rollout until the newer capability arrives is the most expensive option available. You keep paying for licences, the team loses momentum, and the fundamentals you would need anyway stay unbuilt.</p>
<p><strong>The fundamentals matter more, not less.</strong> Cowork returns finished work. A team that has not built the habit of checking Copilot’s output on a two-paragraph email is not ready to check a deliverable that crossed six systems. The judgement is the same skill, applied to something with more consequence.</p>
<p><strong>The real question becomes delegation.</strong> Which work is safe to hand over end to end, which needs a person at a specific checkpoint, and who is accountable when the output is wrong. That is a governance decision, and it is worth having a view on it before the capability is in everyone’s hands rather than after.</p>
<p>This is the shape of work we now spend most of our retainer time on. Not "here is another feature", but "here is what we are comfortable delegating this quarter, here is who reviews it, here is what we watch".</p>`,
      },
      {
        heading: 'A note on timing',
        html: `
<p>This part of the product moves quickly and we check these claims before each update. Everything above reflects Microsoft’s own published material as at 11 September 2026. If you are reading this some months later, treat the Frontier detail in particular as the thing most likely to have changed.</p>`,
      },
    ],

    faqs: [
      {
        q: 'Is Copilot Cowork included in a Microsoft 365 Copilot licence?',
        a: '<p>Not entirely. Microsoft states that Cowork requires a Microsoft 365 Copilot user subscription licence plus usage-based charges in Copilot Credits, priced on model use, context retrieval, tool calls and runtime. Administrators can monitor and cap spend from the Microsoft 365 admin centre.</p>',
      },
      {
        q: 'Can our organisation build apps in Copilot Cowork?',
        a: '<p>Only if you are enrolled in Microsoft’s Frontier program. App building inside Cowork and Copilot Studio is a preview experience that began rolling out to Frontier organisations in September 2026. It is not generally available.</p>',
      },
      {
        q: 'Should we delay Copilot training until Cowork is fully rolled out?',
        a: '<p>No. The judgement your team needs for Cowork, knowing when an output is wrong and what to check, is built on the everyday tasks. Waiting means paying for licences while that capability stays unbuilt.</p>',
      },
    ],

    sources: [
      {
        label: 'Microsoft 365 Blog: Copilot Cowork is now generally available (16 June 2026)',
        href: 'https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available/',
      },
      {
        label: 'Microsoft 365 Blog: Announcing the new Work IQ APIs',
        href: 'https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/',
      },
      {
        label: 'Microsoft Copilot Blog: Build business apps with Copilot Cowork and Copilot Studio',
        href: 'https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/build-apps-in-copilot-cowork-and-copilot-studio/',
      },
    ],
    sourceChecked: '11 September 2026',
    related: ['embedded-adoption-support', 'capability-program'],
    relatedArticles: ['why-teams-stop-using-copilot'],
  },

  /* ══════════════════════════════════════════════════════════════════ */
  {
    slug: 'copilot-paid-licence-vs-free',
    title: "Copilot paid licence vs free: what you're actually comparing",
    metaTitle: 'Microsoft Copilot paid licence vs free',
    description:
      'Three tiers of Copilot, and the confusion between them costs money in both directions. What the free version does, what you already have, and what the paid licence adds.',
    eyebrow: 'Licensing',
    author: 'david',
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    readTime: '6 min read',

    opening: [
      "Most people think Copilot is one thing you either have or don't. It isn't. There are three tiers, and the confusion between them is costing businesses money in both directions, some are paying for a licence they're using like the free version, others think they need to pay when they already have more than they realise.",
    ],

    takeaways: [
      'Free Copilot is grounded in the public web and knows nothing about your business.',
      'Copilot Chat is included at no extra cost with most eligible Microsoft 365 business plans, with enterprise data protection, and most teams do not know they have it.',
      'The paid licence buys automatic grounding in your organisation’s own data, in-document editing, and access to agents and Copilot Studio.',
      'Check what you already have before you buy. A licence bought too early is the most common way these sit idle.',
    ],

    sections: [
      {
        heading: 'The free version',
        html: `
<p>Free Copilot, the one anyone can open in a browser or on Windows, is grounded in the public web. It doesn't see your files, your emails, or anything inside your business. It's a capable general assistant. It is not a work tool in any meaningful sense, because it knows nothing about your work.</p>`,
      },
      {
        heading: "What you probably already have and don't know about",
        html: `
<p>Here's the one that surprises most leadership teams. If your business already runs Microsoft 365, you very likely have Copilot Chat included at no extra cost. Microsoft lists the qualifying plans as Business Basic, Business Standard, Business Premium, Apps for Business and Enterprise, E3, E5, F1, F3, and Office 365 E3 and E5 (<a href="https://www.microsoft.com/en-au/microsoft-365-copilot/pricing" target="_blank" rel="noopener noreferrer">Microsoft 365 Copilot pricing</a>).</p>
<p>This is not the fully public free version. It shows up inside Outlook and the Microsoft 365 Copilot app, you can feed it documents manually and it'll work with them, and it comes with enterprise data protection for anyone signed in with a Microsoft Entra account, with no admin action required. That protection puts your prompts and responses under the same contractual commitments Microsoft applies to your email and your SharePoint files (<a href="https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection" target="_blank" rel="noopener noreferrer">Microsoft Learn</a>).</p>
<p>Most teams don't know this exists. They assume Copilot means an extra line item, and either skip it entirely or buy the full paid licence without knowing they already had a usable starting point.</p>`,
      },
      {
        heading: 'What the paid licence actually adds',
        html: `
<p>The paid Microsoft 365 Copilot add-on, sitting on top of an eligible base licence, does three things Copilot Chat doesn't. It reads your organisation's data automatically, emails, meetings, chats, documents, without you manually feeding it anything. It edits live inside your documents rather than just chatting alongside them. And it gives you access to the premium prebuilt agents and Copilot Studio, so you can build agents suited to how your team actually works, rather than starting from scratch.</p>
<p>That's the real gap. Not "AI or no AI". Automatic access to your business's own information, versus doing the legwork yourself every time.</p>`,
      },
      {
        heading: 'What it costs',
        html: `
<p>Microsoft's own Australian pricing, as listed on 11 September 2026 and excluding GST:</p>
<div class="table-wrap">
  <table>
    <caption class="sr-only">Microsoft 365 Copilot Australian list pricing as at 11 September 2026</caption>
    <thead>
      <tr><th scope="col">Option</th><th scope="col">AUD per user per month</th><th scope="col">Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Copilot Chat</td><td>Included</td><td>With an eligible Microsoft 365 plan, no extra cost</td></tr>
      <tr><td>Microsoft 365 Copilot Business (add-on)</td><td>$26.91 paid yearly, $37.68 paid monthly</td><td>Promotional pricing on the annual rate through December 2026. Requires an eligible Microsoft 365 Business plan</td></tr>
      <tr><td>Microsoft 365 Copilot (enterprise)</td><td>$44.90 paid yearly</td><td>Requires a separate qualifying Microsoft 365 plan</td></tr>
    </tbody>
  </table>
</div>
<p>Actual pricing varies by contract type and reseller, and the Business annual rate above is promotional. Treat these as a starting point for the conversation with your Microsoft partner, not a quote.</p>`,
      },
      {
        heading: 'The actual decision',
        html: `
<p>Before spending anything, check what you've already got. If your team is on Business Premium or E3 and nobody's shown them Copilot Chat exists, that's a training problem, not a licensing one, and it's free to fix. If your team has hit the ceiling of what manual document uploads and public web grounding can do, and the friction is real, that's when the paid licence earns its cost.</p>
<p>Buying the upgrade before you've used what you already have is how licences end up sitting idle, which is exactly the pattern we see most often, and the one we wrote about in <a href="/insights/why-teams-stop-using-copilot">why teams stop using Copilot after the licences are bought</a>.</p>`,
      },
    ],

    faqs: [
      {
        q: 'Do we already have Microsoft Copilot without paying extra?',
        a: '<p>If you are on an eligible Microsoft 365 plan, you very likely have Copilot Chat at no additional cost, with enterprise data protection for users signed in with a Microsoft Entra account. It is worth confirming against your own tenant before any purchase decision.</p>',
      },
      {
        q: 'What is the difference between Copilot Chat and the paid Microsoft 365 Copilot licence?',
        a: '<p>Copilot Chat is web-grounded and works with documents you supply to it. The paid licence adds automatic grounding in your organisation’s own emails, meetings, chats and files, editing inside Word, Excel, PowerPoint and Outlook, and access to premium agents and Copilot Studio.</p>',
      },
      {
        q: 'How much does Microsoft 365 Copilot cost in Australia?',
        a: '<p>Microsoft lists the Copilot Business add-on at AU$26.91 per user per month paid yearly, a promotional rate through December 2026, or AU$37.68 paid monthly. The enterprise Microsoft 365 Copilot licence is listed at AU$44.90 per user per month paid yearly. All figures exclude GST and were checked on 11 September 2026. Contract type and reseller change what you actually pay.</p>',
      },
    ],

    sources: [
      {
        label: 'Microsoft 365 Copilot plans and pricing (Australia, business)',
        href: 'https://www.microsoft.com/en-au/microsoft-365-copilot/pricing',
      },
      {
        label: 'Microsoft 365 Copilot plans and pricing (Australia, enterprise)',
        href: 'https://www.microsoft.com/en-au/microsoft-365-copilot/pricing/enterprise',
      },
      {
        label: 'Microsoft Learn: Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat',
        href: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection',
      },
    ],
    sourceChecked: '11 September 2026',
    related: ['capability-program', 'copilot-workshop'],
    relatedArticles: ['why-teams-stop-using-copilot'],
  },
];

export const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

export function formatDate(iso) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
