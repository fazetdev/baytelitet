'use client';

interface SunPathProps {
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function SunPathSimulation({ language, isRTL }: SunPathProps) {
  return (
    <section 
      className={`p-6 rounded-2xl border border-bayt-cool/50 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <h4 className="text-lg font-bold text-bayt-dark">
        {language === 'ar' ? 'محاكاة مسار الشمس' : 'Sun Path Simulation'}
      </h4>
      <div className="mt-4 h-32 flex items-center justify-center bg-yellow-50 rounded-xl border border-dashed border-yellow-200">
        <p className="text-sm text-yellow-700">
          {language === 'ar' 
            ? 'جاري تجهيز محاكاة الإضاءة الطبيعية...' 
            : 'Natural light simulation coming soon...'}
        </p>
      </div>
    </section>
  );
}
