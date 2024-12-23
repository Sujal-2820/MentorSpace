// src/app/menteeDashboard/MenteeDashboardContext.js
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase-client';

const MenteeDashboardContext = createContext();

export const MenteeDashboardProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [menteeDetails, setMenteeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError);
          return;
        }

        if (session) {
          const { user: currentUser  } = session;

          // Fetch user profile data
          const { data: userProfile, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentUser .id)
            .single();

          if (userError) {
            console.error('Error fetching user profile:', userError);
            return;
          }

          setUser (userProfile);

          // Fetch mentee data based on the user id
          const { data: menteeData, error: menteeError } = await supabase
            .from('mentees')
            .select('*')
            .eq('user_id', currentUser .id)
            .single();

          if (menteeError) {
            console.error('Error fetching mentee data:', menteeError);
            return;
          }

          setMenteeDetails(menteeData);
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
    <MenteeDashboardContext.Provider value={{ user, menteeDetails, loading }}>
      {children}
    </MenteeDashboardContext.Provider>
  );
};

// Custom hook to use the MenteeDashboardContext
export const useMenteeDashboard = () => {
  return useContext(MenteeDashboardContext);
};