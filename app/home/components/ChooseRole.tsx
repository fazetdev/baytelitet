'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RoleCard {
  key: 'buyer' | 'investor';
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

  const handleRoleClick = (role: RoleCard) => {
    if (role.key === 'investor') {
      // Toggle preview
      const isExpanding = expandedRole !== 'investor';
      setExpandedRole(isExpanding ? 'investor' : null);

      // Navigate after short delay for visual effect
      if (isExpanding) {
        setTimeout(() => {
          router.push(role.link);
        }, 400); // 400ms matches animation
      }
    } else {
      router.push(role.link);
    }
  };

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  const InvestorToolsPreview = () => (
    <div className="mt-4 p-4 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-bayt-warm/30 animate-fadeIn">
      <h4 className="font-semibold text-bayt-dark mb-3">
        {isRTL ? 'أدوات المستثمر السريعة' : 'Quick Investor Tools'}
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        {isRTL
          ? 'استخدم هذه الأدوات لحساب استثماراتك العقارية'
          : 'Use these tools to calculate your real estate investments'}
      </p>
      <div className="grid grid-cols-1 gap-3">
        <Link
          href="/market-tools#golden-visa"
          className="p-3 bg-white rounded-lg border hover:border-bayt-warm flex items-center justify-between"
        >
          <span className="font-medium">🏆 Golden Visa Checker</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
        <Link
          href="/market-tools#rental-calculator"
          className="p-3 bg-white rounded-lg border hover:border-bayt-warm flex items-center justify-between"
        >
          <span className="font-medium">📈 Rental Yield Calculator</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-bayt-light via-white to-yellow-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-bayt-dark mb-3">
              {isRTL ? 'اختر دورك في سوق العقارات' : 'Choose Your Role in Real Estate'}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {isRTL
                ? 'اختر المسار المناسب لاحتياجاتك العقارية. سواء كنت مشترياً أو مستثمراً.'
                : "Select the right path for your real estate needs. Buyer or Investor."}
            </p>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-bayt-cool/30 hover:border-bayt-warm transition-colors shadow-sm"
          >
            <span className={`font-medium ${lang === 'en' ? 'text-bayt-warm' : 'text-gray-600'}`}>EN</span>
            <div className="w-8 h-5 bg-bayt-cool/30 rounded-full relative">
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-bayt-warm transition-transform duration-300 ${
                  lang === 'ar' ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </div>
            <span className={`font-medium ${lang === 'ar' ? 'text-bayt-warm' : 'text-gray-600'}`}>AR</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isInvestor = role.key === 'investor';
            const isExpanded = expandedRole === 'investor';
            return (
              <div key={role.key} className="relative">
                <button
                  onClick={() => handleRoleClick(role)}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border cursor-pointer overflow-hidden w-full"
                  aria-expanded={isInvestor && isExpanded}
                  aria-label={`Select ${isRTL ? role.titleAr : role.titleEn} role`}
                >
                  <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-bayt-warm/10 to-bayt-cultural/10 w-14 h-14 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-bayt-dark" />
                  </div>

                  <h3 className="font-bold text-lg text-bayt-dark mb-2 text-center min-h-[3rem]">
                    {isRTL ? role.titleAr : role.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-4 text-center text-sm flex-grow">
                    {isRTL ? role.subtextAr : role.subtextEn}
                  </p>

                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bayt-light border border-bayt-cool/20">
                      <span className="text-xs text-bayt-warm">✦</span>
                      <span className="text-xs font-medium">{isRTL ? role.featureAr : role.featureEn}</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white hover:shadow-md">
                    {isRTL ? role.ctaAr : role.ctaEn}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isInvestor && isExpanded && <InvestorToolsPreview />}
              </div>
            );
          })}
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
