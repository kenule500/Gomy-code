import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

interface TasksState {
  items: Task[];
}

const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem('redux-todo-tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem('redux-todo-tasks', JSON.stringify(tasks));
  } catch {
    // Storage unavailable
  }
};

const initialState: TasksState = {
  items: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ description: string }>) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        description: action.payload.description.trim(),
        isDone: false,
      };
      state.items.push(newTask);
      saveTasks(state.items);
    },
    editTask(state, action: PayloadAction<{ id: string; description: string }>) {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.description = action.payload.description.trim();
      }
      saveTasks(state.items);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveTasks(state.items);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
      saveTasks(state.items);
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;