# To-Do List Application

A React + TypeScript + Vite To-Do List application with state management.

## Features

- **Add tasks** with name, description, due date, and priority (low/medium/high)
- **Edit tasks** by clicking on them; form pre-fills with existing details
- **Delete tasks** with a confirmation prompt
- **Mark tasks as completed** via checkbox; completed tasks are visually distinct
- **Form validation** ensures name and description are filled before submission
- **Filter tasks** by All / Active / Completed status
- **Sort tasks** by creation date, due date, or priority
- **Overdue highlighting** for tasks past their due date
- **Browser storage** (localStorage) persists tasks across sessions

## How to Run Locally

```bash
cd todo-app
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
todo-app/
  src/
    components/
      TaskForm.tsx    # Form for adding/editing tasks with validation
      TaskItem.tsx    # Individual task display with edit/delete/toggle
      TaskList.tsx    # Task list with filtering and sorting
    hooks/
      useLocalStorage.ts  # Custom hook for localStorage persistence
    App.tsx           # Root component managing all state
    App.css           # Application styles
    main.tsx          # Entry point
    types.ts          # TypeScript interfaces
```

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS custom properties for theming