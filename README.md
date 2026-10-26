# Adrian Capraru - personal site

Static site, zero runtime dependencies. Live at https://cadi27tech.github.io/ (GitHub Pages, repo `cadi27tech/cadi27tech.github.io`).

## Where content lives

| What | File |
|---|---|
| Identity, hero numbers, "What Adrian builds", method, principles, press list, the 6 case studies | `src/content.mjs` |
| Roles, education, certificates, skills (single source for the timeline, /about, /cv, `/resume.json`, `/llms.txt`) | `src/resume.json` (JSON Resume 1.x) |
| Page templates, JSON-LD, sitemap, robots, llms.txt | `src/build.mjs` |
| Styles and design tokens (light and dark) | `src/assets/site.css` |
| Fonts (self-hosted, OFL: Newsreader, Instrument Sans) | `src/assets/fonts/` |
| Favicon, OG images, apple-touch-icon, CV PDF | `src/static/` (copied to the site root) |

Facts must come from `deliverables/V3-BRIEF.md` and `research/09d-achievement-bank.md` in the parent project. Rules: ASCII hyphen only (no em or en dashes), clients by type never by name, never name manufacturing partners, no phone number.

## Common updates

- **Change a number or a sentence:** edit `src/content.mjs` or `src/resume.json`, then `npm run build`.
- **Add a case study:** add an object to `work` in `src/content.mjs` (copy an existing one), then `npm run og` to create its OG image. Slug = URL.
- **Add a press article:** add it to `press` in `src/content.mjs`. Only add a `url` that returns the article.
- **Replace the CV PDF:** copy the new file over `src/static/cv.pdf`.
- **Bump the "Updated" date:** `meta.lastModified` in `src/resume.json` (also used for sitemap lastmod).

## Commands

```
npm install        # only needed for OG images and QA (Playwright, uses local Chrome)
npm run build      # writes dist/
npm run serve      # build, then preview on http://localhost:4321
npm run og         # regenerate src/static/og/*.png and apple-touch-icon.png
npm run qa         # screenshots (desktop + mobile, light + dark) into qa/, checks status, overflow, console errors
```

`node scripts/qa.mjs https://cadi27tech.github.io` runs the same QA against the live site.

## Deploy

Push to `main`. The workflow in `.github/workflows/pages.yml` runs `node src/build.mjs` and publishes `dist/` to GitHub Pages. On this Windows machine: `git -c http.sslBackend=schannel push`.

Before pushing, scan for secrets and client names (see the parent project's scan list), because the repo is public.
