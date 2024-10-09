import React, { useState, useEffect } from 'react';
import './MonthScheduler.css'; 
import Header from './Header'; 
import Sidebar from './Sidebar'; 
import AddTaskForm from './AddTaskForm';
import AddRecurringTaskForm from './AddRecurringTaskForm';
import RecentTasks from './RecentTasks';
import { useUser } from '../context/UserContext'; // Import useUser
import { db } from '../firebase'; // Ensure you import your Firestore database
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'; // Import Firestore functions

const MonthScheduler = () => {
  const { user } = useUser(); // Get the user from context
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRecurringForm, setShowRecurringForm] = useState(false);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const tasksRef = collection(db, 'users', user.uid, 'tasks');
        const snapshot = await getDocs(tasksRef);
        const tasksList = snapshot.docs.map(doc => doc.data());
        setRecentTasks(tasksList); // Set recent tasks to state
      }
    };

    fetchTasks();
  }, [user]); // Fetch tasks whenever the user changes

  const toggleTaskForm = () => setShowTaskForm(!showTaskForm);
  const toggleRecurringForm = () => setShowRecurringForm(!showRecurringForm);

  const addTask = async (task) => {
    // Store task in Firestore
    if (user) {
      try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', `${task.date}-${task.taskName}`); // Path to store task
        await setDoc(taskRef, {
          taskName: task.taskName,
          date: task.date,
          notify: task.notify,
          notes: task.notes,
          createdAt: new Date().toISOString() // Optional timestamp
        });
        setRecentTasks((prev) => [...prev, task]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        {/* Month Scheduler Section */}
        <div className="month-scheduler">
          <h1>Month Scheduler</h1>
          <div className="task-controls">
            <button onClick={toggleTaskForm}>
              {showTaskForm ? 'Close Add Task for Day' : 'Add Task for Day'}
            </button>
            <button onClick={toggleRecurringForm}>
              {showRecurringForm ? 'Close Add Recurring Task' : 'Add Recurring Task'}
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div className="form-container">
          {showTaskForm && <AddTaskForm addTask={addTask} />}
          {showRecurringForm && <AddRecurringTaskForm addTask={addTask} />}
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="recent-tasks-container">
        <h2>Recent Tasks</h2>
        <RecentTasks tasks={recentTasks} />
      </div>
    </div>
  );
};

export default MonthScheduler;
