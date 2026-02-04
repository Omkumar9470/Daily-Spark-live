import { Target } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center slide-up">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
        <Target className="h-8 w-8 text-accent-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">No habits yet</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Start building better habits. Add your first habit to begin tracking your progress.
      </p>
    </div>
  );
}
