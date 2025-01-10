'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [field, setField] = useState('')
  const [amount, setAmount] = useState('')
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&field=${encodeURIComponent(field)}&amount=${encodeURIComponent(amount)}&deadline=${deadline?.toISOString() || ''}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    setField('')
    setAmount('')
    setDeadline(undefined)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search keywords or name"
          className="w-full h-12 pl-12 pr-20 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-14 top-1/2 -translate-y-1/2"
            onClick={handleClear}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
          Search
        </Button>
      </div>
      <div className="flex space-x-4">
        <Input
          placeholder="Research field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Grant amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {deadline ? deadline.toLocaleDateString() : "Select deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </form>
  )
}
