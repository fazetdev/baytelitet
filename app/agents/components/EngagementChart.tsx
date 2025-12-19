'use client';

interface EngagementChartProps {
  language: 'en' | 'ar';
}

export default function EngagementChart({ language }: EngagementChartProps) {
  const isRTL = language === 'ar';
  const t = {
    leadConversionFunnel: language === 'en' ? 'Lead Conversion Funnel' : 'قمع تحويل العملاء المحتملين',
    websiteVisitors: language === 'en' ? 'Website Visitors' : 'زوار الموقع',
    propertyViews: language === 'en' ? 'Property Views' : 'مشاهدات العقار',
    calculatorUsage: language === 'en' ? 'Calculator Usage' : 'استخدام الحاسبة',
    leadForms: language === 'en' ? 'Lead Forms' : 'استمارات العملاء',
    qualifiedLeads: language === 'en' ? 'Qualified Leads' : 'عملاء مؤهلين',
    closedDeals: language === 'en' ? 'Closed Deals' : 'صفقات مغلقة'
  };

  const funnelStages = [
    { stage: t.websiteVisitors, count: '1,245', percent: 100, color: 'bg-bayt-cool' },
    { stage: t.propertyViews, count: '892', percent: 72, color: 'bg-bayt-cultural' },
    { stage: t.calculatorUsage, count: '543', percent: 44, color: 'bg-bayt-warm' },
    { stage: t.leadForms, count: '321', percent: 26, color: 'bg-orange-500' },
    { stage: t.qualifiedLeads, count: '156', percent: 12, color: 'bg-purple-500' },
    { stage: t.closedDeals, count: '65', percent: 5, color: 'bg-red-500' }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
        {t.leadConversionFunnel}
      </h3>
      <div className="space-y-4">
        {funnelStages.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-medium">{item.stage}</span>
              <span className="font-bold text-bayt-dark">{item.count} ({item.percent}%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
