const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatArticleDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);

  if (!year || !month || !day) return date;

  return `${monthNames[month - 1]} ${day}, ${year}`;
}
