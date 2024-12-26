'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase-client'; // Adjust the path if needed
import { useMenteeDashboard } from '../../MenteeDashboardContext';

const Requests = () => {
  const { user, menteeDetails } = useMenteeDashboard();
  const [requests, setRequests] = useState([]);

  // Fetch the mentee's requests from Supabase
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Get the connection requests with mentor_id and created_at
        const { data: requestsData, error: requestsError } = await supabase
          .from('connection_requests')
          .select('id, mentor_id, status, created_at')
          .eq('mentee_id', menteeDetails.id);

        if (requestsError) {
          console.error('Error fetching requests:', requestsError);
          return;
        }

        // For each request, fetch the mentor's details using the mentor_id
        const updatedRequests = await Promise.all(
          requestsData.map(async (request) => {
            const { data: mentorData, error: mentorError } = await supabase
              .from('mentors')
              .select('full_name')
              .eq('id', request.mentor_id)
              .single();

            if (mentorError) {
              console.error('Error fetching mentor details:', mentorError);
              return request; // If error, return request with missing mentor info
            }

            // Add the full_name of the mentor to the request
            return { ...request, mentorName: mentorData.full_name, mentorId: request.mentor_id };
          })
        );

        setRequests(updatedRequests);
      } catch (error) {
        console.error('Unexpected error while fetching requests:', error);
      }
    };

    if (menteeDetails) {
      fetchRequests();
    }
  }, [menteeDetails]); // Fetch requests whenever menteeDetails changes

  const cancelRequest = async (id) => {
    try {
      const requestToCancel = requests.find((request) => request.id === id);
      
      // Check if the request can be cancelled
      if (requestToCancel) {
        if (requestToCancel.status === 'Pending') {
          // First, delete the request from the table
          const { error: deleteError } = await supabase
            .from('connection_requests')
            .delete()
            .eq('id', id);
  
          if (deleteError) {
            console.error('Error deleting request:', deleteError);
            return;
          }
  
          // Then, update the state to remove the request from the list
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
          );
        } else {
          console.log('Cannot cancel request. Current status:', requestToCancel.status);
        }
      }
    } catch (error) {
      console.error('Unexpected error while cancelling request:', error);
    }
  };

  if (!user) {
    return null;
  }

  const userId = user.id;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold mb-4">My Requests</h1>
      <p className="mb-6">
        Track your mentorship requests sent to mentors. Manage pending requests.
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
                <p className="text-sm text-gray-500">Date: {formatDate(request.created_at)}</p>
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
              {request.status === 'Pending' && (
                <button
                  onClick={() => cancelRequest(request.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Request
                </button>
              )}
              <a
                href={`/menteeDashboard/${userId}/screens/FullProfile?id=${request.mentorId}`} // Assuming the mentor's profile is at /mentor-profile/{mentorId}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Profile
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
