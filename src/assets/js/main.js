/* Motion and interaction layer. Every page is complete without this file; it only adds behaviour.
   Order: always-on helpers, then pointer extras (fine pointers only), then GSAP scroll motion (no reduced motion). */
(() => {
  const d = document, root = d.documentElement, w = window;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const G = w.gsap, ST = w.ScrollTrigger;
  const loading = root.classList.contains('is-loading');
  const heroDelay = loading ? 1300 : 0;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));

  // ---------- Preloader counter (the sheet itself is CSS-timed and always clears) ----------
  if (loading) {
    const out = $('.pre-count'), t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1000);
      out.textContent = String(Math.round((1 - Math.pow(1 - k, 3)) * 100)).padStart(3, '0');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------- Local time in the header ----------
  const clock = $('[data-clock]');
  if (clock) {
    const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Bucharest' });
    const tick = () => { clock.textContent = `${f.format(new Date())} EET`; };
    tick(); setInterval(tick, 30000);
  }

  // ---------- Toast + copy email ----------
  const toastEl = $('.toast');
  let toastTimer = 0;
  const toast = (msg) => {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  };
  $$('[data-copy]').forEach((b) => {
    b.hidden = false;
    b.addEventListener('click', async () => {
      const v = b.dataset.copy;
      try { await navigator.clipboard.writeText(v); toast(`Copied ${v}`); }
      catch { toast(`Copy blocked by the browser. The address is ${v}`); }
    });
  });

  // ---------- Marquee pause control (WCAG 2.2.2) ----------
  const mq = $('.marquee'), mqBtn = $('.marquee-toggle');
  if (mq && mqBtn && !reduce) {
    mqBtn.hidden = false;
    mqBtn.addEventListener('click', () => {
      const on = mq.classList.toggle('is-paused');
      mqBtn.setAttribute('aria-pressed', String(on));
      mqBtn.firstElementChild.textContent = on ? 'Play motion' : 'Pause motion';
    });
  }

  // ---------- Testimonial wall: native sideways scroll, plus mouse drag, step buttons and a progress bar ----------
  $$('.qwall').forEach((wall) => {
    const sec = wall.closest('section'), btns = $('.qwall-btns', sec), bar = $('.rail-bar', sec);
    const upd = () => bar && bar.style.setProperty('--p', Math.max(0.08, (wall.scrollLeft + wall.clientWidth) / wall.scrollWidth).toFixed(3));
    wall.addEventListener('scroll', upd, { passive: true }); upd();
    if (btns) {
      btns.hidden = false;
      btns.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) wall.scrollBy({ left: +b.dataset.step * wall.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' }); });
    }
    let x0 = 0, s0 = 0, drag = false, moved = false;
    wall.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = true; moved = false; x0 = e.clientX; s0 = wall.scrollLeft;
    });
    addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 5) { moved = true; wall.classList.add('is-drag'); }
      if (moved) wall.scrollLeft = s0 - dx;
    });
    addEventListener('pointerup', () => { drag = false; wall.classList.remove('is-drag'); });
    // A drag that ends on a link must not follow it.
    wall.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  });

  // ---------- Header hides on scroll down, returns on scroll up ----------
  const head = $('.site-head');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (Math.abs(y - lastY) < 6) return;
    head.classList.toggle('is-hidden', y > lastY && y > 240 && !head.contains(d.activeElement));
    lastY = y;
  }, { passive: true });

  // ---------- Hero seam slider ----------
  const stage = $('.seam');
  if (stage) {
    const hit = $('.seam-hit', stage), read = $('.seam-read'), fig = stage.closest('.portrait');
    const attrs = { role: 'slider', tabindex: '0', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-orientation': 'horizontal', 'aria-label': 'Portrait seam between photo and blueprint' };
    Object.entries(attrs).forEach(([k, v]) => hit.setAttribute(k, v));
    hit.dataset.cursor = 'Drag';
    let x = 46, auto = !reduce, visible = true, raf = 0, phase = 0, last = 0, dragging = false, pending = false, sx = 0;
    const set = (v) => {
      x = Math.max(0, Math.min(100, v));
      stage.style.setProperty('--x', `${x.toFixed(2)}%`);
      if (read) read.textContent = x.toFixed(1).padStart(5, '0');
    };
    const aria = () => {
      hit.setAttribute('aria-valuenow', String(Math.round(x)));
      hit.setAttribute('aria-valuetext', `${Math.round(x)} percent: photo on the left, blueprint on the right`);
    };
    set(46); aria();
    // Idle sweep: starts after the hero reveal, pauses off-screen or in a hidden tab, settles after two passes, stops for good on any interaction.
    const begin = performance.now() + heroDelay + 2300;
    const sweep = (t) => {
      if (!auto || !visible || d.hidden) { raf = 0; return; }
      if (t > begin) {
        phase += Math.min(50, last ? t - last : 0);
        if (phase > Math.PI * 2 * 2600 * 2) { auto = false; set(46); raf = 0; return; }
        set(46 + 24 * Math.sin(phase / 2600));
      }
      last = t; raf = requestAnimationFrame(sweep);
    };
    const kick = () => { if (auto && visible && !d.hidden && !raf) { last = 0; raf = requestAnimationFrame(sweep); } };
    const stop = () => { auto = false; cancelAnimationFrame(raf); raf = 0; };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(stage);
    d.addEventListener('visibilitychange', kick);
    kick();

    const fromEvent = (e) => { const r = stage.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
    const startDrag = (e) => { stop(); dragging = true; stage.classList.add('is-drag'); hit.setPointerCapture(e.pointerId); fromEvent(e); };
    hit.addEventListener('pointerdown', (e) => {
      sx = e.clientX;
      // Touch waits for a horizontal move so a vertical page scroll never jumps the seam.
      if (e.pointerType === 'mouse') startDrag(e); else pending = true;
    });
    hit.addEventListener('pointermove', (e) => {
      if (pending && Math.abs(e.clientX - sx) > 6) { pending = false; startDrag(e); }
      if (dragging) fromEvent(e);
    });
    const end = (e) => {
      if (pending && e.type === 'pointerup') { stop(); fromEvent(e); aria(); }
      pending = false;
      if (!dragging) return;
      dragging = false; stage.classList.remove('is-drag'); aria();
    };
    hit.addEventListener('pointerup', end);
    hit.addEventListener('pointercancel', end);
    hit.addEventListener('focus', () => { stop(); aria(); });
    hit.addEventListener('keydown', (e) => {
      const step = { ArrowLeft: -2, ArrowDown: -2, ArrowRight: 2, ArrowUp: 2, PageDown: -10, PageUp: 10 }[e.key];
      let v = null;
      if (step) v = x + step; else if (e.key === 'Home') v = 0; else if (e.key === 'End') v = 100;
      if (v === null) return;
      e.preventDefault(); stop(); set(v); aria();
    });

    // Pointer parallax: frame and crop marks drift against each other.
    if (fine && !reduce) {
      const hero = stage.closest('.hero');
      let px = 0, py = 0, pr = 0;
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        px = ((e.clientX - r.left) / r.width) * 2 - 1; py = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (!pr) pr = requestAnimationFrame(() => { pr = 0; fig.style.setProperty('--px', px.toFixed(3)); fig.style.setProperty('--py', py.toFixed(3)); });
      });
      hero.addEventListener('pointerleave', () => { fig.style.setProperty('--px', '0'); fig.style.setProperty('--py', '0'); });
      stage.addEventListener('pointerenter', stop);
    }
  }

  // ---------- Atmosphere: pointer-lit grid crosses and a slow scan line ----------
  const cv = $('.atmos canvas');
  const ctx = cv && cv.getContext('2d');
  if (ctx) {
    const S = 56, R = 240, base = d.createElement('canvas'), bctx = base.getContext('2d');
    let W = 0, H = 0, dpr = 1, mx = -1e4, my = -1e4, raf = 0, odd = false;
    const size = () => {
      dpr = Math.min(1.5, w.devicePixelRatio || 1); W = innerWidth; H = innerHeight;
      for (const c of [cv, base]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, W, H); bctx.strokeStyle = 'rgba(156,195,255,.16)'; bctx.lineWidth = 1; bctx.beginPath();
      for (let x = S; x < W; x += S) for (let y = S; y < H; y += S) { bctx.moveTo(x - 2.5, y + 0.5); bctx.lineTo(x + 3.5, y + 0.5); bctx.moveTo(x + 0.5, y - 2.5); bctx.lineTo(x + 0.5, y + 3.5); }
      bctx.stroke();
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(base, 0, 0, W, H);
      if (mx > -1e3) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, R);
        g.addColorStop(0, 'rgba(156,195,255,.06)'); g.addColorStop(1, 'rgba(156,195,255,0)');
        ctx.fillStyle = g; ctx.fillRect(mx - R, my - R, R * 2, R * 2);
        for (let x = Math.ceil((mx - R) / S) * S; x < mx + R; x += S) for (let y = Math.ceil((my - R) / S) * S; y < my + R; y += S) {
          const k = 1 - Math.hypot(x - mx, y - my) / R;
          if (k <= 0 || x <= 0 || y <= 0) continue;
          const s = 3 + k * 5;
          ctx.strokeStyle = `rgba(156,195,255,${(k * 0.75).toFixed(3)})`; ctx.beginPath();
          ctx.moveTo(x - s, y + 0.5); ctx.lineTo(x + s + 1, y + 0.5); ctx.moveTo(x + 0.5, y - s); ctx.lineTo(x + 0.5, y + s + 1); ctx.stroke();
        }
      }
      if (t) {
        const sy = ((t * 0.04) % (H + 400)) - 200;
        const sg = ctx.createLinearGradient(0, sy - 120, 0, sy);
        sg.addColorStop(0, 'rgba(156,195,255,0)'); sg.addColorStop(1, 'rgba(156,195,255,.035)');
        ctx.fillStyle = sg; ctx.fillRect(0, sy - 120, W, 120);
        ctx.fillStyle = 'rgba(156,195,255,.12)'; ctx.fillRect(0, sy, W, 1);
      }
    };
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!fine && (odd = !odd)) return; // touch devices: half the frame budget
      draw(t);
    };
    const start = () => { if (!raf && !d.hidden) raf = requestAnimationFrame(loop); };
    const halt = () => { cancelAnimationFrame(raf); raf = 0; };
    size();
    if (reduce) {
      draw(0);
      addEventListener('resize', () => { size(); draw(0); });
    } else {
      start();
      d.addEventListener('visibilitychange', () => (d.hidden ? halt() : start()));
      addEventListener('resize', size);
      if (fine) addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    }
  }

  // ---------- Fine-pointer extras: cursor, magnetic buttons, card tilt ----------
  if (fine && !reduce) {
    const c = $('.cursor'), lab = $('.cursor-label', c);
    root.classList.add('has-cursor');
    let tx = -100, ty = -100, cx = -100, cy = -100, run = false, cur;
    const follow = () => {
      cx += (tx - cx) * 0.24; cy += (ty - cy) * 0.24;
      c.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.2) requestAnimationFrame(follow); else run = false;
    };
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY; c.classList.remove('is-out');
      if (!run) { run = true; requestAnimationFrame(follow); }
    }, { passive: true });
    d.addEventListener('pointerover', (e) => {
      const el = e.target.closest('[data-cursor], a, button, [role="slider"]');
      if (el === cur) return;
      cur = el;
      const text = (el && el.dataset.cursor) || '';
      c.classList.toggle('is-link', !!el); c.classList.toggle('has-label', !!text); lab.textContent = text;
    });
    d.addEventListener('pointerout', (e) => { if (!e.relatedTarget) c.classList.add('is-out'); });

    $$('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });

    $$('.card > a').forEach((a) => {
      a.addEventListener('pointermove', (e) => {
        const r = a.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        a.style.setProperty('--ry', `${((nx - 0.5) * 8).toFixed(2)}deg`); a.style.setProperty('--rx', `${((0.5 - ny) * 6).toFixed(2)}deg`);
        a.style.setProperty('--mx', `${(nx * 100).toFixed(1)}%`); a.style.setProperty('--my', `${(ny * 100).toFixed(1)}%`);
      });
      a.addEventListener('pointerleave', () => { a.style.setProperty('--rx', '0deg'); a.style.setProperty('--ry', '0deg'); });
    });
  }

  // ---------- Scroll motion (GSAP + ScrollTrigger + Lenis). Skipped entirely under reduced motion. ----------
  if (reduce || !G || !ST) return;
  G.registerPlugin(ST);

  let lenis = null;
  if (fine && w.Lenis) {
    lenis = new w.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ST.update);
    G.ticker.add((t) => lenis.raf(t * 1000));
    G.ticker.lagSmoothing(0);
  }
  const scrollToY = (y) => (lenis ? lenis.scrollTo(y, { immediate: true }) : w.scrollTo(0, y));

  // Counters: the HTML holds the final value; only quantities with one number tick.
  const counter = (el, width = el.getBoundingClientRect().width) => {
    const m = el.textContent.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/);
    if (!m || /\d/.test(m[3])) return null;
    const [, pre, num, post] = m, dec = (num.split('.')[1] || '').length, target = parseFloat(num.replace(/,/g, '')), comma = num.includes(',');
    const fmt = (v) => pre + (comma ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec)) + post;
    el.style.minWidth = `${width}px`;
    const o = { v: 0 };
    el.textContent = fmt(0);
    return { el, o, target, fmt, draw: () => { el.textContent = fmt(o.v); } };
  };
  // Read every width first, then write, so the counters cost one layout pass.
  const countEls = $$('[data-count]').filter((el) => !el.closest('.pipe')); // pipeline counters are driven by its timeline
  const countW = countEls.map((el) => el.getBoundingClientRect().width);
  countEls.forEach((el, i) => {
    const c = counter(el, countW[i]);
    if (!c) return;
    const delay = el.closest('.hero') ? heroDelay / 1000 + 0.5 : 0;
    ST.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => G.to(c.o, { v: c.target, duration: 1.8, delay, ease: 'expo.out', onUpdate: c.draw }) });
  });

  // Reveals (opacity only, never visibility, so keyboard focus still reaches everything)
  $$('[data-reveal]').forEach((el) => {
    const delay = (parseFloat(el.style.getPropertyValue('--d')) || 0) / 1000;
    // CSS hover transitions on transform would fight the tween, so they are parked until it finishes.
    el.style.transition = 'none';
    G.from(el, { y: 36, opacity: 0, duration: 1.1, delay, ease: 'expo.out', clearProps: 'transform,opacity', onComplete: () => { el.style.transition = ''; }, scrollTrigger: { trigger: el, start: 'top 90%', once: true, onEnter: () => el.classList.add('is-in') } });
  });
  $$('.label i').forEach((i) => G.from(i, { scaleX: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: i, start: 'top 92%', once: true } }));

  // Hero copy drifts up and dims as the page scrolls away from it.
  const heroCopy = $('.hero-copy');
  if (heroCopy) G.to(heroCopy, { y: -90, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true } });

  const mm = G.matchMedia();

  // Blueprint to production: drawn node by node, then switched to live.
  const pipe = $('.pipe-sec');
  if (pipe) {
    const nodes = $$('.node', pipe);
    const setLive = (on) => pipe.classList.toggle('is-live', on);
    mm.add({ pin: '(min-width: 88rem) and (min-height: 44rem), (min-width: 64rem) and (min-height: 62rem)' }, (mctx) => {
      setLive(false);
      const counters = [];
      const build = (n, tl, at, vertical) => {
        tl.fromTo($('.node-frame rect', n), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' }, at)
          .from($$('.node-id, h3, p', n), { opacity: 0, y: 14, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, at + 0.25);
        const num = $('[data-count]', n), c = num && counter(num);
        if (c) { counters.push(c); tl.to(c.o, { v: c.target, duration: 0.7, ease: 'power2.out', onUpdate: c.draw }, at + 0.45); }
        const wire = $('.wire', n);
        if (wire) tl.from(wire, vertical ? { scaleY: 0, duration: 0.4 } : { scaleX: 0, duration: 0.4 }, at + 0.7);
      };
      if (mctx.conditions.pin) {
        const tl = G.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: pipe, start: 'top top', end: `+=${nodes.length * 42 + 60}%`, pin: true, scrub: 0.8, onUpdate: (s) => setLive(s.progress > 0.86) } });
        tl.from($('.pipe-grid', pipe), { opacity: 0, scale: 1.06, duration: 1 }, 0);
        nodes.forEach((n, i) => build(n, tl, 0.4 + i, false));
        tl.to({}, { duration: 1.4 });
      } else {
        const vertical = !matchMedia('(min-width: 64rem)').matches;
        nodes.forEach((n, i) => {
          const tl = G.timeline({ scrollTrigger: { trigger: n, start: 'top 85%', once: true, onEnter: () => { if (i === nodes.length - 1) setTimeout(() => setLive(true), 900); } } });
          build(n, tl, 0, vertical);
        });
      }
      return () => { counters.forEach((c) => { c.o.v = c.target; c.draw(); }); setLive(true); };
    });
  }

  // Selected work: pinned horizontal rail on desktop, native swipe elsewhere; both drive the progress readout.
  const railSec = $('.rail-sec');
  if (railSec) {
    const rail = $('.rail', railSec), track = $('.rail-track', rail), bar = $('.rail-bar', railSec), cnt = $('.rail-count', railSec);
    const N = track.children.length, total = String(N).padStart(2, '0');
    const upd = (p) => {
      bar.style.setProperty('--p', Math.max(1 / N, p).toFixed(3));
      cnt.textContent = `${String(Math.min(N, Math.round(p * (N - 1)) + 1)).padStart(2, '0')} / ${total}`;
    };
    mm.add({ pin: '(min-width: 64rem) and (min-height: 46rem)' }, (mctx) => {
      if (!mctx.conditions.pin) {
        const onScroll = () => upd(rail.scrollLeft / Math.max(1, rail.scrollWidth - rail.clientWidth));
        rail.addEventListener('scroll', onScroll, { passive: true });
        return () => rail.removeEventListener('scroll', onScroll);
      }
      railSec.classList.add('is-pinned'); rail.classList.add('is-pinned');
      const dist = () => Math.max(0, track.scrollWidth - rail.clientWidth);
      const tw = G.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: railSec, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (s) => upd(s.progress) } });
      // Keyboard users: tabbing to an off-screen card scrolls the page to the point where that card is in view.
      const onFocus = (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        requestAnimationFrame(() => {
          const st = tw.scrollTrigger, p = Math.min(1, Math.max(0, (card.offsetLeft - rail.clientWidth * 0.08) / Math.max(1, dist())));
          scrollToY(st.start + p * (st.end - st.start));
        });
      };
      track.addEventListener('focusin', onFocus);
      return () => { railSec.classList.remove('is-pinned'); rail.classList.remove('is-pinned'); track.removeEventListener('focusin', onFocus); };
    });
  }

  // Career path: progress line scrubs with scroll, nodes light as they are reached.
  $$('.tl').forEach((tlEl) => {
    tlEl.classList.add('is-armed');
    G.fromTo($('.tl-fill', tlEl), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tlEl, start: 'top 65%', end: 'bottom 65%', scrub: true } });
    $$('.tl-item', tlEl).forEach((it) => ST.create({ trigger: it, start: 'top 65%', onEnter: () => it.classList.add('is-on'), onLeaveBack: () => it.classList.remove('is-on') }));
  });

  if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ST.refresh());
})();
