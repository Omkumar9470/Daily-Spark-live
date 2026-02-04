export function formatDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getLast7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date);
  }

  return days;
}

export function getDayName(date: Date, short = true): string {
  return date.toLocaleDateString('en-US', { weekday: short ? 'short' : 'long' });
}

export function getDayNumber(date: Date): number {
  return date.getDate();
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
