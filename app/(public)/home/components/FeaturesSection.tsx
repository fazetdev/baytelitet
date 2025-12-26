'use client';

import Link from 'next/link';
import {
  Calculator,
  Home,
  Globe,
  Settings,
  BarChart3,
  Users
} from 'lucide-react';

interface Feature {
  id: string;
  icon: JSX.Element;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  href: string;
}

interface FeaturesSectionProps {
  lang: 'en' | 'ar';
}

const features: Feature[] = [
  {
    id: 'calculator',
    icon: <Calculator className="w-8 h-8" />,
    titleEn: 'Dynamic Payment Calculator',
    titleAr: 'حاسبة دفع ديناميكية',
    descriptionEn: 'Real-time payment plans with Hijri/Gregorian timelines',
    descriptionAr: 'خطط دفع مباشرة مع تواريخ هجري/ميلادي',
    color: 'from-bayt-warm to-yellow-800',
    href: '/calculator',
  },
  {
    id: 'smart-property',
    icon: <Home className="w-8 h-8" />,
    titleEn: 'Smart Property Listings',
    titleAr: 'قوائم عقارية ذكية',
    descriptionEn: '360° virtual tours included by default',
    descriptionAr: 'جولات افتراضية 360° مدمجة بشكل افتراضي',
    color: 'from-bayt-cool to-gray-500',
    href: '/properties',
  },
  {
    id: 'lifestyle-intel',
    icon: <Globe className="w-8 h-8" />,
    titleEn: 'Lifestyle & Community Intelligence',
    titleAr: 'استخبارات الحياة والمجتمع',
    descriptionEn: 'Privacy, Majlis layouts, Masjid proximity, and local amenities',
    descriptionAr: 'الخصوصية، تصميم المجلس، قرب المساجد، والخدمات المحلية',
    color: 'from-bayt-cultural to-emerald-700',
    href: '/settings',
  },
  {
    id: 'market-tools',
    icon: <Settings className="w-8 h-8" />,
    titleEn: 'Market Tools',
    titleAr: 'أدوات السوق',
    descriptionEn: 'Golden Visa eligibility, rental yield calculator, ROI data',
    descriptionAr: 'أهلية الفيزا الذهبية، حاسبة العائد، وبيانات ROI',
    color: 'from-bayt-warm to-yellow-800',
    href: '/market-tools',
  },
  {
    id: 'management-dashboard',
    icon: <BarChart3 className="w-8 h-8" />,
    titleEn: 'Management Dashboard',
    titleAr: 'لوحة التحكم الإدارية',
    descriptionEn: 'Track sales performance, agent metrics, and financial analytics',
    descriptionAr: 'تتبع أداء المبيعات، مؤشرات الوكلاء، والتحليلات المالية',
    color: 'from-blue-500 to-indigo-700',
    href: '/admin',
  },
  {
    id: 'agent-portal',
    icon: <Users className="w-8 h-8" />,
    titleEn: 'Agent Portal',
    titleAr: 'بوابة الوكيل',
    descriptionEn: 'Dedicated tools for agents to manage listings and client communications',
    descriptionAr: 'أدوات مخصصة للوكلاء لإدارة القوائم واتصالات العملاء',
    color: 'from-green-500 to-emerald-700',
    href: '/agent',
  },
  {
    id: "foreigner-guide",
    icon: <Globe className="w-8 h-8" />,
    titleEn: "Foreign Buyer\'s Guide",
    titleAr: "دليل المشتري الأجنبي",
    descriptionEn: "Step-by-step guide for international investors acquiring Dubai property remotely.",
    descriptionAr: "دليل خطوة بخطوة للمستثمرين الدوليين لشراء عقارات دبي عن بُعد.",
    color: "from-purple-500 to-indigo-700",
    href: "/guides/foreign-buyer",
  },
];

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const isRTL = lang === 'ar';

  return (
    <section className="py-20 bg-bayt-light" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
          <h2 className="text-4xl font-bold text-bayt-dark mb-4">
            {isRTL ? 'مجموعة أدوات كاملة لتمكين المبيعات' : 'Complete Sales Enablement Suite'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL
              ? 'كل ما تحتاجه لبيع العقارات بسرعة وذكاء في سوق الخليج'
              : 'Everything you need to sell properties faster and smarter in the Gulf market'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.id} href={feature.href} className="group block">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-bayt-warm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-bayt-dark mb-3 group-hover:text-bayt-warm">
                  {isRTL ? feature.titleAr : feature.titleEn}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isRTL ? feature.descriptionAr : feature.descriptionEn}
                </p>
                <div className="text-bayt-warm font-semibold flex items-center gap-2">
                  {isRTL ? 'استكشف الميزة' : 'Explore feature'}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
