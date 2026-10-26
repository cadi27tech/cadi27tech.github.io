// All page copy lives here. Facts follow deliverables/V3-BRIEF.md and research/09d-achievement-bank.md.
// ASCII hyphen only. Clients are anonymized labels; never add client, staff or partner names.

export const site = {
  url: 'https://cadi27tech.github.io',
  name: 'Adrian Capraru',
  email: 'adriancapraru27@gmail.com',
  hook: 'Most AI projects in finance die between the demo and the audit. Adrian builds the ones that survive both.',
  identity: 'Head of AI & Automation who takes AI systems for finance and accounting from first commit to production, then runs them, with the controls a regulator and a finance director expect.',
  title: 'Head of AI & Automation. Finance AI from first commit to production.',
  description: 'Adrian Capraru, Head of AI & Automation: built an Irish accountancy firm\'s AI service line from zero, led a regulated FinTech through its EU licence audit as COO, and grew a factory from 5 to 200+ printers. Clients and customers in 32+ countries on four continents.',
  links: {
    linkedin: 'https://www.linkedin.com/in/adriancapraru27',
    github: 'https://github.com/cadi27tech',
    upwork: 'https://www.upwork.com/freelancers/cadrian',
  },
};

export const mailto = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

// Hero evidence ledger: figure, what it is, where the number comes from.
export const proof = [
  { fig: '10 days', what: 'An Irish accountancy firm\'s 20-module client platform, first commit to live production, inside an AI service line Adrian built from zero.', src: 'Build log, 23 Sep to 3 Oct 2026', href: '/work/accountancy-saas-live-in-10-days/' },
  { fig: 'Mar 2024', what: 'EU crowdfunding (ECSP) licence for the platform Adrian ran as COO, with him as lead on the authorisation and audit.', src: 'ASF register: Romania\'s 4th ECSP licence', href: '/work/eu-crowdfunding-licence-asf-authorisation/' },
  { fig: 'x65', what: 'Factory turnover in three years, at a 57% net margin and no outside equity. Founded with 5 printers in an apartment.', src: 'Public filings, 2022 to 2025', href: '/work/3d-printing-factory-platform-mcp-server/' },
  { fig: '32+', what: 'Countries with clients and customers, on four continents. Factory buyers in 26 of the 27 EU member states.', src: 'Order ledger and client contracts', href: '/about/' },
];

// Capability sheets, ordered by research/09a (asked in 2026 postings) and 09b (demand 2027-2031).
// when: 'now' = asked in today's best-paid postings, 'rising' = demand and budgets growing to 2030.
export const builds = [
  {
    icon: 'line', when: 'now',
    h: 'AI service lines, built from zero',
    p: 'An Irish chartered accountancy firm offered no AI when Adrian joined. A year later it has its own client platform, a trained team, an AI Academy, published fee packages and automation clients of its own in Ireland, the UK and the US.',
    proof: 'Client platform live in 10 days, 20 modules, fee packages published',
    keep: 'An AI practice with its own offer, team and pricing',
  },
  {
    icon: 'money', when: 'now',
    h: 'Finance automation that moves real money',
    p: 'Bills read and posted to Xero, deal-to-invoice-to-payment across three legal entities and four currencies, month-end journals matched 107 of 107 against the bookkeeper. Every write carries an approval, an audit trail and an idempotency key.',
    proof: 'About 52 invoices a month under signed approvals, live since April 2026',
    keep: 'Live workflows in your ledger, with approvals and a runbook',
  },
  {
    icon: 'shield', when: 'rising',
    h: 'Governed autonomy, safe by design',
    p: 'Controls live in the software, not in a policy document. Agents read freely, draft for review and write to a ledger only after a human approves. EU-only AI processing enforced in code, an AML gate before any client account opens. The same discipline that took a FinTech through its EU licence audit.',
    proof: 'Romania\'s 4th ECSP crowdfunding licence, with Adrian as lead on the audit',
    keep: 'Controls a regulator or auditor can read and test',
  },
  {
    icon: 'evals', when: 'rising',
    h: 'Evals, observability and audit trails',
    p: 'Nothing ships on a good demo. Golden test sets, mutation-tested guards and regression gates decide when a release goes out, and every action leaves a logged, idempotent trail, so a retry never doubles an invoice.',
    proof: '3,000+ checks gate one platform; 120+ checkers and about 260K assertions gate another',
    keep: 'The eval suite and the logs, so quality stays measurable after handover',
  },
  {
    icon: 'lock', when: 'rising',
    h: 'Security for agents and client data',
    p: 'Hard tenant walls and nothing exposed that a job does not need. Postgres row-level security, masked PPS and IBAN numbers, CSP and HSTS, a retention purge, data processing agreements raised early and sign-in tested before anyone logs in.',
    proof: '52 of 52 sign-in tests and 5 of 5 row-level security mutation tests on a Dutch pilot design',
    keep: 'A security model backed by tests, not promises',
  },
  {
    icon: 'mcp', when: 'rising',
    h: 'Built for machine customers',
    p: 'AI assistants are starting to buy on behalf of people. Adrian shipped one of the first manufacturing MCP servers, so ChatGPT and Claude can quote real parts: 4 tools, keyless, rate-limited, prices calibrated on measured parts.',
    proof: 'Listed in the official MCP Registry, 18 Oct 2026',
    keep: 'A storefront that AI agents can read, quote and buy from',
  },
  {
    icon: 'data', when: 'now',
    h: 'Data foundations agents can trust',
    p: 'An agent is only as good as the records under it. Client lists rebuilt, ledgers reconciled against the books the business already trusts and duplicates made impossible, before any agent is allowed to act on them.',
    proof: '587 clients rebuilt in 3,172 writes with 0 failures; a Xero audit joined 749 invoices and surfaced 391 unbilled clients',
    keep: 'Clean, reconciled data the next system can build on',
  },
  {
    icon: 'people', when: 'now',
    h: 'Adoption that sticks',
    p: 'Software changes nothing until people use it. Teams trained with live demos, an AI Academy, per-person dashboards and a daily staff brief, so the workflow changes, not just the tooling.',
    proof: 'AI for Accountants session for the full team (10+ people); Academy of 8 lessons and 48 prompts',
    keep: 'A trained team and the material to train the next hire',
  },
  {
    icon: 'key', when: 'rising',
    h: 'Built to hand over',
    p: 'Fixed scope with acceptance tests, then a handover where the client owns the code, the data and the runbooks from day one. No lock-in, no black box and nobody waiting on the builder to come back.',
    proof: 'Every engagement closes with a runbook, a deploy procedure and the full regression suite',
    keep: 'Code, data, accounts and runbooks in your name',
  },
  {
    icon: 'gear', when: 'now', wide: true,
    h: 'Operations run from 0 to 100',
    p: 'The builder has also run the operation. A factory founded with an EU start-up grant and 5 printers, grown to 200+ printers with a hired and trained team, SOPs and ISO 9001:2015 certification, selling into 26 of the 27 EU member states. Before that, COO of a regulated FinTech through its licence.',
    proof: 'x65 turnover in three years at a 57% net margin, no outside equity',
    keep: 'An operator who knows what the system has to survive on a Monday morning',
  },
];

export const method = [
  { h: 'Understand the process first', p: 'Work starts inside the team that does it: their spreadsheets, their month-end, their edge cases. The process is redesigned before anything is automated, and scope is fixed with acceptance tests.' },
  { h: 'Ship behind gates', p: 'Small releases behind evals and regression gates, a rehearsal on demo data, then a dry run on live data that changes nothing. One dry run turned 587 would-be payroll tasks into exactly 38 before a single one was created.' },
  { h: 'Hand over the keys', p: 'Code, data and accounts sit with the client from day one. Runbooks, tests and a trained team stay behind, so the system outlives the engagement.' },
];

export const principles = [
  { h: 'Numbers computed, words generated', p: 'Figures come from deterministic code; AI writes the words around them. A fee, a VAT amount or a filing deadline is never a model guess.' },
  { h: 'People approve what needs judgement', p: 'Agents act; people sign off wherever money, customers or a client ledger are involved. Drafts not postings, signed approval links, confirm-first assistant actions.' },
  { h: 'Evals and regression gates', p: 'Golden test sets, mutation-tested guards and deploy smoke tests. 3,000+ checks gate one platform; 120+ checkers and about 260K assertions gate another.' },
  { h: 'A trail an auditor can follow', p: 'Every action is logged and idempotent, so a retry never doubles an invoice. Failed jobs land in a queue a person reviews, never in silence.' },
];

// Home "Blueprint to production" drawing: the accountancy platform's bills workflow. Every figure is from the case study below.
export const pipeline = {
  h: 'Blueprint to production',
  intro: 'One workflow from the accountancy platform, drawn the way it runs: from the bill a client uploads to the entry an auditor can follow.',
  live: 'Live since 3 Oct 2026',
  steps: [
    { h: 'Bill in', p: 'A client uploads a bill or receipt to the firm\'s platform.', n: '< 1 cent', l: 'per document, about USD 0.009 per scan' },
    { h: 'AI reader', p: 'Two EU-hosted models extract every field and must agree.', n: '99.8%', l: 'field accuracy, 428 of 429 fields, on a 64-file synthetic test corpus' },
    { h: 'Checks', p: 'VAT number checked against VIES. An AML gate keeps a client account blocked until identity is verified.', n: '0', l: 'silent errors on the browser path' },
    { h: 'Human approval', p: 'The bill is drafted in Xero for review. Drafts, not postings: a person signs off.', n: 'Drafts', l: 'not postings, wherever money moves' },
    { h: 'Posted to Xero', p: 'Approved bills post to Xero; supplier payments export as SEPA pain.001 files.', n: '87/87', l: 'deploy smoke test on every deploy since 6 Oct' },
    { h: 'Audit trail', p: 'Every action is logged and idempotent, so a retry never doubles an invoice. Failed jobs land in a queue a person reviews.', n: '3,000+', l: 'automated checks green' },
  ],
};

// Press: only articles with a verified URL get a link (research/05-press-awards-proof.md).
export const press = [
  { outlet: 'Profit.ro', date: '21 Oct 2026', lang: 'RO', title: 'Fabrica pornita intr-un apartament cu 5 imprimante de un tanar intors acasa a ajuns la afaceri de circa 1 milion lei', gloss: 'The original founder story: a factory started in an apartment with 5 printers, now near RON 1 million in turnover.', url: 'https://www.profit.ro/povesti-cu-profit/foto-fabrica-pornita-intr-un-apartament-cu-5-imprimante-de-un-tanar-intors-acasa-a-ajuns-la-afaceri-de-circa-1-milion-lei-toata-lumea-se-astepta-sa-plec-22863423' },
  { outlet: 'Observator News', date: '21 Oct 2026', lang: 'RO', title: 'Afacerea pornita de la zero de un tanar din Gorj, intr-un apartament, a ajuns la aproape un milion de lei', gloss: 'National economic desk (Antena 1) on the business built from zero in Gorj.', url: 'https://observatornews.ro/economic/afacerea-pornita-de-la-zero-de-un-tanar-din-gorj-intrun-apartament-a-ajuns-la-aproape-un-milion-de-lei-669802.html' },
  { outlet: 'Click!', date: '21 Oct 2026', lang: 'RO', title: 'De la un apartament din Gorj, la o afacere de aproape un milion de lei', gloss: 'National coverage of the same story.', url: 'https://click.ro/actualitate/national/de-la-un-apartament-din-gorj-la-o-afacere-de-2565445.html' },
  { outlet: 'Gorjul Azi', date: '21 Oct 2026', lang: 'RO', title: 'Povestea de succes a unui gorjean: Adrian Capraru a pornit cu 5 imprimante 3D si a construit o fabrica ce produce pentru toata Europa', gloss: 'The fullest founder portrait: studies, FinTech career, the EU grant.', url: 'https://gorjulazi.ro/2026/10/21/povestea-de-succes-a-unui-gorjean-adrian-capraru-a-pornit-cu-5-imprimante-3d-si-a-construit-o-fabrica-ce-produce-pentru-toata-europa-foto.html' },
  { outlet: 'Romania Journal', date: '21 Oct 2026', lang: 'EN', title: 'Romanian Factory 3Descu Opens Its 3D Printing Quotes To AI Assistants', gloss: 'The MCP launch: real factory quotes inside AI assistants.', url: 'https://www.romaniajournal.ro/business/companies/romanian-factory-3descu-opens-its-3d-printing-quotes-to-ai-assistants/' },
  { outlet: '3Druck.com', date: '22 Oct 2026', lang: 'EN, DE, FR', title: '3Descu integrates KI-based pricing calculations for 3D printing into ChatGPT and Claude', gloss: 'German 3D-printing trade press on the AI quoting integration.', url: 'https://3druck.com/en/programs/3descu-integrates-ki-based-pricing-calculations-for-3d-printing-into-chatgpt-and-claude-02164231/' },
  { outlet: 'Gorjeanul', date: '23 Oct 2026', lang: 'RO', title: 'Fabrica din Targu Jiu care produce piese pentru diferite utilaje cu ajutorul Inteligentei Artificiale', gloss: 'Regional feature on the factory and its AI quoting.', url: 'https://www.gorjeanul.ro/actualitate/fabrica-din-targu-jiu-care-produce-piese-pentru-diferite-utilaje-cu-ajutorul-inteligentei-artificiale-antreprenorul-a-demarat-afacerea-cand-era-student/' },
  { outlet: '3D Printing Industry', date: '24 Oct 2026', lang: 'EN', title: '3Descu enables 3D printing quotes through ChatGPT and Claude', gloss: 'International trade press on the MCP quoting channel.', url: 'https://3dprintingindustry.com/news/3descu-enables-3d-printing-quotes-through-chatgpt-and-claude-255887/' },
  { outlet: 'AS in Gorj', date: '25 Oct 2026', lang: 'RO', title: 'Afacere de succes, pornita la Targu Jiu de tanarul Adrian Capraru', gloss: 'Regional coverage of the founder story and the AI quoting launch.', url: 'https://www.asingorj.ro/afacere-de-succes-pornita-la-targu-jiu-de-tanarul-adrian-capraru/' },
  { outlet: 'Vocea Olteniei', date: '24 Oct 2026', lang: 'RO', title: 'Adrian Căpraru, antreprenorul din Gorj care transformă imprimarea 3D într-o afacere europeană', gloss: 'Regional profile: the entrepreneur from Gorj turning 3D printing into a European business.', url: 'https://www.vocea-olteniei.ro/2026/10/24/adrian-capraru-antreprenorul-din-gorj-care-transforma-imprimarea-3d-intr-o-afacere-europeana/' },
];

export const upwork = {
  line: 'Top Rated on Upwork: 100% Job Success, 22 contracts for clients across Europe, the US and Australia, 12 of 12 rated contracts five stars, one client hired four times. All work inbound.',
  quote: { text: 'Adrian is a total pro... The automation runs perfectly.', who: 'Nicolas P., Upwork client' },
};

// /cv long form: one "0 to 100" arc per role in resume.json (keyed by resume.json work[].name).
// where = context line; start = mandate and starting point; built = what was built, in order; result = where it stands now;
// goals = [goal area, result] chips; team = people and leadership; safe = regulated and safe practice.
// Sources: V3-BRIEF s3/3b/3c, master-profile.md, research/09d and 09g, deliverables/v4-*.md. Studio results are company results.
export const cvArcs = {
  'M.A. Whately & Co.': {
    where: 'Irish chartered accountancy and audit firm. Contract, remote.',
    start: "AI was not a service the firm offered: no client platform, no AI training for staff, no automation offer for its own clients. Hired as the sole owner of AI, reporting to the principal, with scoping, pricing, build, training and support in one seat.",
    built: [
      'Dec 2025: first deliverable, an AI maturity assessment funnel for lead generation (12-node n8n workflow, AI scoring, a four-email nurture).',
      'Rebuilt practice management for 587 client records and 10 staff plus the owner: a 97-field schema audited, 3,172 writes with 0 failures, per-person dashboards, Xero invoicing, payment tracking and credit control at 7, 14, 30 and 60 days.',
      "Client delivery under the firm's brand: HubSpot-to-Xero invoicing across 3 legal entities and 4 currencies (live since April 2026), a SEPA payment-file converter sold as a monthly subscription, a co-op's first automated settlement cycle, and Xero prepayment journals for a tour operator (live since 16 Oct 2026).",
      '23 Sep to 3 Oct 2026: the M.A. Whately Suite, from first commit to live production in 10 days, then 20 modules in four weeks, hosted in the EU (Vercel Dublin, Supabase eu-west-1, Resend EU).',
      "Oct 2026: the firm's website split into Accounting and AI & Automation (353 claims fact-checked, 81 of 81 pages clean), the AI Academy live (8 lessons, 48 prompts), the AI for Accountants session for the full team, and fee packages published.",
    ],
    result: 'Within a year the firm went from no AI offer to its own live client platform, a trained team, an AI Academy, published fee packages and automation clients of its own in Ireland, the UK and the US.',
    goals: [['Time to production', '10 days, first commit to live'], ['Platform scope', '20 modules in 4 weeks'], ['Quality gate', '3,000+ automated checks'], ['Bills accuracy', '99.8% on a synthetic corpus'], ['Unit cost', 'under 1 cent per document'], ['Data migration', '3,172 writes, 0 failures'], ['Month-end match', '107 of 107 journals'], ['Adoption', 'full team of 10+ trained']],
    team: [
      'Sole owner of AI at the firm, reporting to the principal; partners bring client scenarios, and he designs, prices and hands over a proposal-ready brief.',
      'Trained the full team (10+ people) in an AI for Accountants session with live demos; adoption backed by the AI Academy, per-person dashboards and a daily staff brief.',
      'Runs parallel AI coding agents as the delivery team, each workstream behind review and test gates before deploy.',
    ],
    safe: [
      "EU-only AI processing enforced in code: bills run on Vertex AI's EU endpoint with data caching disabled; the US model is an opt-in fallback only.",
      'An AML due-diligence gate keeps a client account blocked until the identity check is verified; IBAN confirmation is admin-only and audited by database trigger, and SEPA files are built only from confirmed IBANs.',
      'Tenant isolation (Postgres RLS), CSP and HSTS, masked PPS and IBAN numbers, an audit log and a retention purge.',
      'Irish statute as software: Revenue deadlines (PAYE, RCT, VAT, Form 46G, LPT, Form 11), CRO audit-exemption tests, late-payment interest, Irish bank holidays.',
      "A governance rule in writing: compute the number deterministically, compose the words with AI. Applied to the firm's fee engine.",
    ],
  },
  'Independent practice (Upwork)': {
    where: 'Upwork and direct clients in Europe, the US and Australia. Remote.',
    start: 'December 2025: a new profile with no track record on the platform and small fixed-price n8n jobs, the first at USD 50. UI/UX design work since 2022; AI and automation engineering since 2025.',
    built: [
      'Small n8n automations first, each delivered with documentation and a handover.',
      'AI builds next: a WhatsApp AI sales assistant for a Spanish tour operator, synced to HubSpot and refined on real conversations (rehired); an AI video ad pipeline (the client came back for three more contracts); a self-improving LLM pipeline that migrates safety-critical PLC code for a Danish industrial-automation team (five stars plus a bonus).',
      'Then finance and regulated work: daily revenue reporting for a five-hotel group in Spain and Romania, extended to Romanian e-Factura guest invoicing, and an EU-sovereign multi-tenant financial reporting platform for the Dutch education sector.',
      'The same controls on every build: human approval before any write to a ledger or an ad budget, audit logs, and tests against the figures the client already trusts.',
    ],
    result: 'Top Rated with a 100% Job Success Score within a year: 22 contracts, 12 of 12 rated contracts five stars, USD 13K+ in 12 months, one client hired four times, all inbound or repeat.',
    goals: [['Job Success', '100%'], ['Status', 'Top Rated'], ['Contracts', '22'], ['Rated five-star', '12 of 12'], ['Earnings', 'USD 13K+ in 12 months'], ['Repeat work', 'one client hired 4 times'], ['Pipeline', 'all inbound or repeat'], ['Budget', 'each Dutch phase at or under']],
    team: [
      'Owns each engagement alone, from discovery and fixed-price scoping to build and handover.',
      'Designed the Dutch pilot across three organisation types (a bookkeeping firm, an audit firm and school boards); both firms approved, and the follow-on module was won at a fixed price.',
      "Wrote a security overview for the pilot firms' IT and security teams.",
    ],
    safe: [
      'No US-owned service anywhere in the Dutch stack: self-hosted Supabase and n8n, Microsoft Entra ID sign-in, tokens encrypted at rest, encrypted off-site backups, and human approval before any write to Exact Online.',
      'Raised the need for a data processing agreement with each participating firm before the pilot, before anyone asked.',
      'Tenant isolation proven by tests: 52 of 52 sign-in end-to-end tests pass and 5 of 5 RLS mutation tests are caught.',
      'Every AI-built ad campaign is created paused, so a person approves it before any budget is spent; the PLC pipeline is regression-locked so it can never break a passing test.',
    ],
  },
  '3Descu (TREIDESCUPRINT SRL)': {
    where: 'On-demand 3D printing manufacturer, Targu Jiu, Romania. Founder, 100% founder-owned.',
    start: "2022: a business plan written for a Master's in Entrepreneurship, an EU start-up grant (the plan ranked first, about EUR 60K, non-repayable) and 5 printers in an apartment in Targu Jiu. No outside equity.",
    built: [
      'Jun 2022: registered the company and started production on 5 printers in the apartment.',
      'Within a year: moved from consumers to engineering buyers, and became an approved production partner of one of the largest on-demand manufacturing platforms in the EU.',
      '2023 to 2024: hired and trained the team on site and remotely, wrote the SOPs and the ISO 9001 audit documentation, and moved production into a dedicated hall (2024). 3Descu is an ISO 9001:2015 certified company.',
      'Scaled the fleet past 200 printers and built an export business: buyers in 26 of the 27 EU member states, 45% of orders shipping to Germany.',
      "Jun to Oct 2026: wrote all of the company's software alone with AI coding agents: an instant-quote to fulfilment platform in four languages (929 commits, ~400 merged pull requests, 38 edge functions, 120+ release checkers running ~260K assertions per run), a customer ledger unifying 5 sales channels (1,863 records reconciled to within EUR 1), e-Factura invoicing with EU VAT reverse charge, and a EUR 0 per month social publishing agent.",
      '18 Oct 2026: one of the first manufacturing MCP servers, listed in the official MCP Registry (io.github.cadi27tech/3descu-quote), on Glama and in 4 community directories through merged pull requests. Engineers get a real factory price inside ChatGPT or Claude.',
      '21 to 25 Oct 2026: a zero-budget press launch, 10 articles in national, regional and international trade press within a week.',
    ],
    result: 'A 200+ printer factory in its own production hall, selling into 26 of the 27 EU member states. Turnover x65 in three years to about EUR 190K in 2025, up 75% year on year, at a 57% net margin (public filings). 2,000+ orders from 1,600+ buyers in 30 countries, one in three orders from a returning customer, rated 4.7/5 by 200+ verified buyers, and 1st in Gorj county in 3 Topul Firmelor 2026 categories.',
    goals: [['Turnover', 'x65 in 3 years'], ['2025 turnover', 'about EUR 190K'], ['Net margin', '57%'], ['Growth', '+75% year on year'], ['Capacity', '5 to 200+ printers'], ['Orders', '2,000+'], ['Buyers', '1,600+'], ['Countries', '30, incl. 26 of 27 EU'], ['Germany', '45% of orders'], ['Loyalty', '1 in 3 orders repeat'], ['Rating', '4.7/5 from 200+ buyers'], ['Quality', 'ISO 9001:2015 certified'], ['Funding', 'EU grant, plan ranked 1st'], ['Press', '10 articles, EUR 0 ads']],
    team: [
      'Runs strategy, P&L, pricing, production and sales.',
      'Hired and trained the staff, on site and digitally, with the SOPs and the ISO 9001 audit documentation he wrote. A team of 4 including contractors, plus external production, logistics, certification and creative partners.',
      'Hands-on across FDM and SLA production, 3D modelling, the full 3D workflow and design for manufacturing.',
      'Directs parallel AI coding agents behind tests and review gates as the software team.',
    ],
    safe: [
      'ISO 9001:2015 certified company, with documented SOPs.',
      'GDPR and contract rules enforced in code: marketplace-sourced customer records are held suppression-only.',
      'e-Factura invoicing with EU VAT reverse charge for VIES-valid business buyers.',
      'Every release passes 120+ checkers; public claims (counts, ratings, press) are checked by scripts for drift against the source data.',
      'The MCP server is keyless and rate-limited, with prices calibrated on measured parts.',
    ],
  },
  Systemartis: {
    where: 'AI systems studio, Bucharest. Co-founder, team of 4.',
    start: '2023: a new studio built on one observation: most AI projects sold to 10 to 500 person companies stall after the pilot. The studio set out to own the hard middle: backend, integrations, guardrails, observability and handover.',
    built: [
      'Co-founded the studio and took the automation practice: process discovery, solution design, and the agents, workflows and code that run in production.',
      'A delivery model: fixed scope and acceptance tests, human approval wherever money or customers are involved, and a handover where the client owns the code, the data and the runbooks.',
      'Studio work: an operational brain for the studio itself, a fleet of agents (qualifier, router, summariser, scheduler) on its own orchestrator with retries, human checkpoints and a full audit log.',
      'Studio work: an AI voice receptionist for an independent French garage, booking into the live calendar during the call.',
      'Studio work: pricing intelligence for a multi-country marketplace seller (Innovium, a related party): competitor monitoring, auditable rules-based repricing and dashboards.',
      'Mar 2026: published The Shift to Agentic: Why Basic Chatbots Are Dead on the studio blog.',
    ],
    result: 'A four-person studio with clients on four continents. Studio results: 70% of founder decisions handled or pre-routed, 20+ hours a week reclaimed and 99.9% availability over six months; every inbound call at the garage answered; marketplace sales up 40% in the year after the pricing layer, nine spreadsheets retired.',
    goals: [['Studio', '4 people'], ['Reach', 'clients on four continents'], ['Founder decisions', '70% handled or pre-routed'], ['Time', '20+ hours a week reclaimed'], ['Availability', '99.9% over 6 months'], ['Pricing case', '+40% sales in a year']],
    team: [
      'Co-founder in a four-person team (founder and principal architect, head of operations, software engineer); leads the automation practice.',
      'Works with client teams from process discovery to handover, so the agents become an operating asset the client runs.',
    ],
    safe: [
      "Human checkpoints and a full audit log in the studio's agent fleet.",
      'Garage receptionist: double-booking blocked at database level and call transcripts purged after 30 days.',
      'Repricing runs on auditable rules, not on unchecked model output.',
    ],
  },
  Innovium: {
    where: 'Own consumer-products brand (INNOTRADE HUB23 SRL), Romania. Founder.',
    start: 'October 2023: a newly registered company with no products, no brand and no revenue (RON 0 in 2023, public filings).',
    built: [
      'May 2024: filed the INNOVIUM EU trademark, now registered in 9 classes.',
      'Launched 66+ products under the brand on eMAG.',
      'Ran the business lean on automation: courier labels, ANAF e-invoicing and order flows built in n8n.',
      'With Systemartis (a related party), added a pricing intelligence layer: competitor monitoring, auditable repricing and dashboards that replaced nine spreadsheets.',
    ],
    result: 'About EUR 50K revenue in 2025 and profitable in its second trading year (public filings); marketplace sales up 40% in the year after the pricing layer.',
    goals: [['Revenue 2025', 'about EUR 50K'], ['Profit', 'profitable in year 2'], ['Brand', 'EU trademark, 9 classes'], ['Catalogue', '66+ products'], ['Sales', '+40% after repricing']],
    safe: ['Romanian e-invoicing (ANAF e-Factura) automated in the order flow.'],
  },
  HighCrowd: {
    where: 'EU-regulated real-estate crowdfunding platform for retail investors, Bucharest.',
    start: 'October 2022: a platform with a product and no licence, in a regulated market. Joined as COO to take it from start-up to licensed operator.',
    built: [
      "Took the lead on the authorisation process and audit with the ASF, Romania's financial regulator, and owned the operations behind it.",
      'Prepared the authorisation file: penetration testing, the architecture review and the policy set the regulator examines (risk, complaints handling, conflicts of interest, business continuity, outsourcing).',
      'Automated KYC and AML onboarding on LemonWay under PSD2: identity checks, bank linking and segregated fund flows.',
      'Built the investor-protection flows ECSP requires: an entry knowledge test, a loss-bearing simulation, key investment information sheets and the reflection period.',
      'Built the operating system behind a regulated product: approval flows, exception handling, investor support and regulatory reporting.',
    ],
    result: "EU crowdfunding (ECSP) licence granted by the ASF in March 2024: Romania's fourth, and the second for real estate. Onboarding cut from about 45 to 8 minutes per investor (internal measure), seven-figure investor funding placed through the platform during his tenure, and every investor check documented and ready for inspection.",
    goals: [['Licence', 'ECSP, March 2024'], ['Ranking', "Romania's 4th ECSP licence"], ['Real estate', '2nd ECSP licence in the sector'], ['Onboarding', 'about 45 to 8 min'], ['Funding', 'seven-figure, placed'], ['Tenure', '3 years as COO']],
    team: [
      'Led and mentored a cross-functional, distributed team.',
      'Coordinated product, engineering, legal counsel, the payment partner and technology providers.',
      'Set the KPIs and the operating cadence the company ran on.',
    ],
    safe: [
      'Penetration testing and an architecture review with the regulator before authorisation.',
      'Segregated investor fund flows through a licensed payment partner, under PSD2.',
      'Every investor check documented and ready for inspection.',
    ],
  },
  InRento: {
    where: 'Licensed buy-to-let crowdfunding platform. Remote.',
    start: 'October 2021: joined as Head of Community, months before the EvoEstate-InRento merger was announced in February 2022. Two investor bases had to become one without losing their trust.',
    built: [
      'Planned and ran the phased investor migration across email, community and support, with account migration kept separate from feature changes so no investor was stranded mid-move.',
      'Persona-based investor segmentation for marketing.',
      'Investor lifecycle processes in the CRM: onboarding, support and retention.',
      'User interviews turned into roadmap input with MoSCoW and impact-effort scoring.',
      'The platform explainer video and the education content behind investor acquisition; represented the platform on the Banii Vorbesc podcast (2022).',
    ],
    result: 'One investor base of 12,000+ after the 2022 merger; segmentation that helped cut marketing cost 30% quarter on quarter; an explainer video at 14K+ views. Context: InRento was named Investment Tech of the Year at the Europe FinTech Awards 2022 (a company award).',
    goals: [['Investor base', '12,000+ after the merger'], ['Marketing cost', '-30% quarter on quarter'], ['Explainer video', '14K+ views']],
  },
  EvoEstate: {
    where: 'Pan-European real-estate crowdfunding aggregator. Remote.',
    start: 'March 2020: joined as Community Manager, bringing the 2,200+ member P2P investing community he had founded.',
    built: [
      'Grew the investor community and social channels with education content and platform updates; ran investor onboarding, support and CRM processes.',
      'Turned investor questions into roadmap input, which led to the product role.',
      'Nov 2020: promoted to Product Manager; owned the roadmap, prioritised from investor data, feedback and business metrics.',
      'Owned and improved the secondary market, where investors trade positions before maturity; ran release cycles with engineering from idea to launch and managed the catalogue CMS across partner platforms.',
      'Wrote the SOPs for critical processes and produced the platform explainer video.',
    ],
    result: 'Product Manager within 8 months at an aggregator serving 6,700 investors with EUR 4M+ invested (company figures); SOPs that cut onboarding time for new hires; an explainer video at 25K+ views.',
    goals: [['Promotion', 'CM to PM in 8 months'], ['Investors served', '6,700'], ['Invested', 'EUR 4M+'], ['Explainer video', '25K+ views'], ['Community', '2,200+ members brought in']],
    team: ['The link between investors, engineering, marketing and operations: what investors asked for became features the team could ship.'],
  },
};

// /cv "Achievements & recognition": real items only (V3-BRIEF s3, s3c; 09d s1d, s7, s9). Company awards are labelled as context.
export const recognition = [
  { tag: 'Ranking', when: '2026', h: '1st in Gorj county in 3 Topul Firmelor 2026 categories', p: '3Descu, in the ListaFirme rankings built from filed 2025 accounts (professional and design services), plus 2nd in a fourth.' },
  { tag: 'Grant', when: '2022', h: 'EU start-up grant, business plan ranked first', p: "About EUR 60K, non-repayable, won with a business plan he wrote for his Master's. It founded 3Descu." },
  { tag: 'Licence', when: 'Mar 2024', h: 'EU crowdfunding (ECSP) licence', p: "Lead on the ASF authorisation and audit at HighCrowd. Romania's 4th ECSP licence, the 2nd for real estate.", url: 'https://data.asfromania.ro/registru/lista.php?sect=5801&lng=1', link: 'ASF register' },
  { tag: 'Upwork', when: '2026', h: 'Top Rated, 100% Job Success', p: '22 contracts, 12 of 12 rated contracts five stars, one client hired four times, all inbound or repeat.', url: 'https://www.upwork.com/freelancers/cadrian', link: 'Upwork profile' },
  { tag: 'Press', when: 'Oct 2026', h: '10 articles in one week, zero ad spend', p: 'National, regional and international trade press on 3Descu and its AI quoting launch. Every article is listed below.', url: '/press/', link: 'Press page' },
  { tag: 'Podcast', when: '2019, 2022', h: 'Three-time guest on Banii Vorbesc', p: "One of Romania's best-known personal-finance podcasts: two episodes in 2019 and one in 2022, for InRento.", url: 'https://youtu.be/vhrEKRjJdzo', link: 'Episode' },
  { tag: 'Talk', when: '10+ people', h: 'AI for Accountants, full-team session', p: 'Delivered with live demos to the full team (10+ people) of an Irish chartered accountancy firm, backed by an 8-lesson AI Academy.' },
  { tag: 'Course', when: 'Co-author', h: '17-lesson course on P2P and real-estate crowdfunding', p: 'A Romanian online course for retail investors, co-authored.', url: 'https://laurentiumihai.ro/curs-investitii-peer-to-peer-real-estate-crowdfunding/', link: 'Course page' },
  { tag: 'Guide', when: 'Dec 2019', h: '70+ page P2P investing guide', p: 'A free guide to P2P investing, co-authored.' },
  { tag: 'Community', when: 'Founder', h: 'A 2,200+ member P2P investing community', p: 'Founded and ran it, then brought it to EvoEstate in 2020.' },
  { tag: 'Context', when: '2022', h: 'Investment Tech of the Year 2022 (company award)', p: 'Won by InRento at the Europe FinTech Awards while he was its Head of Community. A company award, listed as context.', url: 'https://fintechawardseurope.com/2022-winners', link: 'Winners list' },
];

// Case studies. Order = order on the home page.
export const work = [
  {
    slug: 'accountancy-saas-live-in-10-days',
    title: 'An Irish accountancy firm\'s AI & Automation service line, built from zero, with its client platform live in 10 days',
    card: 'Accountancy firm: AI service line from zero, platform live in 10 days',
    summary: 'An Irish chartered accountancy and audit firm offered no AI. Adrian built the service line and runs it: a 20-module client platform live in 10 days, EU-only AI processing enforced in code, an AML gate, Irish statute as software, and AI training for the whole firm.',
    fig: '10 days', figLabel: 'first commit to live production',
    facts: {
      Client: 'M.A. Whately & Co., Irish chartered accountancy and audit firm',
      Role: 'Director of AI & Business Automation (contractor). Sole owner of AI at the firm, reporting to the principal: scoping, pricing, build, training and support.',
      Timeline: 'Service line from October 2025. Platform: first build 23 Sep 2026, live 3 Oct 2026, current scope by 21 Oct 2026',
      Status: 'Live in production, pre-revenue',
    },
    context: 'When Adrian joined, AI was not a service the firm offered. A year later it has its own client platform, a trained team, an AI Academy, published fee packages and automation clients of its own in Ireland, the UK and the US. The flagship is the platform: one place where clients send bills and receipts, see VAT and deadlines, pay suppliers and receive proposals, with the practice working from the same data. Its clients had been paying for separate document-capture tools, and slow quoting was costing the practice prospects.',
    problem: 'Build software a regulated profession can put its name on, fast, without an in-house engineering team. Client financial data, identity numbers and bank details are involved, so data residency, tenant isolation, AML checks and GDPR retention had to exist from the first release, not be retrofitted.',
    constraints: [
      'EU data residency enforced in code, not in policy: Vercel (Dublin), Supabase (eu-west-1), Resend EU, Gemini via Vertex AI in the EU with data caching disabled. A US model is an opt-in fallback only, so client documents never leave the EU silently.',
      'A regulated profession: AML and customer due-diligence gate, audit log, retention purge, a DPA template.',
      'No engineering team to maintain it, so the test suite and runbooks had to carry the knowledge.',
      'Unit economics that beat paid capture tools: target under one cent per document.',
    ],
    built: [
      '<strong>20 product modules</strong> (16 client-facing, 4 practice-only): bills and receipts, VAT, supplier payments, credit control, Irish tax deadlines, proposals with a fee calculator, expenses, a client portal. 53 request templates across 14 sectors.',
      '<strong>AI bills reader.</strong> Two Gemini models via Vertex AI EU reach a consensus on every field, with Claude as an opt-in fallback. VAT numbers are checked against VIES, bills post to Xero, and supplier payments export as SEPA pain.001 files.',
      '<strong>Irish statute as software.</strong> Revenue deadlines for PAYE, RCT, VAT, Form 46G, LPT and Form 11, CRO audit-exemption tests (S.I. 301/2024), statutory late-payment interest and Irish bank holidays, encoded as rules and covered by tests.',
      '<strong>An AML gate.</strong> Client account set-up stays blocked until the identity check is verified. IBAN confirmations are admin-only, stamped and audited by a database trigger.',
      '<strong>AI assistant with confirm-first actions.</strong> A tool-registry agent that runs under the user\'s own session permissions, proposes an action, and executes only after the user confirms. Per-tenant cost caps. A daily staff brief went live on 7 Oct.',
      '<strong>Numbers computed, words generated.</strong> The fee engine computes every figure deterministically and lets AI compose only the wording, a rule written down with reference to model non-determinism and Irish DPC guidance.',
      '<strong>Security by default.</strong> Row-level tenant isolation, CSP and HSTS, masked PPS and IBAN numbers, 192-bit recipient tokens, an audit log and automatic retention purge. SSL Labs grade A.',
      '<strong>A service the firm can sell.</strong> A five-tier price ladder (Free, Essentials EUR 59, Pro EUR 129, Business EUR 249, Practice Bookkeeping EUR 149) with add-ons, and an AI for Accountants session that trained the full team (10+ people) with live demos, backed by an AI Academy of 8 lessons and 48 prompts.',
    ],
    flow: ['Client uploads a bill or receipt', 'Two EU-hosted models extract every field and must agree', 'VAT number checked against VIES', 'Bill drafted in Xero for review', 'Approved payments exported as a SEPA file'],
    results: [
      { n: '10 days', l: 'from first commit (23 Sep) to live production (3 Oct 2026)' },
      { n: '20', l: 'modules live within four weeks' },
      { n: '99.8%', l: 'field accuracy of the AI bills reader (428 of 429 fields) on a 64-file synthetic test corpus; 97.6% on the browser path, up from 86.7%, with 0 silent errors' },
      { n: '< 1 cent', l: 'per document, about USD 0.009 per scan' },
      { n: '3,000+', l: 'automated checks green (3,230 with 0 failures on 17 Oct)' },
      { n: '87/87', l: 'deploy smoke test on every deploy since 6 Oct (85/85 at launch)' },
      { n: '10+', l: 'people trained: the full firm team, in an AI for Accountants session with live demos' },
    ],
    reliability: 'Fifty backend test files and 55 browser end-to-end suites run before release; the AI assistant has its own unit and end-to-end tests (17/17, 8/8). Every deploy runs an 87-point smoke test against the live system. Accuracy on real client documents has not yet been measured; that is the next evaluation, and the synthetic corpus figure is reported as exactly that.',
    earlier: 'Running the practice, alongside the platform: client management was rebuilt for 587 clients and 10 staff, with a 97-field schema cleaned in 3,172 writes and 0 failures. A Xero audit joined 749 sales invoices to the client records and surfaced 391 clients with no billing in 12 months. A recurring-tasks automation was held on dry run because it would have created payroll tasks for all 587 clients; after the data fix, the dry run produced exactly 38, one per payroll client in Xero.',
    owns: [
      'The code, the Supabase project and the Vercel account, all in the firm\'s name.',
      'A handover document, deploy runbook and the full regression suite.',
      'Its pricing, packaging and module roadmap, and a team trained to sell and use it.',
    ],
    stack: ['TypeScript', 'Vercel', 'Supabase (PostgreSQL, RLS)', 'Gemini via Vertex AI EU', 'Claude', 'Xero API', 'VIES', 'SEPA pain.001', 'Resend', 'n8n'],
    links: [{ href: 'https://suite.mawhately.ie', label: 'The live platform' }],
  },
  {
    slug: 'eu-crowdfunding-licence-asf-authorisation',
    title: 'Leading a real-estate crowdfunding platform through its EU licence audit, as COO',
    card: 'HighCrowd: EU crowdfunding licence, as COO',
    summary: 'Three years as COO of a regulated real-estate crowdfunding platform. Adrian was the lead on the authorisation and audit with the ASF, built automated KYC and AML onboarding and the investor-protection flows, and the platform received its EU crowdfunding (ECSP) licence in March 2024.',
    fig: 'Mar 2024', figLabel: 'ECSP licence granted by the ASF',
    facts: {
      Company: 'HighCrowd, real-estate crowdfunding platform for retail investors',
      Role: 'Chief Operations Officer. Lead on the authorisation process with the ASF, Romania\'s financial regulator, and owner of the operations behind it.',
      Timeline: 'October 2022 to October 2025. Licence granted March 2024.',
      Status: 'Licensed ECSP operator',
    },
    context: 'HighCrowd lets retail investors fund real-estate projects in a regulated market. When Adrian joined as COO, it had a product and no licence. Under the EU crowdfunding regulation (ECSP), the platform needed an authorisation from the national regulator, and that authorisation ran through operations: the processes, the controls and the evidence behind them.',
    problem: 'Turn a start-up into a licensed operator while the business kept running: produce the authorisation file the regulator examines, pass its audit, and run investor onboarding and fund flows that hold up under inspection.',
    constraints: [
      'The regulator examines evidence, not intentions: every policy needed a working process behind it.',
      'Retail investors, so the ECSP investor-protection rules apply to every account, from the entry test to the reflection period.',
      'Investor money moves only through segregated flows at a licensed payment partner, under PSD2.',
      'A distributed team, with product, engineering, legal counsel, the payment partner and technology providers all on the critical path.',
    ],
    built: [
      '<strong>The ASF authorisation file and audit.</strong> Penetration testing, the architecture review and the policy set the regulator examines: risk, complaints handling, conflicts of interest, business continuity and outsourcing.',
      '<strong>Automated KYC and AML onboarding</strong> on LemonWay under PSD2: identity checks, bank linking and segregated fund flows, cutting onboarding from about 45 to 8 minutes per investor (internal measure).',
      '<strong>The investor-protection flows ECSP requires</strong>: an entry knowledge test, a loss-bearing simulation, key investment information sheets and the reflection period.',
      '<strong>The operating system behind a regulated product</strong>: approval flows, exception handling, investor support and regulatory reporting, with the KPIs and operating cadence the company ran on.',
    ],
    flow: ['Investor registers', 'Identity and AML checks at the payment partner', 'Entry knowledge test and loss-bearing simulation', 'Key investment information sheet and reflection period', 'Investment through segregated fund flows'],
    results: [
      { n: 'Mar 2024', l: 'EU crowdfunding (ECSP) licence granted by the ASF: Romania\'s fourth, and only the second for real estate' },
      { n: '45 to 8', l: 'minutes per investor to onboard, after the KYC and AML automation (internal measure)' },
      { n: '3 years', l: 'as COO, with seven-figure investor funding placed through the platform during that tenure' },
    ],
    reliability: 'Every investor check was documented and kept ready for inspection. The policy set was written to match how the platform actually ran, so the audit tested real processes rather than paperwork. Regulators ask for evidence, not intentions, and the AI systems Adrian builds today carry the same habits: written controls, audit trails, human sign-off and documentation that survives an inspection.',
    ownsH: 'Leadership',
    owns: [
      'Led and mentored a cross-functional, distributed team.',
      'Coordinated product, engineering, legal counsel, the payment partner and technology providers through the authorisation.',
      'Set the KPIs and operating cadence the company ran on.',
    ],
    stack: ['ECSP, Regulation (EU) 2020/1503', 'LemonWay (PSD2)', 'KYC and AML', 'Penetration testing', 'Policy set and regulatory reporting'],
    links: [],
  },
  {
    slug: '3d-printing-factory-platform-mcp-server',
    title: 'From 5 printers in an apartment to a 200+ printer factory selling into 26 of the 27 EU member states',
    card: '3Descu: factory, platform and MCP server',
    summary: 'A 0-to-100 story. An EU start-up grant and 5 printers in 2022; today an ISO 9001:2015 certified company with 200+ printers, buyers in 26 of the 27 EU member states, a 57% net margin with no outside equity, its own quoting platform in four languages, and one of the first manufacturing MCP servers.',
    fig: 'x65', figLabel: 'turnover in three years, 57% net margin',
    facts: {
      Company: '3Descu (TREIDESCUPRINT SRL), on-demand 3D printing for engineering buyers',
      Role: 'Founder. Strategy, P&L, pricing, production and sales. Hired and trained the team. Sole engineer of the software, with AI coding agents.',
      Timeline: 'Founded June 2022. Platform built June to October 2026.',
      Status: 'Operating and growing. Platform and MCP server live.',
    },
    context: 'The business plan was written for a Master\'s in Entrepreneurship and won an EU start-up grant (about EUR 60K, ranked first among applicants). The factory started with 5 printers in a small apartment in Targu Jiu. Within a year it pivoted from consumers to engineering buyers, and it became an approved and audited production partner of one of the largest on-demand manufacturing platforms in the EU.',
    problem: 'Sell custom manufacturing to engineers across Europe from a regional town, with a team of four. That means instant, trustworthy prices from a CAD file, a checkout that works in the buyer\'s language and currency, and operations that do not need a sales team to answer every request.',
    constraints: [
      'A team of 4 including contractors, so software has to replace headcount.',
      'Prices must be right: every quote is a commitment the factory has to honour at a margin.',
      'Export-led: about half of all orders go to German-speaking markets.',
      'Customer data from five sales channels, with GDPR and marketplace contract rules on who may be contacted.',
    ],
    built: [
      '<strong>The team and the operation.</strong> Adrian hired and trained the staff, on site and remotely, and wrote the SOPs and the ISO 9001 audit documentation. He is hands-on with every step: FDM and SLA production, 3D modelling and design for manufacturing.',
      '<strong>Instant quoting platform</strong> (quote.3descu.com): upload a 3D file, get mesh analysis in the browser (watertight check, volume, bounding box), a price in under a minute, payment by card, bank or PayPal, PDF offers, a customer portal and an admin back office. English, German, French and Dutch.',
      '<strong>An MCP server</strong> so AI assistants such as ChatGPT and Claude can quote real parts: 4 tools, keyless, rate-limited, prices calibrated on measured parts. Listed in the official MCP Registry as io.github.cadi27tech/3descu-quote, on Glama, and in 4 community directories through merged pull requests.',
      '<strong>A release gate</strong> of 120+ automated checkers running about 260K assertions on every release, with mutation-tested guards so a checker that stops catching errors is itself caught.',
      '<strong>A EUR 0 per month social publisher</strong> on GitHub Actions (public repo) that posts a full quarter\'s calendar on schedule: 45 published, 3 missed, and missed posts are never backfilled.',
      '<strong>A unified customer ledger</strong>: five sales channels merged into one audited ledger reconciled to within EUR 1, with GDPR and contract suppression rules enforced in code.',
    ],
    flow: ['Engineer uploads a CAD file, or asks an AI assistant', 'Mesh analysed in the browser', 'Price from the calibrated pricing engine', 'Payment and order confirmation', 'Production, shipping and portal tracking'],
    results: [
      { n: '5 to 200+', l: 'printers, from an apartment (2022) to a dedicated production hall' },
      { n: 'x65', l: 'turnover in three years, about EUR 190K in 2025, up 75% year on year, at a 57% net margin (public filings)' },
      { n: '2,000+', l: 'orders from 1,600+ buyers in 30 countries, including 26 of the 27 EU member states; 45% of orders ship to Germany; one in three from a returning customer' },
      { n: '4.7/5', l: 'rating from 200+ verified B2B buyers' },
      { n: '~400', l: 'merged pull requests and 929 commits in under five months, solo, with 38 edge functions' },
      { n: '10', l: 'press articles within a week of the AI quoting launch, at zero ad spend' },
    ],
    reliability: 'Every release passes 120+ checkers and about 260K assertions. Public claims (counts, ratings, press) are checked by scripts for drift against the source data. 3Descu is an ISO 9001:2015 certified company and ranks 1st in Gorj county in three ListaFirme Topul Firmelor 2026 categories (professional and design services), based on filed accounts.',
    owns: [
      'Everything: code in its own repository, its own Supabase and Stripe accounts, no agency in the loop.',
      'A public MCP server and a public social-publishing agent that others can inspect.',
    ],
    stack: ['React', 'TypeScript', 'Supabase (PostgreSQL, Edge Functions)', 'Stripe', 'Model Context Protocol', 'GitHub Actions', 'Meta Graph API'],
    links: [
      { href: 'https://quote.3descu.com', label: 'The quoting platform' },
      { href: 'https://registry.modelcontextprotocol.io/v0/servers?search=3descu', label: 'MCP Registry entry' },
      { href: 'https://github.com/cadi27tech/3descu-social-agent', label: 'Social publishing agent (GitHub)' },
      { href: '/press/', label: 'Press coverage' },
    ],
  },
  {
    slug: 'hubspot-to-xero-multi-entity-invoicing',
    title: 'HubSpot to Xero invoicing across 3 legal entities and 4 currencies',
    card: 'HubSpot to Xero, multi-entity invoicing',
    summary: 'Automation that moves real money: closed deals become approved Xero invoices in the right legal entity and currency, emailed to the customer and chased until paid. Live since April 2026, about 52 invoices a month under signed approvals.',
    fig: '3 entities', figLabel: '4 currencies, live since April 2026',
    facts: {
      Client: 'Multi-entity B2B software reseller (US, UK and EU companies), delivered through M.A. Whately & Co.',
      Role: 'Architect and builder',
      Timeline: 'Designed February 2026, live 15 April 2026, hardening release 15 September 2026',
      Status: 'Live in production',
    },
    context: 'A software reseller trades through three legal entities in the US, the UK and the EU, each with its own Xero organisation. Sales run in HubSpot. Customer payments had been collected through the CRM\'s own payments product, with fees on every invoice.',
    problem: 'Turn every Closed Won deal into a correct draft invoice in the right Xero organisation and currency, route it through finance approval, email the customer without landing in spam, and chase payment, without anyone re-keying a deal.',
    constraints: [
      'Three ledgers, four currencies, different account codes per entity.',
      'Finance must approve every invoice before a customer sees it.',
      'Deals with several invoices are normal, so duplicates must be impossible, not just unlikely.',
      'A clear scope rule agreed with the business: only Closed Won deals with a HubSpot invoice attached.',
    ],
    built: [
      '<strong>Eight n8n workflows, 119 nodes</strong>: a router, a deal-bundle fetcher, a transformer, a Xero draft creator, an approval watcher, payment reminders, a retry queue and a global error handler.',
      '<strong>Signed approvals.</strong> Finance approves through HMAC-signed links; the watcher verifies the signature before anything is sent.',
      '<strong>Idempotency and a dead-letter queue.</strong> State lives in Supabase, every write is keyed, and failed jobs retry up to five times before landing in a queue a human reviews.',
      '<strong>Customer email via the company\'s own mailbox</strong> rather than the ledger\'s mailer, to stay out of spam folders. Reminders at 7 days before, on the due date, and 14 days overdue.',
    ],
    flow: ['Deal marked Closed Won in HubSpot', 'Routed to the right legal entity and currency', 'Draft invoice created in that Xero organisation', 'Finance approves through a signed link', 'Customer emailed, then reminded until paid'],
    results: [
      { n: '212+', l: 'invoices processed by September 2026 (about 52 a month)' },
      { n: '3', l: 'Xero organisations and 4 currencies from one CRM' },
      { n: '9', l: 'bugs found and fixed in a pre-launch audit (2 critical), plus 18 edge cases covered and a 15-item go-live checklist' },
      { n: 'USD 4-7K', l: 'estimated payment fees avoided in the first five months (estimate; rates not independently verified)' },
    ],
    reliability: 'A 49-assertion test harness shipped with the September hardening release. In production, a wrong EU revenue account code that had been in place since go-live was found and corrected, with about EUR 42K flagged for reclassification. A proposed bulk void list of about USD 20.8K was held back because it was unsafe: the system flags, a human decides.',
    owns: [
      'The workflows, the state database and the credentials, in the client\'s own accounts.',
      'A runbook, the deploy procedure, the go-live checklist and the test harness.',
    ],
    stack: ['n8n', 'HubSpot API', 'Xero API (3 tenants, OAuth2)', 'Supabase (PostgreSQL)', 'HMAC webhooks', 'Microsoft Outlook'],
    links: [],
  },
  {
    slug: 'eu-sovereign-financial-reporting-platform',
    title: 'An EU-sovereign, multi-tenant financial reporting platform for the education sector',
    card: 'EU-sovereign financial reporting platform',
    summary: 'An EU-sovereign financial reporting platform with no US-owned service in the stack: self-hosted in the Netherlands, Microsoft sign-in, Exact Online ledgers turned into board-ready reports for education organisations, and tenant isolation proven by tests.',
    fig: '5/5', figLabel: 'isolation policies caught by mutation tests',
    facts: {
      Client: 'Dutch education-sector finance platform',
      Role: 'Architect and builder. Hourly and fixed-price phases.',
      Timeline: 'Infrastructure from August 2026, reporting checked live 16 October 2026, collaboration workspace in build',
      Status: 'Reporting checked live on demo data; next module in build',
    },
    context: 'A Dutch client serving education organisations needed a platform to replace manual reporting: profit and loss, balance sheet and cash flow from each organisation\'s ledger, explained in plain language for board members who are not accountants.',
    problem: 'Many organisations on one platform, each seeing only its own numbers, with infrastructure that stays in the EU and under the client\'s control. A data leak between tenants would end the product.',
    constraints: [
      'Self-hosted in the Netherlands, on infrastructure the client controls, with no US-owned service anywhere in the stack.',
      'Strict tenant isolation, enforced in the database rather than the application.',
      'Sign-in with the organisations\' existing Microsoft accounts.',
      'Fixed budgets per phase.',
    ],
    built: [
      '<strong>A regulated pilot, designed up front.</strong> Adrian designed the pilot across three organisation types (a bookkeeping firm, an audit firm and school boards), raised the need for a data processing agreement per firm before anyone asked, and wrote the security brief for their IT teams. Both firms approved.',
      '<strong>Self-hosted core</strong> on a Dutch VPS with Docker Compose: Supabase (PostgreSQL with row-level security), n8n, Caddy for TLS, encrypted off-site backups, ledger tokens encrypted at rest and secrets kept encrypted.',
      '<strong>Microsoft Entra ID single sign-on</strong> bridged into the database\'s own session tokens, so the isolation rules apply to every query.',
      '<strong>Exact Online sync</strong> (read-only) on a schedule, and a report builder driven by the client\'s own chart-of-accounts workbook, so finance stays the source of truth for structure.',
      '<strong>Reporting</strong>: profit and loss, balance sheet and cash flow with drill-down to ledger transactions, per-tenant branding, and a plain-language AI explainer clearly labelled as beta.',
    ],
    flow: ['Ledger data read from Exact Online', 'Synced into each tenant\'s isolated space', 'Structured by the client\'s chart-of-accounts workbook', 'Reports with drill-down to transactions', 'Plain-language explanation for the board'],
    results: [
      { n: '52/52', l: 'sign-in end-to-end tests, including link reuse, expiry, replay and a five-strike lockout' },
      { n: '5/5', l: 'row-level security policies caught when deliberately broken (mutation tests)' },
      { n: '19.0 h', l: 'for the infrastructure phase, inside its 15 to 22 hour band' },
      { n: '16.0 h', l: 'fixed price for the reporting phase against a 22.5 hour estimate' },
    ],
    reliability: 'Twenty-six migrations and 16 SQL test files, including cross-tenant leak tests that try to read another tenant\'s rows and must fail. Production lessons are written down as they happen (137 so far), so the next engineer inherits them. Each phase came in at or under budget, and the next module was won at a fixed price.',
    owns: [
      'The servers, the database and the backups, in its own EU accounts.',
      'The architecture document, migrations, test suites and the numbered lessons log.',
    ],
    stack: ['Next.js 15', 'Supabase (self-hosted PostgreSQL, RLS)', 'n8n (self-hosted)', 'Docker Compose', 'Caddy', 'Microsoft Entra ID', 'Exact Online API'],
    links: [],
  },
  {
    slug: 'xero-prepayment-journals-automation',
    title: 'Xero prepayment journals for a tour operator, validated 107/107 against the bookkeeper',
    card: 'Tour-operator Xero prepayments, 107/107',
    summary: 'Supplier bills read, coded and moved from prepayments to expense by arrival month, as draft journals the bookkeeper approves. Matched the bookkeeper\'s own entries 107 of 107 before go-live.',
    fig: '107/107', figLabel: 'match against the bookkeeper\'s manual entries',
    facts: {
      Client: 'Irish tour operator, delivered through M.A. Whately & Co.',
      Role: 'Architect and builder',
      Timeline: 'Rehearsed on the Xero demo company, live 16 October 2026',
      Status: 'Live, running every morning',
    },
    context: 'A tour operator pays accommodation suppliers in advance. Each month the bookkeeper typed references and descriptions onto supplier bills by hand and split VAT across several rates, then moved prepaid costs to expense according to each tour\'s arrival month.',
    problem: 'Automate the coding and the month-end prepayment journals without ever posting something the bookkeeper would not have posted. A wrong journal in a client\'s ledger is worse than no automation.',
    constraints: [
      '59 suppliers with different invoice layouts and multiple VAT rates (Irish and UK).',
      'Nothing posts without the bookkeeper: journals stay in draft until approved.',
      'Releases must be impossible to run twice for the same month.',
    ],
    built: [
      '<strong>Layout-free bill reading</strong> that validates its own arithmetic against the VAT table on the bill before it trusts a figure.',
      '<strong>A Xero sync</strong> that writes references and descriptions onto matching unpaid bills, and maintains a running draft journal moving prepayments to expense by arrival month.',
      '<strong>A review list</strong> for anything uncertain, and an email to the bookkeeper whenever a run fails.',
      '<strong>A month-end release</strong> with a guard against double release, scheduled on GitHub Actions every morning with the ledger credentials encrypted in secrets.',
    ],
    flow: ['Supplier bill arrives in Xero', 'Fields read and VAT arithmetic checked', 'Reference and description written to the bill', 'Draft prepayment journal updated by arrival month', 'Bookkeeper reviews and posts at month end'],
    results: [
      { n: '107/107', l: 'match against the bookkeeper\'s own entries on the comparison set, before go-live' },
      { n: '271', l: 'bills scanned in the live dry run with nothing changed' },
      { n: '10/10', l: 'daily production runs green in the first ten days' },
    ],
    reliability: 'The system was rehearsed on the Xero demo company, compared field by field against the bookkeeper\'s manual work, then dry-run on the live ledger with writes disabled. Only then did it go live. Uncertain cases go to a review list instead of a guess.',
    owns: [
      'The repository, the schedule and the encrypted credentials.',
      'A runbook and a rehearsal log the bookkeeper and the firm can follow.',
    ],
    stack: ['Python 3.12', 'Xero Accounting API (OAuth2)', 'GitHub Actions', 'pypdf'],
    links: [],
  },
  {
    slug: 'hotel-group-daily-revenue-reporting',
    title: 'Daily revenue reporting for a 5-hotel group, matched to the accountants cell by cell',
    card: '5-hotel daily revenue reporting',
    summary: 'Six daily reports for five hotels, built from the property-management and point-of-sale exports and matched to the accounting team\'s own figures, cell by cell, for every hotel.',
    fig: '5 hotels', figLabel: 'matched to accounting, cell by cell',
    facts: {
      Client: 'Hospitality group operating in Spain and Romania',
      Role: 'Architect and builder. Largest Upwork contract.',
      Timeline: 'March to April 2026',
      Status: 'Delivered, with a cloud pipeline for daily runs',
    },
    context: 'A hospitality group with five properties and about 388 rooms produced its daily revenue reports by hand, combining exports from its property-management and point-of-sale systems into the accounting team\'s templates.',
    problem: 'Produce the six daily reports automatically, and make them match what the accountants would have produced, down to each cell. A report that is close is not a report finance can use.',
    constraints: [
      'Different systems are the source of truth for different lines, and the accountants decide which.',
      'Internal and voucher entries must be excluded, or revenue is overstated.',
      'Source documents sometimes arrive late or not at all.',
    ],
    built: [
      '<strong>Source rules agreed with the accountants</strong> line by line: which export feeds each row, what is excluded, and which values they still fill by hand.',
      '<strong>Report generation</strong> into the accounting team\'s existing templates, so nothing about their workflow changed except the typing.',
      '<strong>A cloud pipeline</strong>: exports arrive by email, an n8n flow hands them to a Cloud Run job, outputs land in Cloud Storage. Missing documents trigger an alert, and a manual upload resumes the run.',
      '<strong>Follow-on work</strong> for the same group: guest e-invoicing extended from Spain to Romania (e-Factura), across 3 legal entities and 3 invoice series with multiple VAT rates, including a WhatsApp AI agent that looks up the stay and returns the PDF invoice.',
    ],
    flow: ['Property and point-of-sale exports arrive by email', 'Pipeline checks every expected document is present', 'Source rules applied row by row', 'Reports written into the accounting templates', 'Accountants review; missing inputs raise an alert'],
    results: [
      { n: '5/5', l: 'hotels matched to the accounting team\'s figures cell by cell (27 to 29 March 2026)' },
      { n: '100%', l: 'point-of-sale match on three test days' },
      { n: '2', l: 'errors found in the existing manual process' },
      { n: '6', l: 'reports a day for about 388 rooms' },
    ],
    reliability: 'Acceptance was the accountants\' own numbers, not a sample check: every cell for every hotel had to match before the reports were trusted. The pipeline never fills a gap with a guess; a missing source document stops the run and asks for it.',
    owns: [
      'The templates, the documented source rules and the pipeline in its own cloud account.',
    ],
    stack: ['Python', 'n8n', 'Google Cloud Run', 'Google Cloud Storage', 'Gmail API', 'Excel templates'],
    links: [],
  },
];
