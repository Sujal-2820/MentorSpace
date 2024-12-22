'use client'

import { useState, useRef } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import PhoneInput from 'react-phone-input-2'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import 'react-phone-input-2/lib/style.css'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/navigation'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function MentorOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    qualifications: [],
    skills: [],
    profileImage: null, // Make sure to store the image file here
  })
  const [loading, setLoading] = useState(false)  // Add loading state for submission
  const questionRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleTagChange = (name) => (tags) => {
    setFormData(prevData => ({ ...prevData, [name]: tags }))
  }

  const handleMultipleInputs = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: [...(prevData[name] || []), value]
    }))
  }

  const uploadProfileImage = async (mentorId, file) => {
    const fileName = `profileImages/mentor/${mentorId}_${file.name}`;
  
    // Upload the image file
    const { data, error } = await supabase.storage
      .from('profileImages')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
  
    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  
    // Get the public URL of the uploaded image
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from('profileImages')
      .getPublicUrl(fileName);
  
    if (urlError) {
      throw new Error(`Failed to get image URL: ${urlError.message}`);
    }
  
    // Return the public URL
    return publicUrlData.publicUrl;
  };
  
  

  const removeItem = (name, index) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index)
    }))
  }

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentStep < windows.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }

    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
  
      if (userError || !user) {
        console.error('Error fetching user:', userError?.message || 'User not logged in');
        alert('You need to be logged in to submit this form.');
        return;
      }
  
      console.log("User session data:", user);
  
      const { data: mentorData, error: insertError } = await supabase.from('mentors').insert({
        user_id: user.user.id,
        full_name: formData.fullName,
        qualifications: formData.qualifications.map(tag => tag.text),
        skills: formData.skills.map(tag => tag.text),
        areas_of_expertise: formData.areasOfExpertise,
        job_title: formData.jobTitle,
        years_of_experience: parseInt(formData.yearsOfExperience, 10),
        industry: formData.industry,
        target_audience: formData.targetAudience,
        mentorship_style: formData.mentorshipStyle,
        availability: parseInt(formData.availability, 10),
        meeting_format: formData.meetingFormat,
        expected_salary_range: formData.salaryRange,
        expected_outcomes: formData.expectedOutcomes,
        reason_for_mentorship: formData.reasonForMentorship,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        other_link: formData.otherLink,
      }).select();
  
      if (insertError) {
        console.error('Error inserting data:', insertError.message);
        alert('Error saving your details. Please try again.');
        return;
      }
  
      const mentorId = mentorData[0].id;
      console.log('Mentor ID:', mentorId);
  
      let profileImageUrl = null;
  
      if (formData.profileImage) {
        profileImageUrl = await uploadProfileImage(mentorId, formData.profileImage);
        console.log('Profile Image URL:', profileImageUrl);
      }
  
      if (profileImageUrl) {
        const { error: updateError } = await supabase
          .from('mentors')
          .update({ profile_image_url: profileImageUrl })
          .eq('id', mentorId);
  
        if (updateError) {
          console.error('Error updating profile image URL:', updateError.message);
          alert('Error saving your profile image. Please try again.');
        }
      }
  
      alert('Your details have been successfully saved!');
      router.push('/mentorDashboard');
  
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  


  const windows = [
    // Basic Information
    {
      title: "Basic Information",
      content: (
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleInputChange}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input 
              type="file" 
              name="profileImage" 
              accept="image/*" 
              className="w-full" 
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <PhoneInput
              country={'us'}
              value={formData.phone || ''}
              onChange={(phone) => setFormData(prevData => ({ ...prevData, phone }))}
              inputStyle={{
                width: '100%',
                height: '2.5rem',
                fontSize: '1rem',
                paddingLeft: '3rem',
              }}
              dropdownStyle={{
                width: 'max-content',
              }}
            />
          </div>
          <Input
            label="Age"
            name="age"
            type="number"
            value={formData.age || ''}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Location (City, Country)"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Qualifications</label>
            <ReactTags
              tags={formData.qualifications}
              handleDelete={(i) => handleTagChange('qualifications')(formData.qualifications.filter((tag, index) => index !== i))}
              handleAddition={(tag) => handleTagChange('qualifications')([...formData.qualifications, tag])}
              delimiters={delimiters}
              placeholder="Add qualifications"
              classNames={{
                tags: 'react-tags__tags',
                tagInput: 'react-tags__tagInput',
                tagInputField: 'react-tags__tagInputField w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary',
                selected: 'react-tags__selected',
                tag: 'react-tags__tag bg-primary text-black px-2 py-1 rounded-full text-sm mr-2 mb-2',
                remove: 'react-tags__remove bg-primary text-black ml-2 hover:text-red-500 cursor-pointer border border-gray-400',
              }}
            />
          </div>
          <MultipleSelect
            label="Areas of Expertise"
            name="areasOfExpertise"
            options={['Data Science', 'Marketing', 'Software Development', 'Entrepreneurship', 'Finance', 'Human Resources']}
            values={formData.areasOfExpertise || []}
            onChange={(value) => handleMultipleInputs('areasOfExpertise', value)}
            onRemove={(index) => removeItem('areasOfExpertise', index)}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Skills</label>
            <ReactTags
              tags={formData.skills}
              handleDelete={(i) => handleTagChange('skills')(formData.skills.filter((tag, index) => index !== i))}
              handleAddition={(tag) => handleTagChange('skills')([...formData.skills, tag])}
              delimiters={delimiters}
              placeholder="Add skills"
              classNames={{
                tags: 'react-tags__tags',
                tagInput: 'react-tags__tagInput',
                tagInputField: 'react-tags__tagInputField w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary',
                selected: 'react-tags__selected',
                tag: 'react-tags__tag bg-primary text-black px-2 py-1 rounded-full text-sm mr-2 mb-2',
                remove: 'react-tags__remove ml-2 text-black hover:text-red-200',
              }}
            />
          </div>
        </div>
      )
    },
    // Additional Information
    {
      title: "Additional Information",
      content: (
        <div className="space-y-4">
          <Input
            label="Current Job Title"
            name="jobTitle"
            value={formData.jobTitle || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Industry"
            name="industry"
            value={formData.industry || ''}
            onChange={handleInputChange}
          />
          <Select
            label="Target Audience"
            name="targetAudience"
            options={['Students', 'Early-career professionals', 'Mid-career professionals']}
            value={formData.targetAudience || ''}
            onChange={handleInputChange}
          />
          <Select
            label="Mentorship Style"
            name="mentorshipStyle"
            options={['Structured guidance', 'Casual advice', 'Goal-focused mentoring']}
            value={formData.mentorshipStyle || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Availability (hours per week)"
            name="availability"
            type="number"
            value={formData.availability || ''}
            onChange={handleInputChange}
          />
          <Select
            label="Preferred Meeting Format"
            name="meetingFormat"
            options={['In-person', 'Virtual', 'Both']}
            value={formData.meetingFormat || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Expected Salary Range"
            name="salaryRange"
            value={formData.salaryRange || ''}
            onChange={handleInputChange}
          />
        </div>
      )
    },
    // Final Steps
    {
      title: "Final Steps",
      content: (
        <div className="space-y-4">
          <TextArea
            label="Reason for Mentorship"
            name="reasonForMentorship"
            value={formData.reasonForMentorship || ''}
            onChange={handleInputChange}
          />
          <TextArea
            label="Expected Outcomes"
            name="expectedOutcomes"
            value={formData.expectedOutcomes || ''}
            onChange={handleInputChange}
          />
          <Input
            label="LinkedIn Profile"
            name="linkedin"
            value={formData.linkedin || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Twitter Profile"
            name="twitter"
            value={formData.twitter || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Other Link"
            name="otherLink"
            value={formData.otherLink || ''}
            onChange={handleInputChange}
          />
        </div>
      )
    },
  ]

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to <span className="text-primary">Mentor<span className='text-blue-600'>Space</span></span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We would like to know more about you to provide the best mentorship experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div ref={questionRef}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{windows[currentStep].title}</h3>
              {windows[currentStep].content}
            </div>

            <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleNavigation('prev')}
              disabled={currentStep === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
            {currentStep < windows.length - 1 ? (
              <button
                type="button"
                onClick={() => handleNavigation('next')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Complete Onboarding
              </button>
            )}
          </div>

          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}


  function Input({ label, name, type = 'text', value, onChange, required = false }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
    )
  }
  
  function Select({ label, name, options, value, onChange }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  function TextArea({ label, name, value, onChange }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        ></textarea>
      </div>
    )
  }
  
  function MultipleSelect({ label, name, options, values, onChange, onRemove }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
          name={name}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black mb-2"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {value}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    )
  }