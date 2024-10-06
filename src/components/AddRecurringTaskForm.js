// src/components/AddRecurringTaskForm.js

import React, { useState } from 'react';
import './MonthScheduler.css';

const AddRecurringTaskForm = () => {
  const [day, setDay] = useState('');
  const [taskName, setTaskName] = useState('');
  const [recurrence, setRecurrence] = useState(1); // Default to 1 month

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Task "${taskName}" for ${day} set to recur every ${recurrence} month(s)`);
    // Here you would handle the recurring task (save to state, send to server, etc.)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Day:
        <select value={day} onChange={(e) => setDay(e.target.value)} required>
          <option value="" disabled>Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </label>
      <label>
        Task Name:
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </label>
      <label>
        Recurrence (months):
        <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>{num} month{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </label>
      <button type="submit">Set Recurring Task</button>
    </form>
  );
};

export default AddRecurringTaskForm;
