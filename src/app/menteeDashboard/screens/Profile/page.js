'use client'

import React, { useState } from 'react';

export default function Profile() {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [skills, setSkills] = useState([]);
  const [reasonForMentorship, setReasonForMentorship] = useState('');
  const [specificGoals, setSpecificGoals] = useState('');
  const [preferredGuidance, setPreferredGuidance] = useState('');
  const [mentorshipStyle, setMentorshipStyle] = useState('');
  const [availability, setAvailability] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    instagram: '',
    twitter: '',
    additionalLink: '',
  });

  const handleAddSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleAddFieldOfInterest = (field) => {
    setFieldOfInterest((prevFields) => [...prevFields, field]);
  };

  const handleSubmit = () => {
    alert('Profile updated successfully');
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <form className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <div className="flex space-x-2">
              <input
                type="tel"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="+1"
              />
              <input
                id="contactNumber"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (City, Country)
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Current Role */}
          <div>
            <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
              Current Role
            </label>
            <input
              id="currentRole"
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Field of Interest */}
          <div>
            <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
              Field of Interest or Study
            </label>
            <select
              multiple
              value={fieldOfInterest}
              onChange={(e) =>
                setFieldOfInterest(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
              <option value="Software Development">Software Development</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              {/* Add more fields as necessary */}
            </select>
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div>
              <input
                id="skills"
                type="text"
                onBlur={(e) => handleAddSkill(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="mt-2">
                {skills.map((skill, index) => (
                  <span key={index} className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reason for Mentorship */}
          <div>
            <label htmlFor="reasonForMentorship" className="block text-sm font-medium text-gray-700">
              Why are you looking for a mentor?
            </label>
            <input
              id="reasonForMentorship"
              type="text"
              value={reasonForMentorship}
              onChange={(e) => setReasonForMentorship(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Specific Goals */}
          <div>
            <label htmlFor="specificGoals" className="block text-sm font-medium text-gray-700">
              Specific Goals
            </label>
            <input
              id="specificGoals"
              type="text"
              value={specificGoals}
              onChange={(e) => setSpecificGoals(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Preferred Areas of Guidance */}
          <div>
            <label htmlFor="preferredGuidance" className="block text-sm font-medium text-gray-700">
              Preferred Areas of Guidance
            </label>
            <input
              id="preferredGuidance"
              type="text"
              value={preferredGuidance}
              onChange={(e) => setPreferredGuidance(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Mentorship Style */}
          <div>
            <label htmlFor="mentorshipStyle" className="block text-sm font-medium text-gray-700">
              Mentorship Style
            </label>
            <input
              id="mentorshipStyle"
              type="text"
              value={mentorshipStyle}
              onChange={(e) => setMentorshipStyle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <input
              id="availability"
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Social Links */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Social Links</label>
            <div className="flex space-x-4">
              <input
                type="url"
                placeholder="LinkedIn"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="url"
                placeholder="Instagram"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="url"
                placeholder="Twitter"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="url"
                placeholder="Additional Link"
                value={socialLinks.additionalLink}
                onChange={(e) => setSocialLinks({ ...socialLinks, additionalLink: e.target.value })}
                className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
