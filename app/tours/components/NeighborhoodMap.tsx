'use client';

import { VirtualTour } from '../types';

interface Props {
  tourData?: VirtualTour;
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function NeighborhoodMap({ language, isRTL }: Props) {
  return (
    <section
      aria-label="Neighborhood map"
      className={`rounded-2xl p-6 border border-bayt-cool/50 ${isRTL ? 'text-right' : ''}`}
    >
      <h4 className="text-lg font-bold">
        {language === 'ar' ? 'الحي والمرافق' : 'Neighborhood'}
      </h4>
      <p className="text-sm text-bayt-cool mt-2">
        {language === 'ar'
          ? 'سيتم ربط خريطة حقيقية هنا في المرحلة القادمة'
          : 'Real map integration will be added in Phase 2'}
      </p>
    </section>
  );
}
