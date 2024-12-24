'use client';

import React, { useState, useEffect } from 'react';
import { useMenteeDashboard } from '../../MenteeDashboardContext';
import { motion } from 'framer-motion';
import { Label } from '@radix-ui/react-label';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { supabase } from '../../../../../lib/supabase-client';

export default function Profile() {
  const { user, menteeDetails } = useMenteeDashboard();

  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    location: '',
    phone: '',
    fields_of_interest: [],
    skills: [],
    current_status: '',
    reason_for_mentorship: '',
    specific_goals: '',
    areas_of_guidance: [],
    preferred_mentorship_style: '',
    availability: '',
    preferred_meeting_times: ''
  });

  useEffect(() => {
    if (menteeDetails) {
      setProfile(menteeDetails);
    }
  }, [menteeDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data, error } = await supabase
        .from('mentees')
        .update({
          full_name: profile.full_name,
          age: profile.age,
          location: profile.location,
          phone: profile.phone,
          fields_of_interest: profile.fields_of_interest,
          skills: profile.skills,
          current_status: profile.current_status,
          reason_for_mentorship: profile.reason_for_mentorship,
          specific_goals: profile.specific_goals,
          areas_of_guidance: profile.areas_of_guidance,
          preferred_mentorship_style: profile.preferred_mentorship_style,
          availability: profile.availability,
          preferred_meeting_times: profile.preferred_meeting_times
        })
        .eq('id', menteeDetails.id);
  
      if (error) throw error;
  
      console.log('Updated profile:', data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile');
    }
  };

  const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <ScrollArea className="h-[calc(100vh-6rem)] pr-4 py-4">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mentee Profile
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-12">
          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="full_name" className={labelClass}>Full Name</Label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age" className={labelClass}>Age</Label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="location" className={labelClass}>Location</Label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className={labelClass}>Phone Number</Label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Professional Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="current_status" className={labelClass}>Current Status</Label>
                <input
                  type="text"
                  id="current_status"
                  name="current_status"
                  value={profile.current_status}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="fields_of_interest" className={labelClass}>Fields of Interest</Label>
                <input
                  type="text"
                  id="fields_of_interest"
                  name="fields_of_interest"
                  value={profile.fields_of_interest.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'fields_of_interest')}
                  className={inputClass}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple fields with commas</p>
              </div>
              <div>
                <Label htmlFor="skills" className={labelClass}>Skills</Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={profile.skills.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'skills')}
                  className={inputClass}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple skills with commas</p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mentorship Details</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="reason_for_mentorship" className={labelClass}>Reason for Mentorship</Label>
                <textarea
                  id="reason_for_mentorship"
                  name="reason_for_mentorship"
                  value={profile.reason_for_mentorship}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputClass} h-24`}
                ></textarea>
              </div>
              <div>
                <Label htmlFor="specific_goals" className={labelClass}>Specific Goals</Label>
                <textarea
                  id="specific_goals"
                  name="specific_goals"
                  value={profile.specific_goals}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputClass} h-24`}
                ></textarea>
              </div>
              <div>
                <Label htmlFor="areas_of_guidance" className={labelClass}>Areas of Guidance</Label>
                <input
                  type="text"
                  id="areas_of_guidance"
                  name="areas_of_guidance"
                  value={profile.areas_of_guidance.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'areas_of_guidance')}
                  className={inputClass}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple areas with commas</p>
              </div>
              <div>
                <Label htmlFor="preferred_mentorship_style" className={labelClass}>Preferred Mentorship Style</Label>
                <input
                  type="text"
                  id="preferred_mentorship_style"
                  name="preferred_mentorship_style"
                  value={profile.preferred_mentorship_style}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Availability</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="availability" className={labelClass}>Availability</Label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={profile.availability}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="preferred_meeting_times" className={labelClass}>Preferred Meeting Times</Label>
                <input
                  type="text"
                  id="preferred_meeting_times"
                  name="preferred_meeting_times"
                  value={profile.preferred_meeting_times}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </motion.section>

          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </motion.div>
        </form>
      </ScrollArea>
    </div>
  );
}

