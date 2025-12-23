'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Home, TrendingUp, ArrowRight } from 'lucide-react';

interface ChooseRoleProps {
  lang?: 'en' | 'ar';
}

const ChooseRole: FC<ChooseRoleProps> = ({ lang = 'en' }): JSX.Element => {
  const isRTL = lang === 'ar';

  const roles = [
    {
      key: 'buyer',
      title: isRTL ? 'أبحث عن منزل عائلي ممتاز' : 'I want a great place to live',
      subtext: isRTL ? 'استكشف الأماكن القريبة، الخرائط، والجولات الافتراضية' : 'Explore nearby places, see maps, and virtual tours',
      icon: Home,
      cta: isRTL ? 'عرض العقارات' : 'View Properties',
      link: '/properties?role=buyer',
      feature: isRTL ? 'جولة افتراضية' : 'Virtual Tour',
    },
    {
      key: 'investor',
      title: isRTL ? 'أريد نمو أموالي' : 'I want my money to grow',
      subtext: isRTL ? 'احسب عائد الإيجار وتحقق من أهلية الفيزا الذهبية' : 'Calculate rental ROI and check Golden Visa eligibility',
      icon: TrendingUp,
      cta: isRTL ? 'فتح الأدوات' : 'Open Tools',
      link: '/market-tools',
      feature: isRTL ? 'حالة الفيزا الذهبية' : 'Golden Visa Status',
    },
  ];

  return (
    <section className="py-12 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-bayt-dark mb-2">
            {isRTL ? 'اختر دورك' : 'Choose Your Role'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isRTL ? 'اختر المسار المناسب لاحتياجاتك' : 'Select the right path for your needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link 
                key={role.key}
                href={role.link}
                className="group flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-bayt-warm hover:shadow-md transition-all duration-300 bg-white"
              >
                <div className="mb-4 p-3 rounded-full bg-bayt-warm/10 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-bayt-dark" />
                </div>

                <h3 className="font-bold text-lg text-bayt-dark mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {role.subtext}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="px-3 py-1 rounded-full bg-bayt-light border border-bayt-cool/20">
                    <span className="text-[10px] font-medium text-bayt-warm uppercase">
                      {role.feature}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-bayt-warm group-hover:translate-x-1 transition-transform">
                    <span>{role.cta}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
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

export default ChooseRole;
