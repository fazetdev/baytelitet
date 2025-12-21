'use client';

import { useState } from 'react';
import ProjectDetails from './ProjectDetails';

interface Project {
  name: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number;
}

const sampleProjects: Project[] = [
  { name: 'Bayt Tower', status: 'Planning', progress: 10 },
  { name: 'Elite Villas', status: 'In Progress', progress: 45 },
  { name: 'Golden Residence', status: 'Completed', progress: 100 },
];

export default function ProjectTracker() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-4 py-2 bg-white border border-bayt-cool/30 rounded-full text-sm font-medium hover:border-bayt-warm"
        >
          {lang.toUpperCase()}
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((project) => (
          <div
            key={project.name}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <ProjectDetails project={project} lang={lang} />
          </div>
        ))}
      </div>

      {/* Selected Project Panel */}
      {selectedProject && (
        <div className="mt-6 p-6 bg-yellow-50 border border-bayt-warm rounded-2xl shadow-card animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-bayt-dark text-lg">
              {lang === 'ar' ? selectedProject.name : selectedProject.name}
            </h4>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-500 hover:text-bayt-warm text-sm flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'إغلاق' : 'Close'}</span> ✕
            </button>
          </div>
          <ProjectDetails project={selectedProject} lang={lang} />
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}
