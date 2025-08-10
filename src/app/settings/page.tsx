
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function SettingsPage() {
  return (
    <Drawer>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <DrawerTrigger asChild>
            <button className="md:hidden">
              <Menu />
            </button>
          </DrawerTrigger>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary font-headline">Settings</h1>
        </div>
        <p className="text-muted-foreground">This is a placeholder for the settings page.</p>
      </div>
    </Drawer>
  );
}
