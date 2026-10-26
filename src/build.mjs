// Zero-dependency static build: node src/build.mjs -> dist/
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, mailto, proof, builds, method, principles, press, upwork, work } from './content.mjs';

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = join(SRC, '..', 'dist');
const resume = JSON.parse(readFileSync(join(SRC, 'resume.json'), 'utf8'));
const UPDATED = resume.meta.lastModified;
const HAS_PDF = existsSync(join(SRC, 'static', 'cv.pdf'));

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const abs = (p) => site.url + p;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (d) => { if (!d) return 'present'; const [y, m] = d.split('-'); return m ? `${MONTHS[+m - 1]} ${y}` : y; };

const tick = '<svg class="tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const NAV = [['/work/', 'Work'], ['/about/', 'About'], ['/press/', 'Press'], ['/cv/', 'CV'], ['/contact/', 'Contact']];

const person = {
  '@type': 'Person',
  '@id': abs('/#person'),
  name: site.name,
  url: abs('/'),
  email: `mailto:${site.email}`,
  jobTitle: 'Head of AI & Automation',
  description: site.identity,
  image: abs('/og/default.png'),
  sameAs: [site.links.linkedin, site.links.github, site.links.upwork, 'https://systemartis.com/about-us', 'https://3descu.com'],
  worksFor: [
    { '@type': 'Organization', name: 'M.A. Whately & Co.', url: 'https://suite.mawhately.ie' },
    { '@type': 'Organization', name: 'Systemartis', url: 'https://systemartis.com' },
  ],
  alumniOf: resume.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
  knowsAbout: ['Production AI agents', 'Finance and accounting automation', 'Xero', 'HubSpot', 'Evals and regression testing', 'Human-in-the-loop systems', 'EU data residency', 'GDPR', 'AML and KYC', 'EU crowdfunding regulation (ECSP)', 'Model Context Protocol', '3D printing and design for manufacturing'],
  homeLocation: { '@type': 'Place', name: 'Romania' },
  workLocation: { '@type': 'Place', name: 'Remote, Eastern European Time (EET)' },
};
const org3descu = { '@type': 'Organization', '@id': abs('/#3descu'), name: '3Descu', legalName: 'TREIDESCUPRINT SRL', url: 'https://3descu.com', founder: { '@id': abs('/#person') }, foundingDate: '2022-06' };

function page({ path, title, description, body, og = 'default', jsonld = [], current }) {
  const full = path === '/' ? `${site.name} - ${site.title}` : `${title} - ${site.name}`;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F3F5F6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1720" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${path.startsWith('/work/') && path !== '/work/' ? 'article' : 'profile'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs(`/og/${og}.png`)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="alternate" type="application/json" href="/resume.json" title="JSON Resume">
<link rel="preload" href="/assets/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
<script>try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}</script>
${jsonld.map(ld).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap">
<a class="mark" href="/">${esc(site.name)}</a>
<nav class="nav" aria-label="Main">${nav}</nav>
<button class="theme" type="button" aria-label="Switch colour theme"><span>Theme</span></button>
</div></header>
<main id="main">
${body}
</main>
<footer class="site-foot"><div class="wrap">
<div>
<p>Every number on this site comes from a filing, a test log, a live system or a client's written record. Clients are described by type, not name.</p>
<p style="margin-top:.5rem">Updated ${fmt(UPDATED)}. <a href="/resume.json">resume.json</a>, <a href="/llms.txt">llms.txt</a></p>
</div>
<ul>
<li><a href="${site.links.linkedin}" rel="me">LinkedIn</a></li>
<li><a href="${site.links.github}" rel="me">GitHub</a></li>
<li><a href="${site.links.upwork}" rel="me">Upwork</a></li>
<li><a href="mailto:${site.email}">Email</a></li>
</ul>
</div></footer>
<script>
(function(){var b=document.querySelector('.theme'),r=document.documentElement;
function cur(){return r.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function label(){var c=cur();b.querySelector('span').textContent=c==='dark'?'Light theme':'Dark theme';b.setAttribute('aria-label','Switch to '+(c==='dark'?'light':'dark')+' theme')}
label();b.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}label()});})();
</script>
</body>
</html>
`;
}

// ---------- Shared blocks ----------
const sec = (id, h, intro, inner, extraClass = '') => `<section class="sec ${extraClass}" aria-labelledby="${id}"><div class="wrap">
<div class="sec-head"><h2 id="${id}">${h}</h2>${intro ? `<p>${intro}</p>` : ''}</div>
<div>${inner}</div>
</div></section>`;

const workList = (items) => `<ul class="work" role="list">${items.map((w) => `<li>
<div class="fig num">${esc(w.fig)}<small>${esc(w.figLabel)}</small></div>
<div><h3><a href="/work/${w.slug}/">${esc(w.card)}</a></h3><p>${esc(w.summary)}</p><p class="client">${esc(w.facts.Client || w.facts.Company)}</p></div>
</li>`).join('')}</ul>`;

const START = 2020, YEARS = 7, NOW = '2026-10';
const months = (d) => { const [y, m] = d.split('-'); return (+y - START) * 12 + (m ? +m - 1 : 0); };
const timeline = () => {
  const roles = [...resume.work].sort((a, b) => months(a.startDate) - months(b.startDate));
  const total = YEARS * 12;
  const rows = roles.map((r) => {
    const from = months(r.startDate), to = months(r.endDate || NOW) + 1;
    const len = Math.max(to - from, 2);
    return `<li style="--from:${(from / total * 100).toFixed(2)}%;--len:${(len / total * 100).toFixed(2)}%"><div class="lbl"><strong>${esc(r.position)}</strong>, ${esc(r.name)} <span class="muted">${fmt(r.startDate)} to ${fmt(r.endDate)}</span></div>
<div class="bar${r.endDate ? '' : ' now'}" aria-hidden="true"></div></li>`;
  }).join('');
  const axis = Array.from({ length: YEARS }, (_, i) => `<span>${START + i}</span>`).join('');
  return `<div class="tl-wrap"><div class="tl"><div class="tl-axis" aria-hidden="true">${axis}</div><ol role="list">${rows}</ol></div>
<p class="tl-note">A portfolio career since 2022: founder roles run alongside an executive role and client work. Overlaps are deliberate, not inflated dates.</p></div>`;
};

const cta = (h, p) => sec('cta', h, '', `<p>${p}</p><div class="ctas">
<a class="btn btn-primary" href="${mailto('Project or role enquiry')}">Email Adrian</a>
<a class="btn btn-ghost" href="${mailto('Request for a 30-minute call')}">Ask for a 30-minute call</a>
<a class="btn btn-ghost" href="/cv/">Read the CV</a></div>`, 'cta');

// ---------- Pages ----------
const pages = [];

// Home
pages.push({
  path: '/', current: '/', title: `${site.name} - ${site.title}`, description: site.description,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: abs('/') }, { '@context': 'https://schema.org', ...person }],
  body: `<section class="hero" aria-labelledby="hero-h"><div class="wrap">
<div class="hero-grid"><h1 id="hero-h"><span class="name">${esc(site.name)}, Head of AI &amp; Automation</span>${esc(site.hook)}</h1>
<div><p class="lede">Two years taking AI from first commit to production for accountancy firms and finance teams, then running it. Before that, six years in regulated FinTech, the last three as COO through an EU licence audit. Alongside both, a factory grown from 5 printers to 200+. Clients and customers in 32+ countries on four continents.</p>
<div class="ctas">
<a class="btn btn-primary" href="${mailto('Project or role enquiry')}">Email Adrian</a>
<a class="btn btn-ghost" href="${mailto('Request for a 30-minute call')}">Ask for a 30-minute call</a>
</div></div></div>
<table class="ledger">
<caption>Four numbers, and where each one comes from</caption>
<thead><tr><th scope="col">Figure</th><th scope="col">What it measures</th><th scope="col">Source</th></tr></thead>
<tbody>${proof.map((r) => `<tr><th scope="row" class="fig num">${esc(r.fig)}</th><td class="what"><a href="${r.href}">${esc(r.what)}</a></td><td class="src">${tick}${esc(r.src)}</td></tr>`).join('')}</tbody>
</table>
</div></section>
${sec('build-h', 'What Adrian builds', 'Three kinds of work, one standard: it runs in production, survives an audit and matches the numbers the business already trusts.', `<div class="cols">${builds.map((b) => `<div><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p></div>`).join('')}</div>`)}
${sec('work-h', 'Selected work', 'Seven case studies, from a regulator\'s audit to a factory floor: the context, the hard constraint, what was built and the measured result.', workList(work))}
${sec('how-h', 'How the work runs', 'Understand the process, ship behind gates, hand over the keys.', `<ol class="steps" role="list">${method.map((m) => `<li><h3>${esc(m.h)}</h3><p>${esc(m.p)}</p></li>`).join('')}</ol>
<dl class="principles">${principles.map((p) => `<div><dt>${esc(p.h)}</dt><dd>${esc(p.p)}</dd></div>`).join('')}</dl>
<blockquote class="quote"><p>${esc(upwork.quote.text)}</p><footer>${esc(upwork.quote.who)}. ${esc(upwork.line)}</footer></blockquote>`)}
${sec('press-h', 'In the press', 'October 2026: ten articles within a week of the 3Descu AI quoting launch, at zero ad spend.', `<ul class="outlets" role="list">${press.map((p) => p.url ? `<li><a href="${p.url}">${esc(p.outlet)}</a></li>` : `<li class="nolink">${esc(p.outlet)}</li>`).join('')}</ul><p style="margin-top:1.5rem"><a href="/press/">All articles with headlines and dates</a></p>`)}
${sec('roles-h', 'Roles', '6 years in FinTech product and operations, the last three as COO, plus 2 years shipping AI automation in production.', timeline())}
${cta('Similar problem, or hiring for this?', 'For a Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project: one email is enough to start.')}`,
});

// Work index
pages.push({
  path: '/work/', current: '/work/', title: 'Work: case studies', description: 'Seven case studies: an accountancy firm\'s AI service line built from zero, a FinTech through its EU licence audit, a factory with its own platform and MCP server, HubSpot to Xero multi-entity invoicing, an EU-sovereign reporting platform, Xero prepayments 107/107, and 5-hotel revenue reporting.',
  body: `<section class="hero"><div class="wrap"><h1 class="case-title" style="font-size:var(--s-3);max-width:24ch">Case studies from production, with the numbers and how they were measured</h1>
<p class="lede">From a regulator's audit to a factory floor to a client ledger. Clients are described by type. Each page covers the context, the hard constraint, what was built, the results, how it was tested, and what stayed behind.</p></div></section>
<section class="sec" aria-label="Case studies"><div class="wrap" style="display:block">${workList(work)}</div></section>
${cta('Have a process like one of these?', 'Send a short description of the process and the systems involved.')}`,
});

// Case studies
work.forEach((w, i) => {
  const next = work[(i + 1) % work.length];
  const facts = Object.entries(w.facts).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const li = (arr, html = false) => `<ul role="list">${arr.map((x) => `<li>${html ? x : esc(x)}</li>`).join('')}</ul>`;
  const block = (id, h, inner) => `<section class="sec" aria-labelledby="${id}"><div class="wrap"><div class="sec-head"><h2 id="${id}">${h}</h2></div><div class="prose">${inner}</div></div></section>`;
  pages.push({
    path: `/work/${w.slug}/`, current: '/work/', title: w.title, description: w.summary, og: w.slug,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: w.title, description: w.summary, author: { '@id': abs('/#person'), '@type': 'Person', name: site.name, url: abs('/') }, dateModified: UPDATED, image: abs(`/og/${w.slug}.png`), mainEntityOfPage: abs(`/work/${w.slug}/`) }],
    body: `<section class="hero case-hero"><div class="wrap">
<p class="crumb"><a href="/work/">Work</a></p>
<h1>${esc(w.title)}</h1>
<p class="lede">${esc(w.summary)}</p>
<dl class="facts">${facts}</dl>
</div></section>
${block('ctx', 'Context', `<p>${esc(w.context)}</p>`)}
${block('prob', 'Problem and constraints', `<p>${esc(w.problem)}</p>${li(w.constraints)}`)}
${block('built', 'What was built', `${li(w.built, true)}<h3 style="margin:2rem 0 1rem">Data path</h3><ol class="flow" role="list">${w.flow.map((f) => `<li>${esc(f)}</li>`).join('')}</ol>`)}
${block('res', 'Results', `<ul class="results" role="list">${w.results.map((r) => `<li><span class="num">${esc(r.n)}</span><span>${esc(r.l)}</span></li>`).join('')}</ul>`)}
${block('rel', 'Tests and safeguards', `<p>${esc(w.reliability)}</p>${w.earlier ? `<p>${esc(w.earlier)}</p>` : ''}`)}
${block('own', w.ownsH || 'What the client owns now', li(w.owns))}
${block('stack', 'Stack', `<ul class="stack" role="list">${w.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>${w.links.length ? `<h3 style="margin:2rem 0 .75rem">Links</h3><ul class="links" role="list">${w.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>` : ''}`)}
${sec('next-h', 'Next case study', '', `<p class="next"><a href="/work/${next.slug}/">${esc(next.title)}</a></p>`)}
${cta('Similar problem?', 'Describe the process, the systems and the constraint. Hiring for this skill set? The CV has the full record.')}`,
  });
});

// About
const story = [
  'Most AI projects in finance die somewhere between the demo and the audit. Adrian Capraru builds the ones that survive both, and then stays to run them. The mix behind that is deliberate: six years in regulated FinTech, two years shipping AI in production, and a manufacturing company built from nothing. He knows what a regulator asks for, what a finance director needs before signing off, and what it takes to ship software people depend on every morning. Clients and customers in 32+ countries on four continents.',
  'The FinTech years began in 2020 at EvoEstate, a pan-European real-estate crowdfunding aggregator with 6,700 investors, as Community Manager; eight months later he was its Product Manager, owning the roadmap and the secondary market. At InRento he ran the investor side of the 2022 EvoEstate-InRento merger, keeping 12,000+ investors informed through a phased migration. As COO of HighCrowd from 2022 to 2025 he took a platform with a product and no licence to a licensed operator. He was the lead on the authorisation and audit with the ASF, Romania\'s financial regulator, built automated KYC and AML onboarding (about 45 to 8 minutes per investor, internal measure) and the investor-protection flows the EU crowdfunding regulation requires. The ECSP licence was granted in March 2024, and seven-figure investor funding was placed through the platform during his tenure. He led and mentored a cross-functional, distributed team.',
  'In parallel, in 2022, he founded 3Descu on an EU start-up grant won by a business plan written for his Master\'s in Entrepreneurship (ranked first, about EUR 60K). It started with 5 printers in an apartment in Targu Jiu. Today it is a 200+ printer, ISO 9001:2015 certified company with no outside equity: 2,000+ orders from 1,600+ buyers in 30 countries, including 26 of the 27 EU member states, and turnover up 65x in three years at a 57% net margin. He hired and trained the team, wrote the SOPs and the ISO 9001 audit documentation, and is hands-on with FDM and SLA production, 3D modelling and design for manufacturing. He also wrote all of its software with AI coding agents, including one of the first manufacturing MCP servers.',
  'Since October 2025 he has been Director of AI & Business Automation at M.A. Whately & Co., an Irish chartered accountancy and audit firm, where he built the AI & Automation service line from zero: a 20-module client platform live in 10 days, EU-only AI processing enforced in code, an AML gate before any client account opens, Irish statutory rules as software, and AI training for the full team. He is Co-Founder & Automation Architect at Systemartis, a four-person AI systems studio in Bucharest, and founder of Innovium, a consumer brand with a registered EU trademark. Independently he is Top Rated on Upwork with a 100% Job Success Score, for clients across Europe, the US and Australia.',
  'The through-line is a portfolio career: founder roles, an executive role and client work side by side, each feeding the others. The regulated FinTech years taught that regulators ask for evidence, not intentions. The factory taught unit economics and the cost of a wrong price. Both shape how his AI systems are built: written controls, audit trails, human sign-off where judgement matters, tests against the figures the business already trusts, and code the client owns.',
];
pages.push({
  path: '/about/', current: '/about/', title: 'About Adrian Capraru', description: 'Adrian Capraru: built an Irish accountancy firm\'s AI service line from zero, led a FinTech through its EU licence audit as COO, founded a 200+ printer factory, and is Co-Founder & Automation Architect at Systemartis.',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'ProfilePage', dateCreated: '2026-10-26', dateModified: UPDATED, mainEntity: person, about: { '@id': abs('/#person') } }, { '@context': 'https://schema.org', ...org3descu }],
  body: `<section class="hero"><div class="wrap"><h1 style="font-size:var(--s-3);max-width:22ch">An operator who builds, and a builder who has run the operation</h1>
<p class="lede">${esc(site.identity)}</p></div></section>
${sec('story-h', 'The story', '', story.map((p) => `<p>${esc(p)}</p>`).join(''))}
${sec('roles-h', 'Roles', '', timeline())}
${sec('edu-h', 'Education and learning', '', `<ul class="plain" role="list">${resume.education.map((e) => `<li>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}
${resume.certificates.map((c) => `<li>${esc(c.name)}, ${esc(c.issuer)} <span class="muted">(${fmt(c.date)})</span></li>`).join('')}</ul>`)}
${sec('comm-h', 'Writing, speaking and community', '', `<ul class="plain" role="list"><li>Author of <a href="https://systemartis.com/blog/shift-to-agentic-chatbots-are-dead">The Shift to Agentic: Why Basic Chatbots Are Dead</a> (Systemartis, 4 March 2026).</li><li>Delivered an AI for Accountants session with live demos to the full team (10+ people) of an Irish chartered accountancy firm, and wrote its 8-lesson AI Academy.</li><li>Co-authored a 17-lesson Romanian course on P2P and real-estate crowdfunding, and a free 70+ page guide to P2P investing (2019).</li><li>Founded and ran a P2P investing community of 2,200+ members.</li><li>Three-time guest on the Banii Vorbesc personal-finance podcast.</li><li>Languages: Romanian (native), English (fluent).</li></ul>`)}
${cta('Work together', 'A Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project.')}`,
});

// Press
pages.push({
  path: '/press/', current: '/press/', title: 'Press', description: 'Press coverage from October 2026: Profit.ro, Observator News, Romania Journal, 3Druck.com, 3D Printing Industry and regional outlets, on 3Descu and its AI quoting launch.',
  body: `<section class="hero"><div class="wrap"><h1 style="font-size:var(--s-3);max-width:24ch">Ten articles in a week, at zero ad spend</h1>
<p class="lede">Coverage of 3Descu and its AI quoting launch in October 2026, in national, regional and international trade press. Headlines are quoted as published.</p></div></section>
<section class="sec" aria-label="Articles"><div class="wrap" style="display:block"><ul class="press-list" role="list">${press.map((p) => `<li>
<div><div class="outlet">${esc(p.outlet)}</div><div class="meta">${esc(p.date)}, ${esc(p.lang)}</div></div>
<div>${p.url ? `<a href="${p.url}" hreflang="${p.lang === 'RO' ? 'ro' : 'en'}">${esc(p.title)}</a>` : `<span>${esc(p.title)}</span>`}<p class="gloss">${esc(p.gloss)}</p></div>
</li>`).join('')}</ul></div></section>
${cta('Press or speaking enquiry?', 'Background facts and figures are available on request.')}`,
});

// CV
const cvRoles = resume.work.map((r) => `<li><h3>${esc(r.position)}, ${r.url ? `<a href="${r.url}">${esc(r.name)}</a>` : esc(r.name)}</h3>
<p class="when">${fmt(r.startDate)} to ${fmt(r.endDate)}</p><p>${esc(r.summary)}</p>${r.highlights ? `<div class="prose"><ul role="list">${r.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}</li>`).join('');
pages.push({
  path: '/cv/', current: '/cv/', title: 'CV', description: `CV of ${site.name}: ${resume.basics.label}`,
  body: `<section class="hero"><div class="wrap"><h1 style="font-size:var(--s-3)">Curriculum vitae</h1>
<p class="lede">${esc(resume.basics.summary)}</p>
<div class="ctas"><a class="btn btn-primary" href="/cv.pdf" download="Adrian_Capraru_CV.pdf">Download the PDF</a><a class="btn btn-ghost" href="/resume.json">JSON Resume</a></div></div></section>
${sec('exp-h', 'Experience', 'Portfolio career since 2022: roles overlap by design.', `<ul class="roles" role="list">${cvRoles}</ul>`)}
${sec('skills-h', 'Skills', '', `<ul class="plain" role="list">${resume.skills.map((s) => `<li><strong>${esc(s.name)}:</strong> ${esc(s.keywords.join(', '))}</li>`).join('')}</ul>`)}
${sec('pub-h', 'Publications', '', `<ul class="plain" role="list">${resume.publications.map((x) => `<li>${x.url ? `<a href="${x.url}">${esc(x.name)}</a>` : esc(x.name)}${x.publisher ? `, ${esc(x.publisher)}` : ''}${x.releaseDate ? ` <span class="muted">(${fmt(x.releaseDate)})</span>` : ''}</li>`).join('')}</ul>`)}
${sec('edu2-h', 'Education', '', `<ul class="plain" role="list">${resume.education.map((e) => `<li>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}${resume.certificates.map((c) => `<li>${esc(c.name)}, ${esc(c.issuer)} <span class="muted">(${fmt(c.date)})</span></li>`).join('')}</ul>`)}`,
});

// Contact
pages.push({
  path: '/contact/', current: '/contact/', title: 'Contact', description: `Contact ${site.name} about a Head of AI or fractional CTO role, AI deployment work or a fixed-scope project.`,
  body: `<section class="hero"><div class="wrap"><h1 style="font-size:var(--s-3);max-width:20ch">Start with one email</h1>
<p class="lede">Describe the process, the systems involved and what a good outcome looks like.</p>
<p class="contact-email" style="margin-top:2rem"><a href="${mailto('Project or role enquiry')}">${esc(site.email)}</a></p>
<div class="ctas"><a class="btn btn-primary" href="${mailto('Request for a 30-minute call')}">Ask for a 30-minute call</a><a class="btn btn-ghost" href="/cv/">Read the CV</a></div></div></section>
${sec('open-h', 'Open to', '', `<div class="prose"><ul role="list"><li>Head of AI &amp; Automation or Head of AI Operations, including fractional.</li><li>AI deployment and forward-deployed engineering roles at finance-tech and AI companies, remote or EU hubs.</li><li>Fractional CTO or Head of AI for finance-heavy small and mid-sized companies.</li><li>Fixed-scope projects: finance-ops automation, document AI, Xero and HubSpot integrations, MCP servers.</li></ul></div>`)}
${sec('where-h', 'Where', '', `<p>Based in Romania, on Eastern European Time (EET). Clients and customers in 32+ countries on four continents; works remotely with teams in Ireland, the UK, DACH, the Nordics, Benelux and the US.</p><ul class="plain" role="list"><li><a href="${site.links.linkedin}" rel="me">LinkedIn</a></li><li><a href="${site.links.github}" rel="me">GitHub</a></li><li><a href="${site.links.upwork}" rel="me">Upwork profile</a></li></ul>`)}`,
});

// 404
const notFound = page({ path: '/404.html', title: 'Page not found', description: 'This page does not exist.', body: `<section class="hero"><div class="wrap"><h1 style="font-size:var(--s-3)">This page does not exist</h1><p class="lede">The link may be old. The <a href="/work/">case studies</a> and the <a href="/">home page</a> are the best places to continue.</p></div></section>` });

// ---------- Write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
cpSync(join(SRC, 'static'), OUT, { recursive: true });
for (const p of pages) {
  const dir = join(OUT, p.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p));
}
writeFileSync(join(OUT, '404.html'), notFound);
writeFileSync(join(OUT, '.nojekyll'), '');

// resume.json: the source file plus case studies as projects
const outResume = { ...resume, projects: work.map((w) => ({ name: w.title, description: w.summary, url: abs(`/work/${w.slug}/`), highlights: w.results.map((r) => `${r.n} ${r.l}`), keywords: w.stack })) };
writeFileSync(join(OUT, 'resume.json'), JSON.stringify(outResume, null, 2));

writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `<url><loc>${abs(p.path)}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(OUT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`);

writeFileSync(join(OUT, 'llms.txt'), `# ${site.name}

> ${site.hook} ${site.identity} Director of AI & Business Automation at M.A. Whately & Co., Co-Founder & Automation Architect at Systemartis, former COO of an EU-licensed crowdfunding platform, founder of 3Descu. Based in Romania (EET), works remotely with teams in Ireland, the UK, DACH, the Nordics, Benelux and the US. Contact: ${site.email}

${resume.basics.summary}

Facts on this site come from filings, test logs, live systems or clients' written records. Clients are described by type, not name.

## Key facts
${resume.work.filter((r) => r.highlights).map((r) => `### ${r.position}, ${r.name}\n${r.highlights.map((h) => `- ${h}`).join('\n')}`).join('\n\n')}

## Case studies
${work.map((w) => `- [${w.title}](${abs(`/work/${w.slug}/`)}): ${w.summary}`).join('\n')}

## Profile
- [About](${abs('/about/')}): portfolio career story, roles and education
- [CV](${abs('/cv/')}): full CV in HTML
- [resume.json](${abs('/resume.json')}): JSON Resume, the machine-readable source
- [Press](${abs('/press/')}): ten articles from October 2026
- [Contact](${abs('/contact/')})

## Writing
${resume.publications.filter((x) => x.url).map((x) => `- [${x.name}](${x.url})${x.publisher ? `, ${x.publisher}` : ''}${x.releaseDate ? `, ${x.releaseDate}` : ''}`).join('\n')}

## Elsewhere
- LinkedIn: ${site.links.linkedin}
- GitHub: ${site.links.github}
- Upwork: ${site.links.upwork}
- MCP server: io.github.cadi27tech/3descu-quote in the official MCP Registry
`);

console.log(`Built ${pages.length} pages to dist/ (cv.pdf ${HAS_PDF ? 'included' : 'MISSING, /cv.pdf will 404'})`);
