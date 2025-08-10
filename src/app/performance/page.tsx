'use client';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Zap, Droplets } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const weeklyStreakData = [
  { day: 'Mon', workouts: 1 },
  { day: 'Tue', workouts: 1 },
  { day: 'Wed', workouts: 0 },
  { day: 'Thu', workouts: 1 },
  { day: 'Fri', workouts: 1 },
  { day: 'Sat', workouts: 0 },
  { day: 'Sun', workouts: 1 },
];

const muscleLoadData = [
    { muscle: 'Chest', load: 80 },
    { muscle: 'Back', load: 65 },
    { muscle: 'Legs', load: 90 },
    { muscle: 'Shoulders', load: 70 },
    { muscle: 'Biceps', load: 50 },
    { muscle: 'Triceps', load: 55 },
];

const heartRateData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  hr: 60 + Math.random() * 10 - (i*0.2),
}));


const chartConfig: ChartConfig = {
  workouts: { label: 'Workouts', color: 'hsl(var(--primary))' },
  load: { label: 'Load %', color: 'hsl(var(--accent))' },
  hr: { label: 'Heart Rate', color: 'hsl(var(--primary))' },
};

export default function PerformancePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#101a29] to-background text-foreground p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Performance</h1>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50 backdrop-blur-sm">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="muscles">Muscles Worked</TabsTrigger>
                    <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
                                <Flame className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">12 Days</div>
                                <p className="text-xs text-muted-foreground">+2 since last week</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">XP Level</CardTitle>
                                <Zap className="h-5 w-5 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">1,250 XP</div>
                                <Progress value={75} className="h-2 mt-2" />
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Recovery</CardTitle>
                                <Droplets className="h-5 w-5 text-blue-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">85%</div>
                                <p className="text-xs text-muted-foreground">Sleep & HRV Score</p>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Weekly Streak</CardTitle>
                                <CardDescription>Your workout consistency over the last week.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                    <BarChart data={weeklyStreakData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                                        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                                        <YAxis tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} width={20} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="workouts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="muscles" className="mt-6">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Muscle Group Load Distribution</CardTitle>
                            <CardDescription>Volume distribution over the last 30 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={muscleLoadData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                                        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="muscle" type="category" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} width={80} />
                                        <ChartTooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} content={<ChartTooltipContent />} />
                                        <Bar dataKey="load" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="progress" className="mt-6">
                     <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Resting Heart Rate Trend</CardTitle>
                            <CardDescription>Your resting heart rate over the last 30 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <AreaChart data={heartRateData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillHr" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Area dataKey="hr" type="monotone" fill="url(#fillHr)" stroke="hsl(var(--primary))" />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
