'use client'

import { User, FileText, Calendar, BookOpen, BarChart, Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar'

const sidebarItems = [
{ name: 'Profile', icon: User },
{ name: 'Requests', icon: FileText },
{ name: 'Sessions', icon: Calendar },
{ name: 'Resources', icon: BookOpen },
{ name: 'Analytics', icon: BarChart },
]

export default function DashboardSidebar({ selectedScreen, setSelectedScreen, isOpen, setIsOpen }) {
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  return () => window.removeEventListener('resize', checkScreenSize)
}, [])

const toggleSidebar = () => {
  setIsOpen(!isOpen)
}

return (
  <>
    <Sidebar
      collapsible={isMobile ? "none" : "icon"}
      collapsed={!isOpen}
      onCollapsedChange={setIsOpen}
      className={cn(
        "transition-all duration-300 ease-in-out",
        "absolute left-0 z-50 h-full",
        "border-r",
        !isOpen && "translate-x-[-100%]"
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => {
                      setSelectedScreen(item.name)
                      if (isMobile) {
                        toggleSidebar()
                      }
                    }}
                    isActive={selectedScreen === item.name}
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      selectedScreen === item.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span className="text-base">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-[-20px] top-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </Sidebar>
  </>
)
}

