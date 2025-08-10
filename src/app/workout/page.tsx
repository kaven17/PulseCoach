import { PoseCorrector } from "@/components/workout/pose-corrector";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function WorkoutPage() {
  return (
    <Drawer>
      <div className="flex h-screen flex-col bg-background">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
              <DrawerTrigger asChild>
                  <button><Menu /></button>
              </DrawerTrigger>
              <h1 className="text-2xl font-bold text-primary font-headline">Live Workout</h1>
          </div>
          <div>
              <span className="font-semibold text-lg">Current: Push-ups</span>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-hidden">
          <PoseCorrector />
        </main>
      </div>
    </Drawer>
  );
}
