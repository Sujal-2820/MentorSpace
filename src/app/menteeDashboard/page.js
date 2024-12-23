'use client';

import React, { useState } from "react";
import { useMenteeDashboard } from './MenteeDashboardContext'; // Adjust the import path as necessary

const DashboardPage = () => {
  const { user, menteeDetails, loading } = useMenteeDashboard(); // Accessing context values
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <p className="text-lg text-gray-600 animate-pulse">Loading mentee details...</p>
      </div>
    );
  }

  if (!user || !menteeDetails) {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-gray-600">No user or mentee details found</p>
      </div>
    );
  }

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 transition-all duration-300 ease-in-out hover:text-gray-700">
        Welcome to your Dashboard
      </h1>

      {/* Mentee Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 transition-transform duration-300 ease-in-out hover:scale-105" onClick={handleImageClick}>
          <img
            src={menteeDetails.profile_image_url}
            alt="Mentee"
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

        {/* Mentee Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 transition-all duration-300 ease-in-out hover:text-gray-700">{menteeDetails.full_name}</h2>
          <p className="text-lg text-gray-600 mb-4 italic">{menteeDetails.current_status}</p>

          <p className="text-gray-700 mb-4 leading-relaxed">
            {menteeDetails.reason_for_mentorship}
          </p>

          {/* Contact Information */}
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 flex items-center">
              <strong className="mr-2">Email:</strong>
              <span className="text-blue-600 hover:text-blue-800 transition-colors duration-300">{user.email}</span>
            </p>
            <p className="text-gray-600 flex items-center">
              <strong className="mr-2">Phone:</strong>
              <span>{menteeDetails.phone}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mentee Detailed Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 transition-all duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Mentee Details</h3>

        {/* Fields of Interest */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Fields of Interest</h4>
          <div className="flex flex-wrap -mx-1">
            {Array.isArray(menteeDetails.fields_of_interest) && menteeDetails.fields_of_interest.length > 0 
              ? menteeDetails.fields_of_interest.map((field, index) => (
                  <span key={index} className="text-gray-600 bg-blue-100 rounded-full px-3 py-1 text-sm m-1 transition-colors duration-300 hover:bg-blue-200">
                    {field}
                  </span>
                ))
              : <p className="text-gray-600">No fields of interest available</p>
            }
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap -mx-1">
          {typeof menteeDetails.skills === 'string' 
            ? menteeDetails.skills.split(',').map((skill, index) => (
                <span key={index} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-sm m-1 transition-colors duration-300 hover:bg-gray-200">
                  {skill.trim()}
                </span>
              ))
            : Array.isArray(menteeDetails.skills) && menteeDetails.skills.length > 0 
              ? menteeDetails.skills.map((skill, index) => (
                  <span key={index} className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-sm m-1 transition-colors duration-300 hover:bg-gray-200">
                    {skill}
                  </span>
                ))
              : <p className="text-gray-600">No skills available</p>
          }
        </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Location</h4>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(menteeDetails.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {menteeDetails.location}
          </a>
        </div>

        {/* Age */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Age</h4>
          <p className="text-gray-600 text-lg font-medium">{menteeDetails.age} years old</p>
        </div>

        {/* Current Status */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Current Status</h4>
          <p className="text-gray-600 text-lg font-medium">{menteeDetails.current_status}</p>
        </div>

        {/* Specific Goals */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Specific Goals</h4>
          <p className="text-gray-600">{menteeDetails.specific_goals}</p>
        </div>

        {/* Areas of Guidance */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Areas of Guidance</h4>
          <p className="text-gray-600">{menteeDetails.areas_of_guidance}</p>
        </div>

        {/* Preferred Mentorship Style */}
        <div className="mb-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Preferred Mentorship Style</h4>
          <p className="text-gray-600">{menteeDetails.preferred_mentorship_style}</p>
        </div>

        {/* Availability */}
        <div className="mb-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Availability</h4>
          <p className="text-gray-600">{menteeDetails.availability}</p>
        </div>

        {/* Preferred Meeting Times */}
        <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Preferred Meeting Times</h4>
          <p className="text-gray-600">
            {Array.isArray(menteeDetails.preferred_meeting_times) && menteeDetails.preferred_meeting_times.length > 0 
              ? menteeDetails.preferred_meeting_times.join(', ')
              : 'No preferred meeting times available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

