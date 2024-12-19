'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaStar, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function FullProfile() {
  const searchParams = useSearchParams()
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const data = {
      name: searchParams.get('name'),
      expertise: searchParams.get('expertise'),
      bio: searchParams.get('bio'),
      rating: searchParams.get('rating'),
      available: searchParams.get('available'),
      skills: JSON.parse(searchParams.get('skills') || '[]'),
      socialLinks: JSON.parse(searchParams.get('socialLinks') || '[]')
    }
    setProfileData(data)
  }, [searchParams])

  if (!profileData) {
    return (
      <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${profileData.name}`}
                alt={profileData.name}
                className="w-full h-64 object-cover md:h-full"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {profileData.expertise}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {profileData.name}
              </h1>
              <div className="mt-2 flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-600">{profileData.rating}</span>
              </div>
              <p className="mt-4 text-lg text-gray-500">{profileData.bio}</p>
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Availability</h2>
                <p className="mt-1 text-gray-500">{profileData.available}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Skills</h2>
                <div className="mt-2 flex flex-wrap">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="mr-2 mb-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Connect</h2>
                <div className="mt-2 flex space-x-4">
                  {profileData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {link.name === 'LinkedIn' ? (
                        <FaLinkedin className="h-6 w-6" />
                      ) : (
                        <FaTwitter className="h-6 w-6" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

