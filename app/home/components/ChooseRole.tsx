'use client';

import { FC, useState } from 'react';
import { Home, TrendingUp, ArrowRight } from 'lucide-react';
import MarketTools from './market-tools/MarketTools';

interface ChooseRoleProps {
  lang?: 'en' | 'ar';
}

const ChooseRole: FC<ChooseRoleProps> = ({ lang = 'en' }): JSX.Element => {
  const [showTools, setShowTools] = useState(false);
  const isRTL = lang === 'ar';

  return (
    <section className="py-12 bg-[#F9FAFB]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-bayt-dark mb-2">
            {isRTL ? 'اختر مسارك' : 'CHOOSE YOUR PATH'}
          </h2>
          <div className="w-16 h-1 bg-bayt-warm mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BUYER CONTAINER */}
          <a 
            href="/properties?role=buyer"
            className="group flex flex-col p-8 rounded-2xl border-2 border-white bg-white shadow-sm hover:border-bayt-warm hover:shadow-md transition-all duration-300"
          >
            <div className="mb-6 p-4 rounded-xl bg-bayt-light w-fit group-hover:bg-bayt-warm/10 transition-colors">
              <Home className="w-8 h-8 text-bayt-dark" />
            </div>
            <h3 className="font-bold text-xl text-bayt-dark mb-3">
              {isRTL ? 'أبحث عن منزل عائلي' : 'Residential Buyer'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {isRTL 
                ? 'استكشف المنازل الفاخرة، المواقع القريبة، والجولات الافتراضية للعثور على منزلك المثالي.' 
                : 'Explore luxury homes, nearby locations, and virtual tours to find your perfect residence.'}
            </p>
            <div className="mt-auto flex items-center justify-between text-bayt-warm font-bold text-sm">
              <span>{isRTL ? 'عرض العقارات' : 'View Properties'}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </div>
          </a>

          {/* INVESTOR CONTAINER */}
          <button 
            onClick={() => setShowTools(!showTools)}
            className={`group flex flex-col p-8 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md text-start ${
              showTools ? 'border-bayt-warm bg-white' : 'border-white bg-white hover:border-bayt-warm'
            }`}
          >
            <div className="mb-6 p-4 rounded-xl bg-bayt-light w-fit group-hover:bg-bayt-warm/10 transition-colors">
              <TrendingUp className="w-8 h-8 text-bayt-dark" />
            </div>
            <h3 className="font-bold text-xl text-bayt-dark mb-3">
              {isRTL ? 'أريد نمو أموالي' : 'Strategic Investor'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {isRTL 
                ? 'حلول استثمارية ذكية، حساب عائد الإيجار، والتحقق من أهلية الفيزا الذهبية في مكان واحد.' 
                : 'Smart investment solutions, rental ROI calculations, and Golden Visa eligibility in one place.'}
            </p>
            <div className="mt-auto flex items-center justify-between text-bayt-warm font-bold text-sm w-full">
              <span>{isRTL ? 'فتح الأدوات الاستثمارية' : 'Open Market Terminal'}</span>
              <ArrowRight className={`w-5 h-5 transition-transform ${showTools ? 'rotate-90' : (isRTL ? 'rotate-180' : '')}`} />
            </div>
          </button>
        </div>

        {/* MARKET TOOLS REVEAL */}
        {showTools && (
          <div className="mt-12 pt-12 border-t border-gray-200 animate-fadeIn">
             <MarketTools />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default ChooseRole;
