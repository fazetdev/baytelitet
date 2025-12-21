'use client';

import React from 'react';

interface Project {
  id: number;
  name: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number; // 0-100
}

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({ projects, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map(project => (
        <div 
          key={project.id} 
          onClick={() => onSelect(project)}
          className="p-4 border rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.status}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div 
              className="bg-bayt-warm h-2 rounded-full" 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
