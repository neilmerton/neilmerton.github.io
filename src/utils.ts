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

export async function getWorkImages(slug: string): Promise<ImageMetadata[]> {
  let images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/work/**/*.{jpeg,jpg,png,webp}"
  );

  images = Object.fromEntries(
    Object.entries(images).filter(([key]) => key.includes(slug))
  );

  const resolvedImages = await Promise.all(
    Object.values(images).map((image) => image().then((mod) => mod.default))
  );

  return resolvedImages;
}