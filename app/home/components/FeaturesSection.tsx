'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Globe, Calculator, MapPin } from 'lucide-react';

interface Capability {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  href: string;
}

const capabilities: Capability[] = [
  {
    id: 'smart-presentation',
    icon: Home,
    titleEn: 'Smart Property Presentation',
    titleAr: 'عرض عقارات ذكي',
    descriptionEn: 'Showcase off-plan and completed projects with immersive visuals.',
    descriptionAr: 'عرض المشاريع المكتملة وغير المكتملة بصرياً بشكل جذاب',
    color: 'from-bayt-cool to-gray-500',
    href: '/properties',
  },
  {
    id: 'virtual-tours',
    icon: Globe,
    titleEn: '360° Virtual Tours',
    titleAr: 'جولات افتراضية 360°',
    descriptionEn: 'Allow investors and buyers to explore properties remotely.',
    descriptionAr: 'تمكين المستثمرين والمشترين من استكشاف العقارات عن بُعد',
    color: 'from-bayt-cultural to-emerald-700',
    href: '/properties',
  },
  {
    id: 'payment-modeling',
    icon: Calculator,
    titleEn: 'Payment & Investment Modeling',
    titleAr: 'نمذجة الدفع والاستثمار',
    descriptionEn: 'Calculate payment plans and ROI for buyers and investors.',
    descriptionAr: 'احسب خطط الدفع والعائد للمستثمرين والمشترين',
    color: 'from-bayt-warm to-yellow-800',
    href: '/calculator',
  },
  {
    id: 'location-intelligence',
    icon: MapPin,
    titleEn: 'Location & Neighborhood Insights',
    titleAr: 'تحليلات الموقع والمناطق',
    descriptionEn: 'Provide insights on neighborhoods, amenities, and compliance.',
    descriptionAr: 'تقديم تحليلات حول الأحياء والخدمات والامتثال',
    color: 'from-bayt-light to-bayt-cool',
    href: '/properties',
  }
];

export default function FeaturesSection() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isRTL = lang === 'ar';

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <section className="py-20 bg-bayt-light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-bayt-dark font-medium border border-bayt-cool/30 hover:border-bayt-warm transition-colors"
            aria-label={isRTL ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
          >
            {isRTL ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h2 className="text-4xl font-bold text-bayt-dark mb-4">
            {isRTL ? 'مجموعة قدرات المنصة' : 'Platform Capabilities'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL
              ? 'ما تحتاجه لإظهار قدرات المنصة قبل أي تفاعل'
              : 'Showcase what the platform can do before any interaction'}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.id}
                href={cap.href}
                className="group block"
                aria-label={`${isRTL ? cap.titleAr : cap.titleEn} - ${isRTL ? cap.descriptionAr : cap.descriptionEn}`}
              >
                <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-bayt-warm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}>
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${cap.color} text-white mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">
                    {isRTL ? cap.titleAr : cap.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isRTL ? cap.descriptionAr : cap.descriptionEn}
                  </p>
                  <div className="text-bayt-warm font-semibold flex items-center gap-2">
                    {isRTL ? 'استكشف القدرة' : 'Explore capability'}{' '}
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
