import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { HabitItem } from './HabitItem';
import { HabitForm } from './HabitForm';
import { EmptyState } from './EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
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
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const totalStreak = habits.reduce((sum, habit) => sum + getStreak(habit), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Habit Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Build better habits, one day at a time
              </p>
            </div>
            <Button onClick={() => setFormOpen(true)} size="default" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Habit</span>
            </Button>
          </div>

          {/* Stats */}
          {habits.length > 0 && (
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {habits.length} habit{habits.length !== 1 ? 's' : ''}
                </span>
              </div>
              {totalStreak > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent">
                  <span className="text-sm font-medium text-accent-foreground">
                    🔥 {totalStreak} total streak days
                  </span>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Habit List */}
        <main className="space-y-3">
          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            habits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                streak={getStreak(habit)}
                onToggleDate={(date) => toggleHabitDate(habit.id, date)}
                onEdit={() => handleEdit(habit)}
                onDelete={() => setDeletingHabit(habit)}
              />
            ))
          )}
        </main>

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
                This will permanently delete "{deletingHabit?.name}" and all its tracking data.
                This action cannot be undone.
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
