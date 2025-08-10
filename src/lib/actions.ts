'use server';

import { adaptiveWorkoutGeneration, type AdaptiveWorkoutGenerationInput } from "@/ai/flows/adaptive-workout-generation";
import { poseCorrection, type PoseCorrectionInput } from "@/ai/flows/pose-correction";
import { analyzeVoiceDiary, type AnalyzeVoiceDiaryInput } from "@/ai/flows/voice-diary-analysis";

export async function runAdaptiveWorkoutGeneration(input: AdaptiveWorkoutGenerationInput) {
  try {
    return await adaptiveWorkoutGeneration(input);
  } catch (error) {
    console.error("Error in runAdaptiveWorkoutGeneration:", error);
    throw new Error("Failed to generate adaptive workout.");
  }
}

export async function runPoseCorrection(input: PoseCorrectionInput) {
  try {
    return await poseCorrection(input);
  } catch (error) {
    console.error("Error in runPoseCorrection:", error);
    throw new Error("Failed to perform pose correction.");
  }
}

export async function runAnalyzeVoiceDiary(input: AnalyzeVoiceDiaryInput) {
  try {
    return await analyzeVoiceDiary(input);
  } catch (error) {
    console.error("Error in runAnalyzeVoiceDiary:", error);
    throw new Error("Failed to analyze voice diary.");
  }
}
