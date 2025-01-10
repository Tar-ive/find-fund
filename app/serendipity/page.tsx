'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, ExternalLink } from 'lucide-react'

interface SerendipityItem {
  id: string
  title: string
  snippet: string
  url: string
}

export default function SerendipityPage() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<SerendipityItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSerendipity = async (searchQuery: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/serendipity?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch serendipitous content')
      }
      const data = await response.json()
      setItems(data.results || [])
    } catch (err) {
      setError('Failed to load serendipitous content. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSerendipity('recommendation models research at texas state university')
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      fetchSerendipity(query)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Serendipitous Discoveries</h1>
      <p className="text-lg text-muted-foreground">Explore unexpected connections and insights in research</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a research topic or question"
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{item.snippet}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
