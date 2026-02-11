import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: "Manrope",
        cssVariable: '--font-manrope',
      }
    ]
  },
  integrations: [mdx(), sitemap()],
  server: {
    port: 3030,
  },
  site: 'https://neil.merton.dev',
});
