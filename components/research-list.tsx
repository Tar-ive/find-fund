'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink, QuoteIcon as Citation } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ResearchPaper {
  id: string
  title: string
  fundingOrganizations: string[]
  citedByCount: number
  url: string
}

export default function ResearchList({ query }: { query?: string }) {
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPapers = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/research?q=${encodeURIComponent(query)}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch research papers')
        }

        setPapers(data.results || [])
      } catch (err) {
        console.error('Research fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load research papers')
      } finally {
        setLoading(false)
      }
    }

    fetchPapers()
  }, [query])

  if (!query) {
    return (
      <Alert>
        <AlertTitle>No Query</AlertTitle>
        <AlertDescription>Enter a search query to find funded research.</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return <div>Loading research papers...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (papers.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Results</AlertTitle>
        <AlertDescription>No funded research found for "{query}"</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {papers.map((paper) => (
        <Card key={paper.id}>
          <CardHeader>
            <CardTitle className="text-lg">{paper.title}</CardTitle>
            <CardDescription>
              <Citation className="inline-block h-4 w-4 mr-1" />
              Cited by: {paper.citedByCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {paper.fundingOrganizations.length > 0 && (
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold">Funded by:</p>
                <ul className="list-disc list-inside">
                  {paper.fundingOrganizations.map((org, index) => (
                    <li key={index}>{org}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" asChild>
              <a href={paper.url} target="_blank" rel="noopener noreferrer">
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
