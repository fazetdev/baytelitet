'use client';

import { Download, FileText, BarChart3, Settings } from 'lucide-react';

interface PDFAnalyticsProps {
  language: 'en' | 'ar';
}

export default function PDFAnalytics({ language }: PDFAnalyticsProps) {
  const isRTL = language === 'ar';
  const t = {
    quickActions: language === 'en' ? 'Quick Actions' : 'إجراءات سريعة',
    viewAnalytics: language === 'en' ? 'View Analytics' : 'عرض التحليلات',
    emailCampaign: language === 'en' ? 'Email Campaign' : 'حملة بريد إلكتروني',
    reports: language === 'en' ? 'Reports' : 'تقارير',
    settings: language === 'en' ? 'Settings' : 'الإعدادات',
    exportPDF: language === 'en' ? 'Export PDF Report' : 'تصدير تقرير PDF'
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
        {t.quickActions}
      </h3>
      <div className="space-y-3">
        <button className={`w-full flex items-center gap-3 p-4 bg-bayt-light/50 rounded-xl border border-bayt-cool/30 hover:border-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
          <BarChart3 className="w-5 h-5 text-bayt-dark" />
          <span className="font-semibold text-bayt-dark">{t.viewAnalytics}</span>
        </button>

        <button className={`w-full flex items-center gap-3 p-4 bg-bayt-light/50 rounded-xl border border-bayt-cool/30 hover:border-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
          <FileText className="w-5 h-5 text-bayt-dark" />
          <span className="font-semibold text-bayt-dark">{t.emailCampaign}</span>
        </button>

        <button className={`w-full flex items-center gap-3 p-4 bg-bayt-light/50 rounded-xl border border-bayt-cool/30 hover:border-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Download className="w-5 h-5 text-bayt-dark" />
          <span className="font-semibold text-bayt-dark">{t.reports}</span>
        </button>

        <button className={`w-full flex items-center gap-3 p-4 bg-bayt-light/50 rounded-xl border border-bayt-cool/30 hover:border-bayt-warm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Settings className="w-5 h-5 text-bayt-dark" />
          <span className="font-semibold text-bayt-dark">{t.settings}</span>
        </button>
      </div>

      {/* PDF Export Button */}
      <button className={`w-full mt-6 py-3 bg-bayt-warm text-bayt-dark rounded-xl font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Download className="w-5 h-5" />
        {t.exportPDF}
      </button>
    </div>
  );
}
