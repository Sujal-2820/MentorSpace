import React from "react";

const DashboardPage = () => {
  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome to the Mentor Dashboard
      </h1>

      {/* Mentor Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src="/path-to-mentor-image.jpg" // Replace with dynamic path to mentor image
            alt="Mentor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mentor Information */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-lg text-gray-600 mb-4">Senior Software Engineer</p>

          <p className="text-gray-700 mb-4">
            Experienced mentor in software development, specializing in web
            technologies, JavaScript, and cloud computing. Passionate about
            guiding the next generation of developers.
          </p>

          {/* Contact Information */}
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">
              <strong>Email: </strong>johndoe@email.com
            </p>
            <p className="text-gray-600">
              <strong>Phone: </strong>(123) 456-7890
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-4 space-x-4">
            <a
              href="https://twitter.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-700"
            >
              GitHub
            </a>
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
            <li className="text-gray-600">JavaScript</li>
            <li className="text-gray-600">React</li>
            <li className="text-gray-600">Node.js</li>
            <li className="text-gray-600">Cloud Computing (AWS, Azure)</li>
            <li className="text-gray-600">Mentoring & Coaching</li>
          </ul>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Qualifications</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-600">B.S. in Computer Science from XYZ University</li>
            <li className="text-gray-600">Certified AWS Solutions Architect</li>
            <li className="text-gray-600">Certified Scrum Master (CSM)</li>
          </ul>
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Expertise</h4>
          <p className="text-gray-600">
            Specializing in full-stack web development, JavaScript frameworks (React,
            Angular), and cloud solutions. Experienced in guiding professionals through
            career development and technical challenges.
          </p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Location</h4>
          <p className="text-gray-600">San Francisco, CA, USA</p>
        </div>

        {/* Mentoring Method */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700">Mentoring Method</h4>
          <p className="text-gray-600">
            John Doe offers a mix of one-on-one sessions, group coaching, and hands-on coding workshops.
            His approach focuses on real-world application, empowering mentees with the skills and
            confidence to thrive in their careers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
