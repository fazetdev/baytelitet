'use client';

import Link from 'next/link';
import { Calculator, Home, Globe, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    color: 'from-bayt-warm to-yellow-800',
    href: '/calculator',
  },
  {
    id: 'smart-property',
    icon: <Home className="w-8 h-8" />,
    titleEn: 'Smart Property Listings',
    titleAr: 'قوائم عقارية ذكية',
    descriptionEn: '360° virtual tours included by default',
    descriptionAr: 'جولات افتراضية 360° مدمجة بشكل افتراضي',
    color: 'from-bayt-cool to-gray-500',
    href: '/properties',
  },
  {
    id: 'lifestyle-intel',
    icon: <Globe className="w-8 h-8" />,
    titleEn: 'Lifestyle & Community Intelligence',
    titleAr: 'استخبارات الحياة والمجتمع',
    descriptionEn: 'Privacy, Majlis layouts, Masjid proximity, and local amenities',
    descriptionAr: 'الخصوصية، تصميم المجلس، قرب المساجد، والخدمات المحلية',
    color: 'from-bayt-cultural to-emerald-700',
    href: '/settings',
  },
  {
    id: 'market-tools',
    icon: <Settings className="w-8 h-8" />,
    titleEn: 'Market Tools',
    titleAr: 'أدوات السوق',
    descriptionEn: 'Golden Visa eligibility, rental yield calculator, ROI data',
    descriptionAr: 'أهلية الفيزا الذهبية، حاسبة العائد، وبيانات ROI',
    color: 'from-bayt-warm to-yellow-800',
    href: '/market-tools',
  }
];

export default function FeaturesSection() {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    }
    return 'en';
  });
  const isRTL = lang === 'ar';

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <section className="py-20 bg-bayt-light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white text-bayt-dark font-medium border border-bayt-cool/30 hover:border-bayt-warm transition-colors`}
            aria-label={isRTL ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
          >
            {isRTL ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h2 className="text-4xl font-bold text-bayt-dark mb-4">
            {isRTL ? 'مجموعة أدوات كاملة لتمكين المبيعات' : 'Complete Sales Enablement Suite'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL
              ? 'كل ما تحتاجه لبيع العقارات بسرعة وذكاء في سوق الخليج'
              : 'Everything you need to sell properties faster and smarter in the Gulf market'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href} className="group block">
              <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-bayt-warm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}>
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">
                  {isRTL ? feature.titleAr : feature.titleEn}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isRTL ? feature.descriptionAr : feature.descriptionEn}
                </p>
                <div className="text-bayt-warm font-semibold flex items-center gap-2">
                  {isRTL ? 'استكشف الميزة' : 'Explore feature'}{' '}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
