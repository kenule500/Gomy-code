import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { toggleTask, deleteTask, editTask } from '../store/tasksSlice';
import type { Task as TaskType } from '../store/tasksSlice';

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.description);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: task.id, description: editText }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <li className={`task-item ${task.isDone ? 'completed' : ''}`}>
      <div className="task-item-header">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => dispatch(toggleTask(task.id))}
          className="task-checkbox"
          title={task.isDone ? 'Mark as not done' : 'Mark as done'}
        />

        {isEditing ? (
          <div className="task-edit-row">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="task-edit-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p
              className={`task-desc ${task.isDone ? 'strikethrough' : ''}`}
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {task.description}
            </p>
            <div className="task-actions">
              <button
                className="btn btn-sm btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}