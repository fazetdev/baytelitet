'use client';

import { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';
import { Project, ProjectStatus } from './types';

export default function ProjectTracker() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sampleProjects: Project[] = [
    { name: 'Bayt Tower', status: 'Planning', progress: 10, descriptionEn: 'Luxury apartments', descriptionAr: 'شقق فاخرة' },
    { name: 'Elite Villas', status: 'In Progress', progress: 45, descriptionEn: 'Premium villas', descriptionAr: 'فلل مميزة' },
    { name: 'Golden Residence', status: 'Completed', progress: 100, descriptionEn: 'High-end residence', descriptionAr: 'سكن راقي' },
  ];

  return (
    <section className="py-12 bg-bayt-light rounded-2xl p-6 border border-bayt-cool/20">
      <h2 className="text-2xl font-bold text-bayt-dark mb-6 text-center">Project Tracker</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProjectList 
          projects={sampleProjects} 
          onSelect={(project) => setSelectedProject(project)} 
        />
        {selectedProject && <ProjectDetails project={selectedProject} />}
      </div>
    </section>
  );
}
