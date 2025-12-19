'use client';

import { useState } from 'react';

export interface TimelineMilestone {
  name: string;
  amount: number;
  dueDate: Date;
  description?: string;
}

interface HijriGregorianTimelineProps {
  milestones: TimelineMilestone[];
  currency?: string;
  language?: 'ar' | 'en';
  startDate?: Date;
}

export default function HijriGregorianTimeline({
  milestones,
  currency = 'AED',
  language = 'en',
  startDate = new Date(),
}: HijriGregorianTimelineProps) {
  const [showHijri, setShowHijri] = useState(true);
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Dual Calendar Timeline',
      showGregorian: 'Show Gregorian',
      showHijri: 'Show Hijri',
      dueDate: 'Due Date',
      amount: 'Amount',
      progress: 'Progress',
      immediate: 'Immediate',
      months: 'months',
      currencyLabel: 'Currency',
      noMilestones: 'No payment milestones available',
      daysRemaining: 'Days remaining',
      elapsed: 'Elapsed',
      hijriNote: 'Displaying dates in Hijri calendar',
      gregorianNote: 'Displaying dates in Gregorian calendar',
      timelineView: 'Timeline View',
    },
    ar: {
      title: 'الجدول الزمني المزدوج',
      showGregorian: 'عرض التاريخ الميلادي',
      showHijri: 'عرض التاريخ الهجري',
      dueDate: 'تاريخ الاستحقاق',
      amount: 'المبلغ',
      progress: 'التقدم',
      immediate: 'فوري',
      months: 'شهر',
      currencyLabel: 'العملة',
      noMilestones: 'لا توجد مراحل سداد متاحة',
      daysRemaining: 'الأيام المتبقية',
      elapsed: 'المنقضي',
      hijriNote: 'عرض التواريخ بالتقويم الهجري',
      gregorianNote: 'عرض التواريخ بالتقويم الميلادي',
      timelineView: 'عرض الجدول الزمني',
    },
  };

  const t = content[language];

  const formatDate = (date: Date): string => {
    if (showHijri) {
      return new Intl.DateTimeFormat(
        language === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic',
        { day: 'numeric', month: 'long', year: 'numeric' }
      ).format(date);
    }
    return date.toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDaysBetween = (date1: Date, date2: Date): number => {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString(language === 'ar' ? 'ar-AE' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const calculateProgress = (index: number): number => {
    if (index === 0) return 100;
    const prevDate = milestones[index - 1].dueDate;
    const currentDate = milestones[index].dueDate;
    const total = getDaysBetween(prevDate, currentDate);
    const elapsed = getDaysBetween(prevDate, new Date());
    return Math.min(Math.round((elapsed / total) * 100), 100);
  };

  if (!milestones || milestones.length === 0) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg p-8 border border-black/50">
        <h2 className={`text-2xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>
          {t.title}
        </h2>
        <p className="text-center text-black">{t.noMilestones}</p>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg p-8 border border-black/50">
      <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h2 className={`text-2xl font-bold text-black ${isRTL ? 'text-right' : ''}`}>{t.title}</h2>
          <p className={`text-sm text-gray-600 mt-1 ${isRTL ? 'text-right' : ''}`}>
            {showHijri ? t.hijriNote : t.gregorianNote}
          </p>
        </div>
        <button
          onClick={() => setShowHijri(!showHijri)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-600 transition-colors"
        >
          {showHijri ? t.showGregorian : t.showHijri}
        </button>
      </div>

      <div className="space-y-6">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1;
          const progressPercent = calculateProgress(i);
          const color = i === 0 ? 'bg-black' : i === milestones.length - 1 ? 'bg-yellow-500' : 'bg-yellow-400';
          const daysRemaining = getDaysBetween(new Date(), m.dueDate);
          const isOverdue = daysRemaining < 0;

          return (
            <div key={i} className="relative">
              {!isLast && (
                <div className={`absolute top-10 w-0.5 h-full bg-gray-200 ${isRTL ? 'right-5' : 'left-5'}`}></div>
              )}
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color} text-white font-bold`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-bold text-black ${isRTL ? 'text-right' : ''}`}>{m.name}</h3>
                    <p className={`text-lg font-bold ${color}`}>
                      {currency} {formatCurrency(m.amount)}
                    </p>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className={`text-xs mt-1 ${isOverdue ? 'text-red-500' : 'text-gray-600'}`}>
                    {isOverdue ? t.elapsed : `${daysRemaining} ${t.daysRemaining}`}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{m.description}</p>
                  <p className="text-sm text-gray-600 mt-1">{formatDate(m.dueDate)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
