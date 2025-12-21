'use client';

import React from 'react';
import { Project } from './ProjectList';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: Props) {
  const [lang, setLang] = React.useState<'en' | 'ar'>('en');

  const statusLabels = {
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'Completed': { en: 'Completed', ar: 'مكتمل' },
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-bayt-warm font-bold"
      >
        ✕
      </button>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-4 py-2 bg-white border rounded-full shadow-sm"
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
      </div>

      <h3 className="text-2xl font-bold text-bayt-dark mb-2">
        {lang === 'en' ? project.nameEn : project.nameAr}
      </h3>
      <p className="text-gray-600 mb-4">
        Status: {statusLabels[project.status][lang]}
      </p>

      {/* Example content for project details */}
      <div className="text-gray-700">
        {lang === 'en'
          ? 'Here you can display detailed info about the project, progress charts, milestones, and updates.'
          : 'يمكنك هنا عرض معلومات مفصلة عن المشروع، الرسوم البيانية للتقدم، الإنجازات، والتحديثات.'}
      </div>
    </div>
  );
}
