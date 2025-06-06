export interface Project {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}