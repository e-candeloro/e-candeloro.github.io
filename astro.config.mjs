// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from "rehype-katex";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkMath from "remark-math";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ettorecandeloro.me",
  markdown: {
    // Astro 7 defaults to Sätteri; stay on unified() for the remark/rehype math and alert plugins.
    processor: unified({
      remarkPlugins: [remarkMath, remarkAlert],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
