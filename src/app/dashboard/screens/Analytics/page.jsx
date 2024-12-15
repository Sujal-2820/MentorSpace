import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Jan', sessions: 4 },
  { name: 'Feb', sessions: 7 },
  { name: 'Mar', sessions: 5 },
  { name: 'Apr', sessions: 9 },
  { name: 'May', sessions: 6 },
]

export default function AnalyticsScreen() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Feedback and Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Overall Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center">4.8 / 5</div>
          <p className="text-center text-muted-foreground">Based on 50 reviews</p>
        </CardContent>
      </Card>
    </div>
  )
}
