import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // base: '/neilmerton.github.io',
  integrations: [mdx(), sitemap()],
  server: {
    port: 3030,
  },
  site: 'https://neilmerton.github.io',
});
