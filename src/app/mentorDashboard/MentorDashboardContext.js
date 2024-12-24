'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase-client';

const MentorDashboardContext = createContext();

export const MentorDashboardProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);  // Add a state to hold the user's role from sessionStorage

  useEffect(() => {
    const fetchUserData = async () => {
      // Retrieve the role from sessionStorage
      const storedRole = sessionStorage.getItem('current_role');
      setRole(storedRole);

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError);
          return;
        }

        if (session) {
          const { user: currentUser } = session;

          // Fetch user profile data
          const { data: userProfile, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (userError) {
            console.error('Error fetching user profile:', userError);
            return;
          }

          setUser(userProfile);

          // Fetch mentor data if the role is "Mentor"
          if (storedRole === 'Mentor') {
            const { data: mentorData, error: mentorError } = await supabase
              .from('mentors')
              .select('*')
              .eq('user_id', currentUser.id)
              .single();

            if (mentorError) {
              console.error('Error fetching mentor data:', mentorError);
              return;
            }

            setMentorDetails(mentorData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <MentorDashboardContext.Provider value={{ user, mentorDetails, loading }}>
      {children}
    </MentorDashboardContext.Provider>
  );
};

// Custom hook to use the MentorDashboardContext
export const useMentorDashboard = () => {
  return useContext(MentorDashboardContext);
};