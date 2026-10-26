// All page copy lives here. Facts follow deliverables/V3-BRIEF.md and research/09d-achievement-bank.md.
// ASCII hyphen only. Clients are anonymized labels; never add client, staff or partner names.

export const site = {
  url: 'https://cadi27tech.github.io',
  name: 'Adrian Capraru',
  email: 'adriancapraru27@gmail.com',
  identity: 'Builder-operator who takes AI systems from zero to production and runs them, in finance, accounting and operations.',
  title: 'Head of AI & Automation. Production AI agents for finance and accounting ops.',
  description: 'Adrian Capraru builds production AI agents and automation for finance, accounting and operations teams: evals, audit trails, human-in-the-loop, and systems the client owns. Ex-FinTech COO, founder of 3Descu.',
  links: {
    linkedin: 'https://www.linkedin.com/in/adriancapraru27',
    github: 'https://github.com/cadi27tech',
    upwork: 'https://www.upwork.com/freelancers/cadrian',
  },
};

export const mailto = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

// Hero evidence ledger: figure, what it is, where the number comes from.
export const proof = [
  { fig: '10 days', what: 'An accountancy firm\'s 20-module client SaaS, from first commit to live production.', src: 'Build log, 23 Sep to 3 Oct 2026', href: '/work/accountancy-saas-live-in-10-days/' },
  { fig: '107/107', what: 'Prepayment journals matched against a bookkeeper\'s own entries before go-live.', src: 'Validation run, live daily since 16 Oct 2026', href: '/work/xero-prepayment-journals-automation/' },
  { fig: 'x65', what: 'Factory turnover in three years, at a 57% net margin. Founded with 5 printers in an apartment.', src: 'Public filings, 2022 to 2025', href: '/work/3d-printing-factory-platform-mcp-server/' },
];

export const builds = [
  {
    h: 'Production AI agents for finance and accounting ops',
    p: 'Bills and receipts read and posted to Xero, deal-to-invoice-to-payment across legal entities, prepayment journals, credit control. Agents act only after a human confirms, and every action lands in an audit trail.',
  },
  {
    h: 'AI systems for operations',
    p: 'Daily reporting that matches the accountants cell by cell, multi-tenant platforms with tenant isolation proven by tests, EU-hosted where the data demands it. Measured against the numbers the business already trusts.',
  },
  {
    h: '0-to-1 products',
    p: 'A quoting platform, a client SaaS, an MCP server that lets AI assistants quote real parts. Built from first commit to production with AI coding agents under review, then run, not abandoned.',
  },
];

export const method = [
  { h: 'Embed', p: 'Start inside the team that does the work: their spreadsheets, their month-end, their edge cases. The process gets redesigned before anything is automated.' },
  { h: 'Ship', p: 'Small releases behind regression gates, a rehearsal on demo data, then a dry run on live data that changes nothing. Go-live happens when the system matches what the humans already produce.' },
  { h: 'Hand over the keys', p: 'Code, data and accounts sit with the client from day one. Runbooks, go-live checklists and tests stay behind, so the system outlives the engagement.' },
];

export const principles = [
  { h: 'Human-in-the-loop by design', p: 'Drafts, not postings. Approval links, review queues and confirm-first agent actions where judgement matters.' },
  { h: 'Evals and regression gates', p: 'Golden test sets, mutation-tested guards and deploy smoke tests. 3,000+ checks gate one platform; 120+ checkers gate another.' },
  { h: 'Audit trails', p: 'Writes are logged and idempotent, so a retry never doubles an invoice. Failed jobs go to a dead-letter queue, never into silence.' },
  { h: 'Client ownership', p: 'No lock-in: the client\'s own cloud accounts, repositories and credentials, with knowledge transfer built into the plan.' },
];

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
  { outlet: 'Vocea Olteniei', date: '24 Oct 2026', lang: 'RO', title: 'Regional coverage of the founder story', gloss: 'No online link found.', url: null },
];

export const upwork = {
  line: 'Top Rated on Upwork: 100% Job Success Score, 22 contracts, 12 of 12 rated contracts five stars, one client rehired four times. All work inbound.',
  quote: { text: 'Adrian is a total pro... The automation runs perfectly.', who: 'Nicolas P., Upwork client' },
};

// Case studies. Order = order on the home page.
export const work = [
  {
    slug: 'accountancy-saas-live-in-10-days',
    title: 'An accountancy firm\'s client SaaS, from first commit to live production in 10 days',
    card: 'Accountancy-firm SaaS, live in 10 days',
    summary: 'A 20-module, multi-tenant platform for an Irish chartered accountancy practice and its clients: AI bills reader, Xero posting, VAT, SEPA payments, credit control, tax deadlines and an AI assistant that acts only after confirmation.',
    fig: '10 days', figLabel: 'first commit to live production',
    facts: {
      Client: 'M.A. Whately & Co., Irish chartered accountancy practice',
      Role: 'Director of AI & Business Automation (contractor). Architect and builder, directing AI coding agents.',
      Timeline: 'First build 23 Sep 2026, live 3 Oct 2026, current scope by 21 Oct 2026',
      Status: 'Live in production, pre-revenue',
    },
    context: 'An Irish chartered accountancy practice wanted its own client platform: one place where clients send bills and receipts, see VAT and deadlines, pay suppliers and get proposals, with the practice working from the same data. Its clients were paying for separate document-capture tools, and slow quoting was costing the practice prospects.',
    problem: 'Build software a regulated profession can put its name on, fast, without an in-house engineering team. Client financial data, identity numbers and bank details are involved, so isolation, AML checks and GDPR retention had to exist from the first release, not be retrofitted.',
    constraints: [
      'EU hosting end to end: Vercel (Dublin), Supabase (eu-west-1), Resend EU, Gemini via Vertex AI in the EU.',
      'A regulated profession: AML and customer due-diligence gate, audit log, retention purge, a DPA template.',
      'No engineering team to maintain it, so the test suite and runbooks had to carry the knowledge.',
      'Unit economics that beat paid capture tools: target under one cent per document.',
    ],
    built: [
      '<strong>20 product modules</strong> (16 client-facing, 4 practice-only): bills and receipts, VAT, supplier payments, credit control, Irish tax deadlines, proposals with a fee calculator, expenses, a client portal. 53 request templates across 14 sectors.',
      '<strong>AI bills reader.</strong> Two Gemini models via Vertex AI EU reach a consensus on every field, with Claude as an opt-in fallback. VAT numbers are checked against VIES, bills post to Xero, and supplier payments export as SEPA pain.001 files.',
      '<strong>AI assistant with confirm-first actions.</strong> A tool-registry agent that runs under the user\'s own session permissions, proposes an action, and executes only after the user confirms. Per-tenant cost caps. A daily staff brief went live on 7 Oct.',
      '<strong>Security by default.</strong> Row-level tenant isolation, CSP and HSTS, masked PPS and IBAN numbers, 192-bit recipient tokens, an audit log and automatic retention purge. SSL Labs grade A.',
      '<strong>Packaging.</strong> A five-tier price ladder (Free, Essentials EUR 59, Pro EUR 129, Business EUR 249, Practice Bookkeeping EUR 149) with add-ons.',
    ],
    flow: ['Client uploads a bill or receipt', 'Two models extract every field and must agree', 'VAT number checked against VIES', 'Bill drafted in Xero for review', 'Approved payments exported as a SEPA file'],
    results: [
      { n: '10 days', l: 'from first commit (23 Sep) to live production (3 Oct 2026)' },
      { n: '20', l: 'modules live within four weeks' },
      { n: '99.8%', l: 'field accuracy of the AI bills reader (428 of 429 fields) on a 64-file synthetic test corpus; 97.6% on the browser path, up from 86.7%, with 0 silent errors' },
      { n: '< 1 cent', l: 'per document, about USD 0.009 per scan' },
      { n: '3,000+', l: 'automated checks green (3,230 with 0 failures on 17 Oct)' },
      { n: '87/87', l: 'deploy smoke test on every deploy since 6 Oct (85/85 at launch)' },
    ],
    reliability: 'Fifty backend test files and 55 browser end-to-end suites run before release; the AI assistant has its own unit and end-to-end tests (17/17, 8/8). Every deploy runs an 87-point smoke test against the live system. Accuracy on real client documents has not yet been measured; that is the next evaluation, and the synthetic corpus figure is reported as exactly that.',
    earlier: 'Same firm, alongside the SaaS: the practice\'s client-management system was rebuilt. 587 client records were migrated, a 97-field schema was cleaned with 3,172 writes and 0 failures, and dashboards went live for 10 staff and the owner. A recurring-tasks automation was held on dry run because it would have created payroll tasks for all 587 clients; after the data fix, the dry run produced 38 tasks, matching the Xero payroll clients exactly.',
    owns: [
      'The code, the Supabase project and the Vercel account, all in the firm\'s name.',
      'A handover document, deploy runbook and the full regression suite.',
      'Its pricing, packaging and module roadmap.',
    ],
    stack: ['TypeScript', 'Vercel', 'Supabase (PostgreSQL, RLS)', 'Gemini via Vertex AI EU', 'Claude', 'Xero API', 'VIES', 'SEPA pain.001', 'Resend', 'n8n'],
    links: [{ href: 'https://suite.mawhately.ie', label: 'The live platform' }],
  },
  {
    slug: '3d-printing-factory-platform-mcp-server',
    title: 'From 5 printers in an apartment to a 200+ printer factory, with its own quoting platform and MCP server',
    card: '3Descu: factory, platform and MCP server',
    summary: 'A 0-to-100 story. An EU start-up grant and 5 printers in 2022; today an ISO 9001:2015 certified company with 200+ printers, a self-built quoting platform in four languages, and one of the first manufacturing MCP servers.',
    fig: 'x65', figLabel: 'turnover in three years, 57% net margin',
    facts: {
      Company: '3Descu (TREIDESCUPRINT SRL), on-demand 3D printing for engineering buyers',
      Role: 'Founder. Strategy, production, sales, finance, and sole engineer of the software, with AI coding agents.',
      Timeline: 'Founded June 2022. Platform built June to October 2026.',
      Status: 'Operating and growing. Platform and MCP server live.',
    },
    context: 'The business plan was written during a Master\'s degree and won an EU start-up grant (about EUR 60K, ranked first among applicants). The factory started with 5 printers in a small apartment in Targu Jiu. Within a year it pivoted from consumers to engineering buyers, and it became an approved and audited production partner of one of the largest on-demand manufacturing platforms in the EU.',
    problem: 'Sell custom manufacturing to engineers across Europe from a regional town, with a team of four. That means instant, trustworthy prices from a CAD file, a checkout that works in the buyer\'s language and currency, and operations that do not need a sales team to answer every request.',
    constraints: [
      'A team of 4 including contractors, so software has to replace headcount.',
      'Prices must be right: every quote is a commitment the factory has to honour at a margin.',
      'Export-led: about half of all orders go to German-speaking markets.',
      'Customer data from five sales channels, with GDPR and marketplace contract rules on who may be contacted.',
    ],
    built: [
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
      { n: '2,000+', l: 'orders from 1,600+ buyers in 30 countries; 45% of orders ship to Germany; one in three from a returning customer' },
      { n: '4.7/5', l: 'rating from 200+ verified buyers' },
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
    summary: 'Closed deals become approved Xero invoices in the right legal entity and currency, emailed to the customer and chased automatically. Live since April 2026, 212+ invoices.',
    fig: '3 entities', figLabel: '4 currencies, live since April 2026',
    facts: {
      Client: 'Multi-entity B2B software reseller (US, UK and EU companies)',
      Role: 'Architect and builder. Direct engagement.',
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
    summary: 'A self-hosted, multi-tenant platform in the Netherlands that turns Exact Online ledgers into board-ready reporting for education organisations, with tenant isolation proven by tests.',
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
      'Self-hosted in the Netherlands, on infrastructure the client controls.',
      'Strict tenant isolation, enforced in the database rather than the application.',
      'Sign-in with the organisations\' existing Microsoft accounts.',
      'Fixed budgets per phase.',
    ],
    built: [
      '<strong>Self-hosted core</strong> on a Dutch VPS with Docker Compose: Supabase (PostgreSQL with row-level security), n8n, Caddy for TLS, encrypted off-site backups and encrypted secrets.',
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
      Client: 'Multi-country hospitality group',
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
      '<strong>Follow-on work</strong> for the same group: guest e-invoicing in Romania across 3 legal entities and 3 invoice series with multiple VAT rates, including a WhatsApp AI agent that looks up the stay and returns the PDF invoice.',
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
