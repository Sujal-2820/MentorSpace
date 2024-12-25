'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase-client';

const FullProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menteeId = searchParams.get('menteeId');

  const [profileData, setProfileData] = useState(null);
  
  useEffect(() => {
    if (menteeId) {
      const fetchMenteeDetails = async () => {
        const { data, error } = await supabase
          .from('mentees')
          .select('*')
          .eq('id', menteeId)
          .single();

        if (error) {
          console.error('Error fetching mentee data:', error);
        } else {
          setProfileData(data);
        }
      }

      fetchMenteeDetails();
    }
  }, [menteeId]);

  if (!profileData) {
    return (
      <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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

        <div className="flex items-center mb-4">
          <img 
            src={profileData.profile_image_url} 
            alt={`${profileData.full_name}'s profile`} 
            className="w-40 h-40 rounded-full border-2 border-gray-300 mr-4" // Increased size
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{profileData.full_name}</h3>
            <p className="text-gray-600">{profileData.current_status}</p>
            <p className="text-gray-600">{profileData.location}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Age:</strong>{' '}
            <span className="text-gray-800">{profileData.age}</span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Skills:</strong>{' '}
            <span className="text-gray-800">
              {profileData.skills && profileData.skills.length > 0 ? profileData.skills.join(', ') : 'Not Provided'}
            </span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Fields of Interest:</strong>{' '}
            <span className="text-gray-800">
              {profileData.fields_of_interest && profileData.fields_of_interest.length > 0 ? profileData.fields_of_interest.join(', ') : 'Not Provided'}
            </span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Reason for Mentorship:</strong>{' '}
            <span className="text-gray-800">{profileData.reason_for_mentorship}</span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Specific Goals:</strong>{' '}
            <span className="text-gray-800">{profileData.specific_goals}</span>
          </p>

          <p className="text-lg bg-gray-100 p- 2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Availability:</strong>{' '}
            <span className="text-gray-800">{profileData.availability} hrs/week</span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">Contact Information:</strong>{' '}
            <span className="text-gray-800">{profileData.contact_information || 'Not Provided'}</span>
          </p>

          <p className="text-lg bg-gray-100 p-2 rounded transition-transform duration-200 hover:scale-105">
            <strong className="text-gray-600">LinkedIn Profile:</strong>{' '}
            <span className="text-gray-800">{profileData.linkedin_url || 'Not Provided'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;