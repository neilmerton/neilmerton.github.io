export function formatDate(dateString: Date | string, monthYearOnly = false): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: monthYearOnly ? undefined : 'numeric',
  });
}

export function readingTime(text: string): string {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return '0 min read';
  }

  const WORDS_PER_MINUTE = 150;

  const words = text.trim().split(/\s+/).length || 0;

  const minutes = Math.ceil(words / WORDS_PER_MINUTE) || 0;

  return `${minutes} min read`;
}

export async function getPortfolioImages(id: string): Promise<ImageMetadata[]> {
  let images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/portfolio/**/*.{jpeg,jpg,png,webp}"
  );

  images = Object.fromEntries(
    Object.entries(images).filter(([key]) => key.includes(id))
  );

  const resolvedImages = await Promise.all(
    Object.values(images).map((image) => image().then((mod) => mod.default))
  );

  return resolvedImages;
}

export function isPublished<T extends { data: { draft?: boolean; }; }>({ data }: T): boolean {
  return data.draft !== true;
}

export function sortByDateDesc<T extends { data: { pubDate: Date; }; }>(a: T, b: T): number {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}