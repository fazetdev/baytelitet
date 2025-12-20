'use client';

import { useUserRole } from '@/context/useUserRole';
import Link from 'next/link';
import { MapPin, Home, TrendingUp, Building, ShieldCheck, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/useLanguage';

interface RoleCard {
  key: 'buyer' | 'investor' | 'developer' | 'md' | 'agent';
  title: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
  link: string;
  gulfTouch: string;
}

export default function ChooseRole() {
  const { setRole } = useUserRole();
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  const roles: RoleCard[] = [
    {
      key: 'buyer',
      title: isRTL ? 'أبحث عن منزل عائلي ممتاز' : 'I want a great place to live',
      subtext: isRTL ? 'استكشف الأماكن القريبة، الخرائط، والجولات الافتراضية' : 'Explore nearby places, see maps, and virtual tours',
      icon: Home,
      cta: isRTL ? 'عرض العقارات' : 'View Properties',
      link: '/properties?role=buyer',
      gulfTouch: isRTL ? 'جولة افتراضية' : 'Virtual Tour',
    },
    {
      key: 'investor',
      title: isRTL ? 'أريد نمو أموالي' : 'I want my money to grow',
      subtext: isRTL ? 'احسب عائد الإيجار وتحقق من أهلية الفيزا الذهبية' : 'Calculate rental ROI and check Golden Visa eligibility',
      icon: TrendingUp,
      cta: isRTL ? 'احسب العائد' : 'Calculate ROI',
      link: '/investor',
      gulfTouch: isRTL ? 'حالة الفيزا الذهبية' : 'Golden Visa Status',
    },
    {
      key: 'developer',
      title: isRTL ? 'أريد متابعة مشروعي' : 'I want to track my project',
      subtext: isRTL ? 'تابع تقدم المبيعات وتحديثات البناء' : 'Monitor sales progress and construction updates',
      icon: Building,
      cta: isRTL ? 'عرض المخزون' : 'View Inventory',
      link: '/developer',
      gulfTouch: isRTL ? 'صور البناء' : 'Construction Photos',
    },
    {
      key: 'md',
      title: isRTL ? 'هل شركتي آمنة ومربحة؟' : 'Is my company safe & profitable?',
      subtext: isRTL ? 'شاهد إجمالي المبيعات وشهادات الامتثال' : 'See total sales and compliance badges',
      icon: ShieldCheck,
      cta: isRTL ? 'لوحة التحكم' : 'View Dashboard',
      link: '/md',
      gulfTouch: isRTL ? 'شهادة الرERA' : 'RERA Compliance Badge',
    },
    {
      key: 'agent',
      title: isRTL ? 'أريد البيع بسرعة' : 'I want to sell fast',
      subtext: isRTL ? 'شارك القوائم مع العملاء فوراً' : 'Share listings instantly to clients',
      icon: Share2,
      cta: isRTL ? 'ابدأ البيع' : 'Start Selling',
      link: '/agent',
      gulfTouch: isRTL ? 'تذكير أوقات الصلاة' : 'Prayer Time Reminder',
    },
  ];

  const handleRoleSelect = (roleKey: 'buyer' | 'investor' | 'developer' | 'md' | 'agent') => {
    setRole(roleKey === 'md' ? 'developer' : roleKey); // Map 'md' to 'developer'
  };

  return (
    <section className="py-16 bg-bayt-light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-bayt-dark mb-8 text-center">
          {isRTL ? 'اختر دورك' : 'Choose Your Role'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {roles.map((role) => {
            const Icon = role.icon as React.ComponentType<{ className?: string }>;
            return (
              <Link
                key={role.key}
                href={role.link}
                onClick={() => handleRoleSelect(role.key)}
                className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center border border-bayt-cool/30 hover:border-bayt-warm"
              >
                <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-bayt-warm/20 to-bayt-cultural/20">
                  <Icon className="w-8 h-8 text-bayt-dark" />
                </div>
                <h3 className="font-semibold text-lg text-bayt-dark mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{role.subtext}</p>
                <div className="text-xs text-bayt-cool font-medium mb-2 px-3 py-1 bg-bayt-light rounded-full">
                  {role.gulfTouch}
                </div>
                <button className="mt-auto bg-gradient-to-r from-bayt-warm to-yellow-600 text-white px-4 py-2 rounded-xl hover:from-yellow-600 hover:to-bayt-warm transition-all font-semibold">
                  {role.cta}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
