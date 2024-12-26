//src\app\mentorDashboard\[userId]\screens\Sessions\page.js

'use client';

import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import { supabase } from '../../../../../lib/supabase-client';
import { useMentorDashboard } from '../../MentorDashboardContext';

export default function Sessions() {
  const { mentorDetails } = useMentorDashboard(); // Assuming mentorDetails includes mentor_id
  const mentorId = mentorDetails?.id;

  const [selectedDate, setSelectedDate] = useState(null);
  const [sessions, setSessions] = useState([]); // Store sessions fetched from the database
  const [mentees, setMentees] = useState([]); // Store mentees
  const [newSession, setNewSession] = useState({
    date: '',
    topic: '',
    time: '',
    menteeId: '', // Track selected mentee
    meetingLink: '', // New state for the meeting link
  });

  // Fetch existing sessions for the mentor
  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('mentor_id', mentorId);

      if (error) {
        console.error('Error fetching sessions:', error);
      } else {
        setSessions(data);
      }
    };

    if (mentorId) {
      fetchSessions();
    }
  }, [mentorId]);

  // Fetch mentees associated with the mentor (accepted status in connection_requests)
  useEffect(() => {
    const fetchMentees = async () => {
      const { data, error } = await supabase
        .from('connection_requests')
        .select('mentee_id')
        .eq('mentor_id', mentorId)
        .eq('status', 'Accepted');

      if (error) {
        console.error('Error fetching mentees:', error);
      } else {
        const menteeIds = data.map((request) => request.mentee_id);
        const { data: menteeDetails, error: menteeError } = await supabase
          .from('mentees')
          .select('id, full_name')
          .in('id', menteeIds);

        if (menteeError) {
          console.error('Error fetching mentees details:', menteeError);
        } else {
          setMentees(menteeDetails); // Set mentees to the fetched data
        }
      }
    };

    if (mentorId) {
      fetchMentees();
    }
  }, [mentorId]);

  const formatTimeTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const isPM = hours >= 12;
    const adjustedHours = hours % 12 || 12; // Convert 0 or 24 to 12
    const period = isPM ? 'PM' : 'AM';
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleAddSession = async () => {
    if (!newSession.date || !newSession.topic || !newSession.time || !newSession.menteeId || !newSession.meetingLink) {
      alert('Please fill in all fields.');
      return;
    }

    // Format the time to 12-hour format with AM/PM
    const formattedTime = formatTimeTo12Hour(newSession.time);

  
    const { data, error } = await supabase.from('appointments').insert([
      {
        mentor_id: mentorId,
        appointment_date: newSession.date,
        topic: newSession.topic,
        time: formattedTime,
        mentee_id: newSession.menteeId,
        meeting_link: newSession.meetingLink,
        status: 'Upcoming', // Default status
      },
    ]);
  
    if (error) {
      console.error('Error adding session:', error);
    } else {
      // Refresh sessions after adding a new session
      await fetchSessions(); // Call the function to fetch sessions again
  
      // Clear the form
      setNewSession({ date: '', topic: '', time: '', menteeId: '', meetingLink: '' });
    }
  };

  // Function to fetch sessions
const fetchSessions = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('mentor_id', mentorId);

  if (error) {
    console.error('Error fetching sessions:', error);
  } else {
    setSessions(data);
  }
};

// Call fetchSessions in useEffect
useEffect(() => {
  if (mentorId) {
    fetchSessions();
  }
}, [mentorId]);
  
  // Get session details for the selected date
  const selectedSessions = sessions.filter(
    (session) => format(new Date(session.appointment_date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 p-4 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Sessions</h1>

      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Calendar</h2>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg"
          modifiers={{
            highlighted: sessions.map((session) => new Date(session.appointment_date)),
          }}
          modifiersClassNames={{
            highlighted: 'bg-blue-500 text-white',
            selected: 'bg-green-500 text-white',
            today: 'ring-2 ring-blue-300',
          }}
        />
      </div>

      {/* Session Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {selectedDate && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Sessions for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>

            {selectedSessions.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {selectedSessions.map((session, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between"
                  >
                    <div>
                      <p className="text-lg font-medium">{session.menteeName}</p>
                      <p className="text-gray-600">{session.topic}</p>
                      <p className="text-gray-500">{session.time}</p>
                    </div>
                    <button
                      className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg text-white ${
                        isBefore(new Date(), new Date(session.appointment_date))
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      disabled={isBefore(new Date(), new Date(session.appointment_date))}
                      onClick={() => window.location.href = session.meeting_link} // Join meeting link
                    >
                      Join Meeting
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-500">No sessions scheduled for this day.</p>
            )}
          </>
        )}
        {!selectedDate && (
          <p className="text-gray-500">Select a date to view scheduled sessions.</p>
        )}
      </div>

      {/* Add Session Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Session</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              className="mt-2 p-2 w-full border rounded-lg"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700">Topic</label>
            <input
              type="text"
              id="topic"
              className="mt-2 p-2 w-full border rounded-lg"
              value={newSession.topic}
              onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              className="mt-2 p-2 w-full border rounded-lg"
              value={newSession.time}
              onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mentee" className="block text-gray-700">Select Mentee</label>
            <select
              id="mentee"
              className="mt-2 p-2 w-full border rounded-lg"
              value={newSession.menteeId}
              onChange={(e) => setNewSession({ ...newSession, menteeId: e.target.value })}
            >
              <option value="">Select a mentee</option>
              {mentees.map((mentee) => (
                <option key={mentee.id} value={mentee.id}>
                  {mentee.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="meetingLink" className="block text-gray-700">Add Meeting Link</label>
            <input
              type="url"
              id="meetingLink"
              className="mt-2 p-2 w-full border rounded-lg"
              value={newSession.meetingLink}
              onChange={(e) => setNewSession({ ...newSession, meetingLink: e.target.value })}
              placeholder="Enter the meeting link"
            />
          </div>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleAddSession}
          >
            Add Session
          </button>
        </form>
      </div>
    </div>
  );
}
