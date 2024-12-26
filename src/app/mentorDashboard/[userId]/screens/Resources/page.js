//src\app\mentorDashboard\[userId]\screens\Resources\page.js

'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase-client'; // Update with your Supabase client import
import { useMentorDashboard } from '../../MentorDashboardContext';

export default function Resources() {
  const [showForm, setShowForm] = useState(false);
  const [resourceRequests, setResourceRequests] = useState([]);
  const [uploadedResources, setUploadedResources] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [newResource, setNewResource] = useState({ title: '', description: '', file: null });
  const [error, setError] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const { mentorDetails } = useMentorDashboard(); // Assuming menteeDetails includes mentee_id
  const mentorId = mentorDetails?.id;

   // File type and size validation
   const allowedFileTypes = [
    '.pdf', '.doc', '.docx', '.docm', '.dotx', 
    '.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', 
    '.svg', '.webp', '.heif', '.psd', '.raw', '.ai', '.eps',
    '.xlsx', '.xls', '.xlsb', '.xlsm', '.pptx', '.pptm', '.potx', '.ppsx'
  ];
  const maxSize = 8 * 1024 * 1024; // 8 MB

  const validateFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileSize = file.size;

    if (!allowedFileTypes.some((ext) => fileExtension === ext.slice(1))) {
      setError('Invalid file type. Allowed types: .pdf, .doc, .docx, .jpg, .png, .xlsx, .pptx, and more.');
      return false;
    }
    if (fileSize > maxSize) {
      setError('File size exceeds the 8 MB limit.');
      return false;
    }
    setError('');
    return true;
  };

  useEffect(() => {
    const fetchRequestsAndResources = async () => {
      try {
        // Fetch resource requests from the database
        const { data: requests, error: requestsError } = await supabase
          .from('resource_requests')
          .select('*, mentees(full_name), status')  // Include status in the query
          .eq('mentor_id', mentorId);
  
        if (requestsError) {
          return;
        } else {
          // Filter out requests with 'Responded' status
          const filteredRequests = requests.filter(request => request.status !== 'Responded');
  
          // Map the mentee's name into the requests
          const enrichedRequests = filteredRequests.map((request) => ({
            ...request,
            mentee_name: request.mentees?.full_name || 'Unknown',
          }));
  
          setResourceRequests(enrichedRequests || []);
        }
  
        // Fetch uploaded resources
        const { data: resources, error: resourcesError } = await supabase
          .from('resources')
          .select('*')
          .eq('mentor_id', mentorId);
  
        if (resourcesError) {
          return;
        } else {
          setUploadedResources(resources || []);
        }
      } catch (err) {
        console.error("Unexpected error occurred during data fetch:", err);
      }
    };
  
    fetchRequestsAndResources();
  }, [mentorId]);  // Run this useEffect whenever mentorId changes
  

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!newResource.file || !selectedMentee) {
      alert('Please select a mentee and upload a file.');
      return;
    }

    // Validate file
    if (!validateFile(newResource.file)) {
      return;
    }

    const fileName = `${newResource.file.name}`;
    const filePath = `${mentorId}/${fileName}`;

    // Upload the file to storage
    const { data, error: uploadError } = await supabase.storage
      .from('resources')
      .upload(filePath, newResource.file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError.message);
      alert('Error uploading file');
      return;
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from('resources')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Error fetching public URL:', urlError.message);
      alert('Error fetching file URL');
      return;
    }

    const publicURL = publicUrlData.publicUrl; // Ensure we are using the correct public URL

    // Insert the resource into the 'resources' table
    const { error: insertError } = await supabase.from('resources').insert({
      mentor_id: mentorId,
      mentee_id: selectedMentee,
      resource_url: publicURL,
      title: newResource.title,
      description: newResource.description,
    });

    if (insertError) {
      console.error('Error saving resource:', insertError.message);
      alert('Error saving resource');
      return;
    }

    console.log('Resource saved successfully.');
    alert('Resource uploaded successfully!');

    // Update the status in the 'resource_requests' table using the request ID
    const { error: updateError } = await supabase
      .from('resource_requests')
      .update({ status: 'Responded' })
      .eq('mentor_id', mentorId)
      .eq('id', selectedRequestId)
      .eq('status', 'Pending');

    if (updateError) {
      console.error('Error updating resource request status:', updateError.message);
    } else {
      console.log('Resource request status updated to "Responded".');
    }

    // Reset form state
    setShowForm(false);
    setNewResource({ title: '', description: '', file: null });
    setSelectedMentee(null);
};




  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 p-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
      <p className="mt-4 text-gray-600">
        Manage your uploaded resources and respond to mentee requests.
      </p>

      {/* Pending Requests Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Resource Requests</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Mentee Name</th>
              <th className="border-b py-2 px-4">Request Description</th>
              <th className="border-b py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {resourceRequests.map((request) => (
              <tr key={request.id}>
                <td className="border-b py-2 px-4">{request.mentee_name}</td>
                <td className="border-b py-2 px-4">{request.resource_details}</td>
                <td className="border-b py-2 px-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                      setSelectedMentee(request.mentee_id);
                      setSelectedRequestId(request.id);  // Set selectedRequestId here
                      setShowForm(true);
                    }}
                  >
                    Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form
          onSubmit={handleFileUpload}
          className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add New Resource for Mentee
          </h2>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Resource Title</label>
            <input
              type="text"
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Upload File</label>
            <input
              type="file"
              onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
              required
              className="w-full mt-2 p-3 border rounded-lg"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Upload Resource
            </button>
          </div>
        </form>
      )}

      {/* Uploaded Resources Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedResources.map((resource) => (
            <div key={resource.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700">{resource.title}</h3>
              <p className="mt-2 text-gray-600">{resource.description}</p>
              <a
                href={resource.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-4 block"
              >
                Download Resource
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
