'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RequestCard = ({ name, type, onViewProfile }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
    <div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{type} Request</p>
    </div>
    <div className="flex space-x-2">
      {/* Accept Button */}
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Accept
      </button>
      {/* Decline Button */}
      <button
        className="border border-gray-600 text-gray-600 bg-white px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-700 transition"
      >
        Decline
      </button>
      <button
        onClick={onViewProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Profile
      </button>
    </div>
  </div>
);

const Requests = () => {
  const router = useRouter();

  const connectionRequests = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['JavaScript', 'React', 'Node.js'],
      purpose: 'Looking to enhance my skills in React',
      socialLinks: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/johndoe' },
        { name: 'Twitter', url: 'https://twitter.com/johndoe' },
      ],
    },
  ];

  const sessionRequests = [
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      purpose: 'Seeking guidance on Data Science career path',
      socialLinks: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/janesmith' },
        { name: 'GitHub', url: 'https://github.com/janesmith' },
      ],
    },
  ];

  const handleViewProfile = (profile) => {
    router.push(
      `/mentorDashboard/screens/FullProfile?name=${encodeURIComponent(profile.name)}&email=${encodeURIComponent(
        profile.email
      )}&skills=${encodeURIComponent(profile.skills.join(','))}&purpose=${encodeURIComponent(
        profile.purpose
      )}&socialLinks=${encodeURIComponent(JSON.stringify(profile.socialLinks))}`
    );
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold">Requests</h1>
      <p className="mt-4">Manage connection and session requests.</p>

      {/* Connection Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Connection Requests</h2>
        <br/>
        {connectionRequests.map((request, index) => (
          <RequestCard
            key={index}
            name={request.name}
            type="Connection"
            onViewProfile={() => handleViewProfile(request)}
          />
        ))}
      </div>

      {/* Session Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Session Requests</h2>
        {sessionRequests.map((request, index) => (
          <RequestCard
            key={index}
            name={request.name}
            type="Session"
            onViewProfile={() => handleViewProfile(request)}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
