'use client';

import { FC } from 'react';

interface TrustItem {
  id: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  link?: string;
  linkLabelEn?: string;
  linkLabelAr?: string;
  noteEn?: string;
  noteAr?: string;
}

interface TrustSectionProps {
  lang: 'en' | 'ar';
}

export default function TrustSection({ lang }: TrustSectionProps) {
  const isRTL = lang === 'ar';

  const trustItems: TrustItem[] = [
    {
      id: 'escrow',
      emoji: '🔒',
      titleEn: 'Escrow Protection',
      titleAr: 'حماية الضمان العقاري',
      descriptionEn: 'All off-plan payments secured through DLD-regulated escrow accounts.',
      descriptionAr: 'جميع مدفوعات المشاريع قيد الإنشاء مؤمنة عبر حسابات ضمان مرخصة من دائرة الأراضي.',
      link: 'https://www.dubailand.gov.ae/',
      linkLabelEn: 'Verify on Dubai Land Department Portal',
      linkLabelAr: 'التحقق من خلال بوابة دائرة الأراضي بدبي',
      noteEn: 'DLD mandates escrow for all off-plan projects',
      noteAr: 'دائرة الأراضي تلزم استخدام الضمان لجميع المشاريع قيد الإنشاء'
    },
    {
      id: 'rera',
      emoji: '📋',
      titleEn: 'RERA Compliance',
      titleAr: 'الامتثال للائحة ريـرا',
      descriptionEn: 'Full compliance with Dubai Real Estate Regulatory Agency (RERA) regulations.',
      descriptionAr: 'الامتثال الكامل لوائح هيئة تنظيم العقارات في دبي (ريـرا).',
      link: 'https://www.dubailand.gov.ae/',
      linkLabelEn: 'Search RERA-Verified Projects & Brokers',
      linkLabelAr: 'البحث عن المشاريع والوسطاء المعتمدين من ريـرا',
      noteEn: 'Part of Dubai Land Department (DLD)',
      noteAr: 'جزء من دائرة الأراضي والأملاك بدبي'
    },
    {
      id: 'cultural',
      emoji: '🕌',
      titleEn: 'Lifestyle & Community Intelligence',
      titleAr: 'ذكاء المجتمع ونمط الحياة',
      descriptionEn: 'Community layouts with prayer times, Qibla direction, and local amenities.',
      descriptionAr: 'تصاميم مجتمعية متكاملة مع أوقات الصلاة واتجاه القبلة والمرافق المحلية.',
      noteEn: 'Integrates with local mapping & community APIs',
      noteAr: 'يتكامل مع واجهات برمجة الخرائط والخدمات المحلية'
    }
  ];

  return (
    <section className="py-20 bg-bayt-dark text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            {isRTL ? 'مبني على الثقة والشفافية' : 'Built on Trust & Transparency'}
          </h2>
          <p className="text-xl text-bayt-cool mb-2">
            {isRTL
              ? 'كل ميزة مصممة لتتوافق مع الأنظمة وتُبني الثقة'
              : 'Every feature aligns with regulations to build confidence'}
          </p>
          <p className="text-sm text-bayt-cool/80">
            {isRTL
              ? 'جميع المراجع التنظيمية تشير إلى البوابات الحكومية الرسمية في الإمارات'
              : 'All regulatory references point to official UAE government portals'}
          </p>
        </div>

        {/* Trust Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/30 hover:border-bayt-warm/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start mb-6">
                <div className="text-4xl mr-4 text-bayt-warm">{item.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {isRTL ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-bayt-cool/90 text-sm">
                    {isRTL ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Note */}
              {item.noteEn && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-bayt-cool">
                    {isRTL ? item.noteAr : item.noteEn}
                  </p>
                </div>
              )}

              {/* Official Link */}
              {item.link && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center text-sm text-bayt-warm hover:text-yellow-400 transition-colors font-medium"
                    aria-label={isRTL ? item.linkLabelAr : item.linkLabelEn}
                  >
                    <span>{isRTL ? item.linkLabelAr : item.linkLabelEn}</span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                      {isRTL ? '←' : '→'}
                    </span>
                  </a>
                  <p className="text-xs text-bayt-cool/70 mt-2">
                    {isRTL ? 'رابط حكومي رسمي' : 'Official government link'}
                  </p>
                </div>
              )}

              {/* For cultural item without link */}
              {!item.link && item.noteEn && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-bayt-cool">
                    {isRTL ? 'ميزات تقنية متكاملة' : 'Integrated technical features'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-bayt-cool/70">
            {isRTL
              ? 'للحصول على أحدث اللوائح والتحقق، تفضل بزيارة '
              : 'For the latest regulations and verification, visit '}
            <a 
              href="https://www.dubailand.gov.ae/" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="text-bayt-warm hover:underline"
            >
              dubailand.gov.ae
            </a>
          </p>
          <p className="text-xs text-bayt-cool/50 mt-2">
            {isRTL
              ? 'يتم التعامل مع البيانات الشخصية وفقًا لقوانين حماية البيانات في الإمارات'
              : 'Personal data handled per UAE data protection laws'}
          </p>
        </div>
      </div>
    </section>
  );
};

