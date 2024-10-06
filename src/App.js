import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import to use Routes
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskPanel from './components/TaskPanel';
import MonthScheduler from './components/MonthScheduler'; // Import your new MonthScheduler component

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<TaskPanel />} /> {/* Update component prop to element */}
            <Route path="/month-scheduler" element={<MonthScheduler />} /> {/* Update component prop to element */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
