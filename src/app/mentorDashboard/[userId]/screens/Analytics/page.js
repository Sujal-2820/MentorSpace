'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function Analytics() {
  // Dummy data for analytics
  const sessionData = [
    { month: 'Jan', sessions: 12 },
    { month: 'Feb', sessions: 15 },
    { month: 'Mar', sessions: 10 },
    { month: 'Apr', sessions: 18 },
    { month: 'May', sessions: 20 },
    { month: 'Jun', sessions: 16 },
    { month: 'Jul', sessions: 22 },
    { month: 'Aug', sessions: 25 },
    { month: 'Sep', sessions: 30 },
    { month: 'Oct', sessions: 24 },
    { month: 'Nov', sessions: 28 },
    { month: 'Dec', sessions: 35 },
  ];

  const metrics = {
    totalHours: 350,
    activeMentees: 25,
    completionRate: '92%',
  };

  const feedback = [
    { mentee: 'Alice Johnson', comment: 'Great mentor, learned a lot!', rating: 5 },
    { mentee: 'Bob Smith', comment: 'Helpful and engaging sessions.', rating: 4 },
    { mentee: 'Charlie Brown', comment: 'Explains concepts well.', rating: 5 },
  ];

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 p-4 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Analytics</h1>

      {/* Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-6"
      >
        <h2 className="text-xl font-semibold">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
            <h3 className="text-lg font-medium">Average Rating</h3>
            <p className="text-3xl font-bold">4.8</p>
            <p className="text-sm">Based on 50 reviews</p>
          </div>

          {/* Key Metrics */}
          <div className="p-4 bg-green-500 text-white rounded-lg shadow">
            <h3 className="text-lg font-medium">Key Metrics</h3>
            <ul className="text-sm space-y-1">
              <li>Total Hours Mentored: {metrics.totalHours} hrs</li>
              <li>Active Mentees: {metrics.activeMentees}</li>
              <li>Completion Rate: {metrics.completionRate}</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Monthly Sessions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Monthly Sessions</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sessionData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
        {feedback.length > 0 ? (
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.mentee}</p>
                  <p className="text-gray-600">{item.comment}</p>
                </div>
                <p className="font-bold text-yellow-500">{'★'.repeat(item.rating)}</p>
              </div>
            ))}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View All Feedback
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No feedback available.</p>
        )}
      </motion.div>
    </div>
  );
}
