# AGENTS.md

## Commands
- Use npm; `package-lock.json` is the lockfile and the GitHub Pages action autodetects npm.
- Node must satisfy `>=22.12.0` (`withastro/action@v6` defaults to Node 24 in CI).
- Local dev: `npm run dev`.
- Production check: `npm run build`.
- Preview a built site: `npm run preview`.
- There is no configured lint, formatter, test, or typecheck script beyond `astro build`.

## App Shape
- This is an Astro 7 static site with Tailwind v4 through `@tailwindcss/vite`, plus MDX and `@astrojs/sitemap` registered in `astro.config.mjs`.
- Markdown/MDX use the `unified()` processor from `@astrojs/markdown-remark` (Astro 7 defaults to Sätteri) so the remark/rehype plugins keep working: `remark-math` + `rehype-katex` and `remark-github-blockquote-alert`. Plugins go inside `unified({ remarkPlugins, rehypePlugins })`, not the deprecated top-level `markdown.remarkPlugins`; `shikiConfig` stays under `markdown`. MDX inherits this config.
- The homepage entrypoint is `src/pages/index.astro`.
- `src/layouts/Layout.astro` imports `src/styles/global.css`, Fontsource Poppins 400, and AOS CSS.
- Shared constants live in `src/data/site.ts` (site meta, nav, hero copy/verbs/CTA, socials); individual card content should stay in Astro components under `src/components/cards/`, not encoded as HTML strings in data.
- `src/layouts/Layout.astro` owns SEO tags (description, canonical, Open Graph, Twitter, sitemap link) and defaults title/description to `siteMeta`.
- The social preview `public/og-image.png` (1200x630) is rendered from `og/og-image.html`, which mirrors the hero grid and palette. When hero copy, positioning, or colors change, update that HTML and re-render it (see README).
- Mobile footer text uses the same `clamp(0.9rem,4vw,1.5rem)` size as the nav links; desktop keeps the smaller footer size.
- Positioning: freelancer in AI, Automation & Data Analysis; Ph.D. researcher in AI for Medical Imaging. Fondazione REI is one collaboration, not the whole freelance practice.
- `src/components/HeroGrid.astro` intentionally owns its greeting block data/classes internally.

## Styling Conventions
- Prefer Tailwind utilities in components. Keep `src/styles/global.css` for Tailwind `@theme`, base styles, and reusable global state/keyframes only.
- Theme colors are defined in `global.css`; use Tailwind tokens like `bg-primary`, `text-tertiary`, `border-text`.
- Poppins 400 is imported intentionally to match the old Google Fonts import; avoid adding Poppins 300/700 unless the user wants changed typography.
- Use card primitives (`CardTitle`, `CardSubtitle`, `CardText`, `CardSectionTitle`, `CardDivider`, `SkillTags`, `ButtonLink`) for card markup so links and paragraphs remain readable.

## Browser Behavior
- Client behavior is in `src/scripts/home.js`: AOS init, random hero tile activation, rotating hero verb, touch tap states for cards/icons, and `party-js` heart confetti. The same script runs on blog pages, so hero code must no-op when its elements are missing.
- Hero rotating verb ("I like to <verb> things"): verbs come from `hero.subtitleVerbs`; the first is the static/no-JS/screen-reader text. All verbs are stacked in one `.hero-verbs` inline-grid cell; `home.js` swaps `.active` and sets the cell width to the active word so "things" follows it. It shares one interval tick with the hero tiles, and stays on the first verb under `prefers-reduced-motion`.
- Do not re-add scroll-based mobile auto-highlight; mobile/touch feedback should be tap-driven.
- Card highlight differs by input: on hover-capable devices (Tailwind v4 `hover:` is `@media (hover: hover)`) the card fills with its accent and content inverts (text to `text-background`, `SkillTags` to dark pills, contact icons to `text-text`); on touch devices the tapped card gets `.in-view`, which only lifts it and tints its `CardTitle` via the `--card-accent` variable each `Card` variant sets. Don't add `group-[.in-view]/card:` color inversions to card primitives.
- The heart animation uses a custom `heartPulse` keyframe to avoid Tailwind's opacity-based `pulse` collision.
- The hero verb entrance uses `animate-word-in`, defined as `--animate-word-in` plus `@keyframes word-in` inside `@theme` in `global.css`.

## Deployment
- Custom domain is `https://ettorecandeloro.me`; `astro.config.mjs` sets `site` and intentionally does not set `base`.
- `public/CNAME` must contain `ettorecandeloro.me` so the built `dist/` includes the domain file.
- GitHub Pages deploys from `.github/workflows/deploy.yml` on pushes to `deploy-branch` only; `deploy-branch` is intended as the merge-to-deploy branch.
- In GitHub settings, Pages source should be GitHub Actions.

## Known Dev Output
- `Content config not loaded` is expected until content collections are added for the future blog.
- A dev-only 404 for an Astro/Vite dev-toolbar `.js.map` is harmless if the page itself returns 200.
