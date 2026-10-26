// Zero-dependency static build: node src/build.mjs -> dist/
// Motion libraries are vendored in src/assets/vendor (refresh with npm run vendor); nothing loads from a CDN.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, mailto, proof, builds, method, principles, pipeline, press, upwork, work } from './content.mjs';

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = join(SRC, '..', 'dist');
const resume = JSON.parse(readFileSync(join(SRC, 'resume.json'), 'utf8'));
const UPDATED = resume.meta.lastModified;
const HAS_PDF = existsSync(join(SRC, 'static', 'cv.pdf'));
const ver = (f) => createHash('md5').update(readFileSync(join(SRC, 'assets', f))).digest('hex').slice(0, 8);
const V = { css: ver('site.css'), js: ver('js/main.js') };

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const abs = (p) => site.url + p;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (d) => { if (!d) return 'present'; const [y, m] = d.split('-'); return m ? `${MONTHS[+m - 1]} ${y}` : y; };
const pad = (n) => String(n).padStart(2, '0');
// Counters tick only on figures that are quantities, never on years or dates.
const count = (s) => (/\d/.test(s) && !/\b(19|20)\d\d\b/.test(s) ? ' data-count' : '');

const tick = '<svg class="tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>';
const arrow = '<svg class="arr" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';

const NAV = [['/work/', 'Work'], ['/about/', 'About'], ['/press/', 'Press'], ['/cv/', 'CV'], ['/contact/', 'Contact']];

const IMG = (name) => [640, 1000, 1400].map((w) => `/img/portrait-${name}-${w}.webp ${w}w`).join(', ');
const IMG_SIZES = '(min-width: 64rem) 40vw, (min-width: 40rem) 70vw, 92vw';

const person = {
  '@type': 'Person',
  '@id': abs('/#person'),
  name: site.name,
  url: abs('/'),
  email: `mailto:${site.email}`,
  jobTitle: 'Head of AI & Automation',
  description: site.identity,
  image: abs('/img/adrian-capraru.jpg'),
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

// Preloader: a drawing sheet that strokes itself in, with a 000 to 100 counter. CSS runs it; JS only drives the counter.
const preloader = `<div class="preloader" aria-hidden="true"><div class="pre-sheet">
<svg viewBox="0 0 400 250" class="pre-draw">
<rect x="1" y="1" width="398" height="248" pathLength="1"/>
<path d="M12 12h376v226H12z" pathLength="1"/>
<path d="M248 186h140M248 212h140M318 186v52M248 186v52" pathLength="1"/>
<circle cx="130" cy="112" r="62" pathLength="1"/>
<path d="M130 36v152M54 112h152" pathLength="1" class="thin"/>
<path d="M230 50v124M224 56l6-6 6 6M224 168l6 6 6-6" pathLength="1" class="thin"/>
<path d="M98 92c10-26 54-26 64 0c4 30-6 58-32 62c-26-4-36-32-32-62z" pathLength="1"/>
</svg>
<p class="pre-tb mono"><span>Adrian Capraru</span><span>DWG AC-001</span></p>
<p class="pre-count mono">000</p>
<p class="pre-note mono">Loading drawing set…</p>
</div></div>`;

function page({ path, title, description, body, og = 'default', jsonld = [], current, preloadPortrait = false }) {
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
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#070B12">
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
<link rel="preload" href="/assets/fonts/plex-mono-400.woff2" as="font" type="font/woff2" crossorigin>
${preloadPortrait ? `<link rel="preload" as="image" href="/img/portrait-photo-1000.webp" imagesrcset="${IMG('photo')}" imagesizes="${IMG_SIZES}" fetchpriority="high">
<link rel="preload" as="image" href="/img/portrait-blueprint-1000.webp" imagesrcset="${IMG('blueprint')}" imagesizes="${IMG_SIZES}">
` : ''}<link rel="stylesheet" href="/assets/site.css?v=${V.css}">
<script>(function(r){r.classList.add('js');try{if(!sessionStorage.getItem('ac-seen')&&matchMedia('(prefers-reduced-motion: no-preference)').matches){r.classList.add('is-loading');sessionStorage.setItem('ac-seen','1')}}catch(e){}})(document.documentElement)</script>
<script defer src="/assets/vendor/gsap.min.js"></script>
<script defer src="/assets/vendor/ScrollTrigger.min.js"></script>
<script defer src="/assets/vendor/lenis.min.js"></script>
<script defer src="/assets/js/main.js?v=${V.js}"></script>
${jsonld.map(ld).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${preloader}
<div class="atmos" aria-hidden="true"><canvas></canvas></div>
<div class="progress" aria-hidden="true"></div>
<header class="site-head"><div class="wrap">
<a class="mark" href="/" aria-label="${esc(site.name)}, home"><span class="mark-glyph" aria-hidden="true">AC</span><span class="mark-name">${esc(site.name)}</span></a>
<nav class="nav" aria-label="Main">${nav}</nav>
<p class="clock mono" aria-hidden="true"><span class="lamp"></span>RO <span data-clock>EET</span></p>
</div></header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-foot"><div class="wrap">
<div class="tb mono" aria-label="Drawing title block">
<div class="tb-cell tb-wide"><span>Drawn by</span>${esc(site.name)}</div>
<div class="tb-cell"><span>Title</span>AI &amp; Automation</div>
<div class="tb-cell"><span>Dwg</span>AC-001</div>
<div class="tb-cell"><span>Rev</span>${fmt(UPDATED)}</div>
<div class="tb-cell"><span>Scale</span>1:1</div>
</div>
<div class="foot-grid">
<p>Every number on this site comes from a filing, a test log, a live system or a client's written record. Clients are described by type, not name. Updated ${fmt(UPDATED)}. <a class="ulink" href="/resume.json">resume.json</a>, <a class="ulink" href="/llms.txt">llms.txt</a></p>
<ul role="list">
<li><a class="ulink" href="${site.links.linkedin}" rel="me">LinkedIn</a></li>
<li><a class="ulink" href="${site.links.github}" rel="me">GitHub</a></li>
<li><a class="ulink" href="${site.links.upwork}" rel="me">Upwork</a></li>
<li><a class="ulink" href="mailto:${site.email}">Email</a></li>
</ul>
</div>
</div></footer>
<div class="cursor is-out" aria-hidden="true"><span class="cursor-ring"></span><span class="cursor-label"></span></div>
<div class="toast mono" role="status" aria-live="polite"></div>
</body>
</html>
`;
}

// ---------- Shared blocks ----------
// Split headline: words animate in (CSS only); screen readers get the plain sentence once.
const split = (text, accentLast = 0) => {
  const words = text.split(' ');
  const html = words.map((w, i) => {
    const inner = `<span style="--i:${i}">${esc(w)}</span>`;
    return `<span class="w${i >= words.length - accentLast ? ' em' : ''}">${inner}</span>`;
  }).join(' ');
  return `<span class="split" aria-hidden="true">${html}</span><span class="visually-hidden">${esc(text)}</span>`;
};

const label = (n, tag) => `<p class="label mono" aria-hidden="true">${n ? `<span>${n}</span>` : ''}<i></i><span>${esc(tag)}</span></p>`;

const sec = ({ id, n, tag, h, intro, inner, cls = '' }) => `<section class="sec ${cls}" aria-labelledby="${id}"><div class="wrap">
<header class="sec-head">${label(n, tag)}<h2 id="${id}" data-reveal>${h}</h2>${intro ? `<p data-reveal>${intro}</p>` : ''}</header>
<div class="sec-body">${inner}</div>
</div></section>`;

const btn = (href, text, kind = 'ghost', extra = '') => `<a class="btn btn-${kind}" href="${href}"${extra}><span>${text}</span>${kind === 'primary' ? arrow : ''}</a>`;
const copyBtn = `<button class="btn btn-ghost" type="button" data-copy="${esc(site.email)}" hidden><span>Copy email address</span></button>`;

const pageHero = (h, lede, extra = '') => `<section class="hero page-hero"><div class="wrap">
<h1>${split(h)}</h1>
${lede ? `<p class="lede hero-fade" style="--d:.45s">${lede}</p>` : ''}${extra}
</div></section>`;

const card = (w, i) => {
  const no = pad(i + 1);
  return `<li class="card"><a href="/work/${w.slug}/" data-cursor="View case">
<span class="card-top mono"><span>DWG AC-1${no}</span><span class="card-status${/^(live|operating)/i.test(w.facts.Status) ? ' is-live' : ''}">${esc(w.facts.Status.split(/[.,;]/)[0])}</span></span>
<span class="plate" style="view-transition-name:c-${w.slug}"><span class="num"${count(w.fig)}>${esc(w.fig)}</span><span class="plate-l mono">${esc(w.figLabel)}</span></span>
<span class="card-body"><h3>${esc(w.card)}</h3><span class="card-sum">${esc(w.summary)}</span><span class="card-client">${esc(w.facts.Client || w.facts.Company)}</span></span>
<span class="card-preview" aria-hidden="true"><span class="mono">Data path</span><ol>${w.flow.map((f) => `<li>${esc(f)}</li>`).join('')}</ol></span>
<span class="card-foot mono"><span>Case ${no} / ${pad(work.length)}</span><span class="card-go">Read case ${arrow}</span></span>
</a></li>`;
};

const roleItem = (r) => `<li class="tl-item${r.endDate ? '' : ' is-now'}"><span class="tl-dot" aria-hidden="true"></span>
<p class="tl-when mono">${fmt(r.startDate)} to ${fmt(r.endDate)}${r.endDate ? '' : ' <span class="tl-live">Live</span>'}</p>
<h3>${esc(r.position)}<span>, ${esc(r.name)}</span></h3>
<p>${esc(r.summary)}</p></li>`;
const timeline = (roles, note) => `<div class="tl"><span class="tl-line" aria-hidden="true"><span class="tl-fill"></span></span><ol role="list">${roles.map(roleItem).join('')}</ol>${note ? `<p class="tl-note">${note}</p>` : ''}</div>`;
const byStart = [...resume.work].sort((a, b) => a.startDate.localeCompare(b.startDate));
const CAREER_PATH = ['EvoEstate', 'InRento', 'HighCrowd', '3Descu', 'Systemartis', 'Innovium', 'M.A. Whately', 'Independent practice'];
const careerPath = CAREER_PATH.map((n) => resume.work.find((r) => r.name.startsWith(n)));
if (careerPath.some((r) => !r) || careerPath.length !== resume.work.length) throw new Error('Career path must list every role in resume.json');

// Certifications: every entry in resume.json, grouped; verify links only where the issuer provides one.
const certs = resume.certificates;
const certWhen = (c) => `${fmt(c.date)}${c.validUntil ? `, valid to ${fmt(c.validUntil)}` : ''}`;
const certVerify = (c) => (c.url ? `<a class="ulink cred-verify" href="${c.url}">Verify<span class="visually-hidden">: ${esc(c.name)}</span> ${arrow}</a>` : '');
const certWall = `<div class="creds">${[...new Set(certs.map((c) => c.group))].map((g) => { const list = certs.filter((c) => c.group === g); return `<div class="cred-group">
<h3 class="cred-gh" data-reveal><span>${esc(g)}</span><span class="mono">${pad(list.length)}</span></h3>
<ol class="cred-list" role="list">${list.map((c, i) => `<li class="cred" data-reveal style="--d:${(i % 4) * 70}ms">
<p class="cred-top mono"><span>${esc(c.issuer)}</span>${tick}</p>
<p class="cred-name">${esc(c.name)}</p>
<p class="cred-foot mono"><span>${certWhen(c)}${c.id ? `<br><span class="cred-id">ID ${esc(c.id)}</span>` : ''}</span>${certVerify(c)}</p>
</li>`).join('')}</ol></div>`; }).join('')}</div>`;
const certList = `<ul class="plain certs" role="list">${certs.map((c) => `<li data-reveal>${esc(c.name)}, ${esc(c.issuer)} <span class="muted">(${certWhen(c)})</span>${c.id ? ` <span class="cert-id mono">ID ${esc(c.id)}</span>` : ''}${c.url ? ` <a class="ulink" href="${c.url}">Verify<span class="visually-hidden">: ${esc(c.name)}</span></a>` : ''}</li>`).join('')}</ul>`;

const cta = (h, p, n = '') => `<section class="sec cta-sec" aria-labelledby="cta-h"><div class="wrap">
${label(n, 'Contact')}
<h2 id="cta-h" class="cta-h" data-reveal>${h}</h2>
<p class="cta-p" data-reveal>${p}</p>
<div class="ctas">${btn(mailto('Project or role enquiry'), 'Email Adrian', 'primary')}${copyBtn}${btn(mailto('Request for a 30-minute call'), 'Ask for a 30-minute call')}${btn('/cv/', 'Read the CV')}</div>
<p class="cta-mail"><a class="ulink" href="${mailto('Project or role enquiry')}">${esc(site.email)}</a></p>
</div></section>`;

// ---------- Pages ----------
const pages = [];

// Home
const ledger = `<section class="ledger-sec" aria-labelledby="ledger-h"><div class="wrap">
<h2 id="ledger-h" class="label mono"><span>01</span><i></i><span>Four numbers, and where each one comes from</span></h2>
<ol class="ledger" role="list">${proof.map((r, i) => `<li data-reveal style="--d:${i * 80}ms">
<span class="ledger-no mono" aria-hidden="true">${pad(i + 1)}</span>
<span class="fig num"${count(r.fig)}>${esc(r.fig)}</span>
<a class="what" href="${r.href}">${esc(r.what)}</a>
<span class="src mono">${tick}${esc(r.src)}</span></li>`).join('')}</ol>
</div></section>`;

const outletList = (hidden) => press.map((p) => `<li>${p.url ? `<a href="${p.url}"${hidden ? ' tabindex="-1"' : ''}>${esc(p.outlet)}</a>` : `<span>${esc(p.outlet)}</span>`}</li>`).join('');
const marquee = `<section class="marquee-sec" aria-labelledby="press-h"><div class="wrap marquee-head">
<h2 id="press-h" class="label mono"><span>02</span><i></i><span>In the press, October 2026</span></h2>
<p>Ten articles within a week of the 3Descu AI quoting launch, at zero ad spend. <a class="ulink" href="/press/">All articles with headlines and dates</a></p>
<button class="btn marquee-toggle" type="button" aria-pressed="false" hidden><span>Pause motion</span></button>
</div>
<div class="marquee"><ul class="marquee-track" role="list">${outletList(false)}</ul><ul class="marquee-track" aria-hidden="true">${outletList(true)}</ul></div>
</section>`;

const pipe = `<section class="pipe-sec is-live" aria-labelledby="pipe-h"><div class="pipe-pin"><div class="pipe-grid" aria-hidden="true"></div><div class="wrap">
<header class="pipe-head">
${label('04', 'System drawing')}
<h2 id="pipe-h" data-reveal>${esc(pipeline.h)}</h2>
<p data-reveal>${esc(pipeline.intro)}</p>
<p class="pipe-status mono"><span class="lamp"></span><span class="st-draft">Drawing, rev A</span><span class="st-live">Live in production. ${esc(pipeline.live)}</span></p>
</header>
<ol class="pipe" role="list">${pipeline.steps.map((s, i) => `<li class="node">
<svg class="node-frame" aria-hidden="true" focusable="false"><rect x="1" y="1" pathLength="1"/></svg>
<span class="node-id mono">${pad(i + 1)}</span>
<h3>${esc(s.h)}</h3>
<p>${esc(s.p)}</p>
<p class="node-metric"><span class="num"${count(s.n)}>${esc(s.n)}</span><span class="mono">${esc(s.l)}</span></p>
${i < pipeline.steps.length - 1 ? '<span class="wire" aria-hidden="true"><i></i></span>' : ''}
</li>`).join('')}</ol>
</div></div></section>`;

const rail = `<section class="rail-sec" aria-labelledby="work-h"><div class="rail-pin">
<div class="wrap rail-head">
<header class="sec-head">${label('05', 'Case studies')}<h2 id="work-h" data-reveal>Selected work</h2><p data-reveal>Seven case studies, from a regulator's audit to a factory floor: the context, the hard constraint, what was built and the measured result.</p></header>
<p class="rail-meta mono" aria-hidden="true"><span class="rail-count">01 / ${pad(work.length)}</span><span class="rail-bar"><i></i></span><span>Scroll or swipe</span></p>
</div>
<div class="rail"><ol class="rail-track" role="list">${work.map(card).join('')}</ol></div>
</div></section>`;

const methodBlock = `<ol class="revs" role="list">${method.map((m, i) => `<li data-reveal><span class="rev mono">Rev ${'ABC'[i]}</span><h3>${esc(m.h)}</h3><p>${esc(m.p)}</p></li>`).join('')}</ol>
<dl class="principles">${principles.map((p) => `<div data-reveal><dt>${esc(p.h)}</dt><dd>${esc(p.p)}</dd></div>`).join('')}</dl>
<figure class="quote" data-reveal><blockquote><p>${esc(upwork.quote.text).replace(/.../g, '…')}</p></blockquote><figcaption>${esc(upwork.quote.who)}. ${esc(upwork.line)}</figcaption></figure>`;

pages.push({
  path: '/', current: '/', title: `${site.name} - ${site.title}`, description: site.description, preloadPortrait: true,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: abs('/') }, { '@context': 'https://schema.org', ...person }],
  body: `<section class="hero home-hero" aria-labelledby="hero-h"><div class="wrap hero-grid">
<div class="hero-copy">
<h1 id="hero-h"><span class="name mono hero-fade" style="--d:.05s"><span class="lamp"></span>${esc(site.name)}, Head of AI &amp; Automation</span>${split(site.hook, 2)}</h1>
<p class="lede hero-fade" style="--d:.7s">Two years taking AI from first commit to production for accountancy firms and finance teams, then running it. Before that, six years in regulated FinTech, the last three as COO through an EU licence audit. Alongside both, a factory grown from 5 printers to 200+. Clients and customers in 32+ countries on four continents.</p>
<div class="ctas hero-fade" style="--d:.85s">${btn(mailto('Project or role enquiry'), 'Email Adrian', 'primary')}${btn(mailto('Request for a 30-minute call'), 'Ask for a 30-minute call')}</div>
</div>
<figure class="portrait hero-fade" style="--d:.2s">
<div class="frame">
<div class="seam" style="--x:46%" data-cursor="Drag">
<img class="layer layer-photo" src="/img/portrait-photo-1000.webp" srcset="${IMG('photo')}" sizes="${IMG_SIZES}" width="1400" height="1400" alt="Adrian Capraru: a portrait photo that turns into a blueprint drawing of the same face" fetchpriority="high">
<img class="layer layer-bp" src="/img/portrait-blueprint-1000.webp" srcset="${IMG('blueprint')}" sizes="${IMG_SIZES}" width="1400" height="1400" alt="">
<span class="seam-line" aria-hidden="true"><span class="seam-knob">${arrow}${arrow}</span></span>
<span class="seam-hit" aria-label="Seam between photo and blueprint"></span>
</div>
<span class="crop k-tl" aria-hidden="true"></span><span class="crop k-tr" aria-hidden="true"></span><span class="crop k-bl" aria-hidden="true"></span><span class="crop k-br" aria-hidden="true"></span>
</div>
<figcaption class="mono"><span>Fig. 01, photo to blueprint</span><span aria-hidden="true">Seam x <output class="seam-read">046.0</output></span></figcaption>
</figure>
</div>
<div class="wrap hero-foot mono hero-fade" style="--d:1s" aria-hidden="true"><span>Sheet 01</span><span class="scroll-cue"><i></i>Scroll</span><span>EET, Romania</span></div>
</section>
${ledger}
${marquee}
${sec({ id: 'build-h', n: '03', tag: 'Capabilities', h: 'What Adrian builds', intro: 'Three kinds of work, one standard: it runs in production, survives an audit and matches the numbers the business already trusts.', inner: `<ol class="sheets" role="list">${builds.map((b, i) => `<li data-reveal><span class="sheet-no mono">Sht ${pad(i + 1)}</span><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p></li>`).join('')}</ol>` })}
${pipe}
${rail}
${sec({ id: 'how-h', n: '06', tag: 'Method', h: 'How the work runs', intro: 'Understand the process, ship behind gates, hand over the keys.', inner: methodBlock })}
${sec({ id: 'roles-h', n: '07', tag: 'Career path', h: 'From FinTech operator to Head of AI', intro: '6 years in FinTech product and operations, the last three as COO, plus 2 years shipping AI automation in production.', inner: timeline(careerPath, 'A portfolio career since 2022: founder roles run alongside an executive role and client work. Overlaps are deliberate, not inflated dates. <a class="ulink" href="/about/">The full story</a>') })}
${sec({ id: 'cert-h', n: '08', tag: 'Credentials', h: `Certifications <span class="cert-count num"${count(String(certs.length))}>${certs.length}</span>`, intro: "From 2022 to 2025: AI and product management, FinTech and cloud, automation and data, leadership and agile, and design. Each one with its credential ID; verify links open the issuer's record.", inner: certWall })}
${cta('Similar problem, or hiring for this?', 'For a Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project: one email is enough to start.', '09')}`,
});

// Work index
pages.push({
  path: '/work/', current: '/work/', title: 'Work: case studies', description: 'Seven case studies: an accountancy firm\'s AI service line built from zero, a FinTech through its EU licence audit, a factory with its own platform and MCP server, HubSpot to Xero multi-entity invoicing, an EU-sovereign reporting platform, Xero prepayments 107/107, and 5-hotel revenue reporting.',
  body: `${pageHero('Case studies from production, with the numbers and how they were measured', 'From a regulator\'s audit to a factory floor to a client ledger. Clients are described by type. Each page covers the context, the hard constraint, what was built, the results, how it was tested, and what stayed behind.')}
<section class="sec" aria-label="Case studies"><div class="wrap"><ol class="cards-grid" role="list">${work.map(card).join('')}</ol></div></section>
${cta('Have a process like one of these?', 'Send a short description of the process and the systems involved.')}`,
});

// Case studies
work.forEach((w, i) => {
  const next = work[(i + 1) % work.length];
  const facts = Object.entries(w.facts).map(([k, v]) => `<div class="tb-cell"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const li = (arr, html = false) => `<ul role="list">${arr.map((x) => `<li data-reveal>${html ? x : esc(x)}</li>`).join('')}</ul>`;
  let n = 0;
  const block = (id, tag, h, inner) => sec({ id, n: pad(++n), tag, h, inner: `<div class="prose">${inner}</div>` });
  pages.push({
    path: `/work/${w.slug}/`, current: '/work/', title: w.title, description: w.summary, og: w.slug,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: w.title, description: w.summary, author: { '@id': abs('/#person'), '@type': 'Person', name: site.name, url: abs('/') }, dateModified: UPDATED, image: abs(`/og/${w.slug}.png`), mainEntityOfPage: abs(`/work/${w.slug}/`) }],
    body: `<section class="hero case-hero"><div class="wrap">
<p class="crumb mono hero-fade" style="--d:0s"><a class="ulink" href="/work/">Work</a><span aria-hidden="true">/</span><span>DWG AC-1${pad(i + 1)}</span></p>
<div class="case-grid">
<div><h1>${split(w.title)}</h1><p class="lede hero-fade" style="--d:.5s">${esc(w.summary)}</p></div>
<p class="plate plate-xl" style="view-transition-name:c-${w.slug}"><span class="num"${count(w.fig)}>${esc(w.fig)}</span><span class="plate-l mono">${esc(w.figLabel)}</span></p>
</div>
<dl class="facts hero-fade" style="--d:.7s">${facts}</dl>
</div></section>
${block('ctx', 'Context', 'Context', `<p data-reveal>${esc(w.context)}</p>`)}
${block('prob', 'Constraint', 'Problem and constraints', `<p data-reveal>${esc(w.problem)}</p>${li(w.constraints)}`)}
${block('built', 'Build', 'What was built', `${li(w.built, true)}<h3 class="flow-h">Data path</h3><ol class="flow" role="list">${w.flow.map((f, k) => `<li data-reveal><span class="mono">${pad(k + 1)}</span>${esc(f)}</li>`).join('')}</ol>`)}
${block('res', 'Results', 'Results', `<ul class="results" role="list">${w.results.map((r) => `<li data-reveal><span class="num"${count(r.n)}>${esc(r.n)}</span><span>${esc(r.l)}</span></li>`).join('')}</ul>`)}
${block('rel', 'Safeguards', 'Tests and safeguards', `<p data-reveal>${esc(w.reliability)}</p>${w.earlier ? `<p data-reveal>${esc(w.earlier)}</p>` : ''}`)}
${block('own', 'Handover', w.ownsH || 'What the client owns now', li(w.owns))}
${block('stack', 'Stack', 'Stack', `<ul class="stack" role="list">${w.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>${w.links.length ? `<h3 class="flow-h">Links</h3><ul class="links" role="list">${w.links.map((l) => `<li><a class="ulink" href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>` : ''}`)}
<section class="sec next-sec" aria-labelledby="next-h"><div class="wrap">${label(pad(++n), 'Next drawing')}<h2 id="next-h" class="visually-hidden">Next case study</h2>
<a class="next" href="/work/${next.slug}/" data-cursor="Next case"><span class="next-fig num">${esc(next.fig)}</span><span class="next-t">${esc(next.title)}</span>${arrow}</a></div></section>
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
  body: `${pageHero('An operator who builds, and a builder who has run the operation', esc(site.identity))}
${sec({ id: 'story-h', n: '01', tag: 'Story', h: 'The story', inner: `<div class="prose story">${story.map((p) => `<p data-reveal>${esc(p)}</p>`).join('')}</div>` })}
${sec({ id: 'roles-h', n: '02', tag: 'Career path', h: 'Roles', inner: timeline(byStart, 'A portfolio career since 2022: founder roles run alongside an executive role and client work. Overlaps are deliberate, not inflated dates.') })}
${sec({ id: 'edu-h', n: '03', tag: 'Education', h: 'Education', inner: `<ul class="plain" role="list">${resume.education.map((e) => `<li data-reveal>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}</ul>` })}
${sec({ id: 'cert-h', n: '04', tag: 'Credentials', h: `Certifications (${certs.length})`, inner: certList })}
${sec({ id: 'comm-h', n: '05', tag: 'Community', h: 'Writing, speaking and community', inner: `<ul class="plain" role="list"><li data-reveal>Author of <a class="ulink" href="https://systemartis.com/blog/shift-to-agentic-chatbots-are-dead">The Shift to Agentic: Why Basic Chatbots Are Dead</a> (Systemartis, 4 March 2026).</li><li data-reveal>Delivered an AI for Accountants session with live demos to the full team (10+ people) of an Irish chartered accountancy firm, and wrote its 8-lesson AI Academy.</li><li data-reveal>Co-authored a 17-lesson Romanian course on P2P and real-estate crowdfunding, and a free 70+ page guide to P2P investing (2019).</li><li data-reveal>Founded and ran a P2P investing community of 2,200+ members.</li><li data-reveal>Three-time guest on the Banii Vorbesc personal-finance podcast.</li><li data-reveal>Languages: Romanian (native), English (fluent).</li></ul>` })}
${cta('Work together', 'A Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project.', '06')}`,
});

// Press
pages.push({
  path: '/press/', current: '/press/', title: 'Press', description: 'Press coverage from October 2026: Profit.ro, Observator News, Romania Journal, 3Druck.com, 3D Printing Industry and regional outlets, on 3Descu and its AI quoting launch.',
  body: `${pageHero('Ten articles in a week, at zero ad spend', 'Coverage of 3Descu and its AI quoting launch in October 2026, in national, regional and international trade press. Headlines are quoted as published.')}
<section class="sec" aria-label="Articles"><div class="wrap"><ol class="press-list" role="list">${press.map((p, i) => `<li data-reveal>
<span class="press-no mono" aria-hidden="true">${pad(i + 1)}</span>
<div><p class="outlet">${esc(p.outlet)}</p><p class="meta mono">${esc(p.date)}, ${esc(p.lang)}</p></div>
<div>${p.url ? `<a class="press-t" href="${p.url}" hreflang="${p.lang === 'RO' ? 'ro' : 'en'}" data-cursor="Read">${esc(p.title)}</a>` : `<span class="press-t">${esc(p.title)}</span>`}<p class="gloss">${esc(p.gloss)}</p></div>
</li>`).join('')}</ol></div></section>
${cta('Press or speaking enquiry?', 'Background facts and figures are available on request.')}`,
});

// CV
const cvRoles = resume.work.map((r) => `<li data-reveal><p class="when mono">${fmt(r.startDate)} to ${fmt(r.endDate)}</p><h3>${esc(r.position)}, ${r.url ? `<a class="ulink" href="${r.url}">${esc(r.name)}</a>` : esc(r.name)}</h3>
<p>${esc(r.summary)}</p>${r.highlights ? `<div class="prose"><ul role="list">${r.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}</li>`).join('');
const eduList = `<ul class="plain" role="list">${resume.education.map((e) => `<li>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}</ul>`;
pages.push({
  path: '/cv/', current: '/cv/', title: 'CV', description: `CV of ${site.name}: ${resume.basics.label}`,
  body: `${pageHero('Curriculum vitae', esc(resume.basics.summary), `<div class="ctas hero-fade" style="--d:.6s">${btn('/cv.pdf', 'Download the PDF', 'primary', ' download="Adrian_Capraru_CV.pdf"')}${btn('/resume.json', 'JSON Resume')}</div>`)}
${sec({ id: 'exp-h', n: '01', tag: 'Experience', h: 'Experience', intro: 'Portfolio career since 2022: roles overlap by design.', inner: `<ul class="roles" role="list">${cvRoles}</ul>` })}
${sec({ id: 'skills-h', n: '02', tag: 'Skills', h: 'Skills', inner: `<ul class="plain" role="list">${resume.skills.map((s) => `<li><strong>${esc(s.name)}:</strong> ${esc(s.keywords.join(', '))}</li>`).join('')}</ul>` })}
${sec({ id: 'pub-h', n: '03', tag: 'Publications', h: 'Publications', inner: `<ul class="plain" role="list">${resume.publications.map((x) => `<li>${x.url ? `<a class="ulink" href="${x.url}">${esc(x.name)}</a>` : esc(x.name)}${x.publisher ? `, ${esc(x.publisher)}` : ''}${x.releaseDate ? ` <span class="muted">(${fmt(x.releaseDate)})</span>` : ''}</li>`).join('')}</ul>` })}
${sec({ id: 'edu2-h', n: '04', tag: 'Education', h: 'Education', inner: eduList })}
${sec({ id: 'cert2-h', n: '05', tag: 'Credentials', h: `Certifications (${certs.length})`, inner: certList })}`,
});

// Contact
pages.push({
  path: '/contact/', current: '/contact/', title: 'Contact', description: `Contact ${site.name} about a Head of AI or fractional CTO role, AI deployment work or a fixed-scope project.`,
  body: `${pageHero('Start with one email', 'Describe the process, the systems involved and what a good outcome looks like.', `<p class="contact-email hero-fade" style="--d:.6s"><a class="ulink" href="${mailto('Project or role enquiry')}">${esc(site.email)}</a></p>
<div class="ctas hero-fade" style="--d:.75s">${btn(mailto('Request for a 30-minute call'), 'Ask for a 30-minute call', 'primary')}${copyBtn}${btn('/cv/', 'Read the CV')}</div>`)}
${sec({ id: 'open-h', n: '01', tag: 'Scope', h: 'Open to', inner: `<div class="prose"><ul role="list"><li data-reveal>Head of AI &amp; Automation or Head of AI Operations, including fractional.</li><li data-reveal>AI deployment and forward-deployed engineering roles at finance-tech and AI companies, remote or EU hubs.</li><li data-reveal>Fractional CTO or Head of AI for finance-heavy small and mid-sized companies.</li><li data-reveal>Fixed-scope projects: finance-ops automation, document AI, Xero and HubSpot integrations, MCP servers.</li></ul></div>` })}
${sec({ id: 'where-h', n: '02', tag: 'Location', h: 'Where', inner: `<p data-reveal>Based in Romania, on Eastern European Time (EET). Clients and customers in 32+ countries on four continents; works remotely with teams in Ireland, the UK, DACH, the Nordics, Benelux and the US.</p><ul class="plain" role="list"><li><a class="ulink" href="${site.links.linkedin}" rel="me">LinkedIn</a></li><li><a class="ulink" href="${site.links.github}" rel="me">GitHub</a></li><li><a class="ulink" href="${site.links.upwork}" rel="me">Upwork profile</a></li></ul>` })}`,
});

// 404
const notFound = page({ path: '/404.html', title: 'Page not found', description: 'This page does not exist.', body: pageHero('This page does not exist', 'The link may be old. The <a class="ulink" href="/work/">case studies</a> and the <a class="ulink" href="/">home page</a> are the best places to continue.') });

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

## Certifications
${certs.map((c) => `- ${c.name}, ${c.issuer} (${c.date}${c.validUntil ? `, valid to ${c.validUntil}` : ''})${c.id ? `, ID ${c.id}` : ''}${c.url ? `: ${c.url}` : ''}`).join('\n')}

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
