'use client';

import { Project } from './types';
import ProgressBar from './ProgressBar';

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({ projects, onSelect }: Props) {
  const lang = 'en'; // replace with context if needed

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="bg-white p-6 rounded-2xl border border-bayt-cool/20 shadow hover:shadow-lg cursor-pointer"
          onClick={() => onSelect(project)}
        >
          <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
          </p>
          <ProgressBar progress={project.progress} />
          <p className="text-xs text-gray-400 mt-1">
            {project.progress}%
          </p>
        </div>
      ))}
    </div>
  );
}
