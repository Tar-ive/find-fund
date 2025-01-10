'use client'

import Link from 'next/link'
import { UserCircle, BookmarkIcon, CheckSquare, Search, Sparkles, Settings, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { name: 'Profile', icon: UserCircle, href: '/profile' },
  { name: 'Grants', icon: Search, href: '/grants' },
  { name: 'Research', icon: BookmarkIcon, href: '/research' },
  { name: 'Recommendations', icon: CheckSquare, href: '/recommendations' },
  { name: 'Serendipity?', icon: Sparkles, href: '/serendipity' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

export function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-72 border-r min-h-screen p-4 flex flex-col">
        <Link href="/" className="px-4 py-3 mb-4">
          <h1 className="text-xl font-bold">Find & Fund</h1>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 text-foreground hover:bg-muted rounded-full transition-colors"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
          <div className="flex items-center justify-end px-4 h-16">
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
