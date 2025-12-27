'use client';

import { FC, useState } from 'react';
import { ChevronDown, Calculator, TrendingUp, Zap } from 'lucide-react';
import GoldenVisaChecker from './GoldenVisaChecker';
import RentalCalculator from './RentalCalculator';
import UtilityEstimator from './UtilityEstimator';

interface ToolSection {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: FC<{ className?: string }>;
  color: string;
  component: FC<{ lang?: 'en' | 'ar' }>;
}

export default function MarketToolsPage() {
  // Use 'as' to prevent the "no overlap" type error
  const lang = 'en' as 'en' | 'ar';
  const isRTL = lang === 'ar';
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toolSections: ToolSection[] = [
    {
      id: 'golden-visa',
      titleEn: 'Golden Visa Checker',
      titleAr: 'مدقق التأشيرة الذهبية',
      descriptionEn: 'Verify eligibility for Gulf residency programs',
      descriptionAr: 'تحقق من أهلية برامج الإقامة في الخليج',
      icon: TrendingUp,
      color: 'from-amber-500 to-yellow-600',
      component: GoldenVisaChecker
    },
    {
      id: 'rental-calculator',
      titleEn: 'Rental Yield Calculator',
      titleAr: 'حاسبة العائد الإيجاري',
      descriptionEn: 'Calculate monthly rent & annual investment returns',
      descriptionAr: 'احسب الإيجار الشهري والعوائد الاستثمارية السنوية',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-600',
      component: RentalCalculator
    },
    {
      id: 'utility-estimator',
      titleEn: 'Utility Cost Estimator',
      titleAr: 'مقدر تكاليف الخدمات',
      descriptionEn: 'Estimate electricity, water & cooling expenses',
      descriptionAr: 'تقدير تكاليف الكهرباء والمياه والتبريد',
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      component: UtilityEstimator
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const isExpanded = (sectionId: string) => expandedSection === sectionId;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-bayt-dark mb-2">
            {isRTL ? 'أدوات السوق الاستثمارية' : 'Investment Market Tools'}
          </h1>
          <p className="text-gray-600">
            {isRTL
              ? 'مجموعة متكاملة من الأدوات الذكية لتحليل الفرص العقارية في الخليج'
              : 'A complete suite of smart tools for analyzing real estate opportunities in the Gulf'}
          </p>
        </div>

        <div className="space-y-4">
          {toolSections.map((section) => {
            const SectionIcon = section.icon;
            const ToolComponent = section.component;
            const expanded = isExpanded(section.id);

            return (
              <div
                key={section.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expanded
                    ? 'border-bayt-warm/50 bg-white shadow-lg'
                    : 'border-gray-200 hover:border-bayt-warm/30 hover:shadow-md bg-white'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                  aria-expanded={expanded}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <SectionIcon className="w-6 h-6" />
                    </div>
                    <div className={`text-left ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-bold text-gray-800">
                        {isRTL ? section.titleAr : section.titleEn}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isRTL ? section.descriptionAr : section.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0">
                    <div className="border-t border-gray-100 pt-6">
                      <ToolComponent lang={lang} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
