import React from 'react';
import { FaPlus, FaCalendar, FaDatabase, FaBook } from 'react-icons/fa';
import './Sidebar.css'; // Ensure you create this CSS file

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-icon"><FaPlus /></div>
            <div className="sidebar-icon"><FaCalendar /></div>
            <div className="sidebar-icon"><FaDatabase /></div>
            <div className="sidebar-icon"><FaBook /></div>
        </div>
    );
};

export default Sidebar;
