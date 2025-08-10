import { WorkoutGenerator } from '@/components/workout/workout-generator';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

export default function GenerateWorkoutPage() {
  return (
    <Drawer>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gradient-to-b from-[#1a2a3a] to-background min-h-screen">
        <div className="flex items-center gap-4">
          <DrawerTrigger asChild>
            <button className="md:hidden">
              <Menu />
            </button>
          </DrawerTrigger>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary font-headline">
            AI Coach
          </h1>
        </div>
        <p className="text-muted-foreground">
          Tell the AI how you&apos;re feeling and what you want to work on today.
        </p>
        <WorkoutGenerator />
      </div>
    </Drawer>
  );
}
