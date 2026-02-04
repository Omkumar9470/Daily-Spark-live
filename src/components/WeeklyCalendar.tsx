import { getLast7Days, getDayName, getDayNumber, isToday, formatDateStr } from '@/lib/dateUtils';
import { Check } from 'lucide-react';

interface WeeklyCalendarProps {
  completedDates: string[];
  onToggleDate: (date: string) => void;
}

export function WeeklyCalendar({ completedDates, onToggleDate }: WeeklyCalendarProps) {
  const days = getLast7Days();

  return (
    <div className="flex gap-1.5">
      {days.map((date) => {
        const dateStr = formatDateStr(date);
        const isComplete = completedDates.includes(dateStr);
        const todayClass = isToday(date) ? 'ring-2 ring-primary ring-offset-2' : '';

        return (
          <button
            key={dateStr}
            onClick={() => onToggleDate(dateStr)}
            className={`day-button ${
              isComplete ? 'day-button-complete' : 'day-button-inactive'
            } ${todayClass}`}
            title={`${getDayName(date, false)}, ${date.toLocaleDateString()}`}
          >
            {isComplete ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <span className="text-xs">{getDayNumber(date)}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
