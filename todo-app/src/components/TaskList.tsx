import type { Task, FilterStatus, SortBy } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: FilterStatus;
  sortBy: SortBy;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onFilterChange: (filter: FilterStatus) => void;
  onSortChange: (sort: SortBy) => void;
}

const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };

export default function TaskList({
  tasks,
  filter,
  sortBy,
  onToggle,
  onEdit,
  onDelete,
  onFilterChange,
  onSortChange,
}: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="task-list-container">
      <div className="task-list-controls">
        <div className="filter-buttons">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((f) => (
            <button
              key={f}
              className={`btn btn-filter ${filter === f ? 'active' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="sort-control">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <p className="empty-message">
          {filter === 'all'
            ? 'No tasks yet. Add one above!'
            : `No ${filter} tasks found.`}
        </p>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}

      <div className="task-stats">
        {tasks.filter((t) => !t.completed).length} active / {tasks.length} total
      </div>
    </div>
  );
}