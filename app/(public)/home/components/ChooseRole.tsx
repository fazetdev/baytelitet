'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, ArrowRight } from 'lucide-react';

interface ChooseRoleProps {
  lang?: 'en' | 'ar';
}

export default function ChooseRole({ lang = 'en' }: ChooseRoleProps): JSX.Element {
  const isRTL = lang === 'ar';

  const roles = [
    {
      key: 'buyer',
      title: isRTL ? 'أبحث عن منزل عائلي' : 'Residential Buyer',
      subtext: isRTL 
        ? 'استكشف المنازل الفاخرة والجولات الافتراضية للعثور على منزلك المثالي.' 
        : 'Explore luxury homes and virtual tours to find your perfect residence.',
      icon: Home,
      cta: isRTL ? 'عرض العقارات' : 'View Properties',
      link: '/properties?role=buyer',
      feature: isRTL ? 'جولة افتراضية' : 'Virtual Tour',
    },
    {
      key: 'investor',
      title: isRTL ? 'أريد نمو أموالي' : 'Strategic Investor',
      subtext: isRTL 
        ? 'حساب عائد الإيجار، والتحقق من أهلية الفيزا الذهبية في مكان واحد.' 
        : 'Calculate rental ROI and check Golden Visa eligibility in one place.',
      icon: TrendingUp,
      cta: isRTL ? 'فتح الأدوات' : 'Open Tools',
      link: '/market-tools',
      feature: isRTL ? 'حالة الفيزا الذهبية' : 'Golden Visa Status',
    }
  ];

  return (
    <section className="py-12 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-bayt-dark mb-2 tracking-tight italic uppercase">
            {isRTL ? 'اختر مسارك' : 'CHOOSE YOUR PATH'}
          </h2>
          <div className="w-12 h-1.5 bg-bayt-warm"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link 
                key={role.key}
                href={role.link}
                className="group flex flex-col p-8 rounded-[2rem] border-2 border-gray-100 bg-white hover:border-bayt-warm hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-6 p-4 rounded-2xl bg-bayt-dark w-fit group-hover:bg-bayt-warm transition-colors duration-500">
                  <Icon className="w-8 h-8 text-[#D4AF37]" />
                </div>

                <h3 className="font-bold text-2xl text-bayt-dark mb-3">
                  {role.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {role.subtext}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="px-4 py-1.5 rounded-full bg-bayt-light border border-bayt-cool/10">
                    <span className="text-[10px] font-black text-bayt-warm uppercase tracking-widest">
                      {role.feature}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-black text-bayt-dark uppercase tracking-tighter group-hover:text-bayt-warm transition-colors">
                    <span>{role.cta}</span>
                    <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

