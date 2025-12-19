'use client';

import { useState } from 'react';
import { Users, TrendingUp, DollarSign, Clock, MessageSquare, Download, Filter } from 'lucide-react';
import LeadCard from './components/LeadCard';
import EngagementChart from './components/EngagementChart';
import HotLeadNotifications from './components/HotLeadNotifications';
import PDFAnalytics from './components/PDFAnalytics';
import { getStatusDisplay, getAnalyticsData } from './utils/leadUtils';

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

export default function AgentsPage({ language = 'en' }: { language?: 'en' | 'ar' }) {
  const [selectedStatus, setSelectedStatus] = useState('all');
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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-bayt-light">
      {/* Header */}
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
              <button className={`px-6 py-3 bg-white text-bayt-dark font-bold rounded-xl hover:bg-gray-100 transition-all border border-bayt-cool ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Download className={`inline w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.exportReport}
              </button>
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
          {analytics.map((stat, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 inline-block mb-4`}>
                    {stat.color === 'bayt-cool' && <Users className="w-6 h-6" />}
                    {stat.color === 'bayt-cultural' && <TrendingUp className="w-6 h-6" />}
                    {stat.color === 'bayt-warm' && <DollarSign className="w-6 h-6" />}
                    {stat.color === 'amber' && <Clock className="w-6 h-6" />}
                  </div>
                  <div className="text-2xl font-bold text-bayt-dark">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
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

          {/* Sidebar - Analytics */}
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
