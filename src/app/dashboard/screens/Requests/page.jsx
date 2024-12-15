'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const initialRequests = [
  { id: 1, name: 'Alice Johnson', topic: 'React Fundamentals', type: 'connection' },
  { id: 2, name: 'Bob Smith', topic: 'Advanced JavaScript', type: 'session' },
  { id: 3, name: 'Charlie Brown', topic: 'Career Advice', type: 'connection' },
  { id: 4, name: 'Diana Prince', topic: 'Node.js Best Practices', type: 'session' },
]

export default function RequestsScreen() {
  const [requests, setRequests] = useState(initialRequests)

  const handleAccept = (id) => {
    setRequests(requests.filter(request => request.id !== id))
  }

  const handleDecline = (id) => {
    setRequests(requests.filter(request => request.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentorship Requests</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connection Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {requests.filter(request => request.type === 'connection').map((request) => (
              <div key={request.id} className="mb-4 rounded-lg border p-4 last:mb-0">
                <h3 className="text-lg font-semibold">{request.name}</h3>
                <p className="mb-2 text-sm text-gray-500">Topic: {request.topic}</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDecline(request.id)}>Decline</Button>
                  <Button size="sm" onClick={() => handleAccept(request.id)}>Accept</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Session Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {requests.filter(request => request.type === 'session').map((request) => (
              <div key={request.id} className="mb-4 rounded-lg border p-4 last:mb-0">
                <h3 className="text-lg font-semibold">{request.name}</h3>
                <p className="mb-2 text-sm text-gray-500">Topic: {request.topic}</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDecline(request.id)}>Decline</Button>
                  <Button size="sm" onClick={() => handleAccept(request.id)}>Accept</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
