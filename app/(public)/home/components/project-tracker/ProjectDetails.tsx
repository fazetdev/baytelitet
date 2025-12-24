'use client';

import { Project } from './types';
import ProgressBar from './ProgressBar';
import { useLanguage } from '@/context/useLanguage';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const { lang } = useLanguage();

  const statusLabels: Record<Project['status'], { en: string; ar: string }> = {
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'Completed': { en: 'Completed', ar: 'مكتمل' },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-bayt-cool/20 shadow-md">
      <h3 className="font-semibold text-lg text-bayt-dark mb-2">
        {lang === 'ar' ? project.nameAr : project.nameEn}
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        {statusLabels[project.status][lang as 'en' | 'ar']}
      </p>
      <ProgressBar progress={project.progress} />
    </div>
  );
}
