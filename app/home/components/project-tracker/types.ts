export type ProjectStatus = 'In Progress' | 'Planning' | 'Completed';

export interface Project {
  id: string;          // unique identifier
  name: string;
  status: ProjectStatus;
  progress: number;    // 0-100
  descriptionEn?: string;
  descriptionAr?: string;
}
