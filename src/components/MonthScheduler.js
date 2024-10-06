// src/components/MonthScheduler.js

import React, { useState } from 'react';
import './MonthScheduler.css'; // Import CSS
import AddTaskForm from './AddTaskForm';
import AddRecurringTaskForm from './AddRecurringTaskForm';
import RecentTasks from './RecentTasks';

const MonthScheduler = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [recentTasks, setRecentTasks] = useState([]); // State to hold recent tasks

  const toggleTaskForm = () => setShowTaskForm(!showTaskForm);
  const toggleRecurringForm = () => setShowRecurringForm(!showRecurringForm);

  // Function to add a new task
  const addTask = (task) => {
    setRecentTasks((prev) => [...prev, task]);
  };

  return (
    <div className="month-scheduler">
      <h1>Month Scheduler</h1>
      
      <div className="task-controls">
        <button onClick={toggleTaskForm}>
          {showTaskForm ? 'Close Add Task for Day' : 'Add Task for Day'}
        </button>
        {showTaskForm && <AddTaskForm addTask={addTask} />}
        
        <button onClick={toggleRecurringForm}>
          {showRecurringForm ? 'Close Add Recurring Task' : 'Add Recurring Task'}
        </button>
        {showRecurringForm && <AddRecurringTaskForm />}
      </div>
      
      {/* Recent Tasks Section outside the Month Scheduler card */}
      <RecentTasks tasks={recentTasks} />
    </div>
  );
};

export default MonthScheduler;
