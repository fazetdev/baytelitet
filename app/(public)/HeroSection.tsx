'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'ar';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isRTL = lang === 'ar';

  return (
    <section
      className="relative bg-bayt-dark text-white overflow-hidden min-h-[600px] flex items-center"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Image - Simplified Path and Opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bayt1.jpg"
          alt="Gulf luxury real estate"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-bayt-dark/80 via-bayt-dark/60 to-bayt-dark" />

      {/* Content */}
      <div className={`relative z-20 container mx-auto px-6 py-20 ${isRTL ? 'text-right' : 'text-center'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isRTL ? 'تمكين المبيعات لـ' : 'Sales Enablement for'}
            <span className="block text-bayt-cool">
              {isRTL ? 'مطوري عقارات الخليج' : 'Gulf Property Developers'}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-bayt-light mb-10 max-w-2xl mx-auto opacity-90">
            {isRTL
              ? 'منصة عقارية موجهة للخليج للمشاريع غير المكتملة، واتخاذ قرارات المستثمرين، وتدفقات المبيعات المتوافقة ثقافياً.'
              : 'A Gulf-first real estate platform concept designed for off-plan projects, investor decision-making, and culturally aligned sales workflows.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-yellow-600 transition-all min-w-[200px]"
            >
              <Search className="w-5 h-5" />
              {isRTL ? 'تصفح العقارات' : 'Browse Properties'}
            </Link>

            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-bayt-warm text-bayt-warm font-bold rounded-xl hover:bg-bayt-warm hover:text-bayt-dark transition-all min-w-[200px]"
            >
              {isRTL ? 'احجز عرضاً خاصاً' : 'Book a Private Demo'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
