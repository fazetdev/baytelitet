'use client';

interface Props {
  season: string;
  setSeason: (s: string) => void;
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function SeasonalView({ season, setSeason, language, isRTL }: Props) {
  const map = {
    winter: language === 'ar' ? 'شتاء' : 'Winter',
    spring: language === 'ar' ? 'ربيع' : 'Spring',
    summer: language === 'ar' ? 'صيف' : 'Summer',
    autumn: language === 'ar' ? 'خريف' : 'Autumn'
  };

  return (
    <div className={`p-4 rounded-xl bg-white border border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
      <h4 className="font-bold mb-3">{language === 'ar' ? 'عرض فصلي' : 'Seasonal View'}</h4>
      <div className="flex flex-wrap gap-2">
        {Object.keys(map).map(s => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              season === s ? 'bg-bayt-cultural text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {map[s as keyof typeof map]}
          </button>
        ))}
      </div>
    </div>
  );
}
