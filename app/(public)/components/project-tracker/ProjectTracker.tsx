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
    nameAr: 'بايت تاور',
    descriptionEn: 'Description in English', 
    descriptionAr: 'الوصف بالعربية',
    status: 'Planning',
    statusEn: 'Planning',
    statusAr: 'التخطيط',
    progress: 10
  },
  { 
    id: '2', 
    name: 'Elite Villas',
    nameEn: 'Elite Villas', 
    nameAr: 'إيليت فيلاس',
    descriptionEn: 'Description in English', 
    descriptionAr: 'الوصف بالعربية',
    status: 'In Progress',
    statusEn: 'In Progress',
    statusAr: 'قيد التنفيذ',
    progress: 45
  },
  { 
    id: '3', 
    name: 'Golden Residence',
    nameEn: 'Golden Residence', 
    nameAr: 'غولدن ريزيدنس',
    descriptionEn: 'Description in English', 
    descriptionAr: 'الوصف بالعربية',
    status: 'Completed',
    statusEn: 'Completed',
    statusAr: 'مكتمل',
    progress: 100
  },
];

export default function ProjectTracker() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <div className="mb-12">
        <ProjectList projects={sampleProjects} onSelect={setSelectedProject} />
      </div>
      {selectedProject && <ProjectDetails project={selectedProject} />}
    </div>
  );
}
