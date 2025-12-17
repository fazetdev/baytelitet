'use client';

import { useState } from 'react';
import { Play, Pause, Maximize, Compass, Sun, Cloud, Clock } from 'lucide-react';

// Defined the shape of the tours for TypeScript
interface VirtualTour {
  id: number;
  title: string;
  property: string;
  duration: string;
  type: string;
  features: string[];
  thumbnailColor: string;
}

const virtualTours: VirtualTour[] = [
  {
    id: 1,
    title: 'Palm Jumeirah Villa Tour',
    property: 'Palm Jumeirah Luxury Villa',
    duration: '5:30',
    type: '360° Interactive',
    features: ['Day/Night View', 'Seasonal Changes', 'Sun Path Simulation', 'Neighborhood Map'],
    thumbnailColor: 'from-bayt-cool to-bayt-dark'
  },
  {
    id: 2,
    title: 'Downtown Sky Villa Experience',
    property: 'Downtown Dubai Sky Villa',
    duration: '4:15',
    type: 'VR Ready',
    features: ['Burj Khalifa View', 'Floor-by-Floor', 'Amenities Tour', 'Qibla Direction'],
    thumbnailColor: 'from-bayt-warm to-bayt-dark'
  },
  {
    id: 3,
    title: 'Arabian Ranches Walkthrough',
    property: 'Arabian Ranches Family Home',
    duration: '6:45',
    type: 'Interactive 3D',
    features: ['Golf Course View', 'Garden Tour', 'Interior Design', 'Family Areas'],
    thumbnailColor: 'from-bayt-cultural to-bayt-dark'
  },
  {
    id: 4,
    title: 'Marina Bay Apartment Tour',
    property: 'Marina Bay Luxury Apartment',
    duration: '3:30',
    type: '360° Panorama',
    features: ['Marina View', 'Balcony Vista', 'Smart Features', 'Building Amenities'],
    thumbnailColor: 'from-yellow-700 to-bayt-dark'
  },
  {
    id: 5,
    title: 'Al Reem Island Penthouse',
    property: 'Al Reem Island Penthouse',
    duration: '7:15',
    type: 'VR Experience',
    features: ['Skyline Tour', 'Private Pool', 'Luxury Finishes', 'City Context'],
    thumbnailColor: 'from-bayt-cool to-bayt-dark'
  },
  {
    id: 6,
    title: 'Jeddah Corniche Heritage',
    property: 'Jeddah Corniche Villa',
    duration: '8:00',
    type: 'Cultural Tour',
    features: ['Sea View', 'Traditional Design', 'Family Quarters', 'Local Context'],
    thumbnailColor: 'from-bayt-cultural to-bayt-dark'
  }
];

// Added type for the language prop to ensure it matches 'en' or 'ar'
export default function ToursPage({ language = 'en' }: { language?: 'en' | 'ar' }) {
  const [activeTour, setActiveTour] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('day');
  const [season, setSeason] = useState('winter');

  const content = {
    en: {
      title: 'Immersive Virtual Tours',
      subtitle: 'Experience properties like never before with 360° tours, VR compatibility, and intelligent simulations.',
      enterVRMode: 'Enter VR Mode',
      viewAllTours: 'View All Tours',
      virtualTourActive: 'Virtual Tour Active',
      useInstructions: 'Use mouse to navigate or VR headset for immersion',
      timeOfDay: 'Time of Day',
      day: 'day',
      dusk: 'dusk',
      night: 'night',
      seasonLabel: 'Season',
      winter: 'winter',
      spring: 'spring',
      summer: 'summer',
      autumn: 'autumn',
      sunPosition: 'Sun Position',
      prayerRoomView: 'Prayer Room View',
      showQibla: 'Show Qibla Direction',
      tourFeatures: 'Tour Features',
      availableTours: 'Available Tours',
      tourAnalytics: 'Tour Analytics',
      userEngagement: 'User Engagement',
      tourCompletion: 'Tour Completion',
      leadConversion: 'Lead Conversion',
      sunPathSimulation: 'Sun Path Simulation',
      sunPathDescription: 'Visualize sunlight through property at different times',
      seasonalViewPreview: 'Seasonal View Preview',
      seasonalDescription: 'See property during "green season" vs summer',
      neighborhoodContext: 'Neighborhood Context',
      neighborhoodDescription: 'Highlights nearby mosques, schools, clinics',
      minutes: 'min'
    },
    ar: {
      title: 'جولات افتراضية غامرة',
      subtitle: 'اختبر العقارات كما لم يحدث من قبل مع جولات 360 درجة، وتوافق الواقع الافتراضي، ومحاكاة ذكية.',
      enterVRMode: 'الدخول لوضع الواقع الافتراضي',
      viewAllTours: 'عرض جميع الجولات',
      virtualTourActive: 'جولة افتراضية نشطة',
      useInstructions: 'استخدم الماوس للتنقل أو سماعة الواقع الافتراضي للانغماس',
      timeOfDay: 'وقت اليوم',
      day: 'نهار',
      dusk: 'غسق',
      night: 'ليل',
      seasonLabel: 'الموسم',
      winter: 'شتاء',
      spring: 'ربيع',
      summer: 'صيف',
      autumn: 'خريف',
      sunPosition: 'موقع الشمس',
      prayerRoomView: 'عرض غرفة الصلاة',
      showQibla: 'عرض اتجاه القبلة',
      tourFeatures: 'مميزات الجولة',
      availableTours: 'الجولات المتاحة',
      tourAnalytics: 'تحليلات الجولة',
      userEngagement: 'تفاعل المستخدم',
      tourCompletion: 'إكمال الجولة',
      leadConversion: 'تحويل العملاء المحتملين',
      sunPathSimulation: 'محاكاة مسار الشمس',
      sunPathDescription: 'تصور ضوء الشمس عبر العقار في أوقات مختلفة',
      seasonalViewPreview: 'معاينة المنظر الموسمي',
      seasonalDescription: 'شاهد العقار خلال "الموسم الأخضر" مقابل الصيف',
      neighborhoodContext: 'سياق الحي',
      neighborhoodDescription: 'يسلط الضوء على المساجد والمدارس والعيادات القريبة',
      minutes: 'دقيقة'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  // Added ': string' type to seasonKey to fix the red line in screenshot
  const getSeasonDisplay = (seasonKey: string) => {
    const seasonMap: Record<string, string> = {
      winter: language === 'en' ? 'winter' : 'شتاء',
      spring: language === 'en' ? 'spring' : 'ربيع',
      summer: language === 'en' ? 'summer' : 'صيف',
      autumn: language === 'en' ? 'autumn' : 'خريف'
    };
    return seasonMap[seasonKey] || seasonKey;
  };

  // Added ': string' type to timeKey to fix the red line in screenshot
  const getTimeDisplay = (timeKey: string) => {
    const timeMap: Record<string, string> = {
      day: language === 'en' ? 'day' : 'نهار',
      dusk: language === 'en' ? 'dusk' : 'غسق',
      night: language === 'en' ? 'night' : 'ليل'
    };
    return timeMap[timeKey] || timeKey;
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-dark text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bayt-dark/80 to-bayt-cool/50"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${isRTL ? 'text-right' : ''}`}>
              {t.title}
            </h1>
            <p className={`text-xl text-bayt-light mb-10 max-w-3xl mx-auto ${isRTL ? 'text-right' : ''}`}>
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className={`px-6 py-3 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-700 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Maximize className={`inline w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.enterVRMode}
              </button>
              <button className={`px-6 py-3 bg-transparent border-2 border-bayt-cool text-white font-bold rounded-xl hover:bg-bayt-cool/20 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Compass className={`inline w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.viewAllTours}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-bayt-dark/90 to-bayt-dark rounded-3xl overflow-hidden border border-bayt-cool/50 shadow-2xl">
              <div className="p-6 border-b border-bayt-cool/50">
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h2 className="text-2xl font-bold text-bayt-light">
                      {virtualTours.find(tour => tour.id === activeTour)?.title}
                    </h2>
                    <p className="text-bayt-cool">
                      {virtualTours.find(tour => tour.id === activeTour)?.property}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-bayt-warm hover:bg-yellow-700 p-3 rounded-full text-bayt-dark"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button className="bg-bayt-cool/50 hover:bg-bayt-cool p-3 rounded-full text-bayt-dark">
                      <Maximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-bayt-dark/70 to-bayt-cool/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 text-bayt-warm">🏠</div>
                    <p className="text-xl font-semibold text-bayt-light">{t.virtualTourActive}</p>
                    <p className="text-bayt-cool">{t.useInstructions}</p>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-bayt-dark/90 backdrop-blur-sm rounded-xl p-4 border border-bayt-cool/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={isRTL ? 'text-right' : ''}>
                        <label className="block text-sm text-bayt-cool mb-2">{t.timeOfDay}</label>
                        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {['day', 'dusk', 'night'].map(time => (
                            <button
                              key={time}
                              onClick={() => setViewMode(time)}
                              className={`px-3 py-2 rounded-lg text-sm capitalize ${
                                viewMode === time 
                                  ? 'bg-bayt-warm text-bayt-dark'
                                  : 'bg-bayt-cool/30 text-bayt-light hover:bg-bayt-cool/50'
                              }`}
                            >
                              {getTimeDisplay(time)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <label className="block text-sm text-bayt-cool mb-2">{t.seasonLabel}</label>
                        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {['winter', 'spring', 'summer', 'autumn'].map(s => (
                            <button
                              key={s}
                              onClick={() => setSeason(s)}
                              className={`px-3 py-2 rounded-lg text-sm capitalize ${
                                season === s 
                                  ? 'bg-bayt-cultural text-white'
                                  : 'bg-bayt-cool/30 text-bayt-light hover:bg-bayt-cool/50'
                              }`}
                            >
                              {getSeasonDisplay(s)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <label className="block text-sm text-bayt-cool mb-2">{t.sunPosition}</label>
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Sun className="w-5 h-5 text-bayt-warm" />
                          <input type="range" min="0" max="100" defaultValue="50" className="flex-1 accent-bayt-warm" />
                          <Cloud className="w-5 h-5 text-bayt-cool" />
                        </div>
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <label className="block text-sm text-bayt-cool mb-2">{t.prayerRoomView}</label>
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-bayt-cultural to-emerald-700 rounded-lg font-semibold hover:from-emerald-700 hover:to-bayt-cultural">
                          {t.showQibla}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-4 text-bayt-light ${isRTL ? 'text-right' : ''}`}>
                  {t.tourFeatures}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {virtualTours.find(tour => tour.id === activeTour)?.features.map((feature, index) => (
                    <div key={index} className={`bg-bayt-cool/10 rounded-xl p-4 text-center border border-bayt-cool/30 ${isRTL ? 'text-right' : ''}`}>
                      <div className="text-2xl mb-2 text-bayt-warm">🌟</div>
                      <div className="text-sm text-bayt-light">{feature}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className={`text-2xl font-bold text-bayt-light ${isRTL ? 'text-right' : ''}`}>
              {t.availableTours}
            </h3>
            <div className="space-y-4">
              {virtualTours.map(tour => (
                <button
                  key={tour.id}
                  onClick={() => setActiveTour(tour.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${isRTL ? 'text-right' : ''} ${
                    activeTour === tour.id
                      ? 'bg-gradient-to-r from-bayt-dark/70 to-bayt-cool/30 border-2 border-bayt-warm'
                      : 'bg-bayt-dark/50 hover:bg-bayt-dark/70 border border-bayt-cool/50'
                  }`}
                >
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tour.thumbnailColor} flex items-center justify-center`}>
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg text-bayt-light ${isRTL ? 'text-right' : ''}`}>{tour.title}</h4>
                      <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>{tour.property}</p>
                      <div className={`flex items-center gap-4 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`flex items-center gap-1 text-sm text-bayt-cool ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className="w-4 h-4 text-bayt-warm" />
                          {tour.duration} {t.minutes}
                        </span>
                        <span className="bg-bayt-cool/30 text-bayt-light px-2 py-1 rounded text-xs">
                          {tour.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className={`bg-bayt-dark/70 rounded-2xl p-6 mt-8 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
              <h4 className={`font-bold text-lg mb-4 text-bayt-light ${isRTL ? 'text-right' : ''}`}>
                {t.tourAnalytics}
              </h4>
              <div className="space-y-4">
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="flex justify-between text-sm mb-1 text-bayt-cool">
                    <span>{t.userEngagement}</span>
                    <span className='text-bayt-cultural'>85%</span>
                  </div>
                  <div className="h-2 bg-bayt-cool/30 rounded-full overflow-hidden">
                    <div className="h-full bg-bayt-cultural rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="flex justify-between text-sm mb-1 text-bayt-cool">
                    <span>{t.tourCompletion}</span>
                    <span className='text-bayt-cool'>72%</span>
                  </div>
                  <div className="h-2 bg-bayt-cool/30 rounded-full overflow-hidden">
                    <div className="h-full bg-bayt-cool rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="flex justify-between text-sm mb-1 text-bayt-cool">
                    <span>{t.leadConversion}</span>
                    <span className='text-bayt-warm'>45%</span>
                  </div>
                  <div className="h-2 bg-bayt-cool/30 rounded-full overflow-hidden">
                    <div className="h-full bg-bayt-warm rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`bg-gradient-to-br from-bayt-warm/20 to-bayt-dark/30 rounded-2xl p-8 border border-bayt-warm/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-4 text-bayt-warm">🌅</div>
            <h4 className="text-xl font-bold mb-3 text-bayt-light">{t.sunPathSimulation}</h4>
            <p className="text-gray-300">{t.sunPathDescription}</p>
          </div>
          <div className={`bg-gradient-to-br from-bayt-cultural/20 to-bayt-dark/30 rounded-2xl p-8 border border-bayt-cultural/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-4 text-bayt-cultural">🍃</div>
            <h4 className="text-xl font-bold mb-3 text-bayt-light">{t.seasonalViewPreview}</h4>
            <p className="text-gray-300">{t.seasonalDescription}</p>
          </div>
          <div className={`bg-gradient-to-br from-bayt-cool/20 to-bayt-dark/30 rounded-2xl p-8 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-4xl mb-4 text-bayt-cool">🕌</div>
            <h4 className="text-xl font-bold mb-3 text-bayt-light">{t.neighborhoodContext}</h4>
            <p className="text-gray-300">{t.neighborhoodDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}