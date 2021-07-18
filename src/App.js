import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import WeatherWidget from './components/WeatherWidget';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App container mt-4 mb-4">
      <div className="row">
        <div className="col-sm-6">
          <WeatherWidget />
        </div>

        <div className="col-sm-6">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
