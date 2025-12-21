'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, Building, ShieldCheck, Share2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  hasTools?: boolean; // New: indicates if role has market tools
}

export default function ChooseRole() {
  const [expandedRole, setExpandedRole] = useState<'investor' | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const router = useRouter();
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
      hasTools: false
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
      link: '/market-tools', // Navigate to dedicated tools page
      featureEn: 'Golden Visa Status', 
      featureAr: 'حالة الفيزا الذهبية',
      hasTools: true
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
      featureAr: 'صور البناء',
      hasTools: false
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
      featureAr: 'شهادة الرERA',
      hasTools: false
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
      featureAr: 'تذكير أوقات الصلاة',
      hasTools: false
    },
  ];

  const handleRoleClick = (role: RoleCard) => {
    if (role.key === 'investor') {
      // Option 1: Navigate to market tools page
      router.push('/market-tools');
      
      // Option 2: Or show quick tools preview (toggle)
      // setExpandedRole(expandedRole === 'investor' ? null : 'investor');
    } else {
      // Navigate to role-specific page
      router.push(role.link);
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  // Quick preview tools for investor (optional inline display)
  const InvestorToolsPreview = () => (
    <div className="mt-4 p-4 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-bayt-warm/30 animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-bayt-dark">
          {isRTL ? 'أدوات المستثمر السريعة' : 'Quick Investor Tools'}
        </h4>
        <Link 
          href="/market-tools" 
          className="text-sm text-bayt-warm hover:text-bayt-dark flex items-center gap-1"
        >
          {isRTL ? 'جميع الأدوات →' : 'All Tools →'}
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {isRTL 
          ? 'استخدم هذه الأدوات لحساب استثماراتك العقارية' 
          : 'Use these tools to calculate your real estate investments'
        }
      </p>
      <div className="grid grid-cols-1 gap-3">
        <Link 
          href="/market-tools#golden-visa" 
          className="p-3 bg-white rounded-lg border hover:border-bayt-warm transition-colors flex items-center justify-between"
        >
          <span className="font-medium">🏆 Golden Visa Checker</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
        <Link 
          href="/market-tools#rental-calculator" 
          className="p-3 bg-white rounded-lg border hover:border-bayt-warm transition-colors flex items-center justify-between"
        >
          <span className="font-medium">📈 Rental Yield Calculator</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
        <Link 
          href="/market-tools#utility-estimator" 
          className="p-3 bg-white rounded-lg border hover:border-bayt-warm transition-colors flex items-center justify-between"
        >
          <span className="font-medium">⚡ Utility Estimator</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </div>
  );

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
                    flex flex-col h-full border cursor-pointer
                    ${isInvestor && isExpanded 
                      ? 'border-bayt-warm shadow-xl' 
                      : 'border-bayt-cool/30 hover:border-bayt-warm'
                    }
                    overflow-hidden
                  `}
                  onClick={() => handleRoleClick(role)}
                >
                  {/* Icon Container */}
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-bayt-warm/10 to-bayt-cultural/10 w-14 h-14 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
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
                  <div className="mt-auto w-full">
                    {isInvestor ? (
                      <div className={`
                        w-full py-2.5 rounded-xl font-semibold transition-all duration-300
                        flex items-center justify-center gap-2
                        ${isExpanded 
                          ? 'bg-bayt-dark text-white hover:bg-gray-800' 
                          : 'bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-md'
                        }
                      `}>
                        {isExpanded 
                          ? (isRTL ? 'إغلاق الأدوات' : 'Close Tools') 
                          : (isRTL ? role.ctaAr : role.ctaEn)
                        }
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    ) : (
                      <div className="w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-md text-center flex items-center justify-center gap-2">
                        {isRTL ? role.ctaAr : role.ctaEn}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Investor Tools Quick Preview (optional inline display) */}
                {isInvestor && isExpanded && <InvestorToolsPreview />}
              </div>
            );
          })}
        </div>

        {/* Market Tools CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-bayt-warm/10 to-bayt-cultural/10 rounded-2xl border border-bayt-warm/30 text-center">
          <h3 className="text-2xl font-bold text-bayt-dark mb-3">
            {isRTL ? 'أدوات السوق المتكاملة' : 'Integrated Market Tools'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {isRTL 
              ? 'استخدم أدواتنا المتقدمة لحساب العوائد، التأشيرات الذهبية، وفواتير الخدمات لاتخاذ قرارات استثمارية ذكية.' 
              : 'Use our advanced tools to calculate yields, golden visas, and utility bills for smart investment decisions.'
            }
          </p>
          <Link 
            href="/market-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {isRTL ? 'استكشف جميع الأدوات' : 'Explore All Tools'}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
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
