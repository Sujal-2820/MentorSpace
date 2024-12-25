'use client';

import React, { useState, useEffect } from 'react';
import { useMentorDashboard } from '../../MentorDashboardContext';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import { Label } from '@radix-ui/react-label';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { supabase } from '../../../../../lib/supabase-client';


export default function Profile() {
  const { user, mentorDetails } = useMentorDashboard();

  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    areas_of_expertise: [],
    availability: '',
    contact_number: '',
    expected_outcomes: '',
    expected_salary_range: '',
    industry: '',
    job_title: '',
    linkedin: '',
    location: '',
    meeting_format: '',
    other_link: '',
    profile_image_url: '',
    qualifications: [],
    reason_for_mentorship: '',
    skills: [],
    target_audience: '',
    twitter: '',
    years_of_experience: ''
  });

  useEffect(() => {
    if (mentorDetails) {
      setProfile(mentorDetails);
    }
  }, [mentorDetails]);

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
      // Assuming `mentorDetails.id` is the mentor's ID, which you want to update
      const { data, error } = await supabase
        .from('mentors')
        .update({
          full_name: profile.full_name,
          age: profile.age,
          areas_of_expertise: profile.areas_of_expertise,
          availability: profile.availability,
          contact_number: profile.contact_number,
          expected_outcomes: profile.expected_outcomes,
          expected_salary_range: profile.expected_salary_range,
          industry: profile.industry,
          job_title: profile.job_title,
          linkedin: profile.linkedin,
          location: profile.location,
          meeting_format: profile.meeting_format,
          other_link: profile.other_link,
          profile_image_url: profile.profile_image_url,
          qualifications: profile.qualifications,
          reason_for_mentorship: profile.reason_for_mentorship,
          skills: profile.skills,
          target_audience: profile.target_audience,
          twitter: profile.twitter,
          years_of_experience: profile.years_of_experience
        })
        .eq('id', mentorDetails.id); // Match mentor ID to ensure updating the correct mentor
  
      if (error) throw error;
  
      // Optionally handle the response
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
          Mentor Profile
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
                <Label htmlFor="contact_number" className={labelClass}>Contact Number</Label>
                <input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  value={profile.contact_number}
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="job_title" className={labelClass}>Job Title</Label>
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={profile.job_title}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="industry" className={labelClass}>Industry</Label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={profile.industry}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="years_of_experience" className={labelClass}>Years of Experience</Label>
                <input
                  type="number"
                  id="years_of_experience"
                  name="years_of_experience"
                  value={profile.years_of_experience || ''}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="expected_salary_range" className={labelClass}>Expected Salary Range</Label>
                <input
                  type="text"
                  id="expected_salary_range"
                  name="expected_salary_range"
                  value={profile.expected_salary_range}
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mentorship Details</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="areas_of_expertise" className={labelClass}>Areas of Expertise</Label>
                <input
                  type="text"
                  id="areas_of_expertise"
                  name="areas_of_expertise"
                  value={profile.areas_of_expertise.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'areas_of_expertise')}
                  className={inputClass}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple areas with commas</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="availability" className={labelClass}>Availability (hours per week)</Label>
                  <input
                    type="number"
                    id="availability"
                    name="availability"
                    value={profile.availability}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="meeting_format" className={labelClass}>Meeting Format</Label>
                  <select
                    id="meeting_format"
                    name="meeting_format"
                    value={profile.meeting_format}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select format</option>
                    <option value="In-person">In-person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="target_audience" className={labelClass}>Target Audience</Label>
                <select
                  id="target_audience"
                  name="target_audience"
                  className={inputClass}
                  value={profile.target_audience || ''} // Ensure the value is tied to state
                  onChange={handleChange}
                >
                  <option value="">Select Target Audience</option>
                  <option value="Students">Students</option>
                  <option value="Early-career professionals">Early-career professionals</option>
                  <option value="Mid-career professionals">Mid-career professionals</option>
                </select>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Additional Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="qualifications" className={labelClass}>Qualifications</Label>
                <input
                  type="text"
                  id="qualifications"
                  name="qualifications"
                  value={profile.qualifications.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'qualifications')}
                  className={inputClass}
                />
                <p className="mt-1 text-sm text-gray-500">Separate multiple qualifications with commas</p>
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
                <Label htmlFor="expected_outcomes" className={labelClass}>Expected Outcomes</Label>
                <textarea
                  id="expected_outcomes"
                  name="expected_outcomes"
                  value={profile.expected_outcomes}
                  onChange={handleChange}
                  rows="3"
                  className={`${inputClass} h-24`}
                ></textarea>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Social Links</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center">
                <FaLinkedin className="text-2xl text-blue-600 mr-2" />
                <input
                  id="linkedin"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="flex items-center">
                <FaTwitter className="text-2xl text-blue-400 mr-2" />
                <input
                  id="twitter"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Twitter URL"
                />
              </div>
              <div className="flex items-center">
                <FaLink className="text-2xl text-gray-600 mr-2" />
                <input
                  id="other_link"
                  name="other_link"
                  value={profile.other_link}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Other URL"
                />
              </div>
            </div>
          </motion.section>

          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
            <br/><br/>
          </motion.div>
        </form>
      </ScrollArea>
    </div>
  );
}

