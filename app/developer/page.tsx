'use client';

import { useState } from 'react';
import ProjectTracker from '@/app/(public)/home/components/project-tracker/ProjectTracker';

export default function DeveloperPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  return (
    <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header with language toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-bayt-dark mb-2">
            {lang === 'ar' ? 'لوحة تحكم المطور' : 'Developer Dashboard'}
          </h1>
          <p className="text-gray-600">
            {lang === 'ar' 
              ? 'تابع مشاريعك العقارية وتقدم البناء في الوقت الفعلي'
              : 'Track your real estate projects and construction progress in real-time'
            }
          </p>
        </div>
        
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-4 py-2 bg-white border border-bayt-cool/30 rounded-full hover:border-bayt-warm transition-colors flex items-center gap-2"
        >
          <span className={`font-medium ${lang === 'en' ? 'text-bayt-warm' : 'text-gray-600'}`}>EN</span>
          <div className="w-8 h-5 bg-bayt-cool/30 rounded-full relative">
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-bayt-warm transition-transform duration-300 ${lang === 'ar' ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <span className={`font-medium ${lang === 'ar' ? 'text-bayt-warm' : 'text-gray-600'}`}>AR</span>
        </button>
      </div>

      {/* Projects Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-bayt-dark mb-6">
          {lang === 'ar' ? 'نظرة عامة على المشاريع' : 'Projects Overview'}
        </h2>
        <ProjectTracker />
      </section>

      {/* Quick Stats Placeholder */}
      <section className="mt-16 p-8 bg-gradient-to-r from-bayt-warm/5 to-bayt-cultural/5 rounded-2xl border border-bayt-cool/20">
        <h3 className="text-xl font-semibold text-bayt-dark mb-4">
          {lang === 'ar' ? 'إحصائيات سريعة' : 'Quick Stats'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border text-center">
            <p className="text-sm text-gray-500 mb-2">{lang === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}</p>
            <p className="text-3xl font-bold text-bayt-dark">3</p>
          </div>
          <div className="p-6 bg-white rounded-xl border text-center">
            <p className="text-sm text-gray-500 mb-2">{lang === 'ar' ? 'متوسط التقدم' : 'Avg. Progress'}</p>
            <p className="text-3xl font-bold text-bayt-dark">52%</p>
          </div>
          <div className="p-6 bg-white rounded-xl border text-center">
            <p className="text-sm text-gray-500 mb-2">{lang === 'ar' ? 'الاستثمار الكلي' : 'Total Investment'}</p>
            <p className="text-3xl font-bold text-bayt-dark">$8.2M</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="mt-12 pt-8 border-t border-bayt-cool/20 text-center">
        <p className="text-gray-500">
          {lang === 'ar'
            ? 'بايت إيليت - منصة متكاملة لمطوري العقارات في الخليج'
            : 'BaytElite - Integrated platform for Gulf real estate developers'
          }
        </p>
      </section>
    </main>
  );
}
