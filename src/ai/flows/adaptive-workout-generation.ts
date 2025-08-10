'use server';

/**
 * @fileOverview Adaptive workout generation flow.
 *
 * This file defines a Genkit flow that generates personalized workout plans based on
 * athlete data, fatigue levels, and mood.
 *
 * @exports adaptiveWorkoutGeneration - The function to trigger the workout generation flow.
 * @exports AdaptiveWorkoutGenerationInput - The input type for the adaptiveWorkoutGeneration function.
 * @exports AdaptiveWorkoutGenerationOutput - The output type for the adaptiveWorkoutGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the adaptive workout generation flow
const AdaptiveWorkoutGenerationInputSchema = z.object({
  athleteData: z.string().describe('Athlete performance data, including historical workout logs and statistics.'),
  fatigueLevel: z.string().describe('Athlete reported fatigue level (e.g., low, medium, high).'),
  mood: z.string().describe('Athlete reported mood (e.g., happy, sad, motivated).'),
  voiceLog: z.string().describe('Athlete voice log, transcribed to text, containing updates on workout details, mood, or potential injuries.'),
  preferredMuscleGroups: z.string().describe('Athlete preferred muscle groups to focus on.'),
  sport: z.string().describe('The sport the athlete is training for.'),
});
export type AdaptiveWorkoutGenerationInput = z.infer<typeof AdaptiveWorkoutGenerationInputSchema>;

// Output schema for the adaptive workout generation flow
const AdaptiveWorkoutGenerationOutputSchema = z.object({
  workoutPlan: z.string().describe('Personalized workout plan, including exercises, sets, reps, and rest times.'),
  coachComments: z.string().describe('Motivational and instructional comments from the AI coach.'),
});
export type AdaptiveWorkoutGenerationOutput = z.infer<typeof AdaptiveWorkoutGenerationOutputSchema>;

// Exported function to trigger the adaptive workout generation flow
export async function adaptiveWorkoutGeneration(input: AdaptiveWorkoutGenerationInput): Promise<AdaptiveWorkoutGenerationOutput> {
  return adaptiveWorkoutGenerationFlow(input);
}

// Define the prompt for workout generation
const adaptiveWorkoutPrompt = ai.definePrompt({
  name: 'adaptiveWorkoutPrompt',
  input: {schema: AdaptiveWorkoutGenerationInputSchema},
  output: {schema: AdaptiveWorkoutGenerationOutputSchema},
  prompt: `You are an AI fitness coach generating personalized workout plans.

  Consider the athlete's data, fatigue level, mood, voice log, preferred muscle groups, and sport to create an effective workout plan.

  Athlete Data: {{{athleteData}}}
  Fatigue Level: {{{fatigueLevel}}}
  Mood: {{{mood}}}
  Voice Log: {{{voiceLog}}}
  Preferred Muscle Groups: {{{preferredMuscleGroups}}}
  Sport: {{{sport}}}

  Generate a workout plan and provide motivational and instructional comments. The workout should be tailored to improve performance in the specified sport.
  `, // Ensure this is a complete Handlebars template.
});

// Define the Genkit flow for adaptive workout generation
const adaptiveWorkoutGenerationFlow = ai.defineFlow(
  {
    name: 'adaptiveWorkoutGenerationFlow',
    inputSchema: AdaptiveWorkoutGenerationInputSchema,
    outputSchema: AdaptiveWorkoutGenerationOutputSchema,
  },
  async input => {
    const {output} = await adaptiveWorkoutPrompt(input);
    return output!;
  }
);
