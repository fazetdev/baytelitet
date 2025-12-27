'use client';

import Link from 'next/link';
import { Calculator, Home, Globe, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import PublicAgentDir from './PublicAgentDir';

interface Feature {
  id: string;
  icon: JSX.Element;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  href: string;
}

const features: Feature[] = [
  {
    id: 'calculator',
    icon: <Calculator className="w-8 h-8" />,
    titleEn: 'Dynamic Payment Calculator',
    titleAr: 'حاسبة دفع ديناميكية',
    descriptionEn: 'Real-time payment plans with Hijri/Gregorian timelines',
    descriptionAr: 'خطط دفع مباشرة مع تواريخ هجري/ميلادي',
    color: 'from-orange-400 to-orange-700',
    href: '/calculator',
  },
  {
    id: 'smart-property',
    icon: <Home className="w-8 h-8" />,
    titleEn: 'Smart Property Listings',
    titleAr: 'قوائم عقارية ذكية',
    descriptionEn: '360° virtual tours included by default',
    descriptionAr: 'جولات افتراضية 360° مدمجة بشكل افتراضي',
    color: 'from-blue-400 to-blue-700',
    href: '/properties',
  },
  {
    id: 'lifestyle-intel',
    icon: <Globe className="w-8 h-8" />,
    titleEn: 'Lifestyle & Community Intelligence',
    titleAr: 'استخبارات الحياة والمجتمع',
    descriptionEn: 'Privacy, Majlis layouts, and local amenities',
    descriptionAr: 'الخصوصية، تصميم المجلس، والخدمات المحلية',
    color: 'from-emerald-400 to-emerald-700',
    href: '/settings',
  }
];

export default function FeaturesSection() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const savedLang = (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    setLang(savedLang);
  }, []);

  const isRTL = lang === 'ar';
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
    window.location.reload(); // Refresh to sync the PublicAgentDir
  };

  return (
    <section className="py-20 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-full bg-white text-bayt-dark font-bold border border-gray-200 hover:border-bayt-warm transition-all shadow-sm"
          >
            {isRTL ? 'English' : 'العربية'}
          </button>
        </div>

        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-bold text-bayt-dark mb-4">
            {isRTL ? 'مجموعة أدوات كاملة لتمكين المبيعات' : 'Complete Sales Enablement Suite'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            {isRTL
              ? 'كل ما تحتاجه لبيع العقارات بسرعة وذكاء في سوق الخليج'
              : 'Everything you need to sell properties faster and smarter in the Gulf market'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href} className="group block">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:border-bayt-warm transition-all h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">
                  {isRTL ? feature.titleAr : feature.titleEn}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {isRTL ? feature.descriptionAr : feature.descriptionEn}
                </p>
                <div className="text-bayt-warm text-sm font-bold flex items-center gap-2">
                  {isRTL ? 'استكشف الميزة' : 'Explore feature'} <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dynamic Agent Directory Section */}
        <PublicAgentDir />
      </div>
    </section>
  );
}
