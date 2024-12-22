'use client'

import { useState, useRef } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import PhoneInput from 'react-phone-input-2'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import 'react-phone-input-2/lib/style.css'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { supabase } from '../../lib/supabase-client'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function MenteeOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    skills: [],
    profileImage: null,
  })
  const [loading, setLoading] = useState(false)
  const questionRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] })
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }))
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

  const removeItem = (name, index) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index)
    }))
  }

  const handleNavigation = (direction) => {
    if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    } else if (direction === 'next' && currentStep < windows.length - 1) {
      setCurrentStep(prev => prev + 1)
    }

    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const validateForm = () => {
    const requiredFields = ['fullName', 'age', 'location', 'currentStatus', 'reasonForMentorship']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return false
    }
    return true
  }

  const uploadProfileImage = async (menteeId, file) => {
    const fileName = `profileImages/mentee/${menteeId}_${file.name}`
  
    const { data, error } = await supabase.storage
      .from('profileImages')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })
  
    if (error) {
      throw new Error(`Image upload failed: ${error.message}`)
    }
  
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from('profileImages')
      .getPublicUrl(fileName)
  
    if (urlError) {
      throw new Error(`Failed to get image URL: ${urlError.message}`)
    }
  
    return publicUrlData.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const { data: user, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('Error fetching user:', userError?.message || 'User not logged in')
        alert('You need to be logged in to submit this form.')
        return
      }

      console.log("User session data:", user)

      const { data: menteeData, error: insertError } = await supabase.from('mentees').insert({
        user_id: user.user.id,
        full_name: formData.fullName,
        age: parseInt(formData.age, 10),
        location: formData.location,
        phone: formData.phone,
        fields_of_interest: formData.fieldsOfInterest,
        skills: formData.skills.map(tag => tag.text),
        current_status: formData.currentStatus,
        reason_for_mentorship: formData.reasonForMentorship,
        specific_goals: formData.specificGoals,
        areas_of_guidance: formData.areasOfGuidance,
        preferred_mentorship_style: formData.preferredMentorshipStyle,
        availability: parseInt(formData.availability, 10),
        preferred_meeting_times: formData.preferredMeetingTimes,
      }).select()

      if (insertError) {
        console.error('Error inserting data:', insertError.message)
        alert('Error saving your details. Please try again.')
        return
      }

      const menteeId = menteeData[0].id
      console.log('Mentee ID:', menteeId)

      let profileImageUrl = null

      if (formData.profileImage) {
        profileImageUrl = await uploadProfileImage(menteeId, formData.profileImage)
        console.log('Profile Image URL:', profileImageUrl)
      }

      if (profileImageUrl) {
        const { error: updateError } = await supabase
          .from('mentees')
          .update({ profile_image_url: profileImageUrl })
          .eq('id', menteeId)

        if (updateError) {
          console.error('Error updating profile image URL:', updateError.message)
          alert('Error saving your profile image. Please try again.')
        }
      }

      alert('Your details have been successfully saved!')

    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          <MultipleSelect
            label="Fields of Interest"
            name="fieldsOfInterest"
            options={['Data Science', 'Marketing', 'Software Development', 'Entrepreneurship', 'Finance', 'Human Resources']}
            values={formData.fieldsOfInterest || []}
            onChange={(value) => handleMultipleInputs('fieldsOfInterest', value)}
            onRemove={(index) => removeItem('fieldsOfInterest', index)}
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
          <Select
            label="Current Status"
            name="currentStatus"
            options={['Student', 'Recent graduate', 'Entry-level professional', 'Mid-career professional']}
            value={formData.currentStatus || ''}
            onChange={handleInputChange}
            required
          />
          <TextArea
            label="Reason for Seeking Mentorship"
            name="reasonForMentorship"
            value={formData.reasonForMentorship || ''}
            onChange={handleInputChange}
            required
          />
          <TextArea
            label="Specific Goals"
            name="specificGoals"
            value={formData.specificGoals || ''}
            onChange={handleInputChange}
          />
          <MultipleSelect
            label="Preferred Areas of Guidance"
            name="areasOfGuidance"
            options={['Career planning', 'Resume building', 'Technical skills', 'Communication skills']}
            values={formData.areasOfGuidance || []}
            onChange={(value) => handleMultipleInputs('areasOfGuidance', value)}
            onRemove={(index) => removeItem('areasOfGuidance', index)}
          />
        </div>
      )
    },
    // Final Steps
    {
      title: "Final Steps",
      content: (
        <div className="space-y-4">
          <Select
            label="Preferred Mentorship Style"
            name="preferredMentorshipStyle"
            options={['Structured guidance', 'Casual advice', 'Hands-on help with projects']}
            value={formData.preferredMentorshipStyle || ''}
            onChange={handleInputChange}
          />
          <Input
            label="Availability (hours per week)"
            name="availability"
            type="number"
            value={formData.availability || ''}
            onChange={handleInputChange}
          />
          <MultipleSelect
            label="Preferred Meeting Times"
            name="preferredMeetingTimes"
            options={['Weekdays', 'Weekends', 'Mornings', 'Evenings']}
            values={formData.preferredMeetingTimes || []}
            onChange={(value) => handleMultipleInputs('preferredMeetingTimes', value)}
            onRemove={(index) => removeItem('preferredMeetingTimes', index)}
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
            <div className="mb-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-gray-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-black">
                      {Math.round(((currentStep + 1) / windows.length) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div style={{ width: `${((currentStep + 1) / windows.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"></div>
                </div>
              </div>
            </div>
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
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Complete Onboarding'}
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

function Select({ label, name, options, value, onChange, required = false }) {
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
        required={required}
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

function TextArea({ label, name, value, onChange, required = false }) {
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
        required={required}
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