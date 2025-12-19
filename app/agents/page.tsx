'use client';

import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Clock, MessageSquare, Download, Filter, Eye } from 'lucide-react';

const leads = [
  {
    id: 1,
    name: 'Ahmed Al Mansoori',
    phone: '+971 50 123 4567',
    email: 'ahmed@email.com',
    interest: 'Palm Jumeirah Villa',
    status: 'hot',
    lastActivity: '2 hours ago',
    interactions: 12,
    timeOnSite: '45 min',
    probability: '85%'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+971 55 987 6543',
    email: 'sarah@email.com',
    interest: 'Downtown Sky Villa',
    status: 'warm',
    lastActivity: '1 day ago',
    interactions: 8,
    timeOnSite: '32 min',
    probability: '65%'
  },
  {
    id: 3,
    name: 'Mohammed Khan',
    phone: '+971 52 456 7890',
    email: 'mohammed@email.com',
    interest: 'Arabian Ranches Home',
    status: 'hot',
    lastActivity: '3 hours ago',
    interactions: 15,
    timeOnSite: '58 min',
    probability: '92%'
  },
  {
    id: 4,
    name: 'Fatima Al Zaabi',
    phone: '+971 56 789 0123',
    email: 'fatima@email.com',
    interest: 'Marina Bay Apartment',
    status: 'cold',
    lastActivity: '1 week ago',
    interactions: 3,
    timeOnSite: '15 min',
    probability: '25%'
  },
  {
    id: 5,
    name: 'Robert Chen',
    phone: '+971 54 321 0987',
    email: 'robert@email.com',
    interest: 'Al Reem Island Penthouse',
    status: 'warm',
    lastActivity: '2 days ago',
    interactions: 6,
    timeOnSite: '28 min',
    probability: '55%'
  }
];

// Re-mapping colors for analytics stats to use Bayt Elite palette
const analytics = [
  { label: 'Total Leads', value: '156', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'bayt-cool' },       // Subtle Gray
  { label: 'Conversion Rate', value: '42%', change: '+5%', icon: <TrendingUp className="w-6 h-6" />, color: 'bayt-cultural' }, // Sage Green (Growth)
  { label: 'Avg Deal Size', value: 'AED 4.2M', change: '+8%', icon: <DollarSign className="w-6 h-6" />, color: 'bayt-warm' },    // Warm Gold (Value)
  { label: 'Avg Response Time', value: '15 min', change: '-20%', icon: <Clock className="w-6 h-6" />, color: 'amber' }
];

export default function AgentsPage({ language = 'en' }) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Bilingual content
  const content = {
    en: {
      title: 'Agent Intelligence Dashboard',
      subtitle: 'Track leads, analyze performance, and close more deals',
      exportReport: 'Export Report',
      newLead: 'New Lead',
      recentLeads: 'Recent Leads',
      searchLeads: 'Search leads...',
      allStatus: 'All Status',
      hot: 'Hot',
      warm: 'Warm',
      cold: 'Cold',
      views: 'views',
      onSite: 'on site',
      probability: 'Probability',
      sendMessage: 'Send Message',
      scheduleCall: 'Schedule Call',
      leadConversionFunnel: 'Lead Conversion Funnel',
      websiteVisitors: 'Website Visitors',
      propertyViews: 'Property Views',
      calculatorUsage: 'Calculator Usage',
      leadForms: 'Lead Forms',
      qualifiedLeads: 'Qualified Leads',
      closedDeals: 'Closed Deals',
      hotLeadAlerts: '🔥 Hot Lead Alerts',
      contactImmediately: 'Contact Immediately',
      followUpToday: 'Follow Up Today',
      quickActions: 'Quick Actions',
      viewAnalytics: 'View Analytics',
      emailCampaign: 'Email Campaign',
      reports: 'Reports',
      settings: 'Settings',
      spentTime: 'Spent',
      downloadedPlans: 'Downloaded',
      paymentPlans: 'payment plans',
      totalLeads: 'Total Leads',
      conversionRate: 'Conversion Rate',
      avgDealSize: 'Avg Deal Size',
      avgResponseTime: 'Avg Response Time',
      currency: 'AED'
    },
    ar: {
      title: 'لوحة تحليل الوكلاء الذكية',
      subtitle: 'تابع العملاء المحتملين، حلل الأداء، وأغلق المزيد من الصفقات',
      exportReport: 'تصدير التقرير',
      newLead: 'عميل جديد',
      recentLeads: 'العملاء المحتملين الأخيرة',
      searchLeads: 'ابحث عن عملاء...',
      allStatus: 'جميع الحالات',
      hot: 'ساخن',
      warm: 'دافئ',
      cold: 'بارد',
      views: 'مشاهدة',
      onSite: 'على الموقع',
      probability: 'احتمالية',
      sendMessage: 'إرسال رسالة',
      scheduleCall: 'جدولة مكالمة',
      leadConversionFunnel: 'قمع تحويل العملاء المحتملين',
      websiteVisitors: 'زوار الموقع',
      propertyViews: 'مشاهدات العقار',
      calculatorUsage: 'استخدام الحاسبة',
      leadForms: 'استمارات العملاء',
      qualifiedLeads: 'عملاء مؤهلين',
      closedDeals: 'صفقات مغلقة',
      hotLeadAlerts: '🔥 تنبيهات عملاء ساخنة',
      contactImmediately: 'اتصل فوراً',
      followUpToday: 'تابع اليوم',
      quickActions: 'إجراءات سريعة',
      viewAnalytics: 'عرض التحليلات',
      emailCampaign: 'حملة بريد إلكتروني',
      reports: 'تقارير',
      settings: 'الإعدادات',
      spentTime: 'قضى',
      downloadedPlans: 'حمّل',
      paymentPlans: 'خطط سداد',
      totalLeads: 'إجمالي العملاء',
      conversionRate: 'معدل التحويل',
      avgDealSize: 'متوسط حجم الصفقة',
      avgResponseTime: 'متوسط وقت الاستجابة',
      currency: 'درهم'
    }
  };

  const t = content[language as 'en' | 'ar'];
  const isRTL = language === 'ar';

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.interest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    // Redefined status colors to fit the professional dashboard look
    switch(status) {
      case 'hot': return 'bg-red-50 text-red-700 border-red-300';
      case 'warm': return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'cold': return 'bg-bayt-cool/10 text-bayt-cool border-bayt-cool/50';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap = {
      hot: language === 'en' ? 'HOT' : 'ساخن',
      warm: language === 'en' ? 'WARM' : 'دافئ',
      cold: language === 'en' ? 'COLD' : 'بارد'
    };
    return statusMap[status] || status.toUpperCase();
  };

  // Updated analytics with bilingual labels
  const analyticsData = [
    { 
      label: t.totalLeads, 
      value: '156', 
      change: '+12%', 
      icon: <Users className="w-6 h-6" />, 
      color: 'bayt-cool' 
    },
    { 
      label: t.conversionRate, 
      value: '42%', 
      change: '+5%', 
      icon: <TrendingUp className="w-6 h-6" />, 
      color: 'bayt-cultural' 
    },
    { 
      label: t.avgDealSize, 
      value: `${t.currency} 4.2M`, 
      change: '+8%', 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'bayt-warm' 
    },
    { 
      label: t.avgResponseTime, 
      value: '15 min', 
      change: '-20%', 
      icon: <Clock className="w-6 h-6" />, 
      color: 'amber' 
    }
  ];

  // Funnel stages with bilingual labels
  const funnelStages = [
    { stage: t.websiteVisitors, count: '1,245', percent: 100, color: 'bg-bayt-cool' },
    { stage: t.propertyViews, count: '892', percent: 72, color: 'bg-bayt-cultural' },
    { stage: t.calculatorUsage, count: '543', percent: 44, color: 'bg-bayt-warm' },
    { stage: t.leadForms, count: '321', percent: 26, color: 'bg-orange-500' },
    { stage: t.qualifiedLeads, count: '156', percent: 12, color: 'bg-purple-500' },
    { stage: t.closedDeals, count: '65', percent: 5, color: 'bg-red-500' }
  ];

  return (
    // Background uses light color from homepage
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-light">
      {/* Header */}
      {/* Header uses the dark primary color from homepage */}
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-8">
          <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className={`text-3xl font-bold ${isRTL ? 'text-right' : ''}`}>
                {t.title}
              </h1>
              <p className={`text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
                {t.subtitle}
              </p>
            </div>
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Export Button - Secondary action uses bayt-cool for border/text and white BG */}
              <button className={`px-6 py-3 bg-white text-bayt-dark font-bold rounded-xl hover:bg-gray-100 transition-all border border-bayt-cool ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Download className={`inline w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.exportReport}
              </button>
              {/* New Lead Button - Primary action uses warm gold accent */}
              <button className={`px-6 py-3 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-opacity-90 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MessageSquare className={`inline w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.newLead}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((stat, index) => (
            // Cards use white BG and bayt-cool border
            <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  {/* Icon circle uses the specific color variable defined above */}
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 inline-block mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-bayt-dark">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
                {/* Change indicator uses standard green/red for performance */}
                <div className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-bayt-cultural' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leads Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-bayt-cool/50">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-200">
                <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h2 className={`text-xl font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                    {t.recentLeads}
                  </h2>
                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Input/Select fields use bayt-cool border/focus */}
                    <input
                      type="text"
                      placeholder={t.searchLeads}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`border border-bayt-cool/50 rounded-xl px-4 py-2 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    />
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className={`border border-bayt-cool/50 rounded-xl px-4 py-2 focus:ring-2 focus:ring-bayt-warm focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    >
                      <option value="all">{t.allStatus}</option>
                      <option value="hot">{t.hot}</option>
                      <option value="warm">{t.warm}</option>
                      <option value="cold">{t.cold}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Leads List */}
              <div className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <div key={lead.id} className="p-6 hover:bg-bayt-light/50 transition-colors">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar uses a gradient of the primary accent color */}
                        <div className="w-12 h-12 bg-gradient-to-r from-bayt-warm to-yellow-700 rounded-xl flex items-center justify-center text-bayt-dark font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h3 className={`font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{lead.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
                              {getStatusDisplay(lead.status)}
                            </span>
                          </div>
                          <div className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{lead.email}</div>
                          <div className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{lead.phone}</div>
                        </div>
                      </div>

                      <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
                        <div className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{lead.interest}</div>
                        <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>
                          {t.probability}: <span className={`font-bold text-bayt-warm`}>{lead.probability}</span>
                        </div>
                        <div className={`flex items-center gap-4 mt-2 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Eye className="w-4 h-4" />
                            {lead.interactions} {t.views}
                          </span>
                          <span>•</span>
                          <span>{lead.timeOnSite} {t.onSite}</span>
                          <span>•</span>
                          <span>{lead.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-3 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {/* Primary action (Send Message) uses warm gold accent */}
                      <button className={`flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark py-2 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MessageSquare className={`inline w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t.sendMessage}
                      </button>
                      {/* Secondary action (Schedule Call) uses cool accent border/text */}
                      <button className={`flex-1 border-2 border-bayt-cool text-bayt-cool py-2 rounded-xl font-semibold hover:bg-bayt-cool/10 transition-all ${isRTL ? 'text-right' : ''}`}>
                        {t.scheduleCall}
                      </button>
                      <button className="px-4 border border-bayt-cool/50 text-gray-700 py-2 rounded-xl font-semibold hover:bg-bayt-light/50 transition-all">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Analytics */}
          <div className="space-y-6">
            {/* Performance Chart */}
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
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Lead Notifications */}
            {/* Keeping Red for high alert, but using bayt-dark text for contrast */}
            <div className={`bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`text-lg font-bold text-red-900 mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t.hotLeadAlerts}
              </h3>
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-300">
                  <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className="font-bold text-red-800">Ahmed Al Mansoori</div>
                      <div className="text-sm text-red-700">
                        {t.spentTime} 45min {language === 'en' ? 'on' : 'على'} Palm Jumeirah Villa
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">
                      {language === 'en' ? 'NOW' : 'الآن'}
                    </span>
                  </div>
                  <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    {t.contactImmediately}
                  </button>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-300">
                  <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className="font-bold text-amber-800">Sarah Johnson</div>
                      <div className="text-sm text-amber-700">
                        {t.downloadedPlans} 3 {t.paymentPlans}
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-amber-600 text-white px-2 py-1 rounded-full">
                      {language === 'en' ? '1 HR' : '1 ساعة'}
                    </span>
                  </div>
                  <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    {t.followUpToday}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`text-lg font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t.quickActions}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Analytics Button - Cool Accent */}
                <button className={`bg-bayt-cool/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-cool/20 transition-colors ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-2xl mb-2 text-bayt-cool">📊</div>
                  <div className="font-semibold">{t.viewAnalytics}</div>
                </button>
                {/* Email Button - Cultural Green Accent */}
                <button className={`bg-bayt-cultural/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-cultural/20 transition-colors ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-2xl mb-2 text-bayt-cultural">📧</div>
                  <div className="font-semibold">{t.emailCampaign}</div>
                </button>
                {/* Reports Button - Warm Gold Accent */}
                <button className={`bg-bayt-warm/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-warm/20 transition-colors ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-2xl mb-2 text-bayt-warm">📋</div>
                  <div className="font-semibold">{t.reports}</div>
                </button>
                {/* Settings Button - Dark Accent */}
                <button className={`bg-bayt-dark/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-dark/20 transition-colors ${isRTL ? 'text-right' : ''}`}>
                  <div className="text-2xl mb-2 text-bayt-dark">⚙️</div>
                  <div className="font-semibold">{t.settings}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}// Build fix
