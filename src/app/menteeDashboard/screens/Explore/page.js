'use client'

import { useState } from "react";
import { FaStar, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";

const mentors = [
  { 
    id: 1, 
    name: "John Doe", 
    expertise: "Data Science", 
    bio: "Experienced data scientist with a passion for mentoring and building AI solutions.", 
    rating: 4.5, 
    available: "Mondays and Fridays, 5 PM - 7 PM",
    skills: ["Machine Learning", "Python", "Data Analysis", "AI", "Statistics"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/johndoe" },
      { name: "Twitter", url: "https://twitter.com/johndoe" }
    ]
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    expertise: "Leadership", 
    bio: "Leadership coach with over 10 years of experience helping individuals and organizations grow.", 
    rating: 4.8, 
    available: "Tuesdays, 3 PM - 5 PM",
    skills: ["Team Building", "Conflict Resolution", "Public Speaking", "Coaching"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/janesmith" },
      { name: "Twitter", url: "https://twitter.com/janesmith" }
    ]
  },
  { 
    id: 3, 
    name: "Alice Johnson", 
    expertise: "Career Development", 
    bio: "Helping individuals unlock their career potential and achieve professional success.", 
    rating: 4.7, 
    available: "Wednesdays, 10 AM - 12 PM",
    skills: ["Resume Building", "Interview Coaching", "Networking", "Career Planning"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/alicejohnson" },
      { name: "Twitter", url: "https://twitter.com/alicejohnson" }
    ]
  },
  { 
    id: 4, 
    name: "Bob Brown", 
    expertise: "Marketing", 
    bio: "Expert in digital marketing strategies, SEO, and brand development.", 
    rating: 4.6, 
    available: "Thursdays, 1 PM - 3 PM",
    skills: ["SEO", "Content Marketing", "Brand Strategy", "Digital Advertising"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/bobbrown" },
      { name: "Twitter", url: "https://twitter.com/bobbrown" }
    ]
  },
  { 
    id: 5, 
    name: "Sarah Lee", 
    expertise: "Project Management", 
    bio: "Certified Project Manager with a passion for delivering high-quality results on time and within budget.", 
    rating: 4.9, 
    available: "Fridays, 9 AM - 11 AM",
    skills: ["Agile", "Scrum", "Project Planning", "Risk Management", "Time Management"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/sarahlee" },
      { name: "Twitter", url: "https://twitter.com/sarahlee" }
    ]
  },
  { 
    id: 6, 
    name: "Michael Green", 
    expertise: "Software Development", 
    bio: "Full-stack developer with experience in building scalable and efficient applications.", 
    rating: 4.4, 
    available: "Saturdays, 4 PM - 6 PM",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "API Development"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/michaelgreen" },
      { name: "Twitter", url: "https://twitter.com/michaelgreen" }
    ]
  },
  { 
    id: 7, 
    name: "David White", 
    expertise: "Time Management", 
    bio: "Helping professionals maximize their productivity with effective time management strategies.", 
    rating: 4.2, 
    available: "Mondays, 2 PM - 4 PM",
    skills: ["Prioritization", "Scheduling", "Task Management", "Productivity Tools"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/davidwhite" },
      { name: "Twitter", url: "https://twitter.com/davidwhite" }
    ]
  },
  { 
    id: 8, 
    name: "Emma Taylor", 
    expertise: "Finance", 
    bio: "Financial advisor with over 15 years of experience in personal finance and investment strategies.", 
    rating: 4.7, 
    available: "Tuesdays, 12 PM - 2 PM",
    skills: ["Investing", "Financial Planning", "Retirement Planning", "Tax Strategies"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/emmataylor" },
      { name: "Twitter", url: "https://twitter.com/emmataylor" }
    ]
  },
  { 
    id: 9, 
    name: "Tom Harris", 
    expertise: "Entrepreneurship", 
    bio: "Serial entrepreneur with expertise in launching and scaling startups.", 
    rating: 4.3, 
    available: "Wednesdays, 6 PM - 8 PM",
    skills: ["Business Strategy", "Startup Funding", "Scaling Businesses", "Pitching Investors"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/tomharris" },
      { name: "Twitter", url: "https://twitter.com/tomharris" }
    ]
  },
  { 
    id: 10, 
    name: "Olivia Clark", 
    expertise: "Product Management", 
    bio: "Helping product teams define, build, and launch successful products in competitive markets.", 
    rating: 4.5, 
    available: "Thursdays, 10 AM - 12 PM",
    skills: ["Product Strategy", "Market Research", "User Experience", "Product Launches"],
    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/oliviaclark" },
      { name: "Twitter", url: "https://twitter.com/oliviaclark" }
    ]
  }
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const router = useRouter();

  const handleViewProfile = (mentor) => {
    router.push(
      `/mentorDashboard/screens/FullProfile?name=${encodeURIComponent(mentor.name)}&expertise=${encodeURIComponent(mentor.expertise)}&bio=${encodeURIComponent(mentor.bio)}&rating=${encodeURIComponent(mentor.rating)}&available=${encodeURIComponent(mentor.available)}&skills=${encodeURIComponent(JSON.stringify(mentor.skills))}&socialLinks=${encodeURIComponent(JSON.stringify(mentor.socialLinks))}`
    );
  };

  const filteredMentors = mentors
    .filter(mentor =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterExpertise ? mentor.expertise === filterExpertise : true) &&
      (filterAvailability ? mentor.available.includes(filterAvailability) : true)
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "availability") {
        return a.available.localeCompare(b.available);
      }
      return 0;
    });

    return (
        <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-primary">Explore Mentors</h1>
    
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                placeholder="Search for mentors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="p-2 border border-gray-300 rounded"
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
              >
                <option value="">Filter by Expertise</option>
                {/* Filter options */}
              </select>
    
              <select
                className="p-2 border border-gray-300 rounded"
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
              >
                <option value="">Filter by Availability</option>
                <option value="AM">Available in AM</option>
                <option value="PM">Available in PM</option>
              </select>
    
              <select
                className="p-2 border border-gray-300 rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Sort by Rating</option>
                <option value="availability">Sort by Availability</option>
              </select>
            </div>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map(mentor => (
                <div key={mentor.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col h-full">
                  <img
                    src={`https://via.placeholder.com/150?text=${mentor.name[0]}`}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-semibold text-primary">{mentor.name}</h2>
                  <p className="text-gray-500">{mentor.expertise}</p>
                  <p className="text-gray-700 mt-2 flex-grow">{mentor.bio}</p>
                  <div className="flex items-center mt-2">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 text-primary">{mentor.rating}</span>
                  </div>
                  <p className="text-gray-500 mt-2">Available: {mentor.available}</p>
    
                  {/* Skills Section */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-200 text-primary px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
    
                  {/* Social Links */}
                  <div className="mt-4 flex space-x-4">
                    {mentor.socialLinks.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-600">
                        {link.name === "LinkedIn" ? <FaLinkedin /> : <FaTwitter />}
                      </a>
                    ))}
                  </div>
    
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleViewProfile(mentor)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-primary border:bg-blue-600"
                    >
                      View Profile
                    </button>
                    <button className="text-primary hover:underline">
                      Request Mentorship
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Explore;
