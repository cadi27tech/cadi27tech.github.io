// Visual QA into qa/. Two passes, desktop + mobile:
// 1. Reduced motion: full-page screenshots of every key page (the final, readable state), status, overflow, console errors.
// 2. Motion: the home page as a visitor sees it. Preloader clears, viewport screenshots down the scroll, seam slider keyboard check, LCP and CLS.
// node scripts/qa.mjs [baseUrl]  (default: local dist/ on :4321)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { serve } from './serve.mjs';
const base = process.argv[2] || 'http://localhost:4321';
const server = process.argv[2] ? null : await serve(4321);
mkdirSync('qa', { recursive: true });
const pages = ['/', '/work/', '/work/accountancy-saas-live-in-10-days/', '/work/eu-crowdfunding-licence-asf-authorisation/', '/about/', '/press/', '/cv/', '/contact/'];
const views = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const b = await chromium.launch({ channel: 'chrome' });
let problems = 0;
const fail = (msg) => { problems++; console.log(`FAIL ${msg}`); };
const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

for (const [vname, viewport] of Object.entries(views)) {
  const ctx = await b.newContext({ viewport, reducedMotion: 'reduce', deviceScaleFactor: vname === 'mobile' ? 2 : 1, hasTouch: vname === 'mobile', isMobile: vname === 'mobile' });
  const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error') fail(`${vname} console: ${m.text()}`); });
  p.on('pageerror', (e) => fail(`${vname} pageerror: ${e.message}`));
  for (const path of pages) {
    const r = await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const over = await overflow(p);
    if (r.status() !== 200 || over > 0) fail(`${vname} ${path}: status ${r.status()}, overflow ${over}px`);
    const name = path === '/' ? 'home' : path.split('/').filter(Boolean).pop();
    // Chrome caps a capture at about 16K device px and repeats content past it: tall pages (the long-form /cv) go out in parts.
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    const max = Math.floor(16000 / (vname === 'mobile' ? 2 : 1));
    if (h <= max) await p.screenshot({ path: `qa/${vname}-${name}.png`, fullPage: true });
    else for (let y = 0, k = 1; y < h; y += max, k++) await p.screenshot({ path: `qa/${vname}-${name}-${k}.png`, fullPage: true, clip: { x: 0, y, width: viewport.width, height: Math.min(max, h - y) } });
  }
  await ctx.close();
}

for (const [vname, viewport] of Object.entries(views)) {
  const ctx = await b.newContext({ viewport, deviceScaleFactor: 1, hasTouch: vname === 'mobile', isMobile: vname === 'mobile' });
  await ctx.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error') fail(`${vname} motion console: ${m.text()}`); });
  p.on('pageerror', (e) => fail(`${vname} motion pageerror: ${e.message}`));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `qa/motion-${vname}-00-preloader.png` });
  await p.waitForTimeout(2600);
  const pre = await p.evaluate(() => getComputedStyle(document.querySelector('.preloader')).visibility === 'visible' && getComputedStyle(document.querySelector('.preloader')).display !== 'none');
  if (pre) fail(`${vname} preloader still visible after 3s`);
  await p.screenshot({ path: `qa/motion-${vname}-01-hero.png` });
  const { lcp, cls } = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(4) }));
  console.log(`${vname} home: LCP ${lcp} ms (includes the first-visit preloader), CLS ${cls}`);
  if (cls > 0.1) fail(`${vname} CLS ${cls}`);
  // Seam slider: keyboard operable
  const slider = p.locator('.seam-hit');
  await slider.focus();
  await p.keyboard.press('Home');
  for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowRight');
  const now = await slider.getAttribute('aria-valuenow');
  if (now !== '10') fail(`${vname} seam slider aria-valuenow ${now}, expected 10 after Home + 5 x ArrowRight`);
  await p.keyboard.press('End');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `qa/motion-${vname}-02-seam-end.png` });
  await p.keyboard.press('Home');
  await p.keyboard.press('PageUp'); await p.keyboard.press('PageUp'); await p.keyboard.press('PageUp');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `qa/motion-${vname}-03-seam-30.png` });
  await slider.blur();
  // Scroll the whole page in steps (drives pins, scrubs, counters and reveals)
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const steps = vname === 'desktop' ? 24 : 18;
  for (let i = 1; i <= steps; i++) {
    const target = Math.round((H * i) / steps);
    for (let y = await p.evaluate(() => scrollY); y < target; y += 160) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(16); }
    await p.evaluate((v) => window.scrollTo(0, v), target);
    await p.waitForTimeout(1100);
    await p.screenshot({ path: `qa/motion-${vname}-${String(i + 3).padStart(2, '0')}-scroll.png` });
  }
  const over = await overflow(p);
  if (over > 0) fail(`${vname} motion overflow ${over}px`);
  // Card to case study: cross-document view transition with the shared figure plate
  await p.goto(base + '/work/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.locator('.card a').first().click();
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(1800);
  if (!p.url().includes('/work/accountancy-saas-live-in-10-days/')) fail(`${vname} card navigation landed on ${p.url()}`);
  await p.screenshot({ path: `qa/motion-${vname}-case.png` });
  await ctx.close();
}

await b.close(); server?.close();
console.log(problems ? `${problems} problem(s)` : 'QA clean: 200s, no overflow, no console errors, slider OK, CLS under 0.1');
