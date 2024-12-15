'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'

const initialSessions = [
  { id: 1, date: new Date(2023, 4, 15), time: '14:00', name: 'Alice Johnson', topic: 'React Fundamentals' },
  { id: 2, date: new Date(2023, 4, 17), time: '15:30', name: 'Bob Smith', topic: 'Advanced JavaScript' },
  { id: 3, date: new Date(2023, 4, 20), time: '10:00', name: 'Charlie Brown', topic: 'Career Advice' },
  { id: 4, date: new Date(2023, 4, 22), time: '16:00', name: 'Diana Prince', topic: 'Node.js Best Practices' },
]

export default function SessionsScreen() {
  const [sessions, setSessions] = useState(initialSessions)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const highlightedDates = sessions.map(session => session.date)

  const filteredSessions = sessions.filter(
    session => session.date.toDateString() === selectedDate.toDateString()
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Scheduled Sessions</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                highlighted: highlightedDates,
              }}
              modifiersStyles={{
                highlighted: { backgroundColor: 'var(--primary)' },
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sessions for {selectedDate.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <div key={session.id} className="mb-4 rounded-lg border p-4 last:mb-0">
                    <h3 className="text-lg font-semibold">{session.name}</h3>
                    <p className="mb-2 text-sm text-gray-500">
                      Topic: {session.topic}<br />
                      Time: {session.time}
                    </p>
                    <Button size="sm">Join Meeting</Button>
                  </div>
                ))
              ) : (
                <p>No sessions scheduled for this date.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

