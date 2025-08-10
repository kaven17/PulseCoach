'use client';
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { runAnalyzeVoiceDiary } from '@/lib/actions';
import type { AnalyzeVoiceDiaryOutput } from '@/ai/flows/voice-diary-analysis';

export function VoiceDiary() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeVoiceDiaryOutput | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const processAudio = () => {
    setIsRecording(false);
    
    if (audioChunksRef.current.length === 0) {
        console.warn("No audio data recorded.");
        return;
    }

    setIsLoading(true);
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      try {
        const result = await runAnalyzeVoiceDiary({ voiceLog: base64data });
        setAnalysis(result);
      } catch (error) {
        console.error('Error analyzing voice diary:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'There was an error processing your voice log.',
        });
      } finally {
        setIsLoading(false);
        audioChunksRef.current = [];
      }
    };
  };

  const startRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      recorder.onstop = processAudio;
      audioChunksRef.current = [];
      recorder.start();
      setIsRecording(true);
      setAnalysis(null);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast({
        variant: 'destructive',
        title: 'Microphone Error',
        description: 'Could not access the microphone. Please check your browser permissions.',
      });
    }
  };

  const stopRecording = () => {
     if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
     }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Diary</CardTitle>
        <CardDescription>Record a quick update on your workout and mood. The AI will use this to adapt your next session.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Button onClick={toggleRecording} size="lg" className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90">
          {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </Button>
        {isRecording && <p className="text-sm text-primary animate-pulse">Recording...</p>}
        {analysis && (
          <div className="w-full text-sm space-y-3 mt-4 p-4 bg-secondary rounded-lg">
            <p><strong>Transcription:</strong> {analysis.transcription}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <p><strong>Mood:</strong> <span className="font-semibold text-accent">{analysis.mood}</span></p>
                <p><strong>Workout:</strong> <span className="font-semibold">{analysis.workoutDetails}</span></p>
                <p><strong>Injuries:</strong> <span className="font-semibold text-destructive">{analysis.potentialInjuries || 'None'}</span></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
