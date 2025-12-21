'use client';

import ProgressBar from './ProgressBar';

interface Project {
  name: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number;
}

interface ProjectDetailsProps {
  project: Project;
  lang: 'en' | 'ar';
}

export default function ProjectDetails({ project, lang }: ProjectDetailsProps) {
  const statusLabels = {
    'Planning': { en: 'Planning', ar: 'التخطيط' },
    'In Progress': { en: 'In Progress', ar: 'قيد التنفيذ' },
    'Completed': { en: 'Completed', ar: 'مكتمل' },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card border border-bayt-cool/30 space-y-3">
      <h3 className="font-bold text-lg text-bayt-dark">{project.name}</h3>
      <p className="text-sm text-gray-600">
        {lang === 'ar' ? statusLabels[project.status].ar : statusLabels[project.status].en}
      </p>
      <ProgressBar percentage={project.progress} />
    </div>
  );
}
