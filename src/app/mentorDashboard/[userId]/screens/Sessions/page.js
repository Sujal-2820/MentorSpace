//src\app\mentorDashboard\[userId]\screens\Sessions\page.js

'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isToday, isBefore } from 'date-fns';
import { motion } from 'framer-motion';

export default function Sessions() {
  // Dummy session data
  const sessions = [
    {
      date: '2024-12-20',
      details: [
        {
          menteeName: 'Alice Johnson',
          topic: 'React Basics',
          time: '10:00 AM - 11:00 AM',
          joinLink: '#',
        },
      ],
    },
    {
      date: '2024-12-21',
      details: [
        {
          menteeName: 'Bob Smith',
          topic: 'Advanced JavaScript',
          time: '12:00 PM - 1:00 PM',
          joinLink: '#',
        },
        {
          menteeName: 'Charlie Brown',
          topic: 'Design Patterns',
          time: '3:00 PM - 4:00 PM',
          joinLink: '#',
        },
      ],
    },
    {
      date: '2024-12-25',
      details: [
        {
          menteeName: 'Diana Prince',
          topic: 'TypeScript for Beginners',
          time: '2:00 PM - 3:00 PM',
          joinLink: '#',
        },
      ],
    },
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  // Get session details for the selected date
  const selectedSessions = sessions.find(
    (session) => session.date === format(selectedDate, 'yyyy-MM-dd')
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
            highlighted: sessions.map((session) => new Date(session.date)),
          }}
          modifiersClassNames={{
            highlighted: 'bg-blue-500 text-white',
            selected: 'bg-green-500 text-white',
            today: 'ring-2 ring-blue-300',
          }}
        />
      </div>

      {/* Session Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {selectedDate && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Sessions for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>

            {selectedSessions ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {selectedSessions.details.map((session, index) => (
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
                        isBefore(new Date(), new Date(session.date))
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      disabled={isBefore(new Date(), new Date(session.date))}
                      onClick={() => window.location.href = session.joinLink}
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
    </div>
  );
}
