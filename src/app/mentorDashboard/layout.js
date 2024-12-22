'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase-client';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function MentorDashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch session to get user id
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError);
          return;
        }

        if (session) {
          const { user: currentUser } = session;

          // Fetch user profile data
          const { data: userProfile, error: userError } = await supabase
            .from('users') // Assuming users table
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (userError) {
            console.error('Error fetching user profile:', userError);
            return;
          }

          setUser(userProfile);

          // Log the fetched user data to inspect
          console.log('User Profile:', userProfile);

          // Fetch mentor data based on the user id (foreign key in mentors table)
          const { data: mentorData, error: mentorError } = await supabase
            .from('mentors') // Assuming mentors table
            .select('*')
            .eq('user_id', currentUser.id)
            .single(); // Assuming each user has only one mentor record

          if (mentorError) {
            console.error('Error fetching mentor data:', mentorError);
            return;
          }

          setMentorDetails(mentorData);

          // Log the fetched mentor data to inspect
          console.log('Mentor Data:', mentorData);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>; // You can handle this case if the user is not found
  }

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
          <div className="sm:px-8 px-4">
            {/* Pass the user and mentor details as props to the children */}
            {React.Children.map(children, child =>
              React.cloneElement(child, { user, mentorDetails })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
