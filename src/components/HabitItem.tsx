import { Habit } from '@/types/habit';
import { WeeklyCalendar } from './WeeklyCalendar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getLast7Days, formatDateStr } from '@/lib/dateUtils';

interface HabitItemProps {
  habit: Habit;
  streak: number;
  onToggleDate: (date: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitItem({
  habit,
  streak,
  onToggleDate,
  onEdit,
  onDelete,
}: HabitItemProps) {
  // Calculate weekly completion percentage
  const days = getLast7Days();
  const completedThisWeek = days.filter(date => 
    habit.completedDates.includes(formatDateStr(date))
  ).length;
  const weeklyPercentage = Math.round((completedThisWeek / 7) * 100);

  return (
    <div className="habit-row fade-in group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="text-lg flex-shrink-0">{habit.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground truncate text-sm">{habit.name}</h3>
            <span className="text-xs text-muted-foreground">{weeklyPercentage}%</span>
          </div>
          {streak > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              🔥 {streak} day streak
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <WeeklyCalendar
          completedDates={habit.completedDates}
          onToggleDate={onToggleDate}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={onEdit} className="gap-2 text-sm">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="gap-2 text-sm text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
