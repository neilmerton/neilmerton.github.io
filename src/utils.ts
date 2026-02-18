export function formatDate(dateString: Date | string, monthYearOnly = false): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: monthYearOnly ? undefined : 'numeric',
  });
}