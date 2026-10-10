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

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "10 Oct 2026" — compact, unambiguous across US/EU readers. */
export function formatShortDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);

  if (!year || !month || !day) return date;

  return `${day} ${shortMonths[month - 1]} ${year}`;
}
