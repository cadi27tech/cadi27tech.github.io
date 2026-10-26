// Zero-dependency static build: node src/build.mjs -> dist/
// Motion libraries are vendored in src/assets/vendor (refresh with npm run vendor); nothing loads from a CDN.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, mailto, proof, builds, method, principles, pipeline, press, upwork, work, cvArcs, recognition, testimonials, recommendations } from './content.mjs';

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

// Capability icons: 48px blueprint line drawings, every stroke draws in on reveal (pathLength 1).
const ICONS = {
  line: '<path d="M8 40h32"/><path d="M12 40V30h6v10"/><path d="M21 40V22h6v18"/><path d="M30 40V12h6v28"/><path d="M10 26l10-8 9 4 11-12"/><path d="M36 10h4v4"/>',
  money: '<circle cx="18" cy="24" r="10"/><path d="M18 18v12M15 21h5a2 2 0 010 4h-4a2 2 0 000 4h5"/><path d="M28 14h12v20H28"/><path d="M34 20l6-6M34 28l6 6"/>',
  shield: '<path d="M24 6l14 5v11c0 9-6 16-14 20C16 38 10 31 10 22V11z"/><path d="M16 18h16M16 24h16M16 30h10"/>',
  evals: '<rect x="7" y="9" width="34" height="26"/><path d="M11 27l6-6 5 4 7-9 5 5 4-3"/><path d="M14 41h20M24 35v6"/>',
  lock: '<rect x="11" y="21" width="26" height="19"/><path d="M16 21v-6a8 8 0 0116 0v6"/><path d="M24 28v5"/>',
  mcp: '<circle cx="24" cy="24" r="5"/><circle cx="9" cy="10" r="3"/><circle cx="39" cy="10" r="3"/><circle cx="9" cy="38" r="3"/><circle cx="39" cy="38" r="3"/><path d="M12 12l8 8M36 12l-8 8M12 36l8-8M36 36l-8-8"/>',
  data: '<ellipse cx="24" cy="11" rx="13" ry="4"/><path d="M11 11v26c0 2 6 4 13 4s13-2 13-4V11"/><path d="M11 20c0 2 6 4 13 4s13-2 13-4M11 29c0 2 6 4 13 4s13-2 13-4"/>',
  people: '<circle cx="17" cy="16" r="5"/><circle cx="32" cy="18" r="4"/><path d="M7 38c0-6 4-11 10-11s10 5 10 11"/><path d="M27 29c2-2 3-3 5-3 5 0 8 4 8 10"/>',
  key: '<circle cx="15" cy="24" r="7"/><path d="M22 24h19M35 24v6M40 24v4"/><circle cx="15" cy="24" r="2"/>',
  gear: '<circle cx="24" cy="24" r="6"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4"/><circle cx="24" cy="24" r="12"/>',
};
const icon = (k) => `<svg class="sheet-ico" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${ICONS[k].replace(/\/>/g, ' pathLength="1"/>')}</svg>`;
const sheet = (b, i) => `<li data-reveal${b.wide ? ' class="wide"' : ''}><div class="sheet-top"><span class="sheet-no mono">Sht ${pad(i + 1)}</span>${icon(b.icon)}</div><span class="sheet-when mono is-${b.when}">${b.when === 'now' ? 'Asked now' : 'Rising to 2030'}</span><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p><dl class="sheet-meta"><div><dt class="mono">Proof</dt><dd>${esc(b.proof)}</dd></div><div><dt class="mono">You keep</dt><dd>${esc(b.keep)}</dd></div></dl></li>`;

// Monogram: the A is a drafting compass, the C the arc it has just drawn; the dashed gap is the part still on the drawing board,
// the orange dot the pencil tip where it goes live. Same geometry as static/favicon.svg.
const MARK = '<svg class="mark-glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="m-arc" d="M36.7 12.3A18 18 0 1 0 36.7 37.7" pathLength="1"/><path class="m-draft" d="M36.7 12.3A18 18 0 0 1 36.7 37.7"/><circle cx="24" cy="12" r="2.5"/><path d="M24 9.5V3.5M22.9 14.2L11.3 37.7M25.1 14.2L36.7 37.7M15.6 29h16.8"/><circle class="m-tip" cx="36.7" cy="37.7" r="2.4"/></svg>';

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
<a class="mark" href="/" aria-label="${esc(site.name)}, home">${MARK}<span class="mark-name">${esc(site.name)}</span></a>
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

const isLive = (w) => /^(live|operating)/i.test(w.facts.Status);
const card = (w, i) => {
  const no = pad(i + 1);
  return `<li class="card"><a href="/work/${w.slug}/" data-cursor="View case">
<span class="card-top mono"><span>DWG AC-1${no}</span><span class="card-status${isLive(w) ? ' is-live' : ''}">${esc(w.facts.Status.split(/[.,;]/)[0])}</span></span>
<span class="plate" style="view-transition-name:c-${w.slug}"><span class="num"${count(w.fig)}>${esc(w.fig)}</span><span class="plate-l mono">${esc(w.figLabel)}</span></span>
<span class="card-body"><h3>${esc(w.card)}</h3><span class="card-sum">${esc(w.summary)}</span><span class="card-client">${esc(w.facts.Client || w.facts.Company)}</span></span>
<span class="card-key"><span class="num"${count(w.key[0])}>${esc(w.key[0])}</span><span>${esc(w.key[1])}</span></span>
<span class="card-stack mono"><span class="visually-hidden">Stack: </span>${esc(w.stack.slice(0, 4).join(', '))}</span>
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

// ---------- System drawings (one per case study) ----------
// One spec (work[].diagram), two layouts: a 4-column sheet on desktop and a single column on phones, so text stays readable at 390px.
// Node: [id, row, col, span, kind, label, sub]. Kinds: ext (outside the system, dashed), sys (built), gate (a person or a hard check,
// double frame), out (result), live (in production, signal). Edge: [from, to, label, flags]; flags: x dashed, d desktop only.
// Desktop edges go down to the next row or across to a neighbour; on phones, any edge that skips a node runs in a side channel.
const DGL = {
  d: { W: 960, cols: 4, mx: 16, gx: 28, gy: 52, lw: 7.6, sw: 7 },
  m: { W: 360, cols: 1, mx: 10, gx: 0, gy: 40, lw: 7.6, sw: 7, ch: 44 },
};
const DG_KEY = { ext: 'Outside the system: a person, a ledger, a regulator', sys: 'Built by Adrian', gate: 'Human approval or a hard check', out: 'Result', live: 'Live in production' };
const wrapWords = (s, max) => s.split(' ').reduce((ls, word) => { const l = ls[ls.length - 1]; if (l !== undefined && `${l} ${word}`.length <= max) ls[ls.length - 1] = `${l} ${word}`; else ls.push(word); return ls; }, []);
const f2 = (v) => +v.toFixed(1);
function drawing(w, mode) {
  const L = DGL[mode], spec = w.diagram;
  const nodes = spec.nodes.map(([id, r, c, span, kind, lab, sub]) => ({ id, r, c, span, kind, lab, sub }));
  const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const cw = (L.W - 2 * L.mx - (L.ch || 0) - (L.cols - 1) * L.gx) / L.cols;
  for (const n of nodes) {
    n.w = mode === 'd' ? n.span * cw + (n.span - 1) * L.gx : cw;
    n.x = mode === 'd' ? L.mx + n.c * (cw + L.gx) : L.mx;
    n.ll = wrapWords(n.lab, Math.floor((n.w - 24) / L.lw));
    n.sl = n.sub ? wrapWords(n.sub.toUpperCase(), Math.floor((n.w - 24) / L.sw)) : [];
    n.h = 30 + (n.ll.length - 1) * 19 + (n.sl.length ? 18 + (n.sl.length - 1) * 14 : 0) + 14;
  }
  let H, top = 30;
  if (mode === 'd') {
    const rows = Math.max(...nodes.map((n) => n.r)) + 1, rh = Array(rows).fill(0), ry = [];
    nodes.forEach((n) => { rh[n.r] = Math.max(rh[n.r], n.h); });
    rh.forEach((h, r) => { ry[r] = r ? ry[r - 1] + rh[r - 1] + L.gy : top; });
    nodes.forEach((n) => { n.y = ry[n.r]; n.h = rh[n.r]; n.t = n.r * 0.3 + n.c * 0.07; });
    H = ry[rows - 1] + rh[rows - 1] + 24;
  } else {
    const order = spec.m || nodes.map((n) => n.id);
    if (order.length !== nodes.length || order.some((id) => !by[id])) throw new Error(`${w.slug}: diagram.m must list every node once`);
    order.forEach((id, i) => { const n = by[id]; n.i = i; n.y = top; top += n.h + L.gy; n.t = i * 0.11; });
    H = top - L.gy + 24;
  }
  const T = (t) => ` style="--t:${t.toFixed(2)}s"`;
  // Edges
  let chan = 0;
  const edges = spec.edges.filter(([, , , fl = '']) => mode === 'd' || !fl.includes('d')).map(([a, b, lab = '', fl = '']) => {
    const A = by[a], B = by[b];
    if (!A || !B) throw new Error(`${w.slug}: edge ${a} -> ${b} names a missing node`);
    let d, ex, ey, dir, lx, ly, anchor = 'middle';
    if (mode === 'm' && B.i !== A.i + 1) {
      const X = A.x + A.w + 12 + chan++ * 9, ay = A.y + A.h / 2, by2 = B.y + B.h / 2;
      d = `M${f2(A.x + A.w)} ${f2(ay)}H${f2(X)}V${f2(by2)}H${f2(B.x + B.w)}`; ex = B.x + B.w; ey = by2; dir = 'l'; lab = '';
    } else if (mode === 'm' || B.r > A.r) {
      if (mode === 'd' && B.r !== A.r + 1) throw new Error(`${w.slug}: desktop edge ${a} -> ${b} skips a row`);
      const lo = Math.max(A.x, B.x) + 18, hi = Math.min(A.x + A.w, B.x + B.w) - 18;
      if (lo <= hi) {
        const x = Math.min(Math.max(A.w <= B.w ? A.x + A.w / 2 : B.x + B.w / 2, lo), hi);
        d = `M${f2(x)} ${f2(A.y + A.h)}V${f2(B.y)}`; ex = x; ey = B.y; lx = x + 8; ly = (A.y + A.h + B.y) / 2 + 3; anchor = 'start';
      } else {
        const ax = A.x + A.w / 2, bx = B.x + B.w / 2, my = B.y - L.gy / 2;
        d = `M${f2(ax)} ${f2(A.y + A.h)}V${f2(my)}H${f2(bx)}V${f2(B.y)}`; ex = bx; ey = B.y; lx = (ax + bx) / 2; ly = my - 6;
      }
      dir = 'd';
    } else if (B.r === A.r) {
      const y = A.y + A.h / 2, right = B.x > A.x;
      d = right ? `M${f2(A.x + A.w)} ${f2(y)}H${f2(B.x)}` : `M${f2(A.x)} ${f2(y)}H${f2(B.x + B.w)}`;
      ex = right ? B.x : B.x + B.w; ey = y; dir = right ? 'r' : 'l'; lab = ''; // the 28-unit gap has no room for a label
    } else throw new Error(`${w.slug}: desktop edge ${a} -> ${b} points up`);
    const hd = { d: `M${f2(ex - 4)} ${f2(ey - 7)}L${f2(ex)} ${f2(ey)}L${f2(ex + 4)} ${f2(ey - 7)}`, r: `M${f2(ex - 7)} ${f2(ey - 4)}L${f2(ex)} ${f2(ey)}L${f2(ex - 7)} ${f2(ey + 4)}`, l: `M${f2(ex + 7)} ${f2(ey - 4)}L${f2(ex)} ${f2(ey)}L${f2(ex + 7)} ${f2(ey + 4)}` }[dir];
    const t = A.t + 0.35, dash = fl.includes('x');
    return `<path class="dg-e ${dash ? 'is-dash f' : 'd'}" d="${d}"${dash ? '' : ' pathLength="1"'}${T(t)}/><path class="dg-a f" d="${hd}"${T(t + 0.5)}/>${lab ? `<text class="dg-el f" x="${f2(lx)}" y="${f2(ly)}" text-anchor="${anchor}"${T(t + 0.5)}>${esc(lab.toUpperCase())}</text>` : ''}`;
  }).join('');
  // Zones: dashed boundaries; on phones only when their nodes stay next to each other.
  const zones = (spec.zones || []).map(([lab, ids]) => {
    const ns = ids.map((id) => by[id]);
    if (mode === 'm') { const ix = ns.map((n) => n.i); if (Math.max(...ix) - Math.min(...ix) !== ix.length - 1) return null; }
    const x0 = Math.min(...ns.map((n) => n.x)) - 10, y0 = Math.min(...ns.map((n) => n.y)) - 13;
    const x1 = Math.max(...ns.map((n) => n.x + n.w)) + 10, y1 = Math.max(...ns.map((n) => n.y + n.h)) + 13;
    const t = Math.min(...ns.map((n) => n.t)), text = lab.toUpperCase(), tw = text.length * 6.7 + 14;
    return {
      box: `<rect class="dg-z f" x="${f2(x0)}" y="${f2(y0)}" width="${f2(x1 - x0)}" height="${f2(y1 - y0)}"${T(t)}/>`,
      tag: `<g class="f"${T(t + 0.2)}><rect class="dg-zb" x="${f2(x0 + 10)}" y="${f2(y0 - 8)}" width="${f2(tw)}" height="16"/><text class="dg-zl" x="${f2(x0 + 17)}" y="${f2(y0 + 3.5)}">${esc(text)}</text></g>`,
    };
  }).filter(Boolean);
  // Nodes
  const nodeSvg = nodes.map((n) => {
    const r = (cls, k, extra = '') => `<rect class="${cls}" x="${f2(n.x + k)}" y="${f2(n.y + k)}" width="${f2(n.w - 2 * k)}" height="${f2(n.h - 2 * k)}"${extra}${T(n.t)}/>`;
    const tx = f2(n.x + 12);
    let y = n.y + 26;
    const lab = `<text class="dg-l f"${T(n.t + 0.3)}>${n.ll.map((l, k) => `<tspan x="${tx}" y="${f2(y + k * 19)}">${esc(l)}</tspan>`).join('')}</text>`;
    y += (n.ll.length - 1) * 19 + 18;
    const sub = n.sl.length ? `<text class="dg-s f"${T(n.t + 0.4)}>${n.sl.map((l, k) => `<tspan x="${tx}" y="${f2(y + k * 14)}">${esc(l)}</tspan>`).join('')}</text>` : '';
    const frame = n.kind === 'ext' ? r('dg-r is-dash f', 0) : r('dg-r d', 0, ' pathLength="1"');
    const inner = n.kind === 'gate' ? r('dg-r dg-r2 d', 4, ' pathLength="1"') : '';
    const lamp = n.kind === 'live' ? `<circle class="dg-lamp f" cx="${f2(n.x + n.w - 13)}" cy="${f2(n.y + 13)}" r="3.5"${T(n.t + 0.5)}/>` : '';
    return `<g class="dg-n k-${n.kind}">${r('dg-bg f', 0)}${frame}${inner}${lamp}${lab}${sub}</g>`;
  }).join('');
  const id = `dg-${w.slug}-${mode}`;
  return `<svg class="dg dg-${mode}" viewBox="0 0 ${L.W} ${f2(H)}" width="${L.W}" height="${f2(H)}" role="img" aria-labelledby="${id}-t ${id}-d" focusable="false"><title id="${id}-t">System drawing: ${esc(w.card)}</title><desc id="${id}-d">${esc(w.flow.join('. '))}.</desc>${zones.map((z) => z.box).join('')}${edges}${zones.map((z) => z.tag).join('')}${nodeSvg}</svg>`;
}
const dgKey = (w) => { const kinds = new Set(w.diagram.nodes.map((n) => n[4])); return `<ul class="dg-key" role="list">${Object.keys(DG_KEY).filter((k) => kinds.has(k)).map((k) => `<li><svg class="dg-sw k-${k}" viewBox="0 0 28 18" aria-hidden="true" focusable="false"><rect class="dg-r${k === 'ext' ? ' is-dash' : ''}" x="1" y="1" width="26" height="16"/>${k === 'gate' ? '<rect class="dg-r dg-r2" x="4" y="4" width="20" height="10"/>' : ''}</svg>${DG_KEY[k]}</li>`).join('')}${w.diagram.zones ? '<li><svg class="dg-sw" viewBox="0 0 28 18" aria-hidden="true" focusable="false"><rect class="dg-z" x="1" y="1" width="26" height="16"/></svg>Boundary</li>' : ''}</ul>`; };

// ---------- Testimonials ----------
// Upwork reviews, a buyer review, press headlines and (once there are any) LinkedIn recommendations, quoted as published.
const QSRC = { upwork: 'Upwork review', buyer: 'Buyer review', press: 'Press', linkedin: 'LinkedIn recommendation' };
const STAR = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 .7l1.6 3.4 3.7.5-2.7 2.5.7 3.7L6 9 2.7 10.8l.7-3.7L.7 4.6l3.7-.5z"/></svg>';
const quotes = [...testimonials, ...recommendations.map((r) => ({ ...r, source: 'linkedin', type: r.role }))];
const qById = Object.fromEntries(quotes.map((q) => [q.id, q]));
for (const w of work) for (const id of w.quotes) if (!qById[id]) throw new Error(`${w.slug}: unknown quote "${id}"`);
const qText = (s) => esc(s).replace(/\.\.\./g, '…');
const qcard = (q, d = '') => {
  const size = q.text.length > 170 ? 'is-l' : q.text.length > 80 ? 'is-m' : 'is-s';
  const meta = q.source === 'upwork' ? `<span class="qc-stars">${STAR.repeat(q.stars)}<span class="visually-hidden">${q.stars} out of 5 stars</span></span>`
    : q.source === 'press' ? `<span>${esc(q.date)}</span>` : q.source === 'buyer' ? '<span>4.7/5 from 200+ buyers</span>' : '';
  const who = q.source === 'press'
    ? `<a class="ulink qc-who" href="${q.url}" hreflang="${q.lang}">${esc(q.outlet)}<span class="visually-hidden">: read the article</span></a><span class="qc-type mono">Headline, as published</span>`
    : `<span class="qc-who">${q.url ? `<a class="ulink" href="${q.url}">${esc(q.who)}</a>` : esc(q.who)}</span><span class="qc-type mono">${esc(q.type)}</span>`;
  return `<li class="qc qc-${q.source} ${size}"${d}><figure>
<p class="qc-top mono"><span class="qc-src">${QSRC[q.source]}</span>${meta}</p>
<blockquote${q.lang && q.lang !== 'en' ? ` lang="${q.lang}"` : ''}><p>${qText(q.text)}</p></blockquote>
${q.en ? `<p class="qc-en"><span class="mono">In English</span>${esc(q.en)}</p>` : ''}<figcaption>${who}</figcaption>
</figure></li>`;
};
const qgrid = (list) => `<ol class="qgrid" role="list">${list.map((q, k) => qcard(q, ` data-reveal style="--d:${(k % 3) * 70}ms"`)).join('')}</ol>`;

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

const LOGOS = { 'Profit.ro': 'profit.png', 'Observator News': 'observator.svg', 'Click!': 'click.png', 'Gorjul Azi': 'gorjulazi.png', 'Romania Journal': 'romaniajournal.png', '3Druck.com': '3druck.png', 'Gorjeanul': 'gorjeanul.png', '3D Printing Industry': '3dprintingindustry.png', 'AS in Gorj': 'asingorj.png', 'Vocea Olteniei': 'voceaolteniei.png' };
const outletMark = (p) => LOGOS[p.outlet] ? `<img src="/press/${LOGOS[p.outlet]}" alt="${esc(p.outlet)}" height="40" loading="lazy" decoding="async">` : `<span class="wordmark">${esc(p.outlet)}</span>`;
const outletList = (hidden) => press.map((p) => `<li>${p.url ? `<a href="${p.url}"${hidden ? ' tabindex="-1"' : ''}>${outletMark(p)}</a>` : outletMark(p)}</li>`).join('');
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
<dl class="principles">${principles.map((p) => `<div data-reveal><dt>${esc(p.h)}</dt><dd>${esc(p.p)}</dd></div>`).join('')}</dl>`;

// Testimonials: the lead Upwork quote (moved here from the method section), the tags clients gave, then a draggable wall of every other quote.
const lead = qById.nicolas;
const voices = `<section class="sec voices-sec" aria-labelledby="voices-h"><div class="wrap">
<header class="sec-head">${label('06', 'Testimonials')}<h2 id="voices-h" data-reveal>In other people's words</h2><p data-reveal>${esc(upwork.line)} Below: every public review, a verified factory buyer and the press, quoted as published.</p></header>
<div class="voices-top">
<figure class="quote" data-reveal><blockquote><p>${qText(lead.text)}</p></blockquote><figcaption>${esc(lead.who)}, Upwork client, five stars. ${esc(lead.type)}.</figcaption></figure>
<div class="qtags" data-reveal><p class="mono">What Upwork clients tagged most</p><ul role="list">${upwork.tags.map(([t, c]) => `<li><span>${esc(t)}</span><span class="mono">${c}</span></li>`).join('')}</ul></div>
</div></div>
<div class="qwall" tabindex="0" role="region" aria-label="Testimonials. Scroll sideways, drag, or use the arrow keys." data-cursor="Drag"><ol class="qwall-track" role="list">${quotes.filter((q) => q !== lead).map((q) => qcard(q)).join('')}</ol></div>
<div class="wrap qwall-foot"><p class="rail-meta mono" aria-hidden="true"><span>${pad(quotes.length - 1)} quotes</span><span class="rail-bar"><i></i></span><span>Drag or swipe</span></p><div class="qwall-btns" hidden><button class="btn" type="button" data-step="-1"><span>Previous</span></button><button class="btn" type="button" data-step="1"><span>Next</span></button></div></div>
</section>`;

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
${sec({ id: 'build-h', n: '03', tag: 'Capabilities', h: 'What Adrian builds', intro: 'The full stack of what buyers ask for now and through 2030, from the first AI service line to the team that runs it. One standard on every sheet: it runs in production, survives an audit and matches the numbers the business already trusts.', inner: `<p class="sheet-legend mono"><span class="sheet-when is-now">Asked now</span> in today\'s best-paid AI roles <span class="sheet-when is-rising">Rising to 2030</span> where demand and budgets grow next</p><ol class="sheets" role="list">${builds.map(sheet).join('')}</ol>` })}
${pipe}
${rail}
${voices}
${sec({ id: 'how-h', n: '07', tag: 'Method', h: 'How the work runs', intro: 'Understand the process, ship behind gates, hand over the keys.', inner: methodBlock })}
${sec({ id: 'roles-h', n: '08', tag: 'Career path', h: 'From FinTech operator to Head of AI', intro: '6 years in FinTech product and operations, the last three as COO, plus 2 years shipping AI automation in production.', inner: timeline(careerPath, 'A portfolio career since 2022: founder roles run alongside an executive role and client work. Overlaps are deliberate, not inflated dates. <a class="ulink" href="/about/">The full story</a>') })}
${sec({ id: 'cert-h', n: '09', tag: 'Credentials', h: `Certifications <span class="cert-count num"${count(String(certs.length))}>${certs.length}</span>`, intro: "From 2022 to 2025: AI and product management, FinTech and cloud, automation and data, leadership and agile, and design. Each one with its credential ID; verify links open the issuer's record.", inner: certWall })}
${cta('Similar problem, or hiring for this?', 'For a Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project: one email is enough to start.', '10')}`,
});

// Work index
pages.push({
  path: '/work/', current: '/work/', title: 'Work: case studies', description: 'Seven case studies: an accountancy firm\'s AI service line built from zero, a FinTech through its EU licence audit, a factory with its own platform and MCP server, HubSpot to Xero multi-entity invoicing, an EU-sovereign reporting platform, Xero prepayments 107/107, and 5-hotel revenue reporting.',
  body: `${pageHero('Case studies from production, with the numbers and how they were measured', 'From a regulator\'s audit to a factory floor to a client ledger. Clients are described by type. Each page covers the context and what it cost, the constraints, the build from 0 to 100, a system drawing, the safeguards, the results and what stayed behind.')}
<section class="sec" aria-label="Case studies"><div class="wrap"><ol class="cards-grid" role="list">${work.map(card).join('')}</ol></div></section>
${cta('Have a process like one of these?', 'Send a short description of the process and the systems involved.')}`,
});

// Case studies
work.forEach((w, i) => {
  const next = work[(i + 1) % work.length], prev = work[(i - 1 + work.length) % work.length];
  const facts = Object.entries(w.facts).map(([k, v]) => `<div class="tb-cell"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const li = (arr, html = false) => `<ul role="list">${arr.map((x) => `<li data-reveal>${html ? x : esc(x)}</li>`).join('')}</ul>`;
  let n = 0;
  const block = (id, tag, h, inner) => sec({ id, n: pad(++n), tag, h, inner: `<div class="prose">${inner}</div>` });
  const wide = (id, tag, h, inner, cls) => sec({ id, n: pad(++n), tag, h, inner, cls });
  const steps = w.timeline.map(([when, t], k, a) => `<li class="arc-s${k === 0 ? ' is-start' : ''}${k === a.length - 1 ? ' is-end' : ''}" data-reveal><span class="arc-n mono" aria-hidden="true">${k === 0 ? '00' : k === a.length - 1 ? '100' : pad(k)}</span><div><p class="arc-when mono">${esc(when)}</p><p>${esc(t)}</p></div></li>`).join('');
  const own = w.quotes.map((id) => qById[id]).filter((q) => q.case === w.slug).concat(recommendations.filter((r) => r.case === w.slug).map((r) => qById[r.id]));
  const other = w.quotes.map((id) => qById[id]).filter((q) => q.case !== w.slug);
  const sayH = own.length ? 'What buyers and the press said' : 'What Upwork clients said';
  const said = `${own.length ? qgrid(own) : ''}${other.length ? `${own.length ? '<h3 class="flow-h">What Upwork clients said</h3>' : ''}${qgrid(other)}` : ''}`;
  const dwg = `<figure class="dwg" data-reveal>
<div class="dwg-sheet">${drawing(w, 'd')}${drawing(w, 'm')}<span class="crop k-tl" aria-hidden="true"></span><span class="crop k-tr" aria-hidden="true"></span><span class="crop k-bl" aria-hidden="true"></span><span class="crop k-br" aria-hidden="true"></span></div>
<figcaption class="dwg-cap">
<p class="dwg-tb mono"><span>DWG AC-1${pad(i + 1)}</span><span>System drawing</span><span>Rev ${fmt(UPDATED)}</span></p>
${dgKey(w)}
<h3 class="flow-h">Data path</h3><ol class="flow" role="list">${w.flow.map((f, k) => `<li><span class="mono">${pad(k + 1)}</span>${esc(f)}</li>`).join('')}</ol>
</figcaption></figure>`;
  const results = `<ul class="rcards" role="list">${w.results.map((r, k) => `<li class="rcard" data-reveal style="--d:${(k % 4) * 70}ms"><span class="num"${count(r.n)}>${esc(r.n)}</span><span class="rcard-l">${esc(r.l)}</span></li>`).join('')}</ul>
${w.before.length ? `<div class="ba" data-reveal><table class="ba-t"><caption>Before and after</caption><thead><tr><th scope="col">Measure</th><th scope="col">Before</th><th scope="col">After</th></tr></thead><tbody>${w.before.map(([m, b, a]) => `<tr><th scope="row">${esc(m)}</th><td data-l="Before">${esc(b)}</td><td data-l="After">${esc(a)}</td></tr>`).join('')}</tbody></table></div>` : ''}`;
  const pn = (x, kind) => `<a class="pn-a pn-${kind}" href="/work/${x.slug}/" data-cursor="${kind === 'prev' ? 'Previous' : 'Next case'}"><span class="pn-k mono">${kind === 'prev' ? 'Previous case' : 'Next case'}</span><span class="next-fig num">${esc(x.fig)}</span><span class="next-t">${esc(x.title)}</span>${arrow}</a>`;
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
${block('ctx', 'Context', 'Context and the problem', `<p data-reveal>${esc(w.context)}</p><h3 class="flow-h">What was broken</h3><p data-reveal>${esc(w.broken)}</p><h3 class="flow-h">What it cost</h3>${li(w.cost)}<h3 class="flow-h">The brief</h3><p data-reveal>${esc(w.problem)}</p>`)}
${block('cons', 'Constraints', 'Constraints and stakes', `${li(w.constraints)}<div class="stakes" data-reveal><p class="mono">What was at stake</p><p>${esc(w.stakes)}</p></div>`)}
${block('team', 'People', 'Adrian\'s role and team', li(w.team))}
${block('built', 'Build', 'The approach, from 0 to 100', `<ol class="arc case-arc${isLive(w) ? ' is-now' : ''}" role="list">${steps}</ol><h3 class="flow-h">What was built</h3>${li(w.built, true)}`)}
${wide('dwg-h', 'System drawing', 'How the system fits together', dwg, 'dwg-sec')}
${block('rel', 'Safeguards', 'Safeguards and controls', `${li(w.safeguards)}<h3 class="flow-h">How it was tested</h3><p data-reveal>${esc(w.reliability)}</p>${w.earlier ? `<p data-reveal>${esc(w.earlier)}</p>` : ''}`)}
${wide('res', 'Results', 'Results', results, 'res-sec')}
${block('own', 'Handover', w.ownsH || 'What the client owns now', li(w.owns))}
${block('stack', 'Stack', 'Stack', `<ul class="stack" role="list">${w.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>${w.links.length ? `<h3 class="flow-h">Links</h3><ul class="links" role="list">${w.links.map((l) => `<li><a class="ulink" href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>` : ''}`)}
${own.length || other.length ? block('said-h', 'Testimonials', sayH, said) : ''}
<nav class="sec next-sec" aria-label="More case studies"><div class="wrap">${label(pad(++n), 'More drawings')}
<div class="pn">${pn(prev, 'prev')}${pn(next, 'next')}</div></div></nav>
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
${sec({ id: 'voices-h', n: '02', tag: 'Testimonials', h: 'What clients, buyers and the press say', intro: `${esc(upwork.line)} Every public review and press line, quoted as published.`, inner: qgrid(quotes) })}
${sec({ id: 'roles-h', n: '03', tag: 'Career path', h: 'Roles', inner: timeline(byStart, 'A portfolio career since 2022: founder roles run alongside an executive role and client work. Overlaps are deliberate, not inflated dates.') })}
${sec({ id: 'edu-h', n: '04', tag: 'Education', h: 'Education', inner: `<ul class="plain" role="list">${resume.education.map((e) => `<li data-reveal>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}</ul>` })}
${sec({ id: 'cert-h', n: '05', tag: 'Credentials', h: `Certifications (${certs.length})`, inner: certList })}
${sec({ id: 'comm-h', n: '06', tag: 'Community', h: 'Writing, speaking and community', inner: `<ul class="plain" role="list"><li data-reveal>Author of <a class="ulink" href="https://systemartis.com/blog/shift-to-agentic-chatbots-are-dead">The Shift to Agentic: Why Basic Chatbots Are Dead</a> (Systemartis, 4 March 2026).</li><li data-reveal>Delivered an AI for Accountants session with live demos to the full team (10+ people) of an Irish chartered accountancy firm, and wrote its 8-lesson AI Academy.</li><li data-reveal>Co-authored a 17-lesson Romanian course on P2P and real-estate crowdfunding, and a free 70+ page guide to P2P investing (2019).</li><li data-reveal>Founded and ran a P2P investing community of 2,200+ members.</li><li data-reveal>Three-time guest on the Banii Vorbesc personal-finance podcast.</li><li data-reveal>Languages: Romanian (native), English (fluent).</li></ul>` })}
${cta('Work together', 'A Head of AI or fractional CTO role, AI deployment work with a finance-heavy team, or a fixed-scope project.', '07')}`,
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

// CV: long form. Every role gets a "0 to 100" arc from cvArcs (content.mjs); resume.json stays the source for dates, summary and highlights.
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const N_ROLES = resume.work.length;
const arcOf = (r) => { if (!cvArcs[r.name]) throw new Error(`cvArcs has no entry for "${r.name}"`); return cvArcs[r.name]; };
const detail = (h, arr) => (arr && arr.length ? `<div class="cvr-d"><h4 class="cvr-dh mono">${h}</h4><div class="prose"><ul role="list">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></div>` : '');
const cvRole = (r, i) => {
  const a = arcOf(r);
  const live = !r.endDate;
  const steps = [['00', 'Starting point', a.start], ...a.built.map((b, k) => [pad(k + 1), '', b]), ['100', live ? 'Where it stands now' : 'Where it ended', a.result]];
  return `<li class="cvr${live ? ' is-now' : ''}" id="role-${slug(r.name)}">
<p class="cvr-top mono"><span>Role ${pad(i + 1)} / ${pad(N_ROLES)}</span><span>${fmt(r.startDate)} to ${fmt(r.endDate)}${live ? ' <span class="tl-live">Live</span>' : ''}</span></p>
<div class="cvr-grid">
<div class="cvr-meta">
<h3 class="cvr-h">${esc(r.position)}<span>${r.url ? `<a class="ulink" href="${r.url}">${esc(r.name)}</a>` : esc(r.name)}</span></h3>
<p class="cvr-where mono">${esc(a.where)}</p>
<p class="cvr-sum">${esc(r.summary)}</p>
<h4 class="cvr-dh mono">Goals and results</h4>
<ul class="chips" role="list">${a.goals.map(([k, v]) => `<li><span class="mono">${esc(k)}</span><strong>${esc(v)}</strong></li>`).join('')}</ul>
</div>
<div class="cvr-arc">
<h4 class="cvr-dh mono">From 0 to 100</h4>
<ol class="arc" role="list">${steps.map(([n, k, t], j) => `<li class="arc-s${j === 0 ? ' is-start' : ''}${j === steps.length - 1 ? ' is-end' : ''}"><span class="arc-n mono" aria-hidden="true">${n}</span><p>${k ? `<strong class="arc-k">${k}.</strong> ` : ''}${esc(t)}</p></li>`).join('')}</ol>
</div>
</div>
<div class="cvr-details">${detail('Team and leadership', a.team)}${detail('Regulated and safe by design', a.safe)}${detail('Key results', r.highlights)}</div>
</li>`;
};
const cvIndex = `<ol class="cv-index" role="list">${resume.work.map((r, i) => `<li><a href="#role-${slug(r.name)}"><span class="mono">${pad(i + 1)}</span><span class="cvi-t">${esc(r.name.replace(/ \(.*\)$/, ''))}<span class="cvi-pos">${esc(r.position)}</span></span><span class="cvi-when mono">${r.startDate.slice(0, 4)} to ${r.endDate ? r.endDate.slice(0, 4) : 'now'}</span></a></li>`).join('')}</ol>`;
const recList = `<ol class="cred-list rec-list" role="list">${recognition.map((x, i) => `<li class="cred${x.tag === 'Context' ? ' is-context' : ''}" data-reveal style="--d:${(i % 4) * 70}ms">
<p class="cred-top mono"><span>${esc(x.tag)}</span><span>${esc(x.when)}</span></p>
<p class="cred-name">${esc(x.h)}</p>
<p class="rec-p">${esc(x.p)}</p>
${x.url ? `<p class="cred-foot mono"><span></span><a class="ulink cred-verify" href="${x.url}">${esc(x.link)}<span class="visually-hidden">: ${esc(x.h)}</span> ${arrow}</a></p>` : ''}
</li>`).join('')}</ol>
<h3 class="cv-sub">Press, October 2026</h3>
<ol class="cv-press" role="list">${press.map((p, i) => `<li><span class="mono cvp-n">${pad(i + 1)}</span><span class="cvp-o">${esc(p.outlet)}<span class="mono">${esc(p.date)}, ${esc(p.lang)}</span></span>${p.url ? `<a class="ulink cvp-t" href="${p.url}" hreflang="${p.lang === 'RO' ? 'ro' : 'en'}">${esc(p.title)}</a>` : `<span class="cvp-t">${esc(p.title)}</span>`}</li>`).join('')}</ol>`;
const certTable = `<div class="ct-wrap"><table class="ct">
<caption class="visually-hidden">All ${certs.length} certifications with issuer, issue date, credential ID and verify link</caption>
<thead><tr><th scope="col">Credential</th><th scope="col">Issuer</th><th scope="col">Issued</th><th scope="col">Credential ID</th><th scope="col"><span class="visually-hidden">Verify link</span></th></tr></thead>
${[...new Set(certs.map((c) => c.group))].map((g) => { const list = certs.filter((c) => c.group === g); return `<tbody><tr class="ct-g"><th scope="rowgroup" colspan="5"><span>${esc(g)}</span> <span class="mono">${pad(list.length)}</span></th></tr>
${list.map((c) => `<tr><th scope="row">${esc(c.name)}</th><td data-l="Issuer">${esc(c.issuer)}</td><td data-l="Issued">${certWhen(c)}</td><td data-l="ID" class="ct-id mono">${c.id ? esc(c.id) : ''}</td><td class="ct-v">${certVerify(c)}</td></tr>`).join('')}</tbody>`; }).join('')}
</table></div>`;
const eduList = `<ul class="plain" role="list">${resume.education.map((e) => `<li>${esc(e.studyType)}, ${esc(e.area)}, ${esc(e.institution)} <span class="muted">(${e.startDate} to ${e.endDate})</span></li>`).join('')}</ul>`;
pages.push({
  path: '/cv/', current: '/cv/', title: 'CV', description: `CV of ${site.name}: ${resume.basics.label} Every role from starting point to result, with goals, team, safeguards, recognition and all ${certs.length} certifications.`,
  body: `${pageHero('Curriculum vitae', esc(resume.basics.summary), `<div class="ctas hero-fade" style="--d:.6s">${btn('/cv.pdf', 'Download the PDF', 'primary', ' download="Adrian_Capraru_CV.pdf"')}${btn('/resume.json', 'JSON Resume')}</div>`)}
<section class="sec cv-sec" aria-labelledby="exp-h"><div class="wrap">
<header class="sec-head">${label('01', 'Experience')}<h2 id="exp-h" data-reveal>Experience, from 0 to 100</h2><p data-reveal>${N_ROLES} roles, each told the same way: the starting point, what was built and in what order, the goals and results, the team, and the safeguards. A portfolio career since 2022: roles overlap by design.</p></header>
${cvIndex}
<ol class="cv-roles" role="list">${resume.work.map(cvRole).join('')}</ol>
</div></section>
<section class="sec cv-sec" aria-labelledby="rec-h"><div class="wrap">
<header class="sec-head">${label('02', 'Recognition')}<h2 id="rec-h" data-reveal>Achievements and recognition</h2><p data-reveal>Rankings, a grant, a regulator's licence, platform status, press and teaching. Only items with a public source or a filed record; company awards are marked as context.</p></header>
${recList}
</div></section>
${sec({ id: 'skills-h', n: '03', tag: 'Skills', h: 'Skills', inner: `<ul class="plain" role="list">${resume.skills.map((s) => `<li><strong>${esc(s.name)}:</strong> ${esc(s.keywords.join(', '))}</li>`).join('')}</ul>` })}
${sec({ id: 'pub-h', n: '04', tag: 'Publications', h: 'Publications', inner: `<ul class="plain" role="list">${resume.publications.map((x) => `<li>${x.url ? `<a class="ulink" href="${x.url}">${esc(x.name)}</a>` : esc(x.name)}${x.publisher ? `, ${esc(x.publisher)}` : ''}${x.releaseDate ? ` <span class="muted">(${fmt(x.releaseDate)})</span>` : ''}</li>`).join('')}</ul>` })}
${sec({ id: 'edu2-h', n: '05', tag: 'Education', h: 'Education', inner: eduList })}
<section class="sec cv-sec" aria-labelledby="cert2-h"><div class="wrap">
<header class="sec-head">${label('06', 'Credentials')}<h2 id="cert2-h" data-reveal>Certifications (${certs.length})</h2><p data-reveal>Every credential with its issuer, issue date and credential ID, and a link to the issuer's record.</p></header>
${certTable}
</div></section>`,
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
