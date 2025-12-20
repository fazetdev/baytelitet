'use client';

import { useLanguage } from '@/context/useLanguage';
import Link from 'next/link';

export default function Page() {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';
  
  const pageTitles = {
    developer: isRTL ? 'أريد متابعة مشروعي' : 'I want to track my project',
    md: isRTL ? 'هل شركتي آمنة ومربحة؟' : 'Is my company safe & profitable?',
    agent: isRTL ? 'أريد البيع بسرعة' : 'I want to sell fast'
  };
  
  const pageDescriptions = {
    developer: isRTL ? 'تابع تقدم المبيعات وتحديثات البناء' : 'Monitor sales progress and construction updates',
    md: isRTL ? 'شاهد إجمالي المبيعات وشهادات الامتثال' : 'See total sales and compliance badges',
    agent: isRTL ? 'شارك القوائم مع العملاء فوراً' : 'Share listings instantly to clients'
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-bayt-dark mb-4">
          {pageTitles[window.location.pathname.slice(1)]}
        </h1>
        <p className="text-gray-600 mb-6">{pageDescriptions[window.location.pathname.slice(1)]}</p>
        <div className="bg-white p-8 rounded-2xl shadow-card">
          <p className="text-gray-500 mb-4">🚧 {isRTL ? 'قيد التطوير' : 'Under Development'}</p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-bayt-warm to-yellow-600 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-bayt-warm transition-all font-semibold"
          >
            {isRTL ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
