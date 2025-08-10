
'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Home,
  Dumbbell,
  Bot,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/workout', label: 'Live Workout', icon: Dumbbell },
  { href: '/generate', label: 'AI Coach', icon: Bot },
  { href: '/performance', label: 'Performance', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const PulseCoachIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H6L9 3L15 21L18 12H21" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export function AppDrawer() {
  const pathname = usePathname();

  return (
    <Drawer direction="left">
      <DrawerContent className="h-full w-72 p-4 flex flex-col bg-card/95 backdrop-blur-lg border-r border-border">
        <DrawerHeader className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <PulseCoachIcon />
              <DrawerTitle className="text-xl font-semibold text-primary font-headline">PulseCoach AI</DrawerTitle>
            </div>
            <DrawerClose asChild>
                <Button variant="ghost" size="icon"><X /></Button>
            </DrawerClose>
        </DrawerHeader>
        
        <nav className="flex-1 mt-8">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.href}>
                         <Button asChild variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start gap-3 text-base h-12">
                             <Link href={item.href}>
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                             </Link>
                         </Button>
                    </li>
                ))}
            </ul>
        </nav>

        <div className="mt-auto">
             <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                 <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="@athlete" data-ai-hint="person athletic" />
                    <AvatarFallback>A</AvatarFallback>
                 </Avatar>
                 <div>
                    <p className="font-semibold text-lg">Alex</p>
                    <p className="text-sm text-muted-foreground">Level 12</p>
                 </div>
             </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
