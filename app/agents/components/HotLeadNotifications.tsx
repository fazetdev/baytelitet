'use client';

interface HotLeadNotificationsProps {
  language: 'en' | 'ar';
}

export default function HotLeadNotifications({ language }: HotLeadNotificationsProps) {
  const isRTL = language === 'ar';
  const t = {
    hotLeadAlerts: language === 'en' ? '🔥 Hot Lead Alerts' : '🔥 تنبيهات عملاء ساخنة',
    spentTime: language === 'en' ? 'Spent' : 'قضى',
    on: language === 'en' ? 'on' : 'على',
    downloadedPlans: language === 'en' ? 'Downloaded' : 'حمّل',
    paymentPlans: language === 'en' ? 'payment plans' : 'خطط سداد',
    contactImmediately: language === 'en' ? 'Contact Immediately' : 'اتصل فوراً',
    followUpToday: language === 'en' ? 'Follow Up Today' : 'تابع اليوم',
    now: language === 'en' ? 'NOW' : 'الآن'
  };

  return (
    <div className={`bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 ${isRTL ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-bold text-red-900 mb-4 ${isRTL ? 'text-right' : ''}`}>
        {t.hotLeadAlerts}
      </h3>
      <div className="space-y-4">
        {/* Hot Lead 1 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-300">
          <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <div className="font-bold text-red-800">Ahmed Al Mansoori</div>
              <div className="text-sm text-red-700">
                {t.spentTime} 45min {t.on} Palm Jumeirah Villa
              </div>
            </div>
            <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">
              {t.now}
            </span>
          </div>
          <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            {t.contactImmediately}
          </button>
        </div>

        {/* Hot Lead 2 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-300">
          <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <div className="font-bold text-amber-800">Sarah Johnson</div>
              <div className="text-sm text-amber-700">
                {t.downloadedPlans} 3 {t.paymentPlans}
              </div>
            </div>
            <span className="text-xs font-bold bg-amber-600 text-white px-2 py-1 rounded-full">
              {language === 'en' ? 'TODAY' : 'اليوم'}
            </span>
          </div>
          <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
            {t.followUpToday}
          </button>
        </div>
      </div>
    </div>
  );
}
