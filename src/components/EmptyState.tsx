import { Plus } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center fade-in">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
        <Plus className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">No habits yet</h3>
      <p className="text-xs text-muted-foreground max-w-[200px]">
        Click the + button to add your first habit
      </p>
    </div>
  );
}
