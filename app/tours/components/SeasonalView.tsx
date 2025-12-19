'use client';

interface Props {
  season: string;
  setSeason: (s: string) => void;
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function SeasonalView({ season, setSeason, language, isRTL }: Props) {
  const map = {
    winter: language === 'ar' ? 'شتاء' : 'winter',
    spring: language === 'ar' ? 'ربيع' : 'spring',
    summer: language === 'ar' ? 'صيف' : 'summer',
    autumn: language === 'ar' ? 'خريف' : 'autumn'
  };

  return (
    <div aria-label="Season selection" className={isRTL ? 'text-right' : ''}>
      <div className="flex gap-2">
        {Object.keys(map).map(s => (
          <button
            key={s}
            aria-pressed={season === s}
            onClick={() => setSeason(s)}
          >
            {map[s as keyof typeof map]}
          </button>
        ))}
      </div>
    </div>
  );
}
