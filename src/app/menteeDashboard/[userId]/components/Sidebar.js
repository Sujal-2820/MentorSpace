'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiHome, FiUser, FiUserPlus, FiCalendar, FiBarChart2, FiLifeBuoy, FiBriefcase } from 'react-icons/fi';
import { SiCodementor } from "react-icons/si";
import { TbTargetArrow } from "react-icons/tb";
import { useMenteeDashboard } from '../MenteeDashboardContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useMenteeDashboard();
  const pathname = usePathname();


  if (!user) {
    return 
  }

  const userId = user.id;


  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Navigation items
  const navItems = [
    { id: 1, label: 'Home', icon: <FiHome />, link: `/menteeDashboard/${userId}/` },
    { id: 2, label: 'Profile', icon: <FiUser />, link: `/menteeDashboard/${userId}/screens/Profile` },
    { id: 3, label: 'Find Mentors', icon: <SiCodementor />, link: `/menteeDashboard/${userId}/screens/Explore` },
    { id: 4, label: 'Requests', icon: <FiUserPlus />, link: `/menteeDashboard/${userId}/screens/Requests` },
    { id: 5, label: 'Sessions', icon: <FiCalendar />, link: `/menteeDashboard/${userId}/screens/Sessions` },
    { id: 6, label: 'Goals', icon: <TbTargetArrow />, link: `/menteeDashboard/${userId}/screens/Goals` },
    { id: 7, label: 'Resources', icon: <FiBarChart2 />, link: `/menteeDashboard/${userId}/screens/Resources` },
    { id: 8, label: 'Full Profile', icon: <FiUser />, link: `/menteeDashboard/${userId}/screens/FullProfile?id=mentorId`, hidden: true },
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
              className={`flex justify-center items-center px-4 py-2 hover:bg-gray-700 cursor-pointer group w-full ${
                item.hidden ? 'hidden' : ''
              }`}
            >
              <Link
                href={item.link}
                className={`flex items-center justify-center space-x-3 w-full relative ${
                  pathname === item.link ? 'text-highlight' : 'text-white'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {!isCollapsed && (
                  <span className="text-sm group-hover:text-primary transition-colors duration-200">
                    {item.label}
                  </span>
                )}
                {pathname === item.link && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-primary transition-all duration-300 ease-in-out" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
