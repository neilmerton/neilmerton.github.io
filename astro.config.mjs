import { defineConfig, fontProviders } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://neil.merton.dev',
  integrations: [mdx(), sitemap()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: "Arbutus Slab",
        cssVariable: "--font-display"
      },
      {
        provider: fontProviders.bunny(),
        name: "Familjen Grotesk",
        cssVariable: "--font-body"
      },
      {
        provider: fontProviders.bunny(),
        name: "Victor Mono",
        cssVariable: "--font-mono"
      }
    ]
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: false,
    },
  },
});
