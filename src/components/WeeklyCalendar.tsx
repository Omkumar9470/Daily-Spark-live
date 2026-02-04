import { getLast7Days, getDayNumber, isToday, formatDateStr } from '@/lib/dateUtils';
import { Check } from 'lucide-react';

interface WeeklyCalendarProps {
  completedDates: string[];
  onToggleDate: (date: string) => void;
}

export function WeeklyCalendar({ completedDates, onToggleDate }: WeeklyCalendarProps) {
  const days = getLast7Days();

  return (
    <div className="flex gap-1">
      {days.map((date) => {
        const dateStr = formatDateStr(date);
        const isComplete = completedDates.includes(dateStr);
        const todayClass = isToday(date) ? 'day-cell-today' : '';

        return (
          <button
            key={dateStr}
            onClick={() => onToggleDate(dateStr)}
            className={`day-cell ${
              isComplete ? 'day-cell-complete' : 'day-cell-empty'
            } ${todayClass}`}
            title={date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          >
            {isComplete ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <span>{getDayNumber(date)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
