# Design plan: "Blueprint to production"

Adrian takes AI systems for finance from the drawing board to running production. The site reads as an engineering drawing set that comes alive: Prussian blue sheets, drafting-white line work, mono annotations, title blocks and revision tags. One signal colour marks anything live or in production. Dark only, by choice: the portrait layers sit on a charcoal-navy ground and the blueprint needs a dark room.

## Palette

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#070B12` | page ground (matches the photo layer's charcoal-navy) |
| `--ink-2` | `#0C1320` | raised surfaces, cards |
| `--prussian` | `#0B2A5C` | blueprint sheets, the pipeline drawing |
| `--prussian-hi` | `#1B4F9C` | grid emphasis, hover fills |
| `--line` | `#22324A` | rules and borders |
| `--paper` | `#E9EEF5` | primary text, drafting white |
| `--paper-2` | `#97A6BB` | secondary text (8.0:1 on `--ink`) |
| `--draft` | `#9CC3FF` | blueprint line art, annotations, focus ring |
| `--signal` | `#FF8A2A` | "live / in production" only: status lamps, the live pipeline, primary CTA |

Contrast (computed): `--paper` on `--ink` 16.9:1, `--paper-2` 8.0:1 (7.0:1 on cards), `--draft` 11.0:1, `--signal` 8.4:1, `--ink` on `--signal` 8.4:1; on the Prussian pipeline sheet every text colour is 7:1 or higher.

## Type

- Display: **Newsreader** (variable, light 300 to 420, italic for one accent phrase per heading). Editorial, quiet authority.
- Body and UI: **Instrument Sans**.
- Annotations, labels, counters' units, drawing numbers: **IBM Plex Mono** 400/500, uppercase, +0.08em tracking.
- Scale: 1.25 ratio from 16px; display uses `clamp()` up to about 6.2rem.
- All fonts self-hosted in `src/assets/fonts/`.

## Motion system

- Easing: `cubic-bezier(.2,.7,0,1)` (expo-out feel) for reveals; `power2.inOut` for scrubs. Interactions 150 to 300ms, reveals 700 to 1100ms, stagger 40 to 80ms.
- Libraries: GSAP 3.15 + ScrollTrigger and Lenis 1.3, vendored in `src/assets/vendor/` (no CDN). Own code in `src/assets/js/main.js`.
- Progressive enhancement: every page is complete HTML. The hero reveal and preloader are pure CSS (no flash, no JS dependency). Scroll motion is set up by JS only when `prefers-reduced-motion: no-preference`; otherwise content renders in its final state.
- Budget per device: desktop with a fine pointer gets Lenis, the custom cursor, magnetic buttons, tilt, the pinned pipeline and the pinned horizontal rail. Touch and narrow screens get native scroll, a swipe carousel and on-view reveals only.

## Section map (home)

0. **Preloader** (first visit per session, about 1.5s): a title block and grid stroke-draw, counter 000 to 100, then a wipe into the hero.
1. **Hero**: split-word headline reveal, lede, magnetic CTAs; the portrait as a draggable seam slider (photo under blueprint, `clip-path`), idle auto-sweep, glowing handle, pointer parallax, live readout.
2. **Evidence ledger**: four figures with sources, counters tick on view.
3. **Press marquee**: outlet names; pauses on hover or focus, with a Pause motion button (WCAG 2.2.2).
4. **What Adrian builds**: three numbered drawing sheets.
5. **Blueprint to production** (pinned on desktop): the bills workflow draws itself node by node, then switches to LIVE in signal orange with packets running along the connectors.
6. **Selected work**: horizontal pinned rail on desktop, swipe carousel on touch; cards tilt, show a flow preview on hover, and share a view-transition name with the case-study hero.
7. **How the work runs**: three revisions (REV A to C) and four principles, plus the client quote.
8. **Career path**: every role, EvoEstate to InRento to HighCrowd (COO) to 3Descu to Systemartis to Innovium to M.A. Whately to independent practice, on a vertical timeline with a scroll-driven progress line.
9. **Certifications**: all 20 from `resume.json`, a credential wall grouped by theme (AI and product, FinTech and cloud, automation and data, leadership and agile, design) with issuer, date, credential ID and a verify link where the issuer provides one.
10. **Contact**: big CTA, copy-email button with toast.
Footer: a drawing title block.

## Atmosphere

A fixed canvas draws the blueprint grid with intersections that brighten near the pointer and a slow scan line. It caps DPR at 1.5, pauses when the tab is hidden, and draws once (static) under reduced motion. A static SVG grain overlay adds tooth.

## Page transitions

`@view-transition { navigation: auto; }`. Root cross-fade with a short lift; the case figure plate (`view-transition-name: c-<slug>`) morphs from the home card into the case-study hero. Disabled under reduced motion.
