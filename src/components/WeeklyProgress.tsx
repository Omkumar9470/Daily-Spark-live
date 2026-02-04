import { getLast7Days, formatDateStr } from '@/lib/dateUtils';
import { Habit } from '@/types/habit';

interface WeeklyProgressProps {
  habits: Habit[];
}

export function WeeklyProgress({ habits }: WeeklyProgressProps) {
  if (habits.length === 0) return null;

  const days = getLast7Days();
  const totalPossible = habits.length * 7;
  
  let completed = 0;
  days.forEach((date) => {
    const dateStr = formatDateStr(date);
    habits.forEach((habit) => {
      if (habit.completedDates.includes(dateStr)) {
        completed++;
      }
    });
  });

  const percentage = Math.round((completed / totalPossible) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Weekly Progress</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {completed} of {totalPossible} check-ins this week
      </p>
    </div>
  );
}
