export interface Project {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionAr: string;
  progress: number;
  status: 'Planning' | 'In Progress' | 'Completed';
  statusEn: string;
  statusAr: string;
}
