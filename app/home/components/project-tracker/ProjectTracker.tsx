'use client';

import { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';
import { Project } from './types';

const sampleProjects: Project[] = [
  { 
    id: '1', 
    name: 'Bayt Tower',
    nameEn: 'Bayt Tower', 
    nameAr: 'برج بايت',
    descriptionEn: 'Luxury apartments in the city center', 
    descriptionAr: 'شقق فاخرة في وسط المدينة',
    status: 'Planning', 
    progress: 10 
  },
  { 
    id: '2', 
    name: 'Elite Villas',
    nameEn: 'Elite Villas',
    nameAr: 'فلل إيليت',
    descriptionEn: 'Modern villas with private pools', 
    descriptionAr: 'فلل حديثة مع مسابح خاصة',
    status: 'In Progress', 
    progress: 45 
  },
  { 
    id: '3', 
    name: 'Golden Residence',
    nameEn: 'Golden Residence',
    nameAr: 'الإقامة الذهبية',
    descriptionEn: 'Completed residential project', 
    descriptionAr: 'مشروع سكني مكتمل',
    status: 'Completed', 
    progress: 100 
  },
];

export default function ProjectTracker() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      {/* Project Cards */}
      <div className="mb-12">
        <ProjectList projects={sampleProjects} onSelect={setSelectedProject} />
      </div>

      {/* Selected Project Panel */}
      {selectedProject && <ProjectDetails project={selectedProject} />}
    </div>
  );
}
