// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskPanel from './components/TaskPanel';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MonthScheduler from './components/MonthScheduler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Month" element={<MonthScheduler/>} />
        <Route path="*" element={ // default layout with header and sidebar
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Header />
              <TaskPanel />
            </div>
          </div>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
