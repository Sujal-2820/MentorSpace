import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto px-6 lg:pl-6 sm:pl-[120px] max-w-full">
          <div className="sm:px-8 px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
