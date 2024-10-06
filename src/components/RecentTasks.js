// src/components/RecentTasks.js

import React from 'react';
import './MonthScheduler.css'; // Import CSS

const RecentTasks = ({ tasks }) => {
  return (
    <div className="recent-tasks">
      <h2>Recent Tasks</h2>
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p>No recent tasks added.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-card">
              <h3>{task.taskName}</h3>
              <p>Date: {task.date}</p>
              <p>Notify: {task.notify ? 'Yes' : 'No'}</p>
              {task.notes && <p>Notes: {task.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
