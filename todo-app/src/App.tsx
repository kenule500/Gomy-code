import { Provider } from 'react-redux';
import { store } from './store/store';
import Addtask from './components/Addtask';
import ListTask from './components/ListTask';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>To-Do List</h1>
        </header>
        <main className="app-main">
          <Addtask />
          <ListTask />
        </main>
      </div>
    </Provider>
  );
}