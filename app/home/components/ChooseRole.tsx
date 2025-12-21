'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, Building, ShieldCheck, Share2 } from 'lucide-react';
import MarketTools from './MarketTools';

interface RoleCard {
  key: 'buyer' | 'investor' | 'developer' | 'agent';
  titleEn: string;
  titleAr: string;
  subtextEn: string;
  subtextAr: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaEn: string;
  ctaAr: string;
  link: string;
  featureEn: string;
  featureAr: string;
}

export default function ChooseRole() {
  const [expandedRole, setExpandedRole] = useState<'investor' | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
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
      featureAr: 'جولة افتراضية'
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
      link: '#', 
      featureEn: 'Golden Visa Status', 
      featureAr: 'حالة الفيزا الذهبية'
    },
    { 
      key: 'developer', 
      titleEn: 'I want to track my project', 
      titleAr: 'أريد متابعة مشروعي',
      subtextEn: 'Monitor sales progress and construction updates', 
      subtextAr: 'تابع تقدم المبيعات وتحديثات البناء',
      icon: Building, 
      ctaEn: 'View Inventory', 
      ctaAr: 'عرض المخزون',
      link: '/developer', 
      featureEn: 'Construction Photos', 
      featureAr: 'صور البناء'
    },
    { 
      key: 'agent', 
      titleEn: 'I want to sell fast', 
      titleAr: 'أريد البيع بسرعة',
      subtextEn: 'Share listings instantly to clients', 
      subtextAr: 'شارك القوائم مع العملاء فوراً',
      icon: Share2, 
      ctaEn: 'Start Selling', 
      ctaAr: 'ابدأ البيع',
      link: '/agent', 
      featureEn: 'Prayer Time Reminder', 
      featureAr: 'تذكير أوقات الصلاة'
    },
  ];

  const handleRoleClick = (role: RoleCard['key']) => {
    if (role === 'investor') {
      setExpandedRole(expandedRole === 'investor' ? null : 'investor');
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-bayt-light via-white to-yellow-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with language toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-bayt-dark mb-3">
              {isRTL ? 'اختر دورك في سوق العقارات' : 'Choose Your Role in Real Estate'}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {isRTL ? 'اختر المسار المناسب لاحتياجاتك العقارية. سواء كنت مشترياً، مستثمراً، مطوراً، أو وسيطاً.' : 'Select the right path for your real estate needs. Whether you\'re a buyer, investor, developer, or agent.'}
            </p>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-bayt-cool/30 hover:border-bayt-warm transition-colors shadow-sm"
          >
            <span className={`font-medium ${lang === 'en' ? 'text-bayt-warm' : 'text-gray-600'}`}>EN</span>
            <div className="w-8 h-5 bg-bayt-cool/30 rounded-full relative">
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-bayt-warm transition-transform duration-300 ${lang === 'ar' ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className={`font-medium ${lang === 'ar' ? 'text-bayt-warm' : 'text-gray-600'}`}>AR</span>
          </button>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isInvestor = role.key === 'investor';
            const isExpanded = expandedRole === 'investor';
            
            return (
              <div key={role.key} className="relative">
                {/* Role Card */}
                <div 
                  className={`
                    group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl 
                    transition-all duration-500 transform hover:-translate-y-2 
                    flex flex-col h-full border-2
                    ${isInvestor && isExpanded 
                      ? 'border-bayt-warm shadow-2xl' 
                      : 'border-transparent hover:border-bayt-warm/30'
                    }
                    before:absolute before:inset-0 before:rounded-3xl 
                    before:bg-gradient-to-br before:from-bayt-warm/0 before:via-transparent before:to-bayt-cultural/0 
                    before:group-hover:from-bayt-warm/5 before:group-hover:to-bayt-cultural/5 
                    before:transition-opacity before:duration-500 before:opacity-0 before:group-hover:opacity-100
                    overflow-hidden
                  `}
                >
                  {/* Icon Container */}
                  <div className="relative mb-6 p-5 rounded-2xl bg-gradient-to-br from-bayt-warm/10 to-bayt-cultural/10 group-hover:from-bayt-warm/20 group-hover:to-bayt-cultural/20 transition-all duration-500 w-16 h-16 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-bayt-dark" />
                    <div className="absolute inset-0 bg-gradient-to-br from-bayt-warm/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl text-bayt-dark mb-3 text-center min-h-[3.5rem]">
                    {isRTL ? role.titleAr : role.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-center flex-grow text-sm leading-relaxed">
                    {isRTL ? role.subtextAr : role.subtextEn}
                  </p>

                  {/* Gulf Touch Feature */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-bayt-cool uppercase tracking-wider mb-2">
                      {isRTL ? 'لمسة خليجية' : 'Gulf Touch'}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-bayt-light to-yellow-50/50 border border-bayt-cool/20">
                      <span className="text-bayt-warm">✦</span>
                      <span className="text-sm font-medium">
                        {isRTL ? role.featureAr : role.featureEn}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {isInvestor ? (
                    <button 
                      onClick={() => handleRoleClick('investor')}
                      className={`
                        mt-auto w-full py-3.5 rounded-xl font-bold transition-all duration-300
                        relative overflow-hidden group/btn
                        ${isExpanded 
                          ? 'bg-gradient-to-r from-bayt-dark to-gray-800 text-white hover:shadow-lg' 
                          : 'bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-lg hover:shadow-bayt-warm/30'
                        }
                      `}
                    >
                      <span className="relative z-10">
                        {isExpanded 
                          ? (isRTL ? 'إغلاق الأدوات' : 'Close Tools') 
                          : (isRTL ? role.ctaAr : role.ctaEn)
                        }
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-bayt-warm opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  ) : (
                    <Link 
                      href={role.link}
                      className="mt-auto w-full py-3.5 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-lg hover:shadow-bayt-warm/30 text-center block group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10">
                        {isRTL ? role.ctaAr : role.ctaEn}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-bayt-warm opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </Link>
                  )}
                </div>

                {/* MarketTools Panel for Investor */}
                {isInvestor && isExpanded && (
                  <div className="mt-8 animate-fadeIn">
                    <MarketTools />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-bayt-cool/20 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            {isRTL 
              ? 'بايت إيليت يوفر أدوات مخصصة لكل دور في سوق العقارات. ابدأ رحلتك اليوم.' 
              : 'BaytElite provides tailored tools for every role in real estate. Start your journey today.'
            }
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
