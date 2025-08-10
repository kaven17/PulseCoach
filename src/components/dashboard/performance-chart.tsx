'use client';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 92 },
  { day: 'Wed', score: 78 },
  { day: 'Thu', score: 95 },
  { day: 'Fri', score: 88 },
  { day: 'Sat', score: 98 },
  { day: 'Sun', score: 90 },
];

const chartConfig = {
  score: {
    label: 'Performance Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function PerformanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
      <AreaChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          tick={{fill: 'hsl(var(--muted-foreground))'}}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          domain={[60, 100]}
          tick={{fill: 'hsl(var(--muted-foreground))'}}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
            <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
        </defs>
        <Area dataKey="score" type="natural" fill="url(#fillScore)" stroke="hsl(var(--primary))" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
}
