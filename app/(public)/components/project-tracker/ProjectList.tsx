'use client';

import { Project } from './types';

interface Props {
  projects: Project[];
  onSelect: React.Dispatch<React.SetStateAction<Project | null>>;
}

export default function ProjectList({ projects, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white p-6 rounded-2xl border border-bayt-cool/20 shadow hover:shadow-lg cursor-pointer"
          onClick={() => onSelect(project)}
        >
          <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-bayt-warm h-2 rounded-full" 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{project.progress}%</p>
        </div>
      ))}
    </div>
  );
}
