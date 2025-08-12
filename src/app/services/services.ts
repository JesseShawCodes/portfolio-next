export default function formatMyDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });

  return `${year} ${month}`;
}

export function formatMyDateYear(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return `${year}`;
}
