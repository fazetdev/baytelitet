'use client';

import React from 'react';

export interface Project {
  id: number;
  nameEn: string;
  nameAr: string;
  status: 'In Progress' | 'Planning' | 'Completed';
}

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({ projects, onSelect }: Props) {
  const [lang, setLang] = React.useState<'en' | 'ar'>('en');

  const statusLabels = {
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'Completed': { en: 'Completed', ar: 'مكتمل' },
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-4 py-2 bg-white border rounded-full shadow-sm"
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            className="cursor-pointer p-6 bg-white rounded-2xl shadow-card hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg text-bayt-dark mb-2">
              {lang === 'en' ? project.nameEn : project.nameAr}
            </h3>
            <p className="text-sm text-gray-600">
              {statusLabels[project.status][lang]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
