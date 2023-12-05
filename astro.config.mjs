import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // base: '/neilmerton.github.io',
  integrations: [mdx(), sitemap()],
  site: 'https://neilmerton.github.io',
});
