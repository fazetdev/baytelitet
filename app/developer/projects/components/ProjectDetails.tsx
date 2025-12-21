'use client';

import React from 'react';

interface Project {
  id: number;
  name: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number;
  description?: string;
}

interface Props {
  project: Project;
}

export default function ProjectDetails({ project }: Props) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-md">
      <h3 className="font-bold text-xl mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4">{project.status}</p>
      <p className="text-sm text-gray-500">{project.description || 'No description available.'}</p>
      <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
        <div 
          className="bg-bayt-warm h-3 rounded-full" 
          style={{ width: `${project.progress}%` }} 
        />
      </div>
    </div>
  );
}
