'use client';

import { useRef, useState, useEffect } from 'react';
import { Maximize2, Compass, ShieldCheck, Move, Loader2 } from 'lucide-react';
import { VirtualTour } from '../types';

interface Props {
  tourData?: VirtualTour;
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function VirtualTourViewer({ tourData, language, isRTL }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  
  const [isPannellumReady, setIsPannellumReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if library is already there or poll for it
    if ((window as any).pannellum) {
      setIsPannellumReady(true);
    } else {
      const check = setInterval(() => {
        if ((window as any).pannellum) {
          setIsPannellumReady(true);
          clearInterval(check);
        }
      }, 100);
      return () => clearInterval(check);
    }
  }, []);

  useEffect(() => {
    if (!isPannellumReady || !tourData?.imageUrl || !mounted) return;

    try {
      viewerRef.current = (window as any).pannellum.viewer('panorama-container', {
        type: 'equirectangular',
        panorama: tourData.imageUrl,
        autoLoad: true,
        showControls: false,
        compass: false,
      });
    } catch (err) {
      console.error("Pannellum Error:", err);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [isPannellumReady, tourData, mounted]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  if (!mounted) return <div className="h-[500px] bg-bayt-dark rounded-3xl" />;

  return (
    <div ref={containerRef} className="group bg-bayt-dark rounded-3xl overflow-hidden border-2 border-bayt-gold/30 relative shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      
      {/* HUD Header */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start pointer-events-none">
        <div className="bg-bayt-dark/80 backdrop-blur-md border-l-4 border-bayt-gold p-4 transition-transform group-hover:translate-x-2">
          <h4 className="text-bayt-gold font-black italic uppercase text-[10px] tracking-[0.2em] mb-1">
            {language === 'ar' ? 'عرض الأصول الرقمية' : 'DIGITAL ASSET VIEW'}
          </h4>
          <p className="text-white font-bold text-lg uppercase tracking-tight">
            {tourData?.title || (language === 'ar' ? 'جولة غامرة 360' : '360° IMMERSION')}
          </p>
        </div>
        <div className="bg-bayt-gold text-bayt-dark px-3 py-1 rounded-full font-black text-[10px] flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> {language === 'ar' ? 'موثق' : 'VERIFIED'}
        </div>
      </div>

      {!isPannellumReady ? (
        <div className="h-[500px] md:h-[650px] flex flex-col items-center justify-center bg-black gap-4">
          <Loader2 className="w-8 h-8 text-bayt-gold animate-spin" />
          <p className="text-bayt-gold text-xs font-black uppercase tracking-widest italic">Syncing Panoramic Core...</p>
        </div>
      ) : (
        <div id="panorama-container" className="h-[500px] md:h-[650px] w-full bg-black cursor-grab active:cursor-grabbing" />
      )}

      {/* Controls */}
      <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-20 flex gap-4`}>
        <div className="flex items-center gap-2 bg-bayt-dark/80 backdrop-blur-md border border-bayt-gold/30 p-2 rounded-2xl">
           <Move className="w-4 h-4 text-bayt-gold" />
           <span className="text-[10px] text-white font-bold uppercase mr-2">
             {language === 'ar' ? 'اسحب للاستكشاف' : 'DRAG TO EXPLORE'}
           </span>
        </div>
        <button 
          onClick={toggleFullscreen}
          className="w-14 h-14 bg-bayt-gold hover:bg-white text-bayt-dark rounded-full flex items-center justify-center transition-all active:scale-95 shadow-xl"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
