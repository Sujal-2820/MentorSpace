'use client';

import React, { useState } from 'react';

const Resources = () => {
  // Dummy data for mentors
  const connectedMentors = [
    { id: 1, name: 'John Doe', expertise: 'Web Development' },
    { id: 2, name: 'Jane Smith', expertise: 'Data Science' },
    { id: 3, name: 'Michael Johnson', expertise: 'UI/UX Design' },
  ];

  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'React Basics Guide',
      type: 'PDF',
      url: '/resources/react-basics.pdf',
    },
    {
      id: 2,
      title: 'JavaScript Crash Course',
      type: 'Video',
      url: 'https://www.youtube.com/watch?v=upDLs1sn7g4',
    },
  ]);

  const [requests, setRequests] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [newRequest, setNewRequest] = useState('');

  const handleRequestResource = (e) => {
    e.preventDefault();

    if (selectedMentor && newRequest) {
      const mentor = connectedMentors.find((mentor) => mentor.id === parseInt(selectedMentor));
      setRequests([
        ...requests,
        {
          id: Date.now(),
          mentor: mentor.name,
          mentorExpertise: mentor.expertise,
          resourceTitle: newRequest,
        },
      ]);

      // Reset form
      setSelectedMentor('');
      setNewRequest('');
    }
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold mb-4">Shared Resources</h1>
      <p className="mb-6">
        Access resources shared by mentors or the platform. Request additional resources from connected mentors if needed.
      </p>

      {/* Resources List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.type}</p>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Request Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Request Resources</h2>
        <form onSubmit={handleRequestResource} className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Mentor
            </label>
            <select
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                -- Select Mentor --
              </option>
              {connectedMentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} ({mentor.expertise})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Resource Request
            </label>
            <input
              type="text"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the resource you need"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Send Request
          </button>
        </form>
      </div>

      {/* Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resource Requests</h2>
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{request.resourceTitle}</h3>
                  <p className="text-sm text-gray-600">
                    Requested from {request.mentor} ({request.mentorExpertise})
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No resource requests made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
