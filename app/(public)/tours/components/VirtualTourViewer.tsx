'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Maximize2, Video } from 'lucide-react';
import { VirtualTour } from '../types';

interface Props {
  tourData?: VirtualTour;
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function VirtualTourViewer({ tourData, language, isRTL }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!tourData) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        {language === 'ar' ? 'لا توجد جولة مختارة' : 'No tour selected'}
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];
      recorder.ondataavailable = e => e.data.size && recordedChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        tourData.videoUrl = URL.createObjectURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      setError(language === 'ar' ? 'فشل الوصول للكاميرا' : 'Camera access failed');
    }
  };

  return (
    <div ref={containerRef} className="bg-black rounded-2xl overflow-hidden border border-bayt-cool/50 relative">
      <div className="h-[500px] flex items-center justify-center">
        {error && <p className="text-red-500">{error}</p>}
        {tourData.videoUrl ? (
          <video ref={videoRef} src={tourData.videoUrl} className="w-full h-full object-contain" />
        ) : (
          <p className="text-white">{language === 'ar' ? 'لا يوجد فيديو' : 'No video yet'}</p>
        )}
        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-3 p-2 bg-black/50 rounded-lg`}>
          <button className="text-white" onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</button>
          <button className="text-white" onClick={isRecording ? () => mediaRecorderRef.current?.stop() : startRecording}>
            <Video className={isRecording ? 'text-red-500' : ''} />
          </button>
          <button className="text-white" onClick={toggleFullscreen}><Maximize2 /></button>
        </div>
      </div>
    </div>
  );
}
