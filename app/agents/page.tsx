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

export default function AgentsPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      case 'hot': return 'bg-red-50 text-red-700 border-red-300';     // Keeping red for urgency
      case 'warm': return 'bg-yellow-50 text-yellow-700 border-yellow-300'; // Keeping yellow for warning
      case 'cold': return 'bg-bayt-cool/10 text-bayt-cool border-bayt-cool/50'; // Using the cool accent for 'cold'
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    // Background uses light color from homepage
    <div className="min-h-screen bg-bayt-light">
      {/* Header */}
      {/* Header uses the dark primary color from homepage */}
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Agent Intelligence Dashboard</h1>
              <p className="text-bayt-cool">Track leads, analyze performance, and close more deals</p>
            </div>
            <div className="flex gap-4">
              {/* Export Button - Secondary action uses bayt-cool for border/text and white BG */}
              <button className="px-6 py-3 bg-white text-bayt-dark font-bold rounded-xl hover:bg-gray-100 transition-all border border-bayt-cool">
                <Download className="inline w-5 h-5 mr-2" />
                Export Report
              </button>
              {/* New Lead Button - Primary action uses warm gold accent */}
              <button className="px-6 py-3 bg-bayt-warm text-bayt-dark font-bold rounded-xl hover:bg-opacity-90 transition-all">
                <MessageSquare className="inline w-5 h-5 mr-2" />
                New Lead
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.map((stat, index) => (
            // Cards use white BG and bayt-cool border
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <div className="flex justify-between items-start">
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
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-bayt-dark">Recent Leads</h2>
                  <div className="flex gap-4">
                    {/* Input/Select fields use bayt-cool border/focus */}
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-bayt-cool/50 rounded-xl px-4 py-2 focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
                    />
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="border border-bayt-cool/50 rounded-xl px-4 py-2 focus:ring-2 focus:ring-bayt-warm focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="hot">Hot</option>
                      <option value="warm">Warm</option>
                      <option value="cold">Cold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Leads List */}
              <div className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <div key={lead.id} className="p-6 hover:bg-bayt-light/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar uses a gradient of the primary accent color */}
                        <div className="w-12 h-12 bg-gradient-to-r from-bayt-warm to-yellow-700 rounded-xl flex items-center justify-center text-bayt-dark font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-bayt-dark">{lead.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
                              {lead.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-gray-600 text-sm">{lead.email}</div>
                          <div className="text-gray-600 text-sm">{lead.phone}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-bayt-dark">{lead.interest}</div>
                        <div className="text-sm text-gray-600">Probability: <span className={`font-bold text-bayt-warm`}>{lead.probability}</span></div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {lead.interactions} views
                          </span>
                          <span>•</span>
                          <span>{lead.timeOnSite} on site</span>
                          <span>•</span>
                          <span>{lead.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      {/* Primary action (Send Message) uses warm gold accent */}
                      <button className="flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark py-2 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all">
                        <MessageSquare className="inline w-4 h-4 mr-2" />
                        Send Message
                      </button>
                      {/* Secondary action (Schedule Call) uses cool accent border/text */}
                      <button className="flex-1 border-2 border-bayt-cool text-bayt-cool py-2 rounded-xl font-semibold hover:bg-bayt-cool/10 transition-all">
                        Schedule Call
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
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Lead Conversion Funnel</h3>
              <div className="space-y-4">
                {[
                  // Re-mapping funnel colors
                  { stage: 'Website Visitors', count: '1,245', percent: 100, color: 'bg-bayt-cool' },
                  { stage: 'Property Views', count: '892', percent: 72, color: 'bg-bayt-cultural' },
                  { stage: 'Calculator Usage', count: '543', percent: 44, color: 'bg-bayt-warm' },
                  { stage: 'Lead Forms', count: '321', percent: 26, color: 'bg-orange-500' },
                  { stage: 'Qualified Leads', count: '156', percent: 12, color: 'bg-purple-500' },
                  { stage: 'Closed Deals', count: '65', percent: 5, color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
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
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-4">🔥 Hot Lead Alerts</h3>
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-red-800">Ahmed Al Mansoori</div>
                      <div className="text-sm text-red-700">Spent 45min on Palm Jumeirah Villa</div>
                    </div>
                    <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">NOW</span>
                  </div>
                  <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    Contact Immediately
                  </button>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-amber-800">Sarah Johnson</div>
                      <div className="text-sm text-amber-700">Downloaded 3 payment plans</div>
                    </div>
                    <span className="text-xs font-bold bg-amber-600 text-white px-2 py-1 rounded-full">1 HR</span>
                  </div>
                  <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    Follow Up Today
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Analytics Button - Cool Accent */}
                <button className="bg-bayt-cool/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-cool/20 transition-colors">
                  <div className="text-2xl mb-2 text-bayt-cool">📊</div>
                  <div className="font-semibold">View Analytics</div>
                </button>
                {/* Email Button - Cultural Green Accent */}
                <button className="bg-bayt-cultural/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-cultural/20 transition-colors">
                  <div className="text-2xl mb-2 text-bayt-cultural">📧</div>
                  <div className="font-semibold">Email Campaign</div>
                </button>
                {/* Reports Button - Warm Gold Accent */}
                <button className="bg-bayt-warm/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-warm/20 transition-colors">
                  <div className="text-2xl mb-2 text-bayt-warm">📋</div>
                  <div className="font-semibold">Reports</div>
                </button>
                {/* Settings Button - Dark Accent */}
                <button className="bg-bayt-dark/10 text-bayt-dark p-4 rounded-xl hover:bg-bayt-dark/20 transition-colors">
                  <div className="text-2xl mb-2 text-bayt-dark">⚙️</div>
                  <div className="font-semibold">Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
