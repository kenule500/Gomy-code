export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'createdAt' | 'dueDate' | 'priority';