'use server';
/**
 * @fileOverview An AI agent that analyzes the user's pose and provides real-time corrections.
 *
 * - poseCorrection - A function that handles the pose correction process.
 * - PoseCorrectionInput - The input type for the poseCorrection function.
 * - PoseCorrectionOutput - The return type for the poseCorrection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PoseCorrectionInputSchema = z.object({
  cameraFeedDataUri: z
    .string()
    .describe(
      "The camera feed data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PoseCorrectionInput = z.infer<typeof PoseCorrectionInputSchema>;

const PoseCorrectionOutputSchema = z.object({
  corrections: z
    .array(z.string())
    .describe('An array of corrections for the athlete to improve their form.'),
});
export type PoseCorrectionOutput = z.infer<typeof PoseCorrectionOutputSchema>;

export async function poseCorrection(input: PoseCorrectionInput): Promise<PoseCorrectionOutput> {
  return poseCorrectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'poseCorrectionPrompt',
  input: {schema: PoseCorrectionInputSchema},
  output: {schema: PoseCorrectionOutputSchema},
  prompt: `You are an expert AI sports coach. You will analyze the athlete's form based on the camera feed and provide real-time corrections.

Analyze the athlete's form in the following camera feed and provide specific corrections to improve their technique and prevent injuries:

Camera Feed: {{media url=cameraFeedDataUri}}

Provide the corrections as a list of strings.
`,
});

const poseCorrectionFlow = ai.defineFlow(
  {
    name: 'poseCorrectionFlow',
    inputSchema: PoseCorrectionInputSchema,
    outputSchema: PoseCorrectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
