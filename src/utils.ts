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