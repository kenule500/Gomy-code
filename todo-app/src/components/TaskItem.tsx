import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      onDelete(task.id);
    }
  };

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-item-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          title={task.completed ? 'Mark as active' : 'Mark as completed'}
        />
        <div className="task-info" onClick={() => onEdit(task)}>
          <h3 className={`task-name ${task.completed ? 'strikethrough' : ''}`}>
            {task.name}
          </h3>
          <p className="task-desc">{task.description}</p>
          <div className="task-meta">
            {task.dueDate && (
              <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <span className={`task-priority priority-${task.priority}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>
        <div className="task-actions">
          <button
            className="btn btn-sm btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-delete"
            onClick={handleDelete}
            title="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}