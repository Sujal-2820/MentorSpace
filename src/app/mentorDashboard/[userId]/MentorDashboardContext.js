'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase-client';
import { useParams } from 'next/navigation';


const MentorDashboardContext = createContext();

export const MentorDashboardProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    const fetchUserData = async () => {
    
          try {
            // Fetch user profile data
            const { data: userProfile, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', userId) // Use the ID from the URL
              .single();
    
            if (userError) {
              console.error('Error fetching user profile:', userError);
              return;
            }
    
            setUser(userProfile);
    
            // Fetch mentee data based on the user id
            const { data: mentorData, error: mentorError } = await supabase
              .from('mentors')
              .select('*')
              .eq('user_id', userId) // Use the ID from the URL
              .single();
    
            if (mentorError) {
              console.error('Error fetching mentor data:', mentorError);
              return;
            }
    
            setMentorDetails(mentorData);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
  }, [userId]);

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