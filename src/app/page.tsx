import {
    Flame,
    Zap,
    HeartPulse,
    Moon,
    Target,
    Dumbbell
  } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import Link from 'next/link';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { PerformanceChart } from '@/components/dashboard/performance-chart';
  import { Progress } from '@/components/ui/progress';
  
  export default function DashboardPage() {
    return (
      <div className="flex flex-col min-h-screen bg-background bg-gradient-to-b from-background to-[#1a2a3a] text-foreground">
        <header className="p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src="../../public/skill.jpg" alt="AI Coach" data-ai-hint="robot face" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">PulseCoach AI</h1>
              <p className="text-sm text-muted-foreground">&quot;Let's crush your goals today!&quot;</p>
            </div>
          </div>
        </header>
  
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-1 bg-card/80 backdrop-blur-sm border-primary/50">
               <CardHeader>
                <CardTitle>Today&apos;s Workout</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                 <div className="relative h-32 w-32">
                    <svg className="absolute inset-0" viewBox="0 0 100 100">
                      <circle className="stroke-current text-secondary" strokeWidth="10" cx="50" cy="50" r="45" fill="transparent"></circle>
                      <circle className="stroke-current text-primary transform -rotate-90 origin-center" strokeWidth="10" cx="50" cy="50" r="45" fill="transparent" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Dumbbell className="w-12 h-12 text-primary" />
                    </div>
                 </div>
                 <p className="text-lg font-semibold">Leg Day</p>
                 <Button asChild size="lg" className="w-full">
                  <Link href="/workout">Start Session</Link>
                 </Button>
              </CardContent>
            </Card>
  
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recovery Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                          <HeartPulse className="w-6 h-6 text-accent"/>
                          <p className="font-semibold">Heart Rate</p>
                      </div>
                      <p className="text-xl font-bold">72 bpm</p>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                          <Moon className="w-6 h-6 text-accent"/>
                          <p className="font-semibold">Sleep</p>
                      </div>
                      <p className="text-xl font-bold">7h 45m</p>
                  </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Streak & XP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary">
                          <Flame className="w-6 h-6"/>
                          <span className="text-2xl font-bold">12</span>
                          <span className="text-sm">Day Streak</span>
                      </div>
                      <div className="flex items-center gap-2 text-accent">
                           <Zap className="w-6 h-6"/>
                          <span className="text-2xl font-bold">1250</span>
                          <span className="text-sm">XP</span>
                      </div>
                   </div>
                   <Progress value={75} />
                   <p className="text-center text-muted-foreground text-sm">Level 12</p>
              </CardContent>
            </Card>
  
          </div>
  
          <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Performance Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p>Complete 5 workouts this week</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">3/5</span>
                            <Progress value={60} className="w-24 h-2" />
                        </div>
                    </div>
                     <div className="flex items-center justify-between">
                        <p>Increase bench press by 5kg</p>
                         <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">2kg/5kg</span>
                            <Progress value={40} className="w-24 h-2" />
                        </div>
                    </div>
                </CardContent>
              </Card>
  
               <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>
          </div>
        </main>
      </div>
    );
  }
  