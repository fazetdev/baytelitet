'use client';

import { Project } from './types';
import ProgressBar from './ProgressBar';

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  lang: 'en' | 'ar';
}

export default function ProjectList({ projects, onSelect, lang }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="bg-white p-6 rounded-2xl border border-bayt-cool/20 shadow hover:shadow-lg cursor-pointer"
          onClick={() => onSelect(project)}
        >
          <h3 className="font-bold text-lg mb-2">
            {lang === 'ar' ? project.nameAr : project.nameEn}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
          <ProgressBar progress={project.progress} />
          <p className="text-xs text-gray-400 mt-1">
            {lang === 'ar' 
              ? project.statusAr 
              : project.statusEn
            }
          </p>
        </div>
      ))}
    </div>
  );
}
