import rss from "@astrojs/rss";
import { siteConfig } from "@data/index";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

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
      link: `/blog/${post.id}/`,
    })).sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
}