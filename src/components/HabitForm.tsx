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
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">
            {editingHabit ? 'Edit habit' : 'New habit'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-xs text-muted-foreground">
              Name
            </Label>
            <Input
              id="habit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning run"
              className="h-9 text-sm"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Icon</Label>
            <div className="grid grid-cols-6 gap-1.5">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`h-9 w-9 rounded-md text-base transition-all duration-100 ${
                    emoji === e
                      ? 'bg-foreground text-background'
                      : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!name.trim()}>
              {editingHabit ? 'Save' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
