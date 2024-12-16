'use client';

import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';

const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
    setShowLogoutDialog(false);
  };

  return (
    <nav className="flex justify-between items-center h-16 px-4 py-4 bg-white shadow-md sticky top-0">
      {/* Brand */}
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl text-primary">MentorSpace</div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FiBell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer">
          {/* Profile picture or default avatar */}
        </div>

        {/* Logout */}
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="text-gray-600 hover:text-red-500"
        >
          <HiOutlineLogout size={20} />
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
