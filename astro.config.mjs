import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mdsohelrana.com',
  trailingSlash: 'never',
  markdown: {
    // Astro's default Shiki highlighting emits inline styles (a GitHub-Dark
    // background + per-token colours) that override the editorial `.prose pre`
    // styling and clash with the warm palette. Disable it so code blocks render
    // as clean monospace on `--surface`, governed by the CSS in blog/[id].astro.
    syntaxHighlight: false,
  },
  build: {
    // Inline all CSS so the built index.html is fully self-contained
    inlineStylesheets: 'always',
  },
});
