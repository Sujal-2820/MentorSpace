'use client';

import React, { useState } from "react";
import { useMentorDashboard } from './MentorDashboardContext'; // Adjust the import path as necessary

const DashboardPage = () => {
  const { user, mentorDetails, loading } = useMentorDashboard(); // Accessing context values
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(user);
  console.log(mentorDetails);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-gray-600 animate-pulse">Loading mentor details...</p>
      </div>
    );
  }

  if (!user || !mentorDetails) {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-gray-600">No user or mentor details found</p>
      </div>
    );
  }

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 transition-all duration-300 ease-in-out hover:text-gray-700">
        Welcome to your Dashboard
      </h1>

      {/* Mentor Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 transition-transform duration-300 ease-in-out hover:scale-105" onClick={handleImageClick}>
          <img
            src={mentorDetails.profile_image_url}
            alt="Mentor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Popup for Full Image */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClosePopup}>
            <img
              src={menteeDetails.profile_image_url}
              alt="Full Mentee"
              className="max-w-full max-h-full"
            />
          </div>
        )}


        {/* Mentor Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 transition-all duration-300 ease-in-out hover:text-gray-700">{mentorDetails.full_name}</h2>
          <p className="text-lg text-gray-600 mb-4 italic">{mentorDetails.job_title}</p>

          <p className="text-gray-700 mb-4 leading-relaxed">
            {mentorDetails.reason_for_mentorship}
          </p>

          {/* Contact Information */}
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 flex items-center">
              <strong className="mr-2">Email:</strong>
              <span className="text-blue-600 hover:text-blue-800 transition-colors duration-300">{user.email}</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-4 space-x-4">
            <a
              href={`https://linkedin.com/in/${mentorDetails.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0H5C2.24 0 0 2.24 0 5v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 15H5V7h3v8zm-1.5-9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM15 15h-3v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4H7V7h3v1.5c.5-.8 1.6-1.5 2.5-1.5 1.93 0 3.5 1.57 3.5 3.5V15z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href={`https://x.com/${mentorDetails.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-300 inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              
            </a>
            {mentorDetails.other_link && (
              <a
                href={mentorDetails.other_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.41 7.41L14 6l-5 5 5 5 1.41-1.41L10.83 12l4.58-4.59zM21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9zm-2 0c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7 7 3.14 7 7z"/>
                </svg>
                
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mentor Detailed Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 transition-all duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Mentor Details</h3>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap -mx-1">
            {mentorDetails.skills.map((skill, index) => (
              <span key={index} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-sm m-1 transition-colors duration-300 hover:bg-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Qualifications</h4>
          <ul className="list-disc pl-6 space-y-2">
            {mentorDetails.qualifications.map((qualification, index) => (
              <li key={index} className="text-gray-600 transition-colors duration-300 hover:text-gray-800">{qualification}</li>
            ))}
          </ul>
        </div>

        {/* Areas of Expertise */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Expertise</h4>
          <div className="flex flex-wrap -mx-1">
            {mentorDetails.areas_of_expertise.map((area, index) => (
              <span key={index} className="text-gray-600 bg-blue-100 rounded-full px-3 py-1 text-sm m-1 transition-colors duration-300 hover:bg-blue-200">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Location*/}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Location</h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mentorDetails.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {mentorDetails.location}
          </a>
        </div>

        {/* Years of Experience */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Years of Experience</h4>
          <p className="text-gray-600 text-lg font-medium">{mentorDetails.years_of_experience} years</p>
        </div>

        {/* Industry */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Industry</h4>
          <p className="text-gray-600 text-lg font-medium">{mentorDetails.industry}</p>
        </div>

        {/* Target Audience */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Target Audience</h4>
          <p className="text-gray-600">{mentorDetails.target_audience}</p>
        </div>

        {/* Mentorship Style */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Mentorship Style</h4>
          <p className="text-gray-600">{mentorDetails.mentorship_style}</p>
        </div>

        {/* Available Days */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Available Days</h4>
          <ul className="list-disc pl-6 space-y-2">
            {mentorDetails.available_days.map((day, index) => (
              <li
                key={index}
                className="text-gray-600 transition-colors duration-300 hover:text-gray-800"
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        {/* Available Timings */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Available Timings</h4>
          <ul className="list-disc pl-6 space-y-2">
            {mentorDetails.available_timings.map((timing, index) => (
              <li
                key={index}
                className="text-gray-600 transition-colors duration-300 hover:text-gray-800"
              >
                {timing}
              </li>
            ))}
          </ul>
        </div>

        {/* Meeting Format */}
        <div className="mb-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Preferred Meeting Format</h4>
          <p className="text-gray-600">{mentorDetails.meeting_format === "Both" ? "Both (In-person & Virtual)" : mentorDetails.meeting_format}</p>
        </div>

        {/* Expected Salary Range */}
        <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Expected Salary Range</h4>
          <p className="text-gray-600 text-lg font-medium">{mentorDetails.expected_salary_range}</p>
        </div>

        {/* Expected Outcomes */}
        <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Expected Outcomes</h4>
          <p className="text-gray-600">{mentorDetails.expected_outcomes}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;