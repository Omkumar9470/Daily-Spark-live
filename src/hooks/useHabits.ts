import { useState, useEffect, useCallback } from 'react';
import { Habit } from '@/types/habit';

const STORAGE_KEY = 'habit-tracker-data';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load habits from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHabits(parsed.habits || []);
      } catch (e) {
        console.error('Failed to parse habits from localStorage:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits }));
    }
  }, [habits, isLoaded]);

  const addHabit = useCallback((name: string, emoji: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const updateHabit = useCallback((id: string, name: string, emoji: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name, emoji } : habit
      )
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  }, []);

  const toggleHabitDate = useCallback((id: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      })
    );
  }, []);

  const getStreak = useCallback((habit: Habit): number => {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates].sort().reverse();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);

    // Check if today or yesterday was completed to start counting
    const todayStr = formatDateStr(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateStr(yesterday);

    if (!sortedDates.includes(todayStr) && !sortedDates.includes(yesterdayStr)) {
      return 0;
    }

    // Start from today and count backwards
    for (let i = 0; i < 365; i++) {
      const dateStr = formatDateStr(currentDate);
      if (sortedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (i === 0) {
        // Today not completed, start from yesterday
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, []);

  return {
    habits,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitDate,
    getStreak,
  };
}

function formatDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}
