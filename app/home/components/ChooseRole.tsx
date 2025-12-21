'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, Building, ShieldCheck, Share2 } from 'lucide-react';
import GoldenVisaChecker from './market-tools/GoldenVisaChecker';
import RentalCalculator from './market-tools/RentalCalculator';
import UtilityEstimator from './market-tools/UtilityEstimator';

interface RoleCard {
  key: 'buyer' | 'investor' | 'developer' | 'md' | 'agent';
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
      key: 'md', 
      titleEn: 'Is my company safe & profitable?', 
      titleAr: 'هل شركتي آمنة ومربحة؟',
      subtextEn: 'See total sales and compliance badges', 
      subtextAr: 'شاهد إجمالي المبيعات وشهادات الامتثال',
      icon: ShieldCheck, 
      ctaEn: 'View Dashboard', 
      ctaAr: 'لوحة التحكم',
      link: '/md', 
      featureEn: 'RERA Compliance Badge', 
      featureAr: 'شهادة الرERA'
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
              {isRTL ? 'اختر المسار المناسب لاحتياجاتك العقارية. سواء كنت مشترياً، مستثمراً، مطوراً، مديراً، أو وسيطاً.' : 'Select the right path for your real estate needs. Whether you\'re a buyer, investor, developer, MD, or agent.'}
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

        {/* Role Cards Grid - 5 roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isInvestor = role.key === 'investor';
            const isExpanded = expandedRole === 'investor';
            
            return (
              <div key={role.key} className="relative">
                {/* Role Card */}
                <div 
                  className={`
                    group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-1 
                    flex flex-col h-full border
                    ${isInvestor && isExpanded 
                      ? 'border-bayt-warm shadow-xl' 
                      : 'border-bayt-cool/30 hover:border-bayt-warm'
                    }
                    overflow-hidden
                  `}
                >
                  {/* Icon Container */}
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-bayt-warm/10 to-bayt-cultural/10 w-14 h-14 flex items-center justify-center mx-auto">
                    <Icon className="w-7 h-7 text-bayt-dark" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg text-bayt-dark mb-2 text-center min-h-[3rem]">
                    {isRTL ? role.titleAr : role.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-center text-sm flex-grow">
                    {isRTL ? role.subtextAr : role.subtextEn}
                  </p>

                  {/* Gulf Touch Feature */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bayt-light border border-bayt-cool/20">
                      <span className="text-xs text-bayt-warm">✦</span>
                      <span className="text-xs font-medium">
                        {isRTL ? role.featureAr : role.featureEn}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {isInvestor ? (
                    <button 
                      onClick={() => handleRoleClick('investor')}
                      className={`
                        mt-auto w-full py-2.5 rounded-xl font-semibold transition-all duration-300
                        ${isExpanded 
                          ? 'bg-bayt-dark text-white hover:bg-gray-800' 
                          : 'bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-md'
                        }
                      `}
                    >
                      {isExpanded 
                        ? (isRTL ? 'إغلاق الأدوات' : 'Close Tools') 
                        : (isRTL ? role.ctaAr : role.ctaEn)
                      }
                    </button>
                  ) : (
                    <Link 
                      href={role.link}
                      className="mt-auto w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-md text-center block"
                    >
                      {isRTL ? role.ctaAr : role.ctaEn}
                    </Link>
                  )}
                </div>

                {/* Investor Tools Panel - Show all 3 calculators directly */}
                {isInvestor && isExpanded && (
                  <div className="mt-4 animate-fadeIn space-y-4">
                    <div className="p-1">
                      <GoldenVisaChecker />
                    </div>
                    <div className="p-1">
                      <RentalCalculator />
                    </div>
                    <div className="p-1">
                      <UtilityEstimator />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-bayt-cool/20 text-center">
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
