import React, { useState } from 'react';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: '',
    age: '',
    contactNumber: '',
    location: '',
    qualifications: [],
    skills: [],
    areasOfExpertise: [],
    currentRole: '',
    yearsOfExperience: '',
    industry: '',
    mentorshipGoals: '',
    socialLinks: {
      linkedin: '',
      instagram: '',
      twitter: '',
      additional: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [name]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <section>
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="contactNumber"
            value={profileData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered w-full"
          />
        </div>
      </section>

      {/* Qualifications */}
      <section>
        <h2 className="text-2xl font-semibold">Qualifications</h2>
        <input
          type="text"
          name="qualification"
          onChange={(e) => setProfileData({ ...profileData, qualifications: [...profileData.qualifications, e.target.value] })}
          placeholder="Add a qualification"
          className="input input-bordered w-full"
        />
        <ul className="mt-4">
          {profileData.qualifications.map((qualification, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{qualification}</span>
              <button
                onClick={() => setProfileData({ ...profileData, qualifications: profileData.qualifications.filter((q, i) => i !== index) })}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Areas of Expertise */}
      <section>
        <h2 className="text-2xl font-semibold">Areas of Expertise</h2>
        <input
          type="text"
          name="expertise"
          onChange={(e) => setProfileData({ ...profileData, areasOfExpertise: [...profileData.areasOfExpertise, e.target.value] })}
          placeholder="Add an area of expertise"
          className="input input-bordered w-full"
        />
        <ul className="mt-4">
          {profileData.areasOfExpertise.map((area, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{area}</span>
              <button
                onClick={() => setProfileData({ ...profileData, areasOfExpertise: profileData.areasOfExpertise.filter((a, i) => i !== index) })}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-semibold">Skills</h2>
        <input
          type="text"
          name="skill"
          onChange={(e) => setProfileData({ ...profileData, skills: [...profileData.skills, e.target.value] })}
          placeholder="Add a skill"
          className="input input-bordered w-full"
        />
        <ul className="mt-4">
          {profileData.skills.map((skill, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{skill}</span>
              <button
                onClick={() => setProfileData({ ...profileData, skills: profileData.skills.filter((s, i) => i !== index) })}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Social Profile Links */}
      <section>
        <h2 className="text-2xl font-semibold">Social Profile Links</h2>
        <input
          type="text"
          name="linkedin"
          value={profileData.socialLinks.linkedin}
          onChange={handleSocialLinkChange}
          placeholder="LinkedIn URL"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="instagram"
          value={profileData.socialLinks.instagram}
          onChange={handleSocialLinkChange}
          placeholder="Instagram URL"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="twitter"
          value={profileData.socialLinks.twitter}
          onChange={handleSocialLinkChange}
          placeholder="Twitter URL"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="additional"
          value={profileData.socialLinks.additional}
          onChange={handleSocialLinkChange}
          placeholder="Additional Link"
          className="input input-bordered w-full"
        />
      </section>

      {/* Save Button */}
      <div className="flex justify-center">
        <button className="btn btn-primary mt-6">Save Profile</button>
      </div>
    </div>
  );
}
