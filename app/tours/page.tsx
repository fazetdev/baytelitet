'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/useLanguage';
import VirtualTourViewer from './components/VirtualTourViewer';
import SunPathSimulation from './components/SunPathSimulation';
import SeasonalView from './components/SeasonalView';
import NeighborhoodMap from './components/NeighborhoodMap';
import TourList from './components/TourList';
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
  const { language, isRTL } = useLanguage();
  const [activeTour, setActiveTour] = useState<VirtualTour>(sampleTours[0]);
  const [viewMode, setViewMode] = useState('day');
  const [season, setSeason] = useState('summer');

  const handleTourSelect = (tour: VirtualTour) => {
    setActiveTour(tour);
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-gradient-to-b from-bayt-dark to-gray-900 text-white"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'ar' ? 'الجولات الافتراضية' : 'Virtual Tours'}
          </h1>
          <p className="text-bayt-cool text-lg">
            {language === 'ar' 
              ? 'استكشف العقار بتجربة تفاعلية' 
              : 'Explore properties with an interactive experience'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Virtual Tour Viewer */}
            <VirtualTourViewer
              tourData={activeTour}
              language={language}
              isRTL={isRTL}
            />

            {/* Interactive Controls */}
            <div className="bg-bayt-dark/50 border border-bayt-cool/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'عناصر تحكم تفاعلية' : 'Interactive Controls'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SunPathSimulation
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  language={language}
                  isRTL={isRTL}
                />

                <SeasonalView
                  season={season}
                  setSeason={setSeason}
                  language={language}
                  isRTL={isRTL}
                />
              </div>
            </div>

            {/* Neighborhood Map */}
            <NeighborhoodMap
              tourData={activeTour}
              language={language}
              isRTL={isRTL}
            />
          </div>

          {/* Tour List Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-bayt-dark/50 border border-bayt-cool/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  {language === 'ar' ? 'الجولات المتاحة' : 'Available Tours'}
                </h2>
                <div className="space-y-4">
                  {sampleTours.map(tour => (
                    <button
                      key={tour.id}
                      onClick={() => handleTourSelect(tour)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 text-left ${
                        activeTour.id === tour.id
                          ? 'bg-bayt-warm/20 border-2 border-bayt-warm'
                          : 'bg-bayt-dark/30 border border-bayt-cool/20 hover:bg-bayt-dark/50'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          {tour.id === 1 ? '🏢' : '🏖️'}
                        </div>
                        <div>
                          <h3 className="font-bold">
                            {language === 'ar' ? tour.titleAr : tour.title}
                          </h3>
                          <p className="text-bayt-cool text-sm">
                            {tour.duration} • {language === 'ar' ? tour.typeAr : tour.type}
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
