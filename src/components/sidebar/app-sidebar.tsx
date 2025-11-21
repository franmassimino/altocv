"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Settings,
  Coins,
} from "lucide-react"

import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string | null
    email: string | null
    image: string | null
    credits: number
  }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ">
              <a href="/dashboard" className="flex mx-auto items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground mx-auto">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ALTOCV</span>
                  <span className="truncate text-xs">CV Builder</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} size="default" className="px-3 py-2.5">
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Credits Section */}
        <SidebarGroup className="mt-auto ">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={`${user.credits} credits`} className="p-4 py-7 cursor-pointer ">
                  <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/90 cursor-default">
                    <Coins className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                      <span className="text-xs text-muted-foreground">Credits</span>
                      <span className="text-sm font-semibold truncate">{user.credits}</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
