import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { HabitItem } from './HabitItem';
import { HabitForm } from './HabitForm';
import { EmptyState } from './EmptyState';
import { WeeklyProgress } from './WeeklyProgress';
import { MonthlyChart } from './MonthlyChart';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Habit } from '@/types/habit';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function HabitTracker() {
  const { habits, isLoaded, addHabit, updateHabit, deleteHabit, toggleHabitDate, getStreak } =
    useHabits();
  const [formOpen, setFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);

  const handleSave = (name: string, emoji: string) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, name, emoji);
      setEditingHabit(null);
    } else {
      addHabit(name, emoji);
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingHabit) {
      deleteHabit(deletingHabit.id);
      setDeletingHabit(null);
    }
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingHabit(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-semibold text-foreground">
              Habits
            </h1>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Button 
                onClick={() => setFormOpen(true)} 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Track your daily habits
          </p>
        </header>

        {/* Weekly Progress */}
        {habits.length > 0 && (
          <div className="mb-8">
            <WeeklyProgress habits={habits} />
          </div>
        )}

        {/* Habit List */}
        <section className="mb-8">
          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-border">
              {habits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  streak={getStreak(habit)}
                  onToggleDate={(date) => toggleHabitDate(habit.id, date)}
                  onEdit={() => handleEdit(habit)}
                  onDelete={() => setDeletingHabit(habit)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Monthly Analytics */}
        {habits.length > 0 && (
          <section className="pt-6 border-t border-border">
            <MonthlyChart habits={habits} />
          </section>
        )}

        {/* Habit Form Dialog */}
        <HabitForm
          open={formOpen}
          onOpenChange={handleFormClose}
          onSave={handleSave}
          editingHabit={editingHabit}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingHabit} onOpenChange={() => setDeletingHabit(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete habit?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{deletingHabit?.name}" and all its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
