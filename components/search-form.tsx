'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  type?: 'grants' | 'research' | 'all'
}

export default function SearchForm({ type = 'all' }: SearchFormProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${type === 'all' ? 'search' : type}?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search keywords (e.g., climate change, machine learning)"
          className="pl-10"
        />
        <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
          Search
        </Button>
      </div>
    </form>
  )
}
