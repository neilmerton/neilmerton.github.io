import mdx from "@astrojs/mdx";
import { defineConfig, fontProviders } from 'astro/config';
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: 'https://neil.merton.dev',
  trailingSlash: 'never',
  integrations: [mdx()],

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
    "/reading": "/about/reading",
    "/work": "/portfolio",
    "/work/[slug]": "/portfolio/[slug]"
  },

  adapter: vercel(),
  output: "static",
});