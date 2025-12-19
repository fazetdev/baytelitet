'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Play, Pause, Maximize2, Compass, Sun, Cloud, Clock, Video, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/useLanguage';
import LoadingSpinner from '@/components/LoadingSpinner';

interface VirtualTour {
  id: number;
  title: string;
  titleAr: string;
  property: string;
  propertyAr: string;
  duration: string;
  type: string;
  typeAr: string;
  features: string[];
  featuresAr: string[];
  videoUrl?: string;
  tourUrl?: string; // URL for actual 360° tour
  thumbnail: string;
}

const initialTours: VirtualTour[] = [
  {
    id: 1,
    title: 'Palm Jumeirah Villa Tour',
    titleAr: 'جولة فيلا نخلة الجميرة',
    property: 'Palm Jumeirah Luxury Villa',
    propertyAr: 'فيلا فاخرة نخلة الجميرة',
    duration: '15 min',
    type: '360° Interactive',
    typeAr: 'تفاعلي 360°',
    features: ['Day/Night View', 'Seasonal Changes', 'Sun Path Simulation', 'Neighborhood Map'],
    featuresAr: ['عرض يوم/ليل', 'تغيرات موسمية', 'محاكاة مسار الشمس', 'خريطة الحي'],
    thumbnail: '/images/tours/palm-villa.jpg',
    tourUrl: '/tours/360/palm-jumeirah'
  },
  {
    id: 2,
    title: 'Downtown Sky Villa Experience',
    titleAr: 'تجربة فيلا سماوية وسط المدينة',
    property: 'Downtown Dubai Sky Villa',
    propertyAr: 'فيلا سماوية وسط دبي',
    duration: '20 min',
    type: 'VR Ready',
    typeAr: 'جاهز للواقع الافتراضي',
    features: ['Burj Khalifa View', 'Floor-by-Floor', 'Amenities Tour', 'Qibla Direction'],
    featuresAr: ['إطلالة برج خليفة', 'طابق تلو الآخر', 'جولة المرافق', 'اتجاه القبلة'],
    thumbnail: '/images/tours/downtown-villa.jpg',
    tourUrl: '/tours/360/downtown-sky'
  }
];

export default function ToursPage() {
  const { language, isRTL } = useLanguage();
  const [activeTour, setActiveTour] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tours, setTours] = useState<VirtualTour[]>(initialTours);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const activeTourData = tours.find(t => t.id === activeTour);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        setTours(prev =>
          prev.map(t => (t.id === activeTour ? { ...t, videoUrl: url } : t))
        );
        
        // Stop all camera tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
    } catch (err) {
      console.error('Camera access failed:', err);
      alert(language === 'ar' ? 'فشل الوصول إلى الكاميرا' : 'Camera access failed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTourSelect = (tourId: number) => {
    setActiveTour(tourId);
    setIsPlaying(false);
    setIsLoading(true);
    
    // Simulate loading 360° tour
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleLaunch360Tour = () => {
    if (activeTourData?.tourUrl) {
      window.open(activeTourData.tourUrl, '_blank');
    } else {
      alert(language === 'ar' ? 'الجولة غير متاحة حالياً' : 'Tour not available');
    }
  };

  // Translations
  const t = {
    title: language === 'ar' ? 'جولات افتراضية' : 'Virtual Tours',
    subtitle: language === 'ar' ? 'استكشف العقارات بتجربة 360°' : 'Explore properties with 360° experience',
    selectTour: language === 'ar' ? 'اختر جولة' : 'Select a Tour',
    duration: language === 'ar' ? 'المدة' : 'Duration',
    features: language === 'ar' ? 'المميزات' : 'Features',
    launch360: language === 'ar' ? 'تشغيل جولة 360°' : 'Launch 360° Tour',
    recordTour: language === 'ar' ? 'تسجيل الجولة' : 'Record Tour',
    stopRecord: language === 'ar' ? 'إيقاف التسجيل' : 'Stop Recording',
    playing: language === 'ar' ? 'تشغيل' : 'Playing',
    paused: language === 'ar' ? 'متوقف' : 'Paused',
    fullscreen: language === 'ar' ? 'ملء الشاشة' : 'Fullscreen',
    exitFullscreen: language === 'ar' ? 'خروج من ملء الشاشة' : 'Exit Fullscreen',
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-gradient-to-b from-bayt-dark to-gray-900 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-bayt-cool text-lg">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tour Viewer */}
          <div className="lg:col-span-2">
            <div 
              ref={containerRef}
              className="bg-black/70 rounded-3xl overflow-hidden border border-bayt-cool/50 shadow-2xl"
            >
              {/* Tour Viewer */}
              <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-black">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : activeTourData?.videoUrl ? (
                  <video
                    ref={videoRef}
                    src={activeTourData.videoUrl}
                    className="w-full h-full object-contain"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    controls
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-2xl font-bold mb-2">
                      {language === 'ar' ? activeTourData?.titleAr : activeTourData?.title}
                    </h3>
                    <p className="text-bayt-cool text-center mb-6">
                      {language === 'ar' ? 'جولة 360° تفاعلية' : 'Interactive 360° Tour'}
                    </p>
                    <button
                      onClick={handleLaunch360Tour}
                      className="px-8 py-3 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-600 transition-colors flex items-center gap-2"
                    >
                      <Compass className="w-5 h-5" />
                      {t.launch360}
                    </button>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}>
                  <button
                    onClick={togglePlayPause}
                    disabled={!activeTourData?.videoUrl}
                    className="bg-bayt-warm/90 hover:bg-bayt-warm p-3 rounded-full text-bayt-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isPlaying ? t.paused : t.playing}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="bg-bayt-cultural/90 hover:bg-bayt-cultural p-3 rounded-full text-bayt-dark"
                      aria-label={t.recordTour}
                    >
                      <Video className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="bg-red-600 hover:bg-red-700 p-3 rounded-full text-white"
                      aria-label={t.stopRecord}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">●</div>
                    </button>
                  )}
                  
                  <button
                    onClick={toggleFullscreen}
                    className="bg-gray-800/90 hover:bg-gray-700 p-3 rounded-full text-white"
                    aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
                  >
                    <Maximize2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Tour Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {language === 'ar' ? activeTourData?.titleAr : activeTourData?.title}
                    </h2>
                    <p className="text-bayt-cool">
                      {language === 'ar' ? activeTourData?.propertyAr : activeTourData?.property}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {activeTourData?.duration}
                    </span>
                    <span className="px-3 py-1 bg-bayt-cool/20 rounded-full text-sm">
                      {language === 'ar' ? activeTourData?.typeAr : activeTourData?.type}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">{t.features}:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(language === 'ar' ? activeTourData?.featuresAr : activeTourData?.features)?.map((feature, index) => (
                      <div 
                        key={index} 
                        className="bg-bayt-dark/50 border border-bayt-cool/30 rounded-xl p-3 text-center hover:border-bayt-warm transition-colors"
                      >
                        <div className="text-2xl mb-1">🌟</div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tour List Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold mb-4">{t.selectTour}</h2>
              <div className="space-y-4">
                {tours.map(tour => (
                  <button
                    key={tour.id}
                    onClick={() => handleTourSelect(tour.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeTour === tour.id
                        ? 'bg-bayt-dark/80 border-2 border-bayt-warm shadow-lg'
                        : 'bg-bayt-dark/40 border border-bayt-cool/30 hover:bg-bayt-dark/60'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                        {/* Thumbnail */}
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          {tour.id === 1 ? '🌴' : '🏙️'}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">
                          {language === 'ar' ? tour.titleAr : tour.title}
                        </h3>
                        <p className="text-bayt-cool text-sm mt-1">
                          {language === 'ar' ? tour.propertyAr : tour.property}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-bayt-warm">
                            {tour.duration}
                          </span>
                          <span className="text-xs px-2 py-1 bg-bayt-cool/20 rounded-full">
                            {language === 'ar' ? tour.typeAr : tour.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
