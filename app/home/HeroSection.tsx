'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'ar'; // Accept lang as prop
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isRTL = lang === 'ar';

  // REMOVED: Local language state and useEffect for language
  // REMOVED: toggleLanguage function and button

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
          onLoadingComplete={() => setImageLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-50' : 'opacity-0'}`}
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-bayt-dark to-gray-900" />

      {/* REMOVED: Language Toggle Button - Language is controlled globally */}

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
              role="link"
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
