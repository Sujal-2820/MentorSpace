'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase-client';
import { useMentorDashboard } from '../../MentorDashboardContext';

const RequestCard = ({ request, onAccept, onDecline, onViewProfile }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
    <div>
      <h2 className="text-lg font-semibold">{request.menteeName}</h2>
      <p className="text-sm text-gray-600">Connection Request</p>
      <p className="text-sm text-gray-500">Date: {new Date(request.created_at).toLocaleDateString()}</p>
      <p className={`text-sm font-semibold ${request.status === 'Pending' ? 'text-yellow-700' : 'text-gray-700'}`}>
        Status: {request.status}
      </p>
    </div>
    <div className="flex space-x-2">
      {/* Accept Button */}
      {request.status === 'Pending' && (
        <>
          <button
            onClick={() => onAccept(request.id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={() => onDecline(request.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Decline
          </button>
        </>
      )}
      <button
        onClick={() => onViewProfile(request)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Profile
      </button>
    </div>
  </div>
);

const Requests = () => {
  const router = useRouter();
  const { user, mentorDetails } = useMentorDashboard();
  const [connectionRequests, setConnectionRequests] = useState([]);

  // Fetch connection requests for the mentor
  useEffect(() => {
    const fetchRequests = async () => {
      if(!user && !mentorDetails){return <div>Loading...</div>}
      try {
        const { data: requestsData, error: requestsError } = await supabase
          .from('connection_requests')
          .select('id, mentee_id, status, created_at')
          .eq('mentor_id', mentorDetails.id);

        if (requestsError) {
          console.error('Error fetching requests:', requestsError);
          return;
        }

        // Fetch mentee details for each request
        const updatedRequests = await Promise.all(
          requestsData.map(async (request) => {
            const { data: menteeData, error: menteeError } = await supabase
              .from('mentees')
              .select('full_name')
              .eq('id', request.mentee_id)
              .single();

            if (menteeError) {
              console.error('Error fetching mentee details:', menteeError);
              return request;
            }

            return { ...request, menteeName: menteeData.full_name };
          })
        );

        setConnectionRequests(updatedRequests);
      } catch (error) {
        console.error('Unexpected error while fetching requests:', error);
      }
    };

    if (mentorDetails) {
      fetchRequests();
    }
  }, [mentorDetails]);

  const handleAccept = async (id) => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status: 'Accepted' })
        .eq('id', id);

      if (error) {
        console.error('Error accepting request:', error);
        return;
      }

      setConnectionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Accepted' } : request
        )
      );
    } catch (error) {
      console.error('Unexpected error while accepting request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status: 'Declined' })
        .eq('id', id);

      if (error) {
        console.error('Error declining request:', error);
        return;
      }

      setConnectionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Declined' } : request
        )
      );
    } catch (error) {
      console.error('Unexpected error while declining request:', error);
    }
  };

  if (!user) {
    return null;
  }

  if (!mentorDetails) {
    return <p>Loading mentor details...</p>; // Display a loading message or spinner
  }

  const userId = user.id;

  const handleViewProfile = (request) => {
    router.push(
      `/mentorDashboard/${userId}/screens/FullProfile?menteeId=${encodeURIComponent(request.mentee_id)}`
    );
  };

  return (
      <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
        <h1 className="text-2xl font-semibold">Requests</h1>
        <p className="mt-4">Manage connection requests sent by mentees.</p>
    
        {/* Connection Requests Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Connection Requests</h2>
          <br />
          {connectionRequests.length > 0 ? (
            connectionRequests.map((request) => (
              request.status !== 'Declined' && ( // Check if status is not 'Declined'
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onViewProfile={handleViewProfile}
                />
              )
            ))
          ) : (
            <p className="text-gray-600">No connection requests at the moment.</p>
          )}
        </div>
      </div>
  );
};

export default Requests;
