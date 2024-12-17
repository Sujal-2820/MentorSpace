'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { FiMenu, FiHome, FiUser, FiUserPlus, FiCalendar, FiFileText, FiBarChart2 } from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Navigation items
  const navItems = [
    { id: 1, label: 'Home', icon: <FiHome />, link: '/mentorDashboard' },
    { id: 2, label: 'Profile', icon: <FiUser />, link: '/mentorDashboard/screens/Profile' },
    { id: 3, label: 'Sessions', icon: <FiCalendar />, link: '/mentorDashboard/screens/Sessions' },
    { id: 4, label: 'Requests', icon: <FiUserPlus />, link: '/mentorDashboard/screens/Requests' },
    { id: 5, label: 'Resources', icon: <FiFileText />, link: '/mentorDashboard/screens/Resources' },
    { id: 6, label: 'Analytics', icon: <FiBarChart2 />, link: '/mentorDashboard/screens/Analytics' },
    { id: 7, label: 'Full Profile', icon: <FiUser />, link: '/mentorDashboard/screens/FullProfile', hidden: true },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-gray-800 text-white h-full transition-all duration-300 fixed top-16 z-10`}
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
        <ul className="space-y-4 flex flex-col items-center w-full">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer group w-full justify-center ${
                item.hidden ? 'hidden' : ''
              }`}
            >
              <Link href={item.link} className="flex flex-col items-center text-center w-full">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`text-sm mt-1 ${
                    isCollapsed ? 'hidden' : 'block'
                  } group-hover:text-primary`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
