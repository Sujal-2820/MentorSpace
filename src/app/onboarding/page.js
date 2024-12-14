'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { WithContext as ReactTags } from 'react-tag-input'
import PhoneInput from 'react-phone-input-2'
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react'
import 'react-phone-input-2/lib/style.css'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [role, setRole] = useState(null)
  const [formData, setFormData] = useState({
    qualifications: [],
    skills: [],
  })
  const questionRef = useRef(null)

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole)
    setCurrentStep(1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
    // and then redirect to the dashboard
  }

  const windows = [
    // First Window
    {
      title: "Choose Your Role",
      content: (
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <RoleCard
            title="Register as Mentor"
            description="Share your expertise and guide others"
            onClick={() => handleRoleSelection('mentor')}
          />
          <RoleCard
            title="Register as Mentee"
            description="Find guidance and accelerate your growth"
            onClick={() => handleRoleSelection('mentee')}
          />
        </div>
      )
    },
    // Second Window
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
            <input type="file" accept="image/*" className="w-full" />
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
          {role === 'mentor' && (
            <>
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
            </>
          )}
          {role === 'mentee' && (
            <MultipleSelect
              label="Fields of Interest"
              name="fieldsOfInterest"
              options={['Data Science', 'Marketing', 'Software Development', 'Entrepreneurship', 'Finance', 'Human Resources']}
              values={formData.fieldsOfInterest || []}
              onChange={(value) => handleMultipleInputs('fieldsOfInterest', value)}
              onRemove={(index) => removeItem('fieldsOfInterest', index)}
            />
          )}
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
    // Third Window
    {
      title: "Additional Information",
      content: (
        <div className="space-y-4">
          {role === 'mentor' && (
            <>
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
            </>
          )}
          {role === 'mentee' && (
            <>
              <Select
                label="Current Status"
                name="currentStatus"
                options={['Student', 'Recent graduate', 'Entry-level professional', 'Mid-career professional']}
                value={formData.currentStatus || ''}
                onChange={handleInputChange}
              />
              <TextArea
                label="Reason for Seeking Mentorship"
                name="reasonForMentorship"
                value={formData.reasonForMentorship || ''}
                onChange={handleInputChange}
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
            </>
          )}
        </div>
      )
    },
    // Fourth Window
    {
      title: "Final Steps",
      content: (
        <div className="space-y-4">
          {role === 'mentor' && (
            <>
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
                label="Social Profile Link"
                name="socialProfileLink"
                value={formData.socialProfileLink || ''}
                onChange={handleInputChange}
              />
            </>
          )}
          {role === 'mentee' && (
            <>
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
            </>
          )}
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
          Welcome to MentorMatch
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We would like to know more about you to provide the best mentorship experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
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

function RoleCard({ title, description, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300 w-full md:w-64"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
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