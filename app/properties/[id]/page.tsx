'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useProperties } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import { formatCurrency } from '@/lib/formatters';
import { MapPin, Globe, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';
import PropertyMap from '@/components/PropertyMap';
import VirtualTourViewer from '../components/VirtualTourViewer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PropertyExecutionPage() {
  const params = useParams();
  const id = params?.id;
  const { properties = [] } = useProperties() || {};
  const { lang = 'en' } = useLanguage() || {};
  const t = useTranslations(lang);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bayt-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bayt-warm"></div>
      </div>
    );
  }

  const propertyId = Number(id);
  const property = properties.find(p => p.id === propertyId);
  const isRTL = lang === 'ar';

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bayt-light p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-bayt-dark">Property Not Found</h1>
        <p className="text-bayt-cool">The execution data for ID {id} is unavailable.</p>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-bayt-dark">{property.title}</h1>
            <div className={`flex items-center text-bayt-cool mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-bayt-warm bg-bayt-dark px-6 py-3 rounded-2xl">
            {formatCurrency(property.price)}
          </div>
        </div>

        <div className="relative aspect-video w-full bg-bayt-dark rounded-3xl mb-8 overflow-hidden shadow-2xl border-4 border-bayt-warm/10">
           {property.virtualTour ? (
             <VirtualTourViewer imageUrl={property.images?.[0] || ''} />
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-white/50">
               <Globe className="w-12 h-12 mb-4 opacity-20" />
               <p>Virtual Tour not enabled</p>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-bayt-light/30 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-4">{t.description || 'Description'}</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </section>

            <section className="h-[450px] rounded-3xl overflow-hidden shadow-inner border-2 border-bayt-warm/5">
              <PropertyMap 
                latitude={property.latitude || 25.2048} 
                longitude={property.longitude || 55.2708} 
                zoom={15} 
              />
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-bayt-warm/20 p-6 rounded-3xl shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-bayt-dark mb-4 border-b pb-4">Execution Metrics</h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 bg-green-50 rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className="text-green-600 w-5 h-5" />
                    <span className="font-semibold text-bayt-dark">Rental Yield</span>
                  </div>
                  <span className="text-xl font-bold text-green-700">{property.rentalYield || '6.8%'}</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-bayt-dark text-white font-bold py-4 rounded-2xl shadow-lg">
                Book Viewing
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
