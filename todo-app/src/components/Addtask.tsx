import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/tasksSlice';

export default function Addtask() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Task description is required');
      return;
    }
    dispatch(addTask({ description }));
    setDescription('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-group">
        <label htmlFor="task-desc">Task Description</label>
        <div className="addtask-input-row">
          <input
            id="task-desc"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            placeholder="What needs to be done?"
            className={error ? 'input-error' : ''}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
        {error && <span className="error-text">{error}</span>}
      </div>
    </form>
  );
}