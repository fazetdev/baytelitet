export type ProjectStatus = 'In Progress' | 'Planning' | 'Completed';

export interface Project {
  name: string;
  status: ProjectStatus;
  progress: number;
  descriptionEn: string;
  descriptionAr: string;
}
