//src\app\menteeDashboard\[userId]\screens\Explore\page.js

'use client';

import { useState, useEffect } from "react";
import { FaStar, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from '../../../../../lib/supabase-client'; // Adjust the path if needed
import { useMenteeDashboard } from '../../MenteeDashboardContext';

const Explore = () => {
  const { user, menteeDetails } = useMenteeDashboard();
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [loadingMentors, setLoadingMentors] = useState({}); // Tracks loading state for each mentor

  const router = useRouter();

  console.log("menteeDetails in explore page: ", menteeDetails);

  // Fetch mentor data from Supabase and filter out already requested mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // Fetch all mentors
        const { data: mentorsData, error: mentorsError } = await supabase
          .from('mentors') // Replace with your actual table name
          .select('*');

        if (mentorsError) {
          console.error('Error fetching mentors:', mentorsError);
          return;
        }

        // Fetch connection requests for the logged-in mentee
        const { data: connectionRequests, error: connectionRequestsError } = await supabase
          .from('connection_requests')
          .select('mentor_id')
          .eq('mentee_id', menteeDetails.id);

        if (connectionRequestsError) {
          console.error('Error fetching connection requests:', connectionRequestsError);
          return;
        }

        // Extract mentor IDs from the connection requests
        const requestedMentorIds = connectionRequests.map(request => request.mentor_id);

        // Filter out mentors that are already requested
        const availableMentors = mentorsData.filter(mentor => !requestedMentorIds.includes(mentor.id));

        setMentors(availableMentors);
      } catch (error) {
        console.error('Unexpected error while fetching mentors:', error);
      }
    };

    if (menteeDetails) {
      fetchMentors();
    }
  }, [menteeDetails]); // Rerun whenever menteeDetails changes

  if (!user) {
    return null;
  }

  if (!menteeDetails) {
    return <p>Loading mentee details...</p>; // Display a loading message or spinner
  }

  const userId = user.id;
  const menteeId = menteeDetails.id;

  const handleViewProfile = (mentorId) => {
    router.push(`/menteeDashboard/${userId}/screens/FullProfile?id=${mentorId}`);
  };

  const handleRequestMentorship = async (mentorId) => {
    setLoadingMentors(prev => ({ ...prev, [mentorId]: true })); // Set loading for the specific mentor
    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .insert([
          { mentor_id: mentorId, mentee_id: menteeId, status: 'Pending' }
        ]);

      if (error) {
        console.error('Error sending mentorship request:', error);
        alert('Failed to send mentorship request. Please try again.');
      } else {
        alert('Mentorship request sent successfully!');
        // Refresh mentor list after successful request
        const fetchMentors = async () => {
          const { data: connectionRequests, error } = await supabase
            .from('connection_requests')
            .select('mentor_id')
            .eq('mentee_id', menteeId);

          const requestedMentorIds = connectionRequests.map(req => req.mentor_id);

          setMentors(prevMentors => prevMentors.filter(mentor => !requestedMentorIds.includes(mentor.id)));
        };
        fetchMentors();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoadingMentors(prev => ({ ...prev, [mentorId]: false })); // Reset loading for the specific mentor
    }
  };

  const filteredMentors = mentors
    .filter(mentor =>
      mentor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterExpertise ? mentor.areas_of_expertise.includes(filterExpertise) : true) &&
      (filterAvailability ? mentor.available_timings.some(time => time.includes(filterAvailability)) : true)
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "availability") {
        return a.available_timings[0].localeCompare(b.available_timings[0]);
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
                src={mentor.profile_image_url || `https://via.placeholder.com/150?text=${mentor.full_name[0]}`}
                alt={mentor.full_name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-primary">{mentor.full_name}</h2>
              <p className="text-gray-500">{mentor.areas_of_expertise.slice(0, 2).join(", ")}</p>
              <p className="text-gray-700 mt-2 flex-grow">
                {mentor.expected_outcomes.length > 60 ? mentor.expected_outcomes.slice(0, 60) + "..." : mentor.expected_outcomes}
              </p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 text-primary">{mentor.rating}</span>
              </div>
              <p className="text-gray-500 mt-2">
                Available: {Array.isArray(mentor.available_timings) ? mentor.available_timings.slice(0, 2).join(", ") : "No available timings"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.areas_of_expertise.slice(0, 2).map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex space-x-4">
                {mentor.linkedin && (
                  <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-600">
                    <FaLinkedin />
                  </a>
                )}
                {mentor.other_link && (
                  <a href={mentor.other_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-600">
                    <FaTwitter />
                  </a>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleViewProfile(mentor.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-primary border:bg-blue-600"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleRequestMentorship(mentor.id)}
                  className="text-primary hover:underline"
                  disabled={loadingMentors[mentor.id] || false}
                >
                  {loadingMentors[mentor.id] ? "Requesting..." : "Request Mentorship"}
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

