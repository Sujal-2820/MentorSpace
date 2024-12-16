'use client'

import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

export default function DashboardPage() {
  const [selectedScreen, setSelectedScreen] = useState('Profile')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar 
            selectedScreen={selectedScreen} 
            setSelectedScreen={setSelectedScreen}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          <Content selectedScreen={selectedScreen} />
        </div>
      </div>
    </SidebarProvider>
  )
}