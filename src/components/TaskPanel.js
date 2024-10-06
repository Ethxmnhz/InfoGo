import React from 'react';
import './TaskPanel.css';

const TaskPanel = () => {
  const tasks = [
    "Need to learn Bug bounty",
    "Need to make some labs",
    "Need to write articles",
    "Need to workout at gym"
  ];

  return (
    <div className="task-panel">
      <div className="task-image-container">
        <img 
          className="task-image" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d0484ebba139d02f13f9b891337e7d349f5c7c6ec4543fe4816eacde80aecf8" 
          alt="Task panel background" 
        />
      </div>
      <div className="task-content">
        <div className="task-header">
          <h2 className="task-date">Monday    25/09/24</h2>
          <p className="task-subtitle">Sweet Day</p>
        </div>
        <p className="task-description">
          Completing task is important and is hard to do but you are brave.
        </p>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              [] {task}
            </li>
          ))}
        </ul>

        {/* Add Journal and Add Photo Icons */}
        <div className="task-actions">
          <button className="action-button">
            <i className="fas fa-book"></i>
          </button>
          <button className="action-button">
            <i className="fas fa-camera"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
