# Personal Website

[![Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MDX](https://img.shields.io/badge/Blog-MDX-1f1f1f?style=for-the-badge&logo=mdx&logoColor=white)](https://mdxjs.com/)
[![Website](https://img.shields.io/badge/Live-ettorecandeloro.me-ee4266?style=for-the-badge)](https://ettorecandeloro.me/)

My personal website, built with [Astro JS](https://astro.build/) and deployed at [ettorecandeloro.me](https://ettorecandeloro.me/).

I'm Ettore Candeloro, a freelancer in AI, Automation & Data Analysis and a Ph.D. researcher in AI for Medical Imaging at UNIMORE.

## Structure

- `src/pages/index.astro`: homepage (hero, projects, curriculum, contact).
- `src/pages/blog/`: blog list and posts, written in MDX under `src/blog/`.
- `src/data/site.ts`: shared copy (site meta, nav, hero text and rotating verbs, socials).
- `src/components/cards/`: one Astro component per card.
- `src/scripts/home.js`: client behavior (AOS, hero tiles and rotating verb on a shared timer, touch states, heart confetti).
- `src/styles/global.css`: Tailwind theme tokens, base styles and keyframes.

To change the "I like to ___ things" verbs, edit `hero.subtitleVerbs` in `src/data/site.ts`.

The build also generates `sitemap-index.xml` via `@astrojs/sitemap`.

## Social preview image

`public/og-image.png` is the 1200x630 Open Graph / Twitter image. Its source is `og/og-image.html` (plain HTML/CSS using the site palette and the local Poppins font). To regenerate it after editing, open the file in a browser at a 1200x630 viewport and screenshot the page, e.g. with Playwright:

```js
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(`file://${process.cwd()}/og/og-image.html`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.png" });
```

## Deploy

Pushing to `deploy-branch` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`.

## Install

Requires Node.js `>=22.12.0`.

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```
