'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { VirtualTour } from './types';
import { Play, Calendar, Clock, MapPin, Bed, Bath } from 'lucide-react';

const sampleTours: VirtualTour[] = [
  {
    id: 1,
    title: 'Luxury Apartment Tour',
    titleAr: 'جولة شقة فاخرة',
    property: 'Downtown Heights',
    propertyAr: 'داون تاون هايتس',
    duration: '2:45',
    type: 'apartment',
    typeAr: 'شقة',
    features: ['360° View', 'Voice Over', 'Interactive Map'],
    featuresAr: ['عرض 360 درجة', 'تعليق صوتي', 'خريطة تفاعلية'],
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
    bedrooms: 2,
    bathrooms: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Modern Villa Walkthrough',
    titleAr: 'جولة الفيلا الحديثة',
    property: 'Palm Residence',
    propertyAr: 'بالم ريزيدنس',
    duration: '4:15',
    type: 'villa',
    typeAr: 'فيلا',
    features: ['VR Ready', 'Night Mode', 'Floor Plan'],
    featuresAr: ['جاهز للواقع الافتراضي', 'الوضع الليلي', 'مخطط الطابق'],
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
    bedrooms: 5,
    bathrooms: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ToursPage() {
  const { lang } = useLanguage();
  const t = useTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-bayt-dark mb-4">
            {isRTL ? 'الجولات الافتراضية' : 'Virtual Tours'}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            {isRTL 
              ? 'استكشف عقاراتنا المتميزة من منزلك من خلال تقنية الجولات الافتراضية المتقدمة.'
              : 'Explore our premium properties from the comfort of your home with our advanced 360° virtual tour technology.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleTours.map((tour) => (
            <div key={tour.id} className="group relative bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={tour.thumbnail} 
                  alt={isRTL ? tour.titleAr : tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-bayt-dark fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {tour.duration}
                  </span>
                  <span className="bg-bayt-warm text-bayt-dark px-3 py-1 rounded-full text-sm font-bold">
                    {isRTL ? tour.typeAr : tour.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-bayt-warm transition-colors">
                  {isRTL ? tour.titleAr : tour.title}
                </h3>
                <p className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1 ml-1" />
                  {isRTL ? tour.propertyAr : tour.property}
                </p>

                <div className="flex gap-4 mb-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {tour.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {tour.bathrooms}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(isRTL ? tour.featuresAr : tour.features).map((feature, idx) => (
                    <span key={idx} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
