'use client'

import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import * as Select from '@radix-ui/react-select';


const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    milestones: [],
    assignedTo: '',
  });
  const [milestone, setMilestone] = useState('');
  const mentors = ['John Doe', 'Jane Smith', 'Emily Johnson']; // Dummy mentors
  const sessions = ['Session 1', 'Session 2', 'Session 3']; // Dummy sessions

  // Add a new goal
  const addGoal = () => {
    if (!newGoal.title || !newGoal.description) {
      alert('Please fill in all required fields.');
      return;
    }
    setGoals([...goals, { ...newGoal, completed: 0 }]);
    setNewGoal({ title: '', description: '', milestones: [], assignedTo: '' });
  };

  // Add a milestone to the current goal
  const addMilestone = () => {
    if (milestone.trim() === '') {
      alert('Milestone cannot be empty.');
      return;
    }
    setNewGoal((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { text: milestone, completed: false }],
    }));
    setMilestone('');
  };

  // Mark milestone as completed
  const toggleMilestone = (goalIndex, milestoneIndex) => {
    const updatedGoals = [...goals];
    const milestone = updatedGoals[goalIndex].milestones[milestoneIndex];
    milestone.completed = !milestone.completed;
    const completedCount = updatedGoals[goalIndex].milestones.filter(
      (m) => m.completed
    ).length;
    updatedGoals[goalIndex].completed =
      (completedCount / updatedGoals[goalIndex].milestones.length) * 100;
    setGoals(updatedGoals);
  };

  return (
    <div className="lg:pl-64 md:pl-64 sm:pl-64 pl-16 py-6">
      <h1 className="text-2xl font-bold mb-4">Goals and Progress</h1>

      {/* Add New Goal */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Goal</h2>
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) =>
            setNewGoal((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          placeholder="Goal Description"
          value={newGoal.description}
          onChange={(e) =>
            setNewGoal((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full p-2 border rounded mb-4"
        />
        <div className="mb-4">
          <label className="block mb-2 font-medium">Assign to:</label>
          <Select.Root
            value={newGoal.assignedTo}
            onValueChange={(value) =>
                setNewGoal((prev) => ({ ...prev, assignedTo: value }))
            }
            >
            <Select.Trigger
                className="p-2 border rounded w-full flex justify-between items-center"
            >
                <Select.Value
                placeholder="Select Mentor or Session"
                className="text-left flex-grow"
                />
                <Select.Icon>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </Select.Icon>
            </Select.Trigger>
            <Select.Content className="border rounded shadow-md bg-white">
                <Select.Viewport>
                <Select.Group>
                    <Select.Label className="px-2 py-1 font-medium">Mentors</Select.Label>
                    {mentors.map((mentor) => (
                    <Select.Item
                        key={mentor}
                        value={mentor}
                        className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-200 cursor-pointer"
                    >
                        <Select.ItemText>{mentor}</Select.ItemText>
                    </Select.Item>
                    ))}
                    <Select.Separator className="h-px bg-gray-300 my-1" />
                    <Select.Label className="px-2 py-1 font-medium">Sessions</Select.Label>
                    {sessions.map((session) => (
                    <Select.Item
                        key={session}
                        value={session}
                        className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-200 cursor-pointer"
                    >
                        <Select.ItemText>{session}</Select.ItemText>
                    </Select.Item>
                    ))}
                </Select.Group>
                </Select.Viewport>
            </Select.Content>
            </Select.Root>


        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Add Milestones:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Milestone"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={addMilestone}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5 mt-2">
            {newGoal.milestones.map((m, index) => (
              <li key={index}>{m.text}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={addGoal}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Goal
        </button>
      </div>

      {/* List of Goals */}
      <div>
        {goals.map((goal, index) => (
          <div key={index} className="bg-white p-4 shadow rounded mb-4">
            <h2 className="text-xl font-semibold">{goal.title}</h2>
            <p className="text-gray-700 mb-4">{goal.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Assigned to: {goal.assignedTo || 'None'}
            </p>
            <div className="mb-4">
              <ProgressBar
                now={goal.completed}
                label={`${Math.round(goal.completed)}%`}
              />
            </div>
            <h3 className="font-medium mb-2">Milestones:</h3>
            <ul className="list-disc pl-5">
              {goal.milestones.map((m, mIndex) => (
                <li
                  key={mIndex}
                  className={`cursor-pointer ${
                    m.completed ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={() => toggleMilestone(index, mIndex)}
                >
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
