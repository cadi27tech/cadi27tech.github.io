// Visual QA: desktop + mobile, light + dark, full-page screenshots into qa/. Also flags horizontal overflow and console errors.
// node scripts/qa.mjs [baseUrl]  (default: local dist/ on :4321)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { serve } from './serve.mjs';
const base = process.argv[2] || 'http://localhost:4321';
const server = process.argv[2] ? null : await serve(4321);
mkdirSync('qa', { recursive: true });
const pages = ['/', '/work/accountancy-saas-live-in-10-days/', '/work/eu-crowdfunding-licence-asf-authorisation/', '/about/', '/press/', '/cv/', '/contact/'];
const views = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const b = await chromium.launch({ channel: 'chrome' });
let problems = 0;
for (const [vname, viewport] of Object.entries(views)) for (const scheme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport, colorScheme: scheme, reducedMotion: 'reduce', deviceScaleFactor: vname === 'mobile' ? 2 : 1 });
  const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error') { problems++; console.log(`console error ${m.text()}`); } });
  for (const path of pages) {
    const r = await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (r.status() !== 200 || over > 0) { problems++; console.log(`${vname} ${scheme} ${path}: status ${r.status()}, overflow ${over}px`); }
    const name = (path === '/' ? 'home' : path.split('/').filter(Boolean).pop());
    await p.screenshot({ path: `qa/${vname}-${scheme}-${name}.png`, fullPage: true });
  }
  await ctx.close();
}
await b.close(); server?.close();
console.log(problems ? `${problems} problem(s)` : 'QA clean: 200s, no overflow, no console errors');
