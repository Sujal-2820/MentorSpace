'use client';

import React, { useState, useEffect } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Dialog } from '@radix-ui/react-dialog';
import { FiVideo, FiCheckCircle, FiFilter } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { supabase } from '../../../../../lib/supabase-client';
import { useMenteeDashboard } from '../../MenteeDashboardContext';

const Sessions = () => {
  const { menteeDetails } = useMenteeDashboard(); // Assuming menteeDetails contains mentee ID
  const menteeId = menteeDetails?.id;

  const [sessions, setSessions] = useState([]);
  const [mentors, setMentors] = useState({}); // Store mentor names here
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [feedbackSession, setFeedbackSession] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStars, setFeedbackStars] = useState(0);

  useEffect(() => {
    if (menteeId) {
      fetchSessions();
    }
  }, [menteeId]);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('mentee_id', menteeId);

    if (error) {
      console.error('Error fetching sessions:', error);
    } else {
      setSessions(data);
      fetchMentors(data); // Fetch mentors after sessions are fetched
    }
  };

  const fetchMentors = async (sessions) => {
    const mentorIds = [...new Set(sessions.map(session => session.mentor_id))]; // Get unique mentor IDs
    const { data, error } = await supabase
      .from('mentors')
      .select('id, full_name')
      .in('id', mentorIds);

    if (error) {
      console.error('Error fetching mentors:', error);
    } else {
      const mentorMap = data.reduce((acc, mentor) => {
        acc[mentor.id] = mentor.full_name; // Map mentor ID to full name
        return acc;
      }, {});
      setMentors(mentorMap); // Store the mentor names in state
    }
  };

  const markAsCompleted = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'Completed' })
      .eq('id', id);

    if (error) {
      console.error('Error updating session status:', error);
    } else {
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === id ? { ...session, status: 'Completed' } : session
        )
      );
    }
  };

  const handleFeedbackSubmit = async () => {
    if (feedbackStars === 0 || feedbackText.trim() === '') {
      alert('Please provide a rating and feedback.');
      return;
    }
  
    try {
      const { error } = await supabase.from('feedback').insert({
        mentor_id: feedbackSession?.mentor_id,
        mentee_id: menteeId,
        rating: feedbackStars,
        feedback_text: feedbackText,
      });
  
      if (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      } else {
        alert('Feedback submitted successfully!');
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === feedbackSession.id ? { ...session, feedbackGiven: true } : session
          )
        );
        handleFeedbackCancel();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  
  const handleFeedbackCancel = () => {
    setFeedbackSession(null);
    setFeedbackStars(0);
    setFeedbackText('');
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesStatus = selectedStatus === 'All' || session.status === selectedStatus;
    const matchesDate =
      !selectedDate || isSameDay(parseISO(session.appointment_date), selectedDate);
    return matchesStatus && matchesDate;
  });

  
  const sessionDates = sessions.map((session) => parseISO(session.appointment_date));

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-semibold mb-4">Scheduled Sessions</h1>
      <p className="mb-6">
        Manage your upcoming and past mentoring sessions. View details, join virtual sessions, or mark as completed.
      </p>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Calendar View</h2>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onDayClick={(day) => setSelectedDate(day)}
            modifiers={{
              highlighted: (date) => sessionDates.some((sessionDate) => isSameDay(sessionDate, date)),
            }}
            modifiersStyles={{
              highlighted: { backgroundColor: '#FFD700', color: 'black' },
            }}
          />
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Sessions</h2>
            <div className="flex items-center gap-4">
              <FiFilter className="text-lg" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1 rounded border"
              >
                <option value="All">All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                id={`session-${session.appointment_date}`}
                className={`p-4 rounded-lg shadow-md ${
                  session.status === 'Upcoming' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{session.topic}</h3>
                    <p className="text-sm text-gray-700">
                      Mentor: <span className="font-medium">{mentors[session.mentor_id] || 'Loading...'}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <AiOutlineCalendar className="inline-block mr-1" />
                      {format(parseISO(session.appointment_date), 'PP')} at {session.time}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        session.status === 'Upcoming' ? 'text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Status: {session.status}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {session.status === 'Upcoming' && (
                      <>
                        <a
                          href={session.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          <FiVideo className="inline-block mr-1" />
                          Join
                        </a>
                        <button
                          onClick={() => markAsCompleted(session.id)}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                        >
                          <FiCheckCircle className="inline-block mr-1" />
                          Complete
                        </button>
                      </>
                    )}
                    {session.status === 'Completed' && (
                      <button
                        onClick={() => setFeedbackSession(session)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        <BiMessageDetail className="inline-block mr-1" />
                        Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackSession && (
        <Dialog open={!!feedbackSession} onOpenChange={handleFeedbackCancel}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <h2 className="text-lg font-semibold mb-4">
                Feedback for Mentor {mentors[feedbackSession?.mentor_id] || 'Loading...'}
              </h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Rating (out of 5):</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`w-8 h-8 rounded-full ${
                        feedbackStars >= star ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}
                      onClick={() => setFeedbackStars(star)}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows={5}
                className="w-full border rounded p-2"
                placeholder="Write your feedback..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleFeedbackCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleFeedbackSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Sessions;