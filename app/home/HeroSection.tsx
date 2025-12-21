'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function HeroSection() {
  // Language state with persistence
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    }
    return 'en';
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, [lang]);

  return (
    <section
      className="relative bg-bayt-dark text-white overflow-hidden min-h-[600px]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bayt1.jpg"
          alt={isRTL ? 'أفق عقارات الخليج الفاخرة' : 'Gulf luxury real estate skyline'}
          fill
          priority
          quality={80}
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-50' : 'opacity-0'}`}
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-bayt-dark to-gray-900" />

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} md:top-10 ${isRTL ? 'md:left-10' : 'md:right-10'} 
          flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-bayt-cool/30 hover:border-bayt-warm transition-colors shadow-sm`}
        aria-label={isRTL ? 'التبديل إلى اللغة الإنجليزية' : 'Switch to Arabic language'}
      >
        <span className={`font-medium ${lang === 'en' ? 'text-bayt-warm' : 'text-gray-600'}`}>EN</span>
        <div className="w-8 h-5 bg-bayt-cool/30 rounded-full relative">
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-bayt-warm transition-transform duration-300 ${lang === 'ar' ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </div>
        <span className={`font-medium ${lang === 'ar' ? 'text-bayt-warm' : 'text-gray-600'}`}>AR</span>
      </button>

      {/* Content */}
      <div className={`relative z-20 container mx-auto px-6 py-32 md:py-48 ${isRTL ? 'text-right' : 'text-center'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {isRTL ? 'تمكين المبيعات لـ' : 'Sales Enablement for'}
            <span className="block text-bayt-cool">
              {isRTL ? 'مطوري عقارات الخليج' : 'Gulf Property Developers'}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-bayt-light mb-10 max-w-3xl mx-auto opacity-90">
            {isRTL
              ? 'منصة عقارية موجهة للخليج للمشاريع غير المكتملة، واتخاذ قرارات المستثمرين، وتدفقات المبيعات المتوافقة ثقافياً.'
              : 'A Gulf-first real estate platform concept designed for off-plan projects, investor decision-making, and culturally aligned sales workflows.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-600 transition-all transform hover:-translate-y-1 shadow-2xl min-w-[200px]"
            >
              <Search className="w-5 h-5" />
              {isRTL ? 'تصفح العقارات' : 'Browse Properties'}
            </Link>

            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-bayt-warm text-bayt-warm font-bold rounded-xl hover:bg-bayt-warm hover:text-bayt-dark transition-all transform hover:-translate-y-1 min-w-[200px]"
            >
              {isRTL ? 'احجز عرضاً خاصاً' : 'Book a Private Demo'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
