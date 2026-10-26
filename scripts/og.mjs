// Generates OG images (1200x630) and the apple-touch-icon into src/static with local Chrome via Playwright.
// Same visual language as the site: Prussian blueprint sheet, drafting-white type, mono annotations, signal orange for "live".
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, work } from '../src/content.mjs';
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const OUT = join(SRC, 'static', 'og');
mkdirSync(OUT, { recursive: true });
const b64 = (p, type) => `data:${type};base64,${readFileSync(p).toString('base64')}`;
const font = (f) => b64(join(SRC, 'assets', 'fonts', f), 'font/woff2');
const portrait = b64(join(SRC, 'static', 'img', 'adrian-capraru.jpg'), 'image/jpeg');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = `@font-face{font-family:N;src:url(${font('newsreader.woff2')})}@font-face{font-family:NI;src:url(${font('newsreader-italic.woff2')})}@font-face{font-family:M;src:url(${font('plex-mono-500.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#070B12;color:#E9EEF5;font-family:N;position:relative;overflow:hidden;
background-image:linear-gradient(rgba(156,195,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(156,195,255,.07) 1px,transparent 1px);background-size:42px 42px}
.sheet{position:absolute;inset:28px;border:1px solid rgba(156,195,255,.45);padding:44px 52px;display:flex;flex-direction:column;justify-content:space-between}
.m{font-family:M;font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:#9CC3FF;display:flex;align-items:center;gap:14px}
.lamp{width:11px;height:11px;border-radius:50%;background:#FF8A2A;box-shadow:0 0 14px #FF8A2A}
h1{font-weight:340;font-size:56px;line-height:1.06;letter-spacing:-.02em;max-width:920px}
h1 em{font-family:NI;font-style:normal;color:#9CC3FF}
.row{display:flex;align-items:flex-end;gap:30px}.f{font-size:92px;line-height:.9;letter-spacing:-.03em;color:#FF8A2A}.l{font-family:M;font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:#97A6BB;max-width:520px;line-height:1.5;padding-bottom:8px}
.tb{position:absolute;right:28px;bottom:28px;display:grid;grid-template-columns:auto auto;border-left:1px solid rgba(156,195,255,.45);border-top:1px solid rgba(156,195,255,.45)}
.tb span{font-family:M;font-size:12px;letter-spacing:.12em;color:#9CC3FF;padding:9px 14px;border-right:1px solid rgba(156,195,255,.25);border-bottom:1px solid rgba(156,195,255,.25)}
.home .sheet{right:600px}.home h1{font-size:50px}.home .m{font-size:14px}h1{text-wrap:balance}
.pic{position:absolute;right:28px;top:28px;width:574px;height:574px;background:url(${portrait}) center/cover;border:1px solid rgba(156,195,255,.45)}`;
const tb = '<div class="tb"><span>DWG AC-001</span><span>REV 2026.10</span></div>';
const home = `<html><head><style>${css}</style></head><body class="home"><div class="sheet"><div class="m"><span class="lamp"></span>Adrian Capraru / Head of AI &amp; Automation</div>
<h1>Most AI projects in finance die between the demo and the audit. Adrian builds the ones that <em>survive both.</em></h1>
<div class="m" style="color:#97A6BB">Finance AI, from first commit to production</div></div><div class="pic"></div></body></html>`;
const card = (title, fig, label) => `<html><head><style>${css}</style></head><body><div class="sheet"><div class="m"><span class="lamp"></span>Adrian Capraru / Case study</div><h1>${esc(title)}</h1><div class="row"><div class="f">${esc(fig)}</div><div class="l">${esc(label)}</div></div></div>${tb}</body></html>`;
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const jobs = [['default', home], ...work.map((w) => [w.slug, card(w.title, w.fig, w.figLabel)])];
for (const [name, html] of jobs) { await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: join(OUT, `${name}.png`) }); }
await p.setViewportSize({ width: 180, height: 180 });
await p.setContent(`<html><body style="margin:0">${readFileSync(join(SRC, 'static', 'favicon.svg'), 'utf8').replace('<svg ', '<svg width="180" height="180" ')}</body></html>`);
await p.screenshot({ path: join(SRC, 'static', 'apple-touch-icon.png') });
await b.close();
console.log(`OG images: ${jobs.length}`);
