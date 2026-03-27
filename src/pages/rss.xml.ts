import rss from "@astrojs/rss";
import { siteConfig } from "@data/index";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error("Site configuration is missing!");
  }

  const posts = await getCollection("blog");

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site.origin,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}`,
    })).sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
}