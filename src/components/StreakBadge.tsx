import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) return null;

  const isHot = streak >= 7;

  return (
    <span className={`streak-badge ${isHot ? 'streak-badge-fire' : ''}`}>
      <Flame className="h-3.5 w-3.5" />
      <span>{streak} day{streak !== 1 ? 's' : ''}</span>
    </span>
  );
}
