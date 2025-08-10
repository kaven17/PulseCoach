'use client';

import {
  Home,
  Dumbbell,
  Bot,
  BarChart3,
  Settings,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/workout', label: 'Workout', icon: Dumbbell },
  { href: '/generate', label: 'AI Coach', icon: Bot, isCenter: true },
  { href: '/performance', label: 'Stats', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-transparent">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg h-16 bg-secondary/80 backdrop-blur-lg rounded-full border border-border shadow-lg flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isCenter) {
            return (
              <div key={item.href} className="-mt-12">
                <Button asChild size="lg" className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50">
                  <Link href={item.href}>
                    <Plus className="h-10 w-10" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </Button>
              </div>
            );
          }
          return (
            <Link href={item.href} key={item.href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <item.icon className={cn('h-6 w-6', isActive && 'text-primary')} />
              <span className={cn('text-xs', isActive && 'text-primary font-semibold')}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
