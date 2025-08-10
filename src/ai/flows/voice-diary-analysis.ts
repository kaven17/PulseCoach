'use server';

/**
 * @fileOverview A voice diary analysis AI agent.
 *
 * - analyzeVoiceDiary - A function that handles the voice diary analysis process.
 * - AnalyzeVoiceDiaryInput - The input type for the analyzeVoiceDiary function.
 * - AnalyzeVoiceDiaryOutput - The return type for the analyzeVoiceDiary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVoiceDiaryInputSchema = z.object({
  voiceLog: z
    .string()
    .describe(
      'A voice log from the athlete as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type AnalyzeVoiceDiaryInput = z.infer<typeof AnalyzeVoiceDiaryInputSchema>;

const AnalyzeVoiceDiaryOutputSchema = z.object({
  transcription: z.string().describe('The transcription of the voice log.'),
  mood: z.string().describe('The mood of the athlete.'),
  potentialInjuries: z.string().describe('Any potential injuries mentioned by the athlete.'),
  workoutDetails: z.string().describe('Details about the workout.'),
});
export type AnalyzeVoiceDiaryOutput = z.infer<typeof AnalyzeVoiceDiaryOutputSchema>;

export async function analyzeVoiceDiary(input: AnalyzeVoiceDiaryInput): Promise<AnalyzeVoiceDiaryOutput> {
  return analyzeVoiceDiaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeVoiceDiaryPrompt',
  input: {schema: AnalyzeVoiceDiaryInputSchema},
  output: {schema: AnalyzeVoiceDiaryOutputSchema},
  prompt: `You are an AI assistant that analyzes voice logs from athletes.

You will transcribe the voice log, determine the athlete's mood, identify any potential injuries mentioned, and extract details about the workout.

Voice Log: {{media url=voiceLog}}`,
});

const analyzeVoiceDiaryFlow = ai.defineFlow(
  {
    name: 'analyzeVoiceDiaryFlow',
    inputSchema: AnalyzeVoiceDiaryInputSchema,
    outputSchema: AnalyzeVoiceDiaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
