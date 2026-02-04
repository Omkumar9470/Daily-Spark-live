export interface Habit {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
  completedDates: string[]; // Array of date strings in YYYY-MM-DD format
}

export interface HabitStore {
  habits: Habit[];
}
