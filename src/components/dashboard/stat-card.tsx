import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  footerText?: string;
  progress?: number;
}

export function StatCard({ title, value, icon: Icon, footerText, progress }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {footerText && <p className="text-xs text-muted-foreground">{footerText}</p>}
        {progress !== undefined && (
          <Progress value={progress} className="h-2 mt-4" />
        )}
      </CardContent>
    </Card>
  );
}
