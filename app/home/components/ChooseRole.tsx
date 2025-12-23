'use client';

import { useState, FC } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, ArrowRight } from 'lucide-react';

interface ChooseRoleProps {
  lang?: 'en' | 'ar';
}

interface RoleCard {
  key: 'buyer' | 'investor';
  titleEn: string;
  titleAr: string;
  subtextEn: string;
  subtextAr: string;
  icon: FC<{ className?: string }>;
  ctaEn: string;
  ctaAr: string;
  link: string;
  featureEn: string;
  featureAr: string;
}

const ChooseRole: FC<ChooseRoleProps> = ({ lang = 'en' }): JSX.Element => {
  const [isInvestorExpanded, setIsInvestorExpanded] = useState(false);
  const isRTL = lang === 'ar';

  const roles: RoleCard[] = [
    {
      key: 'buyer',
      titleEn: 'I want a great place to live',
      titleAr: 'أبحث عن منزل عائلي ممتاز',
      subtextEn: 'Explore nearby places, see maps, and virtual tours',
      subtextAr: 'استكشف الأماكن القريبة، الخرائط، والجولات الافتراضية',
      icon: Home,
      ctaEn: 'View Properties',
      ctaAr: 'عرض العقارات',
      link: '/properties?role=buyer',
      featureEn: 'Virtual Tour',
      featureAr: 'جولة افتراضية',
    },
    {
      key: 'investor',
      titleEn: 'I want my money to grow',
      titleAr: 'أريد نمو أموالي',
      subtextEn: 'Calculate rental ROI and check Golden Visa eligibility',
      subtextAr: 'احسب عائد الإيجار وتحقق من أهلية الفيزا الذهبية',
      icon: TrendingUp,
      ctaEn: 'Open Tools',
      ctaAr: 'فتح الأدوات',
      link: '/market-tools',
      featureEn: 'Golden Visa Status',
      featureAr: 'حالة الفيزا الذهبية',
    },
  ];

  const InvestorToolsPreview: FC = (): JSX.Element => (
    <div className="mt-4 p-5 bg-[#111] rounded-2xl border border-[#D4AF37]/30 animate-fadeIn">
      <h4 className="font-bold text-[#D4AF37] mb-3 text-[10px] uppercase tracking-[0.3em]">
        {isRTL ? 'محطة المستثمر' : 'Investor Terminal'}
      </h4>
      <div className="grid grid-cols-1 gap-2">
        <Link
          href="/market-tools#golden-visa"
          className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-[#D4AF37] flex items-center justify-between transition-all group/link"
        >
          <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">
            {isRTL ? '🏆 فاحص الفيزا الذهبية' : '🏆 Golden Visa Checker'}
          </span>
          <ArrowRight className={`w-4 h-4 text-[#D4AF37] ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
        <Link
          href="/market-tools#rental-calculator"
          className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-[#D4AF37] flex items-center justify-between transition-all group/link"
        >
          <span className="text-sm text-gray-300 group-hover/link:text-white transition-colors">
            {isRTL ? '📈 حاسبة عائد الإيجار' : '📈 Rental Yield Calculator'}
          </span>
          <ArrowRight className={`w-4 h-4 text-[#D4AF37] ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tighter italic uppercase">
            {isRTL ? 'اختر مسارك' : 'CHOOSE YOUR PATH'}
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isInvestor = role.key === 'investor';
            
            return (
              <div key={role.key} className="flex flex-col">
                <div 
                  className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col h-full bg-white ${isInvestor && isInvestorExpanded ? 'border-[#D4AF37]' : 'border-gray-100 hover:border-black'}`}
                >
                  <div className="mb-6 p-4 rounded-2xl bg-black w-fit flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>

                  <h3 className="font-black text-2xl text-black mb-3">
                    {isRTL ? role.titleAr : role.titleEn}
                  </h3>
                  <p className="text-gray-500 mb-6 text-base leading-relaxed">
                    {isRTL ? role.subtextAr : role.subtextEn}
                  </p>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8 w-fit">
                    <span className="text-[#D4AF37] text-xs">✦</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {isRTL ? role.featureAr : role.featureEn}
                    </span>
                  </div>

                  {isInvestor ? (
                    <button
                      onClick={() => setIsInvestorExpanded(!isInvestorExpanded)}
                      className="mt-auto w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 bg-black text-white hover:bg-[#D4AF37] hover:text-black shadow-xl active:scale-95"
                    >
                      {isRTL ? role.ctaAr : role.ctaEn}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isInvestorExpanded ? 'rotate-90' : (isRTL ? 'rotate-180' : '')}`} />
                    </button>
                  ) : (
                    <Link
                      href={role.link}
                      className="mt-auto w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 bg-black text-white hover:bg-black/80 shadow-xl active:scale-95"
                    >
                      {isRTL ? role.ctaAr : role.ctaEn}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  )}
                </div>

                {isInvestor && isInvestorExpanded && <InvestorToolsPreview />}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default ChooseRole;
