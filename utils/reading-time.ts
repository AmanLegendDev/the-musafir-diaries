export function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;

  return Math.ceil(words / 200);
}