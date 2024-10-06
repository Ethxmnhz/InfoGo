// src/components/AddTaskForm.js

import React, { useState } from 'react';
import './MonthScheduler.css'; // Import CSS

const AddTaskForm = ({ addTask }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [task, setTask] = useState('');
  const [notify, setNotify] = useState(false);
  const [addNotes, setAddNotes] = useState(false); // State for showing notes field
  const [notes, setNotes] = useState(''); // State for notes

  // Get current date and calculate the next 7 days
  const currentDate = new Date();
  const nextWeekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toDateString() // Full date string
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName: task,
      date: selectedDay,
      notify,
      notes: addNotes ? notes : '', // Only add notes if they were added
    };
    addTask(newTask); // Call addTask function to add the task to the list
    // Reset the form
    setSelectedDay('');
    setTask('');
    setNotify(false);
    setAddNotes(false);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Day:
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          required
        >
          <option value="" disabled>Select a day</option>
          {nextWeekDays.map((day) => (
            <option key={day.date} value={day.date}>
              {day.name} ({day.date})
            </option>
          ))}
        </select>
      </label>

      <label>
        Task Name:
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task Name"
          required
        />
      </label>

      <label>
        Notify:
        <select onChange={(e) => setNotify(e.target.value === 'yes')}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>

      <label>
        Do you want to add notes?
        <button
          type="button"
          onClick={() => setAddNotes(true)}
          style={{ marginRight: '10px' }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setAddNotes(false)}
        >
          No
        </button>
      </label>

      {addNotes && (
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here"
            rows="4"
            style={{ width: '100%', borderRadius: '10px', padding: '10px' }}
          />
        </label>
      )}

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
