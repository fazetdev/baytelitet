'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/formatters';

interface HijriGregorianTimelineProps {
  totalAmount: number;
  downPayment: number;
  startDate?: Date;
  language?: 'ar' | 'en';
}

export default function HijriGregorianTimeline({ 
  totalAmount, 
  downPayment,
  startDate = new Date(),
  language = 'en'
}: HijriGregorianTimelineProps) {
  const [showHijri, setShowHijri] = useState(true);

  // Bilingual content
  const content = {
    en: {
      title: 'Dual Calendar Timeline',
      showGregorian: 'Show Gregorian',
      showHijri: 'Show Hijri',
      downPayment: 'Down Payment',
      foundation: 'Foundation',
      structure: 'Structure',
      finishing: 'Finishing',
      finalPayment: 'Final Payment',
      dueDate: 'Due Date',
      timeline: 'Timeline',
      immediate: 'Immediate',
      months: 'months',
      progress: 'Progress',
      culturalGreen: 'Cultural Green: Immediate Payments',
      warmGold: 'Warm Gold: Construction Phase',
      coolAccent: 'Cool Accent: Final Handover',
      shariaTitle: 'Sharia-Compliant Financing Available',
      shariaText: 'This timeline supports Islamic financing models (Murabaha, Ijara) with no interest (Riba). All payment plans are RERA approved and escrow protected.',
      currency: 'AED'
    },
    ar: {
      title: 'الجدول الزمني المزدوج',
      showGregorian: 'عرض التاريخ الميلادي',
      showHijri: 'عرض التاريخ الهجري',
      downPayment: 'الدفعة المقدمة',
      foundation: 'مرحلة الأساس',
      structure: 'مرحلة الهيكل',
      finishing: 'مرحلة التشطيبات',
      finalPayment: 'الدفعة النهائية',
      dueDate: 'تاريخ الاستحقاق',
      timeline: 'الجدول الزمني',
      immediate: 'فوري',
      months: 'شهر',
      progress: 'التقدم',
      culturalGreen: 'الأخضر الثقافي: دفعات فورية',
      warmGold: 'الذهب الدافئ: مرحلة البناء',
      coolAccent: 'اللون البارد: التسليم النهائي',
      shariaTitle: 'تمويل متوافق مع الشريعة الإسلامية متاح',
      shariaText: 'يدعم هذا الجدول الزمني نماذج التمويل الإسلامي (مرابحة، إجارة) بدون فائدة (ربا). جميع خطط السداد معتمدة من الهيئة العامة للعقار ومحمية بحساب ضمان.',
      currency: 'درهم'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  // Calculate payment milestones
  const milestones = [
    { name: t.downPayment, amount: downPayment, monthsAfter: 0 },
    { name: t.foundation, amount: totalAmount * 0.15, monthsAfter: 3 },
    { name: t.structure, amount: totalAmount * 0.25, monthsAfter: 9 },
    { name: t.finishing, amount: totalAmount * 0.30, monthsAfter: 18 },
    { name: t.finalPayment, amount: totalAmount * 0.20, monthsAfter: 24 },
  ];

  const calculateDate = (monthsToAdd: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  // Helper to determine milestone color class
  const getMilestoneColor = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === milestones.length - 1;

    if (isFirst) return 'bg-bayt-cultural';
    if (isLast) return 'bg-bayt-cool';
    return 'bg-bayt-warm';
  };

  // Helper to determine timeline color class
  const getTimelineColor = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === milestones.length - 1;

    if (isFirst) return 'bg-bayt-cultural';
    if (isLast) return 'bg-bayt-cool';
    return 'bg-bayt-warm';
  };

  return (
    // Background uses light gradient of the warm accent color
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-gradient-to-br from-bayt-warm/10 to-bayt-light rounded-2xl shadow-lg p-8 border border-bayt-warm/50"
    >
      <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className={`text-2xl font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
          {t.title}
        </h2>
        {/* Toggle button uses warm accent colors */}
        <button
          onClick={() => setShowHijri(!showHijri)}
          className="px-4 py-2 bg-bayt-warm/30 text-bayt-dark rounded-lg font-medium hover:bg-bayt-warm/50 transition-colors"
        >
          {showHijri ? t.showGregorian : t.showHijri}
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const date = calculateDate(milestone.monthsAfter);
          const isLast = index === milestones.length - 1;
          const milestoneColor = getMilestoneColor(index);
          const timelineColor = getTimelineColor(index);

          return (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {!isLast && (
                <div 
                  className={`absolute top-10 w-0.5 h-full bg-bayt-warm/50 ${isRTL ? 'right-5' : 'left-5'}`}
                ></div>
              )}

              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Date indicator */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${milestoneColor} text-white font-bold`}>
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                      {milestone.name}
                    </h3>
                    <span className={`text-lg font-bold text-bayt-dark ${isRTL ? 'text-left' : ''}`}>
                      {t.currency} {milestone.amount.toLocaleString(language === 'ar' ? 'ar-AE' : 'en-US')}
                    </span>
                  </div>

                  <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-bayt-cool/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className="text-sm text-gray-600">{t.dueDate}</p>
                        <p className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                          {formatDate(date, showHijri, language)}
                        </p>
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className="text-sm text-gray-600">{t.timeline}</p>
                        <p className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                          {milestone.monthsAfter === 0 
                            ? t.immediate 
                            : `${milestone.monthsAfter} ${t.months}`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4">
                      <div className={`flex justify-between text-sm text-gray-600 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{t.progress}</span>
                        <span>{Math.round((milestone.monthsAfter / 24) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-bayt-light rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${timelineColor} rounded-full transition-all duration-500`}
                          style={{ width: `${(milestone.monthsAfter / 24) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Toggle Info */}
      <div className="mt-8 p-4 bg-white/80 rounded-xl border border-bayt-cool/50">
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Legend: Cultural Green for Immediate */}
          <div className="w-3 h-3 rounded-full bg-bayt-cultural"></div>
          <span className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.culturalGreen}
          </span>
        </div>
        <div className={`flex items-center gap-3 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Legend: Warm Gold for Construction Phase */}
          <div className="w-3 h-3 rounded-full bg-bayt-warm"></div>
          <span className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.warmGold}
          </span>
        </div>
        <div className={`flex items-center gap-3 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Legend: Cool Accent for Final Handover */}
          <div className="w-3 h-3 rounded-full bg-bayt-cool"></div>
          <span className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.coolAccent}
          </span>
        </div>
      </div>

      {/* Islamic Financing Note */}
      {/* Uses Cultural Green for Sharia-Compliance note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-bayt-cultural/10 to-bayt-light rounded-xl border border-bayt-cultural/50">
        <h4 className={`font-bold text-bayt-dark mb-2 ${isRTL ? 'text-right' : ''}`}>
          {t.shariaTitle}
        </h4>
        <p className={`text-sm text-bayt-dark/80 ${isRTL ? 'text-right' : ''}`}>
          {t.shariaText}
        </p>
      </div>
    </div>
  );
}