'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { WithContext as ReactTags } from 'react-tag-input'

const areasOfExpertise = [
  'Data Science',
  'Marketing',
  'Software Development',
  'Entrepreneurship',
  'Finance',
  'Human Resources',
  'Design',
  'Project Management',
]

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    image: '/placeholder.svg?height=100&width=100',
    contactNumber: '+1234567890',
    age: '35',
    location: 'New York, USA',
    qualifications: [{ id: 'MBA', text: 'MBA' }, { id: 'BSc', text: 'BSc Computer Science' }],
    areasOfExpertise: ['Software Development', 'Entrepreneurship'],
    skills: [{ id: 'React', text: 'React' }, { id: 'Node.js', text: 'Node.js' }],
    currentRole: 'Senior Software Engineer',
    yearsOfExperience: '10',
    industry: 'Technology',
    targetAudience: 'Early-career professionals',
    mentorshipStyle: 'Goal-focused mentoring',
    availabilityHours: '5',
    availabilityFrequency: 'per week',
    preferredMeetingType: 'Virtual',
    expectedSalaryRange: '$100 - $150 per hour',
    reasonForMentorship: 'To give back to the community and develop leadership skills',
    expectedOutcomes: 'Help mentees advance in their careers and develop technical skills',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      instagram: 'https://instagram.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      additional: 'https://johndoe.com',
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (value) => {
    setProfile((prev) => ({ ...prev, contactNumber: value }))
  }

  const handleTagsChange = (tags, field) => {
    setProfile((prev) => ({ ...prev, [field]: tags }))
  }

  const handleAreasOfExpertiseChange = (value) => {
    setProfile((prev) => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.includes(value)
        ? prev.areasOfExpertise.filter((area) => area !== value)
        : [...prev.areasOfExpertise, value],
    }))
  }

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={profile.image} alt="Profile" className="h-20 w-20 rounded-full" />
            <Button>Upload New Image</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={profile.fullName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" value={profile.age} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <PhoneInput
                country={'us'}
                value={profile.contactNumber}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%' }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={profile.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Qualifications</Label>
            <ReactTags
              tags={profile.qualifications}
              handleDelete={(i) => handleTagsChange(profile.qualifications.filter((_, index) => index !== i), 'qualifications')}
              handleAddition={(tag) => handleTagsChange([...profile.qualifications, tag], 'qualifications')}
              delimiters={[188, 13]}
            />
          </div>
          <div className="space-y-2">
            <Label>Areas of Expertise</Label>
            <div className="flex flex-wrap gap-2">
              {areasOfExpertise.map((area) => (
                <Badge
                  key={area}
                  variant={profile.areasOfExpertise.includes(area) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleAreasOfExpertiseChange(area)}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Skills</Label>
            <ReactTags
              tags={profile.skills}
              handleDelete={(i) => handleTagsChange(profile.skills.filter((_, index) => index !== i), 'skills')}
              handleAddition={(tag) => handleTagsChange([...profile.skills, tag], 'skills')}
              delimiters={[188, 13]}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role</Label>
              <Input id="currentRole" name="currentRole" value={profile.currentRole} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input id="yearsOfExperience" name="yearsOfExperience" value={profile.yearsOfExperience} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" name="industry" value={profile.industry} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input id="targetAudience" name="targetAudience" value={profile.targetAudience} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentorshipStyle">Mentorship Style</Label>
            <Input id="mentorshipStyle" name="mentorshipStyle" value={profile.mentorshipStyle} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="availabilityHours">Availability</Label>
              <Input id="availabilityHours" name="availabilityHours" value={profile.availabilityHours} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availabilityFrequency">Frequency</Label>
              <Select name="availabilityFrequency" value={profile.availabilityFrequency} onValueChange={(value) => handleInputChange({ target: { name: 'availabilityFrequency', value } })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per week">per week</SelectItem>
                  <SelectItem value="per month">per month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredMeetingType">Preferred Meeting Type</Label>
              <Select name="preferredMeetingType" value={profile.preferredMeetingType} onValueChange={(value) => handleInputChange({ target: { name: 'preferredMeetingType', value } })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                  <SelectItem value="In-person">In-person</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedSalaryRange">Expected Salary Range</Label>
            <Input id="expectedSalaryRange" name="expectedSalaryRange" value={profile.expectedSalaryRange} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reasonForMentorship">Reason for Mentorship</Label>
            <Textarea id="reasonForMentorship" name="reasonForMentorship" value={profile.reasonForMentorship} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedOutcomes">Expected Outcomes</Label>
            <Textarea id="expectedOutcomes" name="expectedOutcomes" value={profile.expectedOutcomes} onChange={handleInputChange} />
          </div>
          <div className="space-y-4">
            <Label>Social Profile Links</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" name="linkedin" value={profile.socialLinks.linkedin} onChange={handleSocialLinkChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" name="instagram" value={profile.socialLinks.instagram} onChange={handleSocialLinkChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" value={profile.socialLinks.twitter} onChange={handleSocialLinkChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional">Additional Link</Label>
                <Input id="additional" name="additional" value={profile.socialLinks.additional} onChange={handleSocialLinkChange} />
              </div>
            </div>
          </div>
          <Button className="w-full">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}