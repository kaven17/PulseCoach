'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { runPoseCorrection } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Camera, CameraOff, Loader2, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function PoseCorrector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [corrections, setCorrections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isCameraOn || document.hidden) return;
    
    if (isLoading) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        
        setIsLoading(true);
        try {
            const result = await runPoseCorrection({ cameraFeedDataUri: dataUri });
            if (result.corrections.length > 0) {
              setCorrections(prev => [...result.corrections, ...prev].slice(0, 10));
            }
        } catch (error) {
            console.error('Pose correction failed:', error);
        } finally {
            setIsLoading(false);
        }
    }
  }, [isCameraOn, isLoading]);
  
  useEffect(() => {
    if (!isCameraOn) return;
    const intervalId = setInterval(processFrame, 2000);
    return () => clearInterval(intervalId);
  }, [isCameraOn, processFrame]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: 'destructive',
        title: 'Camera Error',
        description: 'Could not access the camera. Please check your browser permissions.',
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
    setCorrections([]);
    setIsLoading(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <div className="lg:col-span-2 relative rounded-lg overflow-hidden border bg-secondary flex items-center justify-center min-h-[300px]">
        <video ref={videoRef} autoPlay playsInline muted className={`h-full w-full object-cover transform -scale-x-100 ${isCameraOn ? '' : 'hidden'}`}></video>
        {!isCameraOn && <CameraOff className="h-24 w-24 text-muted-foreground" />}
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        <div className="absolute top-2 left-2">
            <Button onClick={toggleCamera} size="icon" variant="secondary">
                {isCameraOn ? <CameraOff /> : <Camera />}
            </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
            <Card className="bg-white/10 backdrop-blur-sm border-none">
                <CardContent className="p-2 flex items-center gap-2">
                    <Progress value={80} className="h-2 flex-1" />
                    <p className="text-white font-bold text-sm">CHEST</p>
                    <Progress value={60} className="h-2 flex-1" />
                    <p className="text-white font-bold text-sm">TRICEPS</p>
                </CardContent>
            </Card>
        </div>
      </div>
      <Card className="flex flex-col bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            AI Corrections
            {isLoading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
          </CardTitle>
          <CardDescription>Real-time feedback on your form.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {corrections.length === 0 && !isLoading && <p className="text-muted-foreground text-center pt-10">Start your camera to get feedback.</p>}
          <ul className="space-y-2">
            {corrections.map((correction, index) => (
              <li key={index} className={`p-3 rounded-md text-sm transition-all duration-300 ${index === 0 ? 'bg-primary/20 text-foreground shadow-md' : 'bg-secondary/50'}`}>
                {correction}
              </li>
            ))}
          </ul>
        </CardContent>
        <div className="p-2 border-t">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                 <Zap className="h-8 w-8 text-primary" />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-1">AI Coach Speaking...</p>
        </div>
      </Card>
    </div>
  );
}
