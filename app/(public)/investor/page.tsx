'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function InvestorPage() {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  const [price, setPrice] = useState<number>(0);
  const [roi, setRoi] = useState<number | null>(null);

  const calculateROI = () => {
    // Dummy ROI calculation: 7% of property price annually
    const yearlyRent = price * 0.07;
    setRoi(yearlyRent);
  };

  return (
    <section className="min-h-screen py-16 bg-bayt-light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-bayt-dark mb-6 text-center">
          {isRTL ? 'أريد نمو أموالي' : 'I want my money to grow'}
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          {isRTL 
            ? 'احسب عائد الإيجار وتحقق من أهلية الفيزا الذهبية' 
            : 'Calculate rental ROI and check Golden Visa eligibility'}
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-card flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <label className="font-semibold text-bayt-dark mb-2 sm:mb-0">
              {isRTL ? 'سعر العقار (AED)' : 'Property Price (AED)'}:
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <button
            onClick={calculateROI}
            className="bg-gradient-to-r from-bayt-warm to-yellow-600 text-white px-4 py-2 rounded-xl hover:from-yellow-600 hover:to-bayt-warm transition-all font-semibold"
          >
            {isRTL ? 'احسب العائد' : 'Calculate ROI'}
          </button>

          {roi !== null && (
            <div className="mt-4 p-4 bg-bayt-cultural/10 rounded-lg text-bayt-dark">
              <p className="font-medium">
                {isRTL ? 'عائد الإيجار السنوي:' : 'Yearly Rental Income:'} 
                <span className="font-bold ml-2">{roi.toFixed(2)} AED</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {isRTL 
                  ? 'هذه العقار مؤهل للحصول على إقامة إماراتية لمدة 10 سنوات.'
                  : 'This property qualifies for a 10-year UAE residency (Golden Visa).'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-bayt-warm font-semibold hover:underline">
            {isRTL ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </section>
  );
}
