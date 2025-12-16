'use client';

import { formatCurrency } from '@/lib/formatters';
// Assuming these constants are available and correct
import { VAT_RATE, REGISTRATION_FEE_PERCENTAGE } from '@/lib/constants'; 

interface PaymentBreakdownProps {
  plan: any;
  propertyPrice: number;
  language?: 'ar' | 'en';
}

export default function PaymentBreakdown({ 
  plan, 
  propertyPrice,
  language = 'en'
}: PaymentBreakdownProps) {
  // Bilingual content
  const content = {
    en: {
      title: 'Complete Financial Breakdown',
      propertyPrice: 'Property Price',
      vat: 'VAT (5%)',
      registrationFee: 'Registration Fee (4%)',
      serviceFee: 'Service Fee (2%)',
      totalCost: 'Total Cost',
      feesNote: 'Including all government fees and charges',
      constructionMilestones: 'Construction Payment Milestones',
      bookingAmount: 'Booking Amount (10%)',
      foundation: 'Foundation (15%)',
      structure: 'Structure (25%)',
      finishing: 'Finishing (30%)',
      handover: 'Handover (20%)'
    },
    ar: {
      title: 'تفصيل مالي كامل',
      propertyPrice: 'سعر العقار',
      vat: 'ضريبة القيمة المضافة (5%)',
      registrationFee: 'رسوم التسجيل (4%)',
      serviceFee: 'رسوم الخدمة (2%)',
      totalCost: 'التكلفة الإجمالية',
      feesNote: 'بما في ذلك جميع الرسوم الحكومية والتكاليف',
      constructionMilestones: 'مراحل سداد البناء',
      bookingAmount: 'مبلغ الحجز (10%)',
      foundation: 'الأساس (15%)',
      structure: 'الهيكل (25%)',
      finishing: 'التشطيبات (30%)',
      handover: 'التسليم (20%)'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const vat = propertyPrice * VAT_RATE;
  const registrationFee = propertyPrice * REGISTRATION_FEE_PERCENTAGE;
  const serviceFee = propertyPrice * 0.02; // 2% service fee
  const totalFees = vat + registrationFee + serviceFee;
  const totalCost = propertyPrice + totalFees;

  // Updated color mapping for Bayt Elite consistency
  const breakdownItems = [
    { label: t.propertyPrice, amount: propertyPrice, color: 'text-bayt-dark', bg: 'bg-bayt-warm/30' },
    { label: t.vat, amount: vat, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
    { label: t.registrationFee, amount: registrationFee, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
    { label: t.serviceFee, amount: serviceFee, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
  ];
  
  // Custom milestone colors for the Bayt Elite progress bar
  const milestones = [
    { label: t.bookingAmount, percent: 10, color: 'bg-bayt-cultural' }, // Cultural Green for initial
    { label: t.foundation, percent: 25, color: 'bg-bayt-warm/70' },
    { label: t.structure, percent: 50, color: 'bg-bayt-warm' }, // Warm Gold for main construction
    { label: t.finishing, percent: 80, color: 'bg-bayt-warm' },
    { label: t.handover, percent: 100, color: 'bg-bayt-cool' }, // Cool Accent for final
  ];

  return (
    // Base container uses light background and cool accent border
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50"
    >
      <h2 className={`text-2xl font-bold text-bayt-dark mb-6 ${isRTL ? 'text-right' : ''}`}>
        {t.title}
      </h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8">
        {breakdownItems.map((item, index) => (
          // Hover state uses light accent
          <div 
            key={index} 
            className={`flex justify-between items-center p-4 rounded-lg hover:bg-bayt-light/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Dot uses the specific item's light background */}
              <div className={`w-3 h-3 rounded-full ${item.bg}`}></div>
              <span className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                {item.label}
              </span>
            </div>
            {/* Amount text uses dark primary color */}
            <span className={`font-bold ${item.color}`}>
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="border-t border-bayt-cool/50 pt-6">
        <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-lg font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.totalCost}
          </span>
          {/* Total Cost uses the warm accent color for high visibility */}
          <span className="text-3xl font-bold text-bayt-warm">
            {formatCurrency(totalCost)}
          </span>
        </div>
        <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
          {t.feesNote}
        </p>
      </div>

      {/* Construction Milestones */}
      <div className="mt-8 pt-6 border-t border-bayt-cool/50">
        <h3 className={`font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
          {t.constructionMilestones}
        </h3>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-2">
              <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                  {milestone.label}
                </span>
                <span className="font-bold text-bayt-dark">
                  {/* Calculate amount based on the percentage of the property price */}
                  {formatCurrency(propertyPrice * (milestone.percent / 100))}
                </span>
              </div>
              {/* Progress bar uses light background */}
              <div className="h-2 bg-bayt-light rounded-full overflow-hidden">
                <div 
                  className={`h-full ${milestone.color} rounded-full transition-all duration-500`}
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