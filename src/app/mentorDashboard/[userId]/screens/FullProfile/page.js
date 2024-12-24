'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import LinkedIn and GitHub icons

const FullProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const skills = searchParams.get('skills')?.split(',');
  const purpose = searchParams.get('purpose');
  const socialLinks = JSON.parse(searchParams.get('socialLinks'));

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 px-4 py-6">
      <button
        onClick={() => router.back()}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mb-6 hover:bg-gray-400 transition-all"
      >
        Go Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Full Profile</h2>

        <div className="space-y-4">
          <p className="text-lg">
            <strong className="text-gray-600">Name:</strong>{' '}
            <span className="text-gray-800">{name}</span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-600">Email:</strong>{' '}
            <span className="text-gray-800">{email}</span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-600">Skills:</strong>{' '}
            <span className="text-gray-800">
              {skills && skills.length > 0 ? skills.join(', ') : 'Not Provided'}
            </span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-600">Purpose:</strong>{' '}
            <span className="text-gray-800">{purpose}</span>
          </p>

          <div>
            <strong className="text-gray-600">Social Links:</strong>
            <ul className="list-disc pl-8 mt-2 space-y-1">
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {link.name.toLowerCase() === 'linkedin' && (
                      <FaLinkedin className="text-blue-500" size={20} />
                    )}
                    {link.name.toLowerCase() === 'github' && (
                      <FaGithub className="text-gray-800" size={20} />
                    )}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-800 mt-2">No Social Links Provided</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
