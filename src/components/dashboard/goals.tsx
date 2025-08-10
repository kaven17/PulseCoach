'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useState } from "react";

const initialGoals = [
  { id: 1, text: 'Complete 5 workouts this week', completed: true },
  { id: 2, text: 'Increase bench press by 5kg', completed: false },
  { id: 3, text: 'Run 10km under 50 minutes', completed: false },
];

export function Goals() {
  const [goals, setGoals] = useState(initialGoals);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Your Goals</CardTitle>
          <CardDescription>Stay motivated and track your progress.</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center space-x-3">
              <Checkbox id={`goal-${goal.id}`} checked={goal.completed} onCheckedChange={() => toggleGoal(goal.id)} />
              <label
                htmlFor={`goal-${goal.id}`}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${goal.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {goal.text}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
