'use client';

import React, { useState } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      mentorName: 'John Doe',
      topic: 'React Advanced Concepts',
      date: '2024-12-20',
      status: 'Pending',
    },
    {
      id: 2,
      mentorName: 'Jane Smith',
      topic: 'Data Visualization Techniques',
      date: '2024-12-18',
      status: 'Accepted',
    },
    {
      id: 3,
      mentorName: 'Michael Johnson',
      topic: 'UI/UX Best Practices',
      date: '2024-12-15',
      status: 'Declined',
    },
  ]);

  const cancelRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id && request.status === 'Pending'
          ? { ...request, status: 'Cancelled' }
          : request
      )
    );
  };

  const resendRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id && request.status === 'Declined'
          ? { ...request, status: 'Pending', date: new Date().toISOString().split('T')[0] }
          : request
      )
    );
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold mb-4">My Requests</h1>
      <p className="mb-6">
        Track your mentorship requests sent to mentors. Manage pending requests or resend declined ones.
      </p>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                request.status === 'Pending'
                  ? 'bg-yellow-100'
                  : request.status === 'Accepted'
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{request.topic}</h3>
                <p className="text-sm text-gray-700">
                  Mentor: <span className="font-medium">{request.mentorName}</span>
                </p>
                <p className="text-sm text-gray-500">Date: {request.date}</p>
                <p
                  className={`text-sm font-semibold ${
                    request.status === 'Pending'
                      ? 'text-yellow-700'
                      : request.status === 'Accepted'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  Status: {request.status}
                </p>
              </div>
              <div>
                {request.status === 'Pending' && (
                  <button
                    onClick={() => cancelRequest(request.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                )}
                {request.status === 'Declined' && (
                  <button
                    onClick={() => resendRequest(request.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Resend
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have no requests at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
