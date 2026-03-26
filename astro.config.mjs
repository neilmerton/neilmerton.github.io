import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://neil.merton.dev',
  integrations: [mdx(), sitemap({
    chunks: {
      'blog': (item) => {
        if (/blog/.test(item.url)) {
          item.changefreq = 'weekly';
          item.lastmod = new Date();
          item.priority = 0.9;
          return item;
        }
      },
      'reading': (item) => {
        if (/reading/.test(item.url)) {
          item.changefreq = 'monthly';
          item.lastmod = new Date();
          item.priority = 0.7;
          return item;
        }
      }
    },
  })],
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
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: false,
    },
  },
  redirects: {
    "/reading": "/about/reading"
  }
});
