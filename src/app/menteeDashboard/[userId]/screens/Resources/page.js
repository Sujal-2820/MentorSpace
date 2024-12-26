'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase-client'; // Adjust the path based on your file structure
import { useMenteeDashboard } from '../../MenteeDashboardContext';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [connectedMentors, setConnectedMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [newRequest, setNewRequest] = useState('');
  const { menteeDetails } = useMenteeDashboard(); // Assuming menteeDetails includes mentee_id
  const menteeId = menteeDetails?.id;

  // Fetch connected mentors
  useEffect(() => {
    const fetchConnectedMentors = async () => {
      if (!menteeId) return;

      const { data: connectionData, error: connectionError } = await supabase
        .from('connection_requests')
        .select('mentor_id, mentors(full_name, id), status')
        .eq('mentee_id', menteeId)
        .eq('status', 'Accepted'); // Only consider mentors with "Accepted" status

      if (connectionError) {
        console.error('Error fetching connected mentors:', connectionError);
        return;
      }

      const mentors = connectionData.map((connection) => ({
        id: connection.mentors.id,
        name: connection.mentors.full_name,
      }));

      setConnectedMentors(mentors);
    };

    fetchConnectedMentors();
  }, [menteeId]);

  // Fetch shared resources
  useEffect(() => {
    const fetchResources = async () => {
      if (!menteeId) return;

      const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .select('*')
        .in('mentor_id', connectedMentors.map((mentor) => mentor.id)); // Match mentor_id to connected mentors

      if (resourceError) {
        console.error('Error fetching shared resources:', resourceError);
        return;
      }

      setResources(resourceData);
    };

    fetchResources();
  }, [connectedMentors, menteeId]);

  // Fetch resource requests
  useEffect(() => {
    const fetchResourceRequests = async () => {
      if (!menteeId) return;

      const { data: resourceRequests, error: resourceError } = await supabase
        .from('resource_requests')
        .select('*')
        .eq('mentee_id', menteeId);

      if (resourceError) {
        console.error('Error fetching resource requests:', resourceError);
        return;
      }

      setRequests(resourceRequests);
    };

    fetchResourceRequests();
  }, [menteeId]);

  // Handle sending resource request
  const handleRequestResource = async (e) => {
    e.preventDefault();

    if (!selectedMentor || !newRequest) {
      alert('Please select a mentor and describe your request.');
      return;
    }

    const mentor = connectedMentors.find((mentor) => mentor.id === selectedMentor);

    const { error } = await supabase.from('resource_requests').insert({
      mentee_id: menteeId,
      mentor_id: selectedMentor,
      resource_details: newRequest,
      status: 'Pending',
    });

    if (error) {
      console.error('Error sending resource request:', error);
      alert('Failed to send resource request.');
    } else {
      alert('Resource request sent successfully.');
      setRequests([
        ...requests,
        {
          id: Date.now(),
          mentor: mentor.name,
          resource_details: newRequest,
          status: 'Pending',
        },
      ]);

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

      {/* Available Resources */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
        <div className="space-y-4">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <div key={resource.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
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
            ))
          ) : (
            <p className="text-gray-600">No resources available from your mentors.</p>
          )}
        </div>
      </div>

      {/* Request Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Request Resources</h2>
        <form onSubmit={handleRequestResource} className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Mentor</label>
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
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Resource Request</label>
            <input
              type="text"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the resource you need"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
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
              <div key={request.id} className="bg-white p-4 rounded-lg shadow-md">
                <div>
                  <h3 className="text-lg font-semibold">{request.resource_details}</h3>
                  <p className="text-sm text-gray-600">
                    Requested from {request.mentor} - Status: {request.status}
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
