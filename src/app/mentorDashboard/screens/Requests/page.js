'use client'

import React, { useState } from 'react';

const RequestCard = ({ type, name, email, skills, purpose, socialLinks, onAccept, onDecline }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{type} Request</h2>
      <div className="flex space-x-4">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Decline
        </button>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm">Name: {name}</p>
      <p className="text-sm">Email: {email}</p>
      <p className="text-sm">Skills: {skills.join(', ')}</p>
      <p className="text-sm">Purpose: {purpose}</p>
      <div className="mt-2">
        <p className="text-sm font-medium">Social Links:</p>
        <div className="space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Requests = () => {
  const [connectionRequests] = useState([
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
    // Add more connection requests here if needed
  ]);

  const [sessionRequests] = useState([
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
    // Add more session requests here if needed
  ]);

  const handleAccept = (requestType) => {
    console.log(`${requestType} request accepted`);
  };

  const handleDecline = (requestType) => {
    console.log(`${requestType} request declined`);
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-8">
      <h1 className="text-2xl font-semibold">Requests</h1>
      <p className="mt-4">Here, you can view and manage connection and session requests.</p>

      {/* Connection Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Connection Requests</h2>
        {connectionRequests.map((request, index) => (
          <RequestCard
            key={index}
            type="Connection"
            name={request.name}
            email={request.email}
            skills={request.skills}
            purpose={request.purpose}
            socialLinks={request.socialLinks}
            onAccept={() => handleAccept('Connection')}
            onDecline={() => handleDecline('Connection')}
          />
        ))}
      </div>

      {/* Session Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Session Requests</h2>
        {sessionRequests.map((request, index) => (
          <RequestCard
            key={index}
            type="Session"
            name={request.name}
            email={request.email}
            skills={request.skills}
            purpose={request.purpose}
            socialLinks={request.socialLinks}
            onAccept={() => handleAccept('Session')}
            onDecline={() => handleDecline('Session')}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
