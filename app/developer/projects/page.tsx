'use client';

import { useState } from 'react';
import ProjectList, { Project } from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';

export default function ProjectTrackerPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sample project data
  const projects: Project[] = [
    { id: 1, nameEn: 'Bayt Towers', nameAr: 'أبراج بايت', status: 'In Progress' },
    { id: 2, nameEn: 'Al Nahda Villas', nameAr: 'فلل النهضة', status: 'Planning' },
    { id: 3, nameEn: 'Palm Heights', nameAr: 'بالم هايتس', status: 'Completed' },
  ];

  // Handler for project selection
  const handleSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section className="py-16 bg-bayt-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-bayt-dark mb-8 text-center">
          Project Tracker / متتبع المشاريع
        </h2>

        {/* Project List */}
        <div className="mb-12">
          <ProjectList projects={projects} onSelect={handleSelect} />
        </div>

        {/* Selected Project Details */}
        {selectedProject && (
          <div className="mt-8">
            <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
          </div>
        )}
      </div>
    </section>
  );
}
