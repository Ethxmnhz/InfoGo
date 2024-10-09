// src/components/RecentTasks.js

import React from 'react';
import './RecentTasks.css'; // Add styles for the Recent Tasks component

const RecentTasks = ({ tasks }) => {
  return (
    <div className="recent-tasks-container">
      <h2>Recently Added Tasks</h2>
      <div className="recent-tasks-card">
        <h3>Tasks</h3>
        {tasks.length === 0 ? (
          <p>No recent tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.name} - {task.date}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="calendar-card">
        <h3>Calendar</h3>
        <Calendar />
      </div>
    </div>
  );
};

// Simple Calendar Component
const Calendar = () => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const today = new Date().getDate();

  return (
    <div className="calendar">
      {Array.from({ length: daysInMonth }, (_, i) => (
        <div key={i} className="calendar-day" onMouseEnter={() => console.log(`Hovering on day ${i + 1}`)}>
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default RecentTasks;
