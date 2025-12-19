export const getStatusColor = (status: string) => {
  switch(status) {
    case 'hot': return 'bg-red-50 text-red-700 border-red-300';
    case 'warm': return 'bg-yellow-50 text-yellow-700 border-yellow-300';
    case 'cold': return 'bg-bayt-cool/10 text-bayt-cool border-bayt-cool/50';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getStatusDisplay = (status: string, language: 'en' | 'ar' = 'en'): string => {
  const statusMap: Record<string, string> = {
    hot: language === 'en' ? 'HOT' : 'ساخن',
    warm: language === 'en' ? 'WARM' : 'دافئ',
    cold: language === 'en' ? 'COLD' : 'بارد'
  };
  
  return statusMap[status] || status.toUpperCase();
};

export const getAnalyticsData = (language: 'en' | 'ar' = 'en') => {
  const t = {
    totalLeads: language === 'en' ? 'Total Leads' : 'إجمالي العملاء',
    conversionRate: language === 'en' ? 'Conversion Rate' : 'معدل التحويل',
    avgDealSize: language === 'en' ? 'Avg Deal Size' : 'متوسط حجم الصفقة',
    avgResponseTime: language === 'en' ? 'Avg Response Time' : 'متوسط وقت الاستجابة',
    currency: language === 'en' ? 'AED' : 'درهم'
  };

  return [
    { label: t.totalLeads, value: '156', change: '+12%', color: 'bayt-cool' },
    { label: t.conversionRate, value: '42%', change: '+5%', color: 'bayt-cultural' },
    { label: t.avgDealSize, value: `${t.currency} 4.2M`, change: '+8%', color: 'bayt-warm' },
    { label: t.avgResponseTime, value: '15 min', change: '-20%', color: 'amber' }
  ];
};
