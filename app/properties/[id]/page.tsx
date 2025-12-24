'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProperties } from '@/context/useProperties';
import { useLanguage } from '@/context/useLanguage';
import VirtualTourViewer from '../components/VirtualTourViewer';
import PropertyMap from '@/components/PropertyMap';
import {
  Bed,
  Bath,
  MapPin,
  ShieldCheck,
  Send,
  Loader2,
  DollarSign,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { properties } = useProperties();
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'compliance'>('description');

  useEffect(() => setMounted(true), []);

  const property = useMemo(() => properties.find(p => p.id === Number(id)), [properties, id]);

  const tourData = useMemo(() => {
    if (!property) return null;
    return {
      id: property.id,
      title: property.title,
      titleAr: property.title,
      description: property.description,
      descriptionAr: property.description,
      type: property.type as any,
      typeAr: property.type === 'villa' ? 'فيلا' : 'شقة',
      features: property.features || [],
      featuresAr: property.features || [],
      imageUrl: property.images?.[0] || '',
      thumbnail: property.images?.[0] || '',
      latitude: property.latitude || 25.2048,
      longitude: property.longitude || 55.2708,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.sqft || property.area || 0,
      reraPermit: (property as any).reraPermit || 'N/A',
      nocStatus: (property as any).nocStatus || 'Pending',
      status: 'available' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }, [property]);

  if (!mounted) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-bayt-gold animate-spin" />
    </div>
  );

  if (!property || !tourData) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <p className="text-bayt-dark font-black italic tracking-widest animate-pulse uppercase">
        {isRTL ? 'الأصل غير موجود' : 'Asset Not Found'}
      </p>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  const calculateROI = (price: number) => ((price * 0.06) / 12).toFixed(2); // Example monthly rental yield

  return (
    <div className="min-h-screen bg-white text-bayt-dark pb-20">
      {/* Hero Section */}
      <section className="h-[60vh] md:h-[75vh] bg-black relative border-b-8 border-bayt-gold">
        <VirtualTourViewer tourData={tourData} language={lang} isRTL={isRTL} />
        <div className="absolute top-8 left-8 z-10 bg-bayt-gold text-bayt-dark px-6 py-2 font-black italic uppercase tracking-widest text-[10px]">
          {isRTL ? 'معاينة حية 360 درجة' : 'LIVE 360° INTERACTIVE'}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[2px] bg-bayt-gold" />
          <h2 className="text-xl font-black italic uppercase tracking-widest">
            {isRTL ? 'إحداثيات الموقع' : 'GEOSPATIAL LOCATION'}
          </h2>
        </div>
        <div className="h-[450px] border border-gray-200 shadow-2xl relative">
          <PropertyMap
            latitude={property.latitude || 25.2048}
            longitude={property.longitude || 55.2708}
            title={property.title}
            zoom={16}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 container mx-auto px-4 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-bayt-gold font-bold uppercase tracking-widest text-sm">
                <MapPin className="w-4 h-4" /> {property.location}
              </div>
            </div>

            <div className="flex gap-12 border-y border-gray-100 py-12">
              <div className="flex items-center gap-4">
                <Bed className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{property.bedrooms}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{isRTL ? 'غرف' : 'BEDS'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Bath className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{property.bathrooms}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{isRTL ? 'حمامات' : 'BATHS'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="w-8 h-8 text-bayt-gold" />
                <div>
                  <p className="text-2xl font-black italic">{property.price.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{isRTL ? 'السعر (AED)' : 'PRICE (AED)'}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-6 mb-4 border-b border-gray-200">
                {['description', 'features', 'compliance'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`uppercase font-bold tracking-widest py-2 px-4 ${
                      activeTab === tab ? 'border-b-4 border-bayt-gold text-bayt-dark' : 'text-gray-400'
                    }`}
                  >
                    {isRTL
                      ? tab === 'description' ? 'الوصف'
                      : tab === 'features' ? 'المميزات'
                      : 'الامتثال'
                      : tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="text-gray-600 font-medium leading-relaxed max-w-2xl">
                {activeTab === 'description' && <p>{property.description}</p>}
                {activeTab === 'features' && (
                  <ul className="list-disc pl-6">
                    {property.features?.map((f, idx) => <li key={idx}>{f}</li>)}
                  </ul>
                )}
                {activeTab === 'compliance' && (
                  <div className="space-y-2">
                    <p><span className="font-bold">RERA/Permit:</span> {(property as any).reraPermit || 'N/A'}</p>
                    <p><span className="font-bold">NOC Status:</span> {(property as any).nocStatus || 'Pending'}</p>
                    <p><span className="font-bold">Estimated ROI:</span> AED {calculateROI(property.price)} / month</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-bayt-dark text-white p-10 sticky top-24 shadow-[20px_20px_0px_#D4AF37]">
              <h3 className="text-2xl font-black italic uppercase mb-2">{isRTL ? 'طلب الملف' : 'Request Dossier'}</h3>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                {isRTL ? 'استفسار عن العقار' : 'Asset Acquisition Inquiry'}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder={isRTL ? 'الاسم' : 'NAME'} className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />
                <input required type="email" placeholder={isRTL ? 'البريد' : 'EMAIL'} className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />
                <input required type="tel" placeholder={isRTL ? 'واتساب' : 'WHATSAPP NO.'} className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm focus:border-bayt-gold outline-none font-bold" />
                
                <button disabled={formStatus !== 'idle'} className="w-full bg-bayt-gold text-bayt-dark font-black italic uppercase py-5 flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50">
                  {formStatus === 'sent' ? (isRTL ? 'تم الإرسال' : 'SENT SUCCESSFULLY') : (
                    <>
                      {isRTL ? 'إرسال' : 'ACQUIRE DATA'}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
