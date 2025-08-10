'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { runAdaptiveWorkoutGeneration } from '@/lib/actions';
import type { AdaptiveWorkoutGenerationOutput } from '@/ai/flows/adaptive-workout-generation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fatigueLevel: z.string().min(1, 'Please select your fatigue level.'),
  mood: z.string().min(1, 'Please select your mood.'),
  preferredMuscleGroups: z.string().min(1, 'Please select a muscle group.'),
  sport: z.string().min(1, 'Please select a sport.'),
  voiceLog: z.string().optional(),
});

export function WorkoutGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdaptiveWorkoutGenerationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatigueLevel: '',
      mood: '',
      preferredMuscleGroups: '',
      sport: '',
      voiceLog: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const workoutResult = await runAdaptiveWorkoutGeneration({
        athleteData: 'Simulated data: 5 years experience, trains 4 times/week.',
        fatigueLevel: values.fatigueLevel,
        mood: values.mood,
        preferredMuscleGroups: values.preferredMuscleGroups,
        sport: values.sport,
        voiceLog: values.voiceLog ?? '', // ✅ Ensures it's always a string
      });
      setResult(workoutResult);
    } catch (error) {
      console.error('Workout generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a workout plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle>New Session</CardTitle>
          <CardDescription>
            Fill out the form to get a personalized workout plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fatigueLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fatigue Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How tired are you?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - Feeling great!</SelectItem>
                          <SelectItem value="medium">
                            Medium - A bit tired
                          </SelectItem>
                          <SelectItem value="high">High - Exhausted</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mood</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How are you feeling?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="motivated">Motivated</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="stressed">Stressed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sport</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="What's your sport?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Fitness</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="football">
                          Football (Soccer)
                        </SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="weightlifting">
                          Weightlifting
                        </SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredMuscleGroups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Focus Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="What do you want to train today?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full body">Full Body</SelectItem>
                        <SelectItem value="upper body">Upper Body</SelectItem>
                        <SelectItem value="lower body">Lower Body</SelectItem>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="ai_suggestion">
                          Let AI Suggest based on my Sport
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="voiceLog"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (from Voice Diary)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific notes for the coach? e.g., 'My left shoulder felt a little tweaky yesterday.'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Generate My Workout
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card
        className={`transition-opacity duration-500 flex flex-col bg-card/50 backdrop-blur-sm border-primary/20 ${
          result || isLoading ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <CardHeader>
          <CardTitle>Your Personalized Plan</CardTitle>
          <CardDescription>
            Here is the workout plan generated by your AI coach.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result ? (
            <div className="space-y-4 text-sm">
              <h3 className="font-bold text-lg text-primary">Coach's Comments</h3>
              <p className="text-muted-foreground italic">
                &quot;{result.coachComments}&quot;
              </p>
              <h3 className="font-bold text-lg text-primary mt-4">Workout Plan</h3>
              <pre className="whitespace-pre-wrap font-sans bg-secondary/50 p-4 rounded-md text-sm leading-relaxed">
                {result.workoutPlan}
              </pre>
            </div>
          ) : (
            !isLoading && (
              <div className="flex justify-center items-center h-full text-muted-foreground">
                Your workout will appear here once generated.
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
