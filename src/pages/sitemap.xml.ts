import { navItems, navItemsAbout, siteConfig } from '@data/index';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const staticPages: string[] = [
  '',
  ...navItems.map(item => item.href),
  ...navItemsAbout.filter(item => item.href !== '/about').map(item => item.href)
]

export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') || siteConfig.url;

  // Page lastMod value
  const pageLastMod = new Date().toISOString();

  // Get all collections
  const posts = await getCollection('blog');
  const portfolio = await getCollection('portfolio');

  interface SitemapUrlItem { loc: string; lastMod: string; changefreq?: string; priority?: number }

  // Generate URLs for all content
  const urls: Array<SitemapUrlItem> = [];

  // Static pages
  staticPages.forEach(page => {
    urls.push({
      loc: `${site}${page}`,
      lastMod: pageLastMod,
      changefreq: 'monthly',
      priority: page === '' ? 1.0 : 0.8
    })
  })

  // Blog posts
  posts
    .filter(post => !post.data.draft)
    .forEach(post => {
      urls.push({
        loc: `${site}/blog/${post.id}`,
        lastMod: post.data.updatedDate?.toISOString() || post.data.pubDate.toISOString(),
        changefreq: 'monthly',
        priority: 0.8
      });
    });

  // Portfolio
  portfolio.forEach(item => {
    urls.push({
      loc: `${site}/portfolio/${item.id}`,
      lastMod: item.data.date.toISOString(),
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Get all unique tags
  const allTags = new Set<string>();
  posts.forEach(post => {
    post.data.tags?.forEach(tag => allTags.add(tag));
  });

  // Add tag pages
  allTags.forEach(tag => {
    urls.push({
      loc: `${site}/blog/tag/${encodeURIComponent(tag)}`,
      lastMod: pageLastMod,
      changefreq: 'monthly',
      priority: 0.5
    });
  });

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastMod}</lastmod>${url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `
    <priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}