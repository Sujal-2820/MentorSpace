'use client';

import React, { useState } from 'react';

export default function Resources() {
  const [showForm, setShowForm] = useState(false);

  // Sample resources (mock data)
  const sampleResources = [
    {
      id: 1,
      title: 'Effective Communication for Mentors',
      description: 'A guide to improving communication with mentees.',
      fileName: 'communication-guide.pdf',
    },
    {
      id: 2,
      title: 'Time Management Strategies',
      description: 'Best practices for mentors to manage their time effectively.',
      fileName: 'time-management.pptx',
    },
    {
      id: 3,
      title: 'Mentorship Agreement Template',
      description: 'A ready-to-use template for setting mentorship terms.',
      fileName: 'mentorship-agreement.docx',
    },
  ];

  // Toggle the form visibility
  const toggleForm = () => setShowForm(!showForm);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., upload resource details and files)
    alert('Resource uploaded successfully!');
    setShowForm(false);
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 p-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
      <p className="mt-4 text-gray-600">
        Manage your uploaded resources.
      </p>

      {/* Button to Toggle Form */}
      <div className="mt-6">
        <button
          onClick={toggleForm}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel Upload' : 'Upload New Resource'}
        </button>
      </div>

      {/* Form for Adding New Resource */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add New Resource
          </h2>

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 font-medium">
              Resource Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resource title"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter resource description"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-600 font-medium">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              required
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Upload Resource
            </button>
          </div>
        </form>
      )}

      {/* Sample Resources */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">{resource.title}</h3>
              <p className="mt-2 text-gray-600">{resource.description}</p>
              <div className="mt-4">
                <a
                  href={`#${resource.fileName}`} // Replace with actual file URL
                  className="text-blue-600 hover:underline"
                  download
                >
                  {resource.fileName}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
