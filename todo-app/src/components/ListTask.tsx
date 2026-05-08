import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import Task from './Task';

type Filter = 'all' | 'done' | 'not';

export default function ListTask() {
  const tasks = useAppSelector((state) => state.tasks.items);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = tasks.filter((task) => {
    if (filter === 'done') return task.isDone;
    if (filter === 'not') return !task.isDone;
    return true;
  });

  const doneCount = tasks.filter((t) => t.isDone).length;

  return (
    <div className="task-list-container">
      <div className="task-list-controls">
        <div className="filter-buttons">
          {(['all', 'done', 'not'] as Filter[]).map((f) => (
            <button
              key={f}
              className={`btn btn-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'done' ? 'Done' : 'Not Done'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-message">
          {filter === 'all'
            ? 'No tasks yet. Add one above!'
            : `No ${filter === 'done' ? 'completed' : 'active'} tasks.`}
        </p>
      ) : (
        <ul className="task-list">
          {filtered.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}

      <div className="task-stats">
        {doneCount} done / {tasks.length} total
      </div>
    </div>
  );
}