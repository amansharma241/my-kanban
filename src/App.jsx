// src/App.jsx
import React from 'react';
import Board from './Components/Board';
import './index.css'; // Tailwind CSS imports

const App = () => {
  return (
    
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
            Kanban Board
          </header>
          <main className="p-4">
            <Board />
          </main>
        </div>
      
  );
};

export default App;
