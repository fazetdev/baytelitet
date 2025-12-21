'use client';

import ProgressBar from './ProgressBar';
import { Project } from './types';
import { useLanguage } from '@/context/useLanguage';

interface Props {
  project: Project;
}

export default function ProjectDetails({ project }: Props) {
  const { lang } = useLanguage();

  const statusLabels = {
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'Completed': { en: 'Completed', ar: 'مكتمل' }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-2">{lang === 'ar' ? project.nameAr : project.nameEn}</h3>
      <p className="text-gray-600 mb-4">{lang === 'ar' ? project.descriptionAr : project.descriptionEn}</p>
      
      <p className="text-sm text-gray-500 mb-1">
        {lang === 'ar' ? statusLabels[project.status].ar : statusLabels[project.status].en}
      </p>
      <ProgressBar progress={project.progress} />
    </div>
  );
}
