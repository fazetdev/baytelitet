'use client';

import { Project, ProjectStatus } from './types';
import ProgressBar from './ProgressBar';

interface Props {
  project: Project;
  lang: 'en' | 'ar';
}

export default function ProjectDetails({ project, lang }: Props) {
  const statusLabels: Record<ProjectStatus, { en: string; ar: string }> = {
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'Completed': { en: 'Completed', ar: 'مكتمل' }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="font-semibold text-lg text-bayt-dark mb-2">{project.name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        {lang === 'ar' ? statusLabels[project.status].ar : statusLabels[project.status].en}
      </p>
      <ProgressBar progress={project.progress} />
      <p className="text-xs text-gray-400 mt-1">
        {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
      </p>
    </div>
  );
}
