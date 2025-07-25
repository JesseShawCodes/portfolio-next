export default function formatMyDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });

  return `${year} ${month}`;
}

export function formatMyDateYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return `${year}`;
}
