'use client';

import React, { useState } from 'react';
import { FiMenu, FiHome, FiUser, FiCalendar, FiFileText, FiBarChart2 } from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Navigation items
  const navItems = [
    { id: 1, label: 'Home', icon: <FiHome />, link: '/dashboard' },
    { id: 2, label: 'Profile', icon: <FiUser />, link: '/dashboard/profile' },
    { id: 3, label: 'Sessions', icon: <FiCalendar />, link: '/dashboard/sessions' },
    { id: 4, label: 'Resources', icon: <FiFileText />, link: '/dashboard/resources' },
    { id: 5, label: 'Analytics', icon: <FiBarChart2 />, link: '/dashboard/analytics' },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-gray-800 text-white h-full transition-all duration-300 fixed top-16`}
    >
      {/* Toggle Button */}
      <div
        className="flex items-center justify-center h-12 cursor-pointer hover:bg-gray-700"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 flex flex-col items-center">
        <ul className="space-y-2 w-full">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer group w-full justify-center"
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`ml-4 text-sm ${
                  isCollapsed ? 'hidden' : 'inline-block'
                } group-hover:text-primary`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
