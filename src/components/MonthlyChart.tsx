import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Habit } from '@/types/habit';

interface MonthlyChartProps {
  habits: Habit[];
}

export function MonthlyChart({ habits }: MonthlyChartProps) {
  const data = useMemo(() => {
    if (habits.length === 0) return [];

    const today = new Date();
    const weeks: { name: string; completed: number; total: number }[] = [];

    for (let w = 3; w >= 0; w--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (w * 7 + today.getDay()));
      weekStart.setHours(0, 0, 0, 0);

      let completed = 0;
      const total = habits.length * 7;

      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + d);
        const dateStr = date.toISOString().split('T')[0];

        habits.forEach((habit) => {
          if (habit.completedDates.includes(dateStr)) {
            completed++;
          }
        });
      }

      const weekLabel = w === 0 ? 'This week' : w === 1 ? 'Last week' : `${w + 1}w ago`;
      weeks.push({ name: weekLabel, completed, total });
    }

    return weeks;
  }, [habits]);

  if (habits.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.total));

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Monthly Overview</h3>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis hide domain={[0, maxValue]} />
            <Bar dataKey="total" radius={[4, 4, 4, 4]} fill="hsl(var(--chart-2))" />
            <Bar dataKey="completed" radius={[4, 4, 4, 4]} fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'hsl(var(--chart-1))' }} />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'hsl(var(--chart-2))' }} />
          <span>Total</span>
        </div>
      </div>
    </div>
  );
}
