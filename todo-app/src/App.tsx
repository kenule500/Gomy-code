import { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type { Task, FilterStatus, SortBy } from './types';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-app-tasks', []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');

  const handleAddTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'> & { id?: string }) => {
      if (taskData.id) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskData.id
              ? { ...t, name: taskData.name, description: taskData.description, dueDate: taskData.dueDate, priority: taskData.priority }
              : t
          )
        );
        setEditingTask(null);
      } else {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
      }
    },
    [setTasks]
  );

  const handleToggle = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setTasks]
  );

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTask?.id === id) setEditingTask(null);
    },
    [setTasks, editingTask]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do List</h1>
      </header>
      <main className="app-main">
        <TaskForm
          onSubmit={handleAddTask}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />
        <TaskList
          tasks={tasks}
          filter={filter}
          sortBy={sortBy}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />
      </main>
    </div>
  );
}