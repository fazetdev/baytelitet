'use client';

import { formatCurrency } from '@/lib/formatters';

export interface PaymentBreakdownMilestone {
  label: string;
  percent: number;
  amount: number;
  description?: string;
  color?: 'cultural' | 'warm' | 'cool';
}

export interface PaymentBreakdownData {
  propertyPrice: number;
  vatAmount: number;
  vatRate: number;
  registrationFee: number;
  registrationFeeRate: number;
  serviceFee: number;
  serviceFeeRate: number;
  totalFees: number;
  totalCost: number;
}

interface PaymentBreakdownProps {
  data: PaymentBreakdownData;
  milestones?: PaymentBreakdownMilestone[];
  currency?: string;
  language?: 'ar' | 'en';
}

export default function PaymentBreakdown({
  data,
  milestones = [],
  currency = 'AED',
  language = 'en',
}: PaymentBreakdownProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Complete Financial Breakdown',
      propertyPrice: 'Property Price',
      vat: 'VAT',
      registrationFee: 'Registration Fee',
      serviceFee: 'Service Fee',
      totalCost: 'Total Cost',
      feesNote: 'Including all government fees and charges',
      constructionMilestones: 'Construction Payment Milestones',
      noMilestones: 'No milestones available',
    },
    ar: {
      title: 'تفصيل مالي كامل',
      propertyPrice: 'سعر العقار',
      vat: 'ضريبة القيمة المضافة',
      registrationFee: 'رسوم التسجيل',
      serviceFee: 'رسوم الخدمة',
      totalCost: 'التكلفة الإجمالية',
      feesNote: 'بما في ذلك جميع الرسوم الحكومية والتكاليف',
      constructionMilestones: 'مراحل سداد البناء',
      noMilestones: 'لا توجد مراحل متاحة',
    },
  };

  const t = content[language];

  // Breakdown items from API data
  const breakdownItems = [
    { 
      label: t.propertyPrice, 
      amount: data.propertyPrice, 
      color: 'text-bayt-dark',
      bg: 'bg-bayt-warm/30',
      rate: ''
    },
    { 
      label: `${t.vat} (${data.vatRate}%)`, 
      amount: data.vatAmount, 
      color: 'text-bayt-dark',
      bg: 'bg-bayt-cool/30',
      rate: `${data.vatRate}%`
    },
    { 
      label: `${t.registrationFee} (${data.registrationFeeRate}%)`, 
      amount: data.registrationFee, 
      color: 'text-bayt-dark',
      bg: 'bg-bayt-cool/30',
      rate: `${data.registrationFeeRate}%`
    },
    { 
      label: `${t.serviceFee} (${data.serviceFeeRate}%)`, 
      amount: data.serviceFee, 
      color: 'text-bayt-dark',
      bg: 'bg-bayt-cool/30',
      rate: `${data.serviceFeeRate}%`
    },
  ];

  // Default milestones if none provided
  const defaultMilestones: PaymentBreakdownMilestone[] = [
    { 
      label: language === 'ar' ? 'الحجز' : 'Booking', 
      percent: 10, 
      amount: data.propertyPrice * 0.1,
      color: 'cultural'
    },
    { 
      label: language === 'ar' ? 'الأساسات' : 'Foundation', 
      percent: 25, 
      amount: data.propertyPrice * 0.25,
      color: 'warm'
    },
    { 
      label: language === 'ar' ? 'الهيكل' : 'Structure', 
      percent: 50, 
      amount: data.propertyPrice * 0.5,
      color: 'warm'
    },
    { 
      label: language === 'ar' ? 'التشطيبات' : 'Finishing', 
      percent: 80, 
      amount: data.propertyPrice * 0.8,
      color: 'warm'
    },
    { 
      label: language === 'ar' ? 'التسليم' : 'Handover', 
      percent: 100, 
      amount: data.propertyPrice,
      color: 'cool'
    },
  ];

  const displayMilestones = milestones.length > 0 ? milestones : defaultMilestones;

  const getColorClass = (color?: 'cultural' | 'warm' | 'cool') => {
    switch (color) {
      case 'cultural': return 'bg-bayt-cultural';
      case 'cool': return 'bg-bayt-cool';
      case 'warm':
      default: return 'bg-bayt-warm';
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
      <h2 className={`text-2xl font-bold text-bayt-dark mb-6 ${isRTL ? 'text-right' : ''}`}>
        {t.title}
      </h2>

      <div className="space-y-4 mb-8">
        {breakdownItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center p-4 rounded-lg hover:bg-bayt-light/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`w-3 h-3 rounded-full ${item.bg}`}></div>
              <div className={`flex flex-col ${isRTL ? 'text-right' : ''}`}>
                <span className="font-medium text-bayt-dark">{item.label}</span>
                {item.rate && (
                  <span className="text-xs text-bayt-cool">{item.rate}</span>
                )}
              </div>
            </div>
            <span className={`font-bold ${item.color}`}>
              {currency} {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-bayt-cool/50 pt-6 mb-8">
        <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-lg font-semibold text-bayt-dark">
            {t.totalCost}
          </span>
          <span className="text-3xl font-bold text-bayt-warm">
            {currency} {formatCurrency(data.totalCost)}
          </span>
        </div>
        <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
          {t.feesNote}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-bayt-cool/50">
        <h3 className={`font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
          {t.constructionMilestones}
        </h3>

        <div className="space-y-4">
          {displayMilestones.map((milestone, index) => (
            <div key={index} className="space-y-2">
              <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-medium text-bayt-dark">{milestone.label}</span>
                <span className="font-bold text-bayt-dark">{currency} {formatCurrency(milestone.amount)}</span>
              </div>
              <div className="h-2 bg-bayt-light rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getColorClass(milestone.color)}`}
                  style={{ width: `${milestone.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
