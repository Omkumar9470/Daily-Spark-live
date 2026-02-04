import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Habit } from '@/types/habit';

const EMOJI_OPTIONS = ['🏃', '📚', '💧', '🧘', '💪', '🎯', '✍️', '🌱', '😴', '🍎', '🎨', '🎵'];

interface HabitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string, emoji: string) => void;
  editingHabit?: Habit | null;
}

export function HabitForm({ open, onOpenChange, onSave, editingHabit }: HabitFormProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setEmoji(editingHabit.emoji);
    } else {
      setName('');
      setEmoji('🎯');
    }
  }, [editingHabit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), emoji);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingHabit ? 'Edit Habit' : 'New Habit'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-sm font-medium">
              Habit Name
            </Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning run"
              className="h-11"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose an Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`h-11 w-11 rounded-lg text-xl transition-all duration-150 ${
                    emoji === e
                      ? 'bg-primary text-primary-foreground scale-110 shadow-md'
                      : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {editingHabit ? 'Save Changes' : 'Add Habit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
