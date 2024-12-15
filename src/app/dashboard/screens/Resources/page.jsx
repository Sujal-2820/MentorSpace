'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialResources = [
  { id: 1, title: 'React Best Practices', type: 'PDF', description: 'A comprehensive guide to React best practices' },
  { id: 2, title: 'JavaScript ES6+ Features', type: 'Video', description: 'An in-depth look at ES6+ features in JavaScript' },
  { id: 3, title: 'Node.js Fundamentals', type: 'PDF', description: 'Learn the basics of Node.js development' },
  { id: 4, title: 'Git Workflow', type: 'Video', description: 'Master Git with this step-by-step video tutorial' },
]

export default function ResourcesScreen() {
  const [resources, setResources] = useState(initialResources)
  const [newResource, setNewResource] = useState({ title: '', type: '', description: '', file: null })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewResource(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setNewResource(prev => ({ ...prev, file: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newId = resources.length + 1
    setResources([...resources, { id: newId, ...newResource }])
    setNewResource({ title: '', type: '', description: '', file: null })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resources and Materials</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Upload New Resource</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
              <DialogDescription>
                Add details about your new resource here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={newResource.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    name="type"
                    value={newResource.type}
                    onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newResource.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Type: {resource.type}</p>
              <p className="mb-4">{resource.description}</p>
              <Button variant="outline">Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}