'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useProperties } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import { formatCurrency } from '@/lib/formatters';
import { MapPin, TrendingUp, CameraOff, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">Loading Map...</div>
});

const VirtualTourViewer = dynamic(() => import('../components/VirtualTourViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-bayt-dark animate-pulse" />
});

export default function PropertyExecutionPage() {
  const params = useParams();
  const id = params?.id;
  const { properties = [] } = useProperties() || {};
  const { lang = 'en' } = useLanguage() || {};
  const t = useTranslations(lang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !t) return null;

  const property = properties.find(p => p.id === Number(id));
  const isRTL = lang === 'ar';

  if (!property) return <div className="p-20 text-center font-bold">Property Not Found</div>;

  const firstImage = property.images && property.images.length > 0 ? property.images[0] : null;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bayt-dark">{property.title}</h1>
          <p className="flex items-center text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1" /> {property.location}
          </p>
        </div>
        
        <div className="relative aspect-video w-full bg-gray-900 rounded-3xl mb-12 overflow-hidden shadow-2xl">
           {firstImage ? (
             <VirtualTourViewer imageUrl={firstImage} />
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-white/50 bg-gray-800">
               <CameraOff className="w-12 h-12 mb-2 opacity-20" />
               <p>{isRTL ? 'جولة افتراضية قريباً' : 'Virtual Tour Coming Soon'}</p>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-bayt-warm" />
                {isRTL ? 'عن العقار' : 'About Property'}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">{property.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">{isRTL ? 'الموقع' : 'Location'}</h2>
              <div className="h-[450px] w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <PropertyMap 
                  latitude={property.latitude ?? 25.2048} 
                  longitude={property.longitude ?? 55.2708} 
                  title={property.title} 
                />
              </div>
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-bayt-dark text-white p-8 rounded-3xl sticky top-24 shadow-2xl">
              <div className="mb-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider">{isRTL ? 'السعر' : 'Investment Price'}</p>
                <p className="text-4xl font-bold text-bayt-warm">{formatCurrency(property.price)}</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="flex items-center gap-2 text-gray-300">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    {isRTL ? 'العائد المتوقع' : 'Expected Yield'}
                  </span>
                  <span className="font-bold">{property.rentalYield || '7.2%'}</span>
                </div>
              </div>
              <button className="w-full bg-bayt-warm hover:bg-white text-bayt-dark font-bold py-4 rounded-2xl transition-all duration-300">
                {isRTL ? 'طلب معلومات' : 'Enquire Now'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
