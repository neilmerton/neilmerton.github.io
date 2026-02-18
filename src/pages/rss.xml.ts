import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../data";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  if (!context.site) {
    throw new Error("Site configuration is missing!");
  }

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site.origin,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })).sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1)),
  });
}