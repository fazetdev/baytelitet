'use client';

import { MessageSquare, Eye, Filter } from 'lucide-react';
import { getStatusColor } from '../utils/leadUtils';

interface LeadCardProps {
  lead: {
    id: number;
    name: string;
    phone: string;
    email: string;
    interest: string;
    status: 'hot' | 'warm' | 'cold';
    lastActivity: string;
    interactions: number;
    timeOnSite: string;
    probability: string;
  };
  language: 'en' | 'ar';
  getStatusDisplay: (status: string, language: 'en' | 'ar') => string;
}

export default function LeadCard({ lead, language, getStatusDisplay }: LeadCardProps) {
  const isRTL = language === 'ar';
  const t = {
    probability: language === 'en' ? 'Probability' : 'احتمالية',
    views: language === 'en' ? 'views' : 'مشاهدة',
    onSite: language === 'en' ? 'on site' : 'على الموقع',
    sendMessage: language === 'en' ? 'Send Message' : 'إرسال رسالة',
    scheduleCall: language === 'en' ? 'Schedule Call' : 'جدولة مكالمة'
  };

  return (
    <div className="p-6 hover:bg-bayt-light/50 transition-colors">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 bg-gradient-to-r from-bayt-warm to-yellow-700 rounded-xl flex items-center justify-center text-bayt-dark font-bold">
            {lead.name.charAt(0)}
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`font-bold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{lead.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
                {getStatusDisplay(lead.status, language)}
              </span>
            </div>
            <div className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{lead.email}</div>
            <div className={`text-gray-600 text-sm ${isRTL ? 'text-right' : ''}`}>{lead.phone}</div>
          </div>
        </div>

        <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
          <div className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{lead.interest}</div>
          <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>
            {t.probability}: <span className="font-bold text-bayt-warm">{lead.probability}</span>
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
        <button className={`flex-1 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark py-2 rounded-xl font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
          <MessageSquare className={`inline w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.sendMessage}
        </button>
        <button className={`flex-1 border-2 border-bayt-cool text-bayt-cool py-2 rounded-xl font-semibold hover:bg-bayt-cool/10 transition-all ${isRTL ? 'text-right' : ''}`}>
          {t.scheduleCall}
        </button>
        <button className="px-4 border border-bayt-cool/50 text-gray-700 py-2 rounded-xl font-semibold hover:bg-bayt-light/50 transition-all">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
