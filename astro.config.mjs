import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mdsohelrana.com',
  trailingSlash: 'never',
  build: {
    // Inline all CSS so the built index.html is fully self-contained
    inlineStylesheets: 'always',
  },
});
