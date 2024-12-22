import React from "react";

const DashboardPage = ({ user, mentorDetails }) => {
  if (!user || !mentorDetails) {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-gray-600">Loading mentor details...</p>
      </div>
    );
  }

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to the your Dashboard
      </h1>

      {/* Mentor Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={mentorDetails.profile_image_url} // Use dynamic image URL
            alt="Mentor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mentor Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800">{mentorDetails.full_name}</h2>
          <p className="text-lg text-gray-600 mb-4">{mentorDetails.job_title}</p>

          <p className="text-gray-700 mb-4">
            {mentorDetails.reason_for_mentorship} {/* Description of the mentor */}
          </p>

          {/* Contact Information */}
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">
              <strong>Email: </strong>{user.email}
            </p>
            {/* Add other contact details if available */}
          </div>

          {/* Social Links */}
          <div className="mt-4 space-x-4">
            <a
              href={`https://linkedin.com/in/${mentorDetails.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/${mentorDetails.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Twitter
            </a>
            {/* Add other links here if available */}
          </div>
        </div>
      </div>

      {/* Mentor Detailed Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mentor Details</h3>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Skills</h4>
          <ul className="list-disc pl-6 space-y-2">
            {mentorDetails.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Qualifications</h4>
          <ul className="list-disc pl-6 space-y-2">
            {mentorDetails.qualifications.map((qualification, index) => (
              <li key={index} className="text-gray-600">{qualification}</li>
            ))}
          </ul>
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Expertise</h4>
          <p className="text-gray-600">
            {mentorDetails.expertise}
          </p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Location</h4>
          <p className="text-gray-600">{mentorDetails.location}</p>
        </div>

        {/* Mentoring Method */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Mentoring Method</h4>
          <p className="text-gray-600">
            {mentorDetails.mentoring_method}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
