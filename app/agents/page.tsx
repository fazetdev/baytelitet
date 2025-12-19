'use client';

import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Clock, MessageSquare, Download } from 'lucide-react';
import LeadCard from './components/LeadCard';
import EngagementChart from './components/EngagementChart';
import HotLeadNotifications from './components/HotLeadNotifications';
import PDFAnalytics from './components/PDFAnalytics';
import { getStatusDisplay, getAnalyticsData } from './utils/leadUtils';

type LeadStatus = 'hot' | 'warm' | 'cold';
type StatusFilter = 'all' | LeadStatus;

const leads = [
  {
    id: 1,
    name: 'Ahmed Al Mansoori',
    phone: '+971 50 123 4567',
    email: 'ahmed@email.com',
    interest: 'Palm Jumeirah Villa',
    status: 'hot' as const,
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
    status: 'warm' as const,
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
    status: 'hot' as const,
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
    status: 'cold' as const,
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
    status: 'warm' as const,
    lastActivity: '2 days ago',
    interactions: 6,
    timeOnSite: '28 min',
    probability: '55%'
  }
];

const colorMap: Record<string, string> = {
  'bayt-cool': 'bg-blue-100 text-blue-600',
  'bayt-cultural': 'bg-emerald-100 text-emerald-600',
  'bayt-warm': 'bg-orange-100 text-orange-600',
  'amber': 'bg-amber-100 text-amber-600'
};

export default function AgentsPage({ language = 'en' }: { language?: 'en' | 'ar' }) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isRTL = language === 'ar';

  const t = {
    title: language === 'en' ? 'Agent Intelligence Dashboard' : 'لوحة تحليل الوكلاء الذكية',
    subtitle: language === 'en' ? 'Track leads, analyze performance, and close more deals' : 'تابع العملاء المحتملين، حلل الأداء، وأغلق المزيد من الصفقات',
    exportReport: language === 'en' ? 'Export Report' : 'تصدير التقرير',
    newLead: language === 'en' ? 'New Lead' : 'عميل جديد',
    recentLeads: language === 'en' ? 'Recent Leads' : 'العملاء المحتملين الأخيرة',
    searchLeads: language === 'en' ? 'Search leads...' : 'ابحث عن عملاء...',
    allStatus: language === 'en' ? 'All Status' : 'جميع الحالات',
    hot: language === 'en' ? 'Hot' : 'ساخن',
    warm: language === 'en' ? 'Warm' : 'دافئ',
    cold: language === 'en' ? 'Cold' : 'بارد'
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.interest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const analytics = getAnalyticsData(language);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right w-full md:w-auto' : 'w-full md:w-auto'}>
              <h1 className="text-3xl font-bold">{t.title}</h1>
              <p className="text-slate-400">{t.subtitle}</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center">
                <Download className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.exportReport}
              </button>
              <button className="flex-1 md:flex-none px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center">
                <MessageSquare className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.newLead}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.map((stat, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-sm p-6 border border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <div className={`p-3 rounded-xl inline-block mb-4 ${colorMap[stat.color] || 'bg-gray-100 text-gray-600'}`}>
                    {stat.color === 'bayt-cool' && <Users className="w-6 h-6" />}
                    {stat.color === 'bayt-cultural' && <TrendingUp className="w-6 h-6" />}
                    {stat.color === 'bayt-warm' && <DollarSign className="w-6 h-6" />}
                    {stat.color === 'amber' && <Clock className="w-6 h-6" />}
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
                <div className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  <h2 className="text-xl font-bold text-slate-900">{t.recentLeads}</h2>
                  <div className="flex gap-4 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder={t.searchLeads}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 md:w-64 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
                      className="border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    >
                      <option value="all">{t.allStatus}</option>
                      <option value="hot">{t.hot}</option>
                      <option value="warm">{t.warm}</option>
                      <option value="cold">{t.cold}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {filteredLeads.map(lead => (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    language={language}
                    getStatusDisplay={getStatusDisplay}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <EngagementChart language={language} />
            <HotLeadNotifications language={language} />
            <PDFAnalytics language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}
