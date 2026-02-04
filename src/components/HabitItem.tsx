import { Habit } from '@/types/habit';
import { WeeklyCalendar } from './WeeklyCalendar';
import { StreakBadge } from './StreakBadge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  return (
    <div className="habit-card p-4 fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{habit.emoji}</span>
          <div className="min-w-0">
            <h3 className="font-medium text-foreground truncate">{habit.name}</h3>
            <div className="mt-1">
              <StreakBadge streak={streak} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <WeeklyCalendar
            completedDates={habit.completedDates}
            onToggleDate={onToggleDate}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onEdit} className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
