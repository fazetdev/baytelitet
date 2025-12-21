'use client';
import { useState } from 'react';

export default function TrustSection() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isRTL = lang === 'ar';

  const trustItems = [
    {
      id: 'escrow',
      emoji: '🔒',
      titleEn: 'Escrow Protection',
      titleAr: 'حماية الضمان',
      descriptionEn: 'All payments secured through DLD-verified escrow accounts.',
      descriptionAr: 'جميع المدفوعات مؤمنة من خلال حسابات ضمان معتمدة من DLD',
      proofLink: 'https://www.dubailand.gov.ae/en/escrow',
      proofLabelEn: 'Learn how escrow works',
      proofLabelAr: 'تعرف على تفاصيل الضمان'
    },
    {
      id: 'rera',
      emoji: '📋',
      titleEn: 'RERA Compliance',
      titleAr: 'الامتثال للـ RERA',
      descriptionEn: 'Full compliance with Gulf real estate regulations.',
      descriptionAr: 'الامتثال الكامل للوائح العقارات في الخليج',
      proofLabelEn: 'Registration #: XYZ123',
      proofLabelAr: 'رقم التسجيل: XYZ123'
    },
    {
      id: 'cultural',
      emoji: '🕌',
      titleEn: 'Lifestyle & Community Intelligence',
      titleAr: 'معلومات عن المجتمع ونمط الحياة',
      descriptionEn: 'Prayer times, Qibla direction & community layouts.',
      descriptionAr: 'أوقات الصلاة، اتجاه القبلة وتصاميم المجتمع'
    }
  ];

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <section className="py-20 bg-bayt-dark text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">
            {isRTL ? 'الثقة والشفافية أولويتنا' : 'Built on Trust & Transparency'}
          </h2>
          <p className="text-xl text-bayt-cool">
            {isRTL
              ? 'كل ميزة مصممة لبناء الثقة في معاملاتك'
              : 'Every feature is designed to build confidence in your transactions'}
          </p>
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="mt-4 px-4 py-2 bg-white text-bayt-dark rounded-full border border-bayt-cool/30 hover:border-bayt-warm transition-colors"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Trust Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-bayt-cool/50 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4 text-bayt-warm">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3">
                  {isRTL ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-bayt-cool mb-3">
                  {isRTL ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>

              {/* Proof / Link */}
              {item.proofLink && (
                <a
                  href={item.proofLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-bayt-warm underline hover:text-yellow-400"
                >
                  {isRTL ? item.proofLabelAr : item.proofLabelEn}
                </a>
              )}
              {!item.proofLink && item.proofLabelEn && (
                <span className="inline-block bg-bayt-warm text-bayt-dark text-xs px-2 py-1 rounded-full">
                  {isRTL ? item.proofLabelAr : item.proofLabelEn}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
