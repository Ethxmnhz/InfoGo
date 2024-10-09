// src/components/AddTaskForm.js

import React, { useState } from 'react';
import { db } from '../firebase'; // Adjust the path based on your structure
import { collection, doc, setDoc } from 'firebase/firestore';
import { useUser } from '../context/UserContext'; // Import useUser
import './MonthScheduler.css';

const AddTaskForm = ({ addTask }) => {
  const { user } = useUser(); // Get the user from context
  const [selectedDay, setSelectedDay] = useState('');
  const [task, setTask] = useState('');
  const [notify, setNotify] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const currentDate = new Date();
  const nextWeekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toDateString()
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      taskName: task,
      date: selectedDay,
      notify,
      notes: addNotes ? notes : '',
    };

    // Save task to Firestore
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', `${selectedDay}-${task}`); // Update path as needed
        await setDoc(taskRef, {
          taskName: task,
          date: selectedDay,
          notify,
          notes: addNotes ? notes : '',
          createdAt: new Date().toISOString() // Optional timestamp
        });
        addTask(newTask); // Call addTask function to add the task to the list
        setSelectedDay('');
        setTask('');
        setNotify(false);
        setAddNotes(false);
        setNotes('');
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    } else {
      console.error("No user is logged in.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Day:
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} required>
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
