// Generates OG images (1200x630) and the apple-touch-icon into src/static with local Chrome via Playwright.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, work } from '../src/content.mjs';
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const OUT = join(SRC, 'static', 'og');
mkdirSync(OUT, { recursive: true });
const font = (f) => `data:font/woff2;base64,${readFileSync(join(SRC, 'assets', 'fonts', f)).toString('base64')}`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = `@font-face{font-family:N;src:url(${font('newsreader.woff2')})}@font-face{font-family:I;src:url(${font('instrument-sans.woff2')})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#0D1720;color:#E5EBF0;font-family:I;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.n{font-size:28px;font-weight:600}.n span{color:#9DABB8;font-weight:400}h1{font-family:N;font-weight:400;font-size:62px;line-height:1.08;letter-spacing:-.02em;max-width:980px}
.row{display:flex;align-items:baseline;gap:28px;border-top:1px solid #273846;padding-top:28px}.f{font-family:N;font-size:76px;line-height:1}.l{font-size:26px;color:#9DABB8;max-width:640px}
svg{width:34px;height:34px;align-self:center}`;
const tick = '<svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9" fill="none" stroke="#5CC796" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const card = (title, fig, label) => `<html><head><style>${css}</style></head><body><div class="n">Adrian Capraru <span>Head of AI &amp; Automation</span></div><h1>${esc(title)}</h1><div class="row">${tick}<div class="f">${esc(fig)}</div><div class="l">${esc(label)}</div></div></body></html>`;
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const jobs = [['default', card(site.hook, '10 days', 'an accountancy platform from first commit to live production')], ...work.map((w) => [w.slug, card(w.title, w.fig, w.figLabel)])];
for (const [name, html] of jobs) { await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: join(OUT, `${name}.png`) }); }
await p.setViewportSize({ width: 180, height: 180 });
await p.setContent(`<html><body style="margin:0">${readFileSync(join(SRC, 'static', 'favicon.svg'), 'utf8').replace('<svg ', '<svg width="180" height="180" ')}</body></html>`);
await p.screenshot({ path: join(SRC, 'static', 'apple-touch-icon.png'), omitBackground: true });
await b.close();
console.log(`OG images: ${jobs.length}`);
