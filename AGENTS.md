# AGENTS.md

## Commands
- Use npm; `package-lock.json` is the lockfile and the GitHub Pages action autodetects npm.
- Node must satisfy `>=22.12.0` (`withastro/action@v6` defaults to Node 24 in CI).
- Local dev: `npm run dev`.
- Production check: `npm run build`.
- Preview a built site: `npm run preview`.
- There is no configured lint, formatter, test, or typecheck script beyond `astro build`.

## App Shape
- This is an Astro 6 static site with Tailwind v4 through `@tailwindcss/vite` and MDX registered in `astro.config.mjs`.
- The homepage entrypoint is `src/pages/index.astro`.
- `src/layouts/Layout.astro` imports `src/styles/global.css`, Fontsource Poppins 400, and AOS CSS.
- Shared constants live in `src/data/site.ts`; individual card content should stay in Astro components under `src/components/cards/`, not encoded as HTML strings in data.
- `src/components/HeroGrid.astro` intentionally owns its greeting block data/classes internally.

## Styling Conventions
- Prefer Tailwind utilities in components. Keep `src/styles/global.css` for Tailwind `@theme`, base styles, and reusable global state/keyframes only.
- Theme colors are defined in `global.css`; use Tailwind tokens like `bg-primary`, `text-tertiary`, `border-text`.
- Poppins 400 is imported intentionally to match the old Google Fonts import; avoid adding Poppins 300/700 unless the user wants changed typography.
- Use card primitives (`CardTitle`, `CardSubtitle`, `CardText`, `CardSectionTitle`, `CardDivider`, `SkillTags`, `ButtonLink`) for card markup so links and paragraphs remain readable.

## Browser Behavior
- Client behavior is in `src/scripts/home.js`: AOS init, random hero tile activation, touch tap states for cards/icons, and `party-js` heart confetti.
- Do not re-add scroll-based mobile auto-highlight; mobile/touch feedback should be tap-driven.
- The heart animation uses a custom `heartPulse` keyframe to avoid Tailwind's opacity-based `pulse` collision.

## Deployment
- Custom domain is `https://ettorecandeloro.me`; `astro.config.mjs` sets `site` and intentionally does not set `base`.
- `public/CNAME` must contain `ettorecandeloro.me` so the built `dist/` includes the domain file.
- GitHub Pages deploys from `.github/workflows/deploy.yml` on pushes to `deploy-branch` only; `deploy-branch` is intended as the merge-to-deploy branch.
- In GitHub settings, Pages source should be GitHub Actions.

## Known Dev Output
- `Content config not loaded` is expected until content collections are added for the future blog.
- A dev-only 404 for an Astro/Vite dev-toolbar `.js.map` is harmless if the page itself returns 200.
