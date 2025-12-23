'use client';

import { FC, useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, TrendingUp, Zap } from 'lucide-react';
import GoldenVisaChecker from './GoldenVisaChecker';
import RentalCalculator from './RentalCalculator';
import UtilityEstimator from './UtilityEstimator';

interface MarketToolsPageProps {
  lang?: 'en' | 'ar';
}

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

const MarketToolsPage: FC<MarketToolsPageProps> = ({ lang = 'en' }) => {
  const isRTL = lang === 'ar';
  const [expandedSection, setExpandedSection] = useState<string | null>(null); // ALL HIDDEN BY DEFAULT

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
        {/* Page Header */}
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-bayt-dark mb-2">
            {isRTL ? 'أدوات السوق الاستثمارية' : 'Investment Market Tools'}
          </h1>
          <p className="text-gray-600">
            {isRTL 
              ? 'مجموعة متكاملة من الأدوات الذكية لتحليل الفرص العقارية في الخليج' 
              : 'A complete suite of smart tools for analyzing real estate opportunities in the Gulf'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {isRTL 
              ? 'انقر على أي أداة لتوسيعها واستخدامها • جميع الأدوات مخفية افتراضيًا' 
              : 'Click on any tool to expand and use it • All tools are hidden by default'}
          </p>
        </div>

        {/* Tools Grid - All in one column for better collapsible experience */}
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
                {/* Collapsible Header */}
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
                    {isRTL ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content - HIDDEN BY DEFAULT */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!expanded}
                >
                  <div className="p-6 pt-0">
                    <div className="border-t border-gray-100 pt-6">
                      <ToolComponent lang={lang} />
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="px-6 pb-4 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-3 py-1 rounded-full ${
                      expanded 
                        ? 'bg-bayt-warm/10 text-bayt-warm font-medium' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {expanded 
                        ? (isRTL ? 'موسع' : 'Expanded') 
                        : (isRTL ? 'انقر للتوسيع' : 'Click to expand')
                      }
                    </span>
                    <span className="text-gray-400 text-xs">
                      {isRTL ? 'مخفي افتراضيًا' : 'Hidden by default'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note - Updated to reflect hidden state */}
        <div className="mt-12 p-6 bg-gradient-to-r from-bayt-light to-white rounded-2xl border border-bayt-cool/30">
          <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            <h4 className="font-semibold text-bayt-dark mb-2">
              {isRTL ? 'جميع الأدوات مخفية افتراضيًا' : 'All Tools Hidden by Default'}
            </h4>
            <p className="text-sm text-gray-600">
              {isRTL 
                ? '• انقر على أي أداة لتوسيعها • يمكن توسيع أداة واحدة فقط في كل مرة • الصفحة نظيفة وخالية من الفوضى'
                : '• Click any tool to expand it • Only one tool can be expanded at a time • Clean, uncluttered page layout'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketToolsPage;
