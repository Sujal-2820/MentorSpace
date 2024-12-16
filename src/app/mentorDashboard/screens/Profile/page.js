'use client'

import React, { useState } from 'react';

export default function Profile() {
  const [fullName, setFullName] = useState('John Doe');
  const [contactNumber, setContactNumber] = useState('+1 555-555-5555');
  const [age, setAge] = useState('30');
  const [location, setLocation] = useState('New York, USA');
  const [qualifications, setQualifications] = useState(['BSc Computer Science']);
  const [skills, setSkills] = useState(['JavaScript']);
  const [currentRole, setCurrentRole] = useState('Software Engineer');
  const [experience, setExperience] = useState('5');
  const [targetAudience, setTargetAudience] = useState('Early-career professionals');
  const [mentorshipStyle, setMentorshipStyle] = useState('Structured guidance');
  const [availability, setAvailability] = useState('10 hours/week');
  const [expectedSalary, setExpectedSalary] = useState('$50,000 - $60,000');
  const [reasonForMentorship, setReasonForMentorship] = useState('Give back to the community');
  const [expectedOutcomes, setExpectedOutcomes] = useState('Help mentees gain real-world experience');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://linkedin.com/in/johndoe',
    instagram: 'https://instagram.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    additionalLink: '',
  });

  const handleAddQualification = (qualification) => {
    setQualifications((prevQualifications) => [...prevQualifications, qualification]);
  };

  const handleAddSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
  };

  const handleSubmit = () => {
    // Save the changes logic (this could involve API calls)
    alert('Profile updated successfully');
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-8">
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
            <input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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

          {/* Qualifications */}
          <div>
            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
              Qualifications
            </label>
            <input
              id="qualifications"
              type="text"
              onBlur={(e) => handleAddQualification(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="mt-2">
              {qualifications.map((qualification, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                  {qualification}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
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

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience (Years)
            </label>
            <input
              id="experience"
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
              Target Audience
            </label>
            <input
              id="targetAudience"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
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

          {/* Expected Salary */}
          <div>
            <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700">
              Expected Salary Range
            </label>
            <input
              id="expectedSalary"
              type="text"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Reason for Mentorship */}
          <div>
            <label htmlFor="reasonForMentorship" className="block text-sm font-medium text-gray-700">
              Reason for Mentorship
            </label>
            <input
              id="reasonForMentorship"
              type="text"
              value={reasonForMentorship}
              onChange={(e) => setReasonForMentorship(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Expected Outcomes */}
          <div>
            <label htmlFor="expectedOutcomes" className="block text-sm font-medium text-gray-700">
              Expected Outcomes
            </label>
            <input
              id="expectedOutcomes"
              type="text"
              value={expectedOutcomes}
              onChange={(e) => setExpectedOutcomes(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Social Profile Links */}
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              id="linkedin"
              type="text"
              value={socialLinks.linkedin}
              onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              id="instagram"
              type="text"
              value={socialLinks.instagram}
              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <input
              id="twitter"
              type="text"
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="additionalLink" className="block text-sm font-medium text-gray-700">
              Additional Link
            </label>
            <input
              id="additionalLink"
              type="text"
              value={socialLinks.additionalLink}
              onChange={(e) => setSocialLinks({ ...socialLinks, additionalLink: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
