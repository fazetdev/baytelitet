'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/useLanguage';
import VirtualTourViewer from './components/VirtualTourViewer';
import SunPathSimulation from './components/SunPathSimulation';
import SeasonalView from './components/SeasonalView';
import NeighborhoodMap from './components/NeighborhoodMap';
import { VirtualTour } from './types';

const sampleTours: VirtualTour[] = [
  {
    id: 1,
    title: 'Luxury Apartment Tour',
    titleAr: 'جولة شقة فاخرة',
    property: 'Downtown Apartment',
    propertyAr: 'شقة وسط المدينة',
    duration: '12 min',
    type: 'Virtual Tour',
    typeAr: 'جولة افتراضية',
    features: ['360 View', 'Recording', 'Sun Simulation', 'Seasonal Changes'],
    featuresAr: ['عرض 360', 'تسجيل', 'محاكاة الشمس', 'تغيرات موسمية'],
    thumbnail: '/images/tours/downtown.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Beach Villa Experience',
    titleAr: 'تجربة فيلا شاطئية',
    property: 'Palm Jumeirah Villa',
    propertyAr: 'فيلا نخلة الجميرة',
    duration: '15 min',
    type: 'VR Ready',
    typeAr: 'جاهز للواقع الافتراضي',
    features: ['Beach View', 'Pool Area', 'Garden Tour', 'Neighborhood Map'],
    featuresAr: ['إطلالة شاطئية', 'منطقة المسبح', 'جولة الحديقة', 'خريطة الحي'],
    thumbnail: '/images/tours/beach-villa.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ToursPage() {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';
  
  const [activeTour, setActiveTour] = useState<VirtualTour>(sampleTours[0]);
  const [viewMode, setViewMode] = useState('day');
  const [season, setSeason] = useState('summer');

  const handleTourSelect = (tour: VirtualTour) => {
    setActiveTour(tour);
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {lang === 'ar' ? 'الجولات الافتراضية' : 'Virtual Tours'}
          </h1>
          <p className="text-gray-400 text-lg">
            {lang === 'ar' 
              ? 'استكشف العقار بتجربة تفاعلية' 
              : 'Explore properties with an interactive experience'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <VirtualTourViewer
              tourData={activeTour}
              language={lang}
              isRTL={isRTL}
            />

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                {lang === 'ar' ? 'عناصر تحكم تفاعلية' : 'Interactive Controls'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SunPathSimulation
                  language={lang}
                  isRTL={isRTL}
                />

                <SeasonalView
                  season={season}
                  setSeason={setSeason}
                  language={lang}
                  isRTL={isRTL}
                />
              </div>
            </div>

            <NeighborhoodMap
              language={lang}
              isRTL={isRTL}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  {lang === 'ar' ? 'الجولات المتاحة' : 'Available Tours'}
                </h2>
                <div className="space-y-4">
                  {sampleTours.map(tour => (
                    <button
                      key={tour.id}
                      onClick={() => handleTourSelect(tour)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 ${
                        activeTour.id === tour.id
                          ? 'bg-bayt-cultural/20 border-2 border-bayt-cultural'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                          {tour.id === 1 ? '🏢' : '🏖️'}
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <h3 className="font-bold">
                            {lang === 'ar' ? tour.titleAr : tour.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {tour.duration} • {lang === 'ar' ? tour.typeAr : tour.type}
                          </p>
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
    </div>
  );
}
