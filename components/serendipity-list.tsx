'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink } from 'lucide-react'

interface SerendipityItem {
  id: string
  title: string
  snippet: string
  url: string
}

export default function SerendipityList() {
  const [items, setItems] = useState<SerendipityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSerendipity = async () => {
      try {
        const response = await fetch('/api/serendipity')
        if (!response.ok) {
          throw new Error('Failed to fetch serendipitous content')
        }
        const data = await response.json()
        setItems(data.results)
      } catch (err) {
        setError('Failed to load serendipitous content. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSerendipity()
  }, [])

  if (loading) {
    return <div>Loading serendipitous discoveries...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
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
  )
}
