'use client';

import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { supabase } from '../../../../lib/supabase-client'; // Import Supabase client


const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
      try {
        // Log out the user using Supabase
        await supabase.auth.signOut();
  
        // Redirect to the home page after logout
        router.push('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
  
      // Close the logout dialog
      setShowLogoutDialog(false);
    };

  return (
    <nav className="flex justify-between items-center h-16 px-4 lg:px-24 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center space-x-8">
        <span className="text-2xl font-bold text-primary">
          Mentor<span className="text-blue-600">Space</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Notifications */}
        <DropdownMenu.Root open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenu.Trigger className="relative cursor-pointer">
            <FiBell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="absolute bg-white shadow-lg rounded p-4 mt-2 right-0">
            <p className="text-sm text-gray-600">Notification 1</p>
            <p className="text-sm text-gray-600">Notification 2</p>
            <p className="text-sm text-gray-600">Notification 3</p>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Profile */}
        <div
          className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
          onClick={() => router.push('/menteeDashboard/screens/Profile')}
        >
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center w-80">
            <p className="mb-4 text-lg">Are you sure you want to log out?</p>
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
