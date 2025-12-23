'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useProperties } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { formatCurrency } from '@/lib/formatters';
import { MapPin, TrendingUp, CameraOff, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { VirtualTour } from '../types';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-bayt-dark/10 animate-pulse flex items-center justify-center">Initializing Map...</div>
});

const VirtualTourViewer = dynamic(() => import('../components/VirtualTourViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-bayt-dark animate-pulse rounded-3xl" />
});

export default function PropertyExecutionPage() {
  const params = useParams();
  const id = params?.id;
  const { properties = [] } = useProperties() || {};
  const { lang = 'en' } = useLanguage() || {};
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bayt-dark flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-bayt-gold animate-spin" />
        <p className="text-bayt-gold font-black italic uppercase tracking-[0.3em]">Loading Executive View</p>
      </div>
    );
  }

  const property = properties.find(p => p.id === Number(id));
  const isRTL = lang === 'ar';

  if (!property) return (
    <div className="min-h-screen bg-bayt-dark flex items-center justify-center">
      <p className="text-bayt-gold font-black italic uppercase tracking-widest">Property Asset Not Found</p>
    </div>
  );

  // Robust Type-Safe Mapping for the Viewer
  const tourData: VirtualTour = {
    id: property.id,
    title: property.title,
    titleAr: property.title, // Map to property titleAr if available in your schema
    property: property.title,
    propertyAr: property.title,
    duration: "Live Stream",
    type: property.type,
    typeAr: property.type,
    features: property.features || [],
    featuresAr: property.features || [],
    imageUrl: property.images?.[0], 
    videoUrl: property.videoUrl,
    thumbnail: property.images?.[0] || '',
    latitude: property.latitude,
    longitude: property.longitude,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    status: (property.status as 'available' | 'sold' | 'rented') || 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 border-l-8 border-bayt-gold pl-6">
          <h1 className="text-5xl font-black text-bayt-dark italic uppercase tracking-tight leading-none mb-2">
            {property.title}
          </h1>
          <div className="flex items-center gap-4">
            <p className="flex items-center text-bayt-cool font-bold uppercase text-sm tracking-widest">
              <MapPin className="w-4 h-4 mr-1 text-bayt-gold" /> {property.location}
            </p>
            <span className="bg-bayt-dark text-bayt-gold px-3 py-1 text-[10px] font-black rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED ASSET
            </span>
          </div>
        </div>

        <div className="mb-12">
           {tourData.imageUrl ? (
             <VirtualTourViewer 
               tourData={tourData} 
               language={lang as 'en' | 'ar'} 
               isRTL={isRTL} 
             />
           ) : (
             <div className="h-[500px] flex flex-col items-center justify-center bg-bayt-dark border-2 border-dashed border-bayt-gold/20 rounded-3xl">
               <CameraOff className="w-16 h-16 text-bayt-gold/30 mb-4" />
               <p className="text-bayt-gold/50 font-black italic uppercase">Visual Assets Pending</p>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-bayt-gold/20" />
              <h2 className="text-2xl font-black italic uppercase mb-6 flex items-center gap-3 text-bayt-dark">
                <Info className="w-6 h-6 text-bayt-gold" />
                {isRTL ? 'تحليل الأصول' : 'Asset Analysis'}
              </h2>
              <p className="text-gray-800 text-xl leading-relaxed font-medium">
                {property.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black italic uppercase mb-6 text-bayt-dark">
                {isRTL ? 'الموقع الاستراتيجي' : 'Strategic Location'}
              </h2>
              {property.latitude && property.longitude ? (
                <div className="h-[450px] w-full rounded-3xl overflow-hidden border-2 border-bayt-dark shadow-xl">
                  <PropertyMap 
                    latitude={property.latitude} 
                    longitude={property.longitude} 
                    title={property.title} 
                  />
                </div>
              ) : (
                <div className="h-[450px] flex items-center justify-center bg-bayt-dark/10 rounded-3xl border-2 border-dashed border-bayt-dark/20">
                  <p className="text-bayt-dark/40 font-black italic uppercase">Geospatial Data Not Available</p>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-bayt-dark text-white p-8 rounded-[2rem] sticky top-24 shadow-2xl border-t-4 border-bayt-gold">
              <div className="mb-10">
                <p className="text-bayt-gold text-[10px] font-black italic uppercase tracking-[0.3em] mb-2">Investment Value</p>
                <p className="text-5xl font-black tracking-tighter text-white">{formatCurrency(property.price)}</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Target Yield
                  </span>
                  <span className="font-black text-xl italic text-bayt-gold">{property.rentalYield || '7.2%'}</span>
                </div>
              </div>

              <button className="w-full bg-bayt-gold hover:bg-white text-bayt-dark font-black italic uppercase py-5 rounded-2xl transition-all active:scale-95">
                INITIATE ENQUIRY
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
