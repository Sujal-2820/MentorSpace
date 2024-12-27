'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ role, userId, onScrollToFeatures }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine the dashboard route based on the user's role
  let dashboardRoute = '/signup'; // Default to signup if role is null
  if (role === 'Mentor') {
    dashboardRoute = `/mentorDashboard/${userId}`;
  } else if (role === 'Mentee') {
    dashboardRoute = `/menteeDashboard/${userId}`;
  }

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Mentor<span className='text-blue-600'>Space</span></span>
            </Link>
          </div>
          {/* Centered Links Section */}
          <div className="hidden md:flex flex-grow justify-center space-x-4">
            <Link href={dashboardRoute} className="text-foreground hover:text-primary px-3 py-2 rounded-md text-md font-medium">
              Dashboard
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-md font-medium">About</Link>
            <button 
              onClick={onScrollToFeatures} 
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-md font-medium"
            >
              Features
            </button>
          </div>

          {/* Right Side: Login and Sign Up */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-md font-medium">Login</Link>
            <Link href="/signup" className="bg-foreground text-white hover:bg-opacity-90 px-6 py-2 rounded-full text-md font-medium">Sign Up</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href={dashboardRoute} className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
            Dashboard
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</Link>
          <button 
            onClick={onScrollToFeatures} 
            className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </button>
          <Link href="/signin" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Login</Link>
          <Link href="/signup" className="bg-foreground text-white hover:bg-opacity-90 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
