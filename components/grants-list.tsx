'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Grant {
  opportunity_id: string
  opportunity_title: string
  agency_name: string
  description: string
  close_date: string
  award_floor?: number
  award_ceiling?: number
  eligibility?: string
}

export default function GrantsList({ query }: { query?: string }) {
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGrants = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/grants?q=${encodeURIComponent(query)}`)
        const responseText = await response.text()
        
        let data
        try {
          data = JSON.parse(responseText)
        } catch (parseError) {
          console.error('Failed to parse grants response:', parseError)
          throw new Error('Invalid response format')
        }

        if (!response.ok) {
          throw new Error(data.error || `Error: ${response.status}`)
        }

        if (!Array.isArray(data.data)) {
          throw new Error('Invalid data format received')
        }

        setGrants(data.data)
      } catch (err) {
        console.error('Grants fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load grants')
      } finally {
        setLoading(false)
      }
    }

    fetchGrants()
  }, [query])

  if (!query) {
    return (
      <Alert>
        <AlertTitle>No Query</AlertTitle>
        <AlertDescription>Enter a search query to find grants.</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return <div>Loading grants...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (grants.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Results</AlertTitle>
        <AlertDescription>No grants found for "{query}"</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant) => (
        <Card key={grant.opportunity_id}>
          <CardHeader>
            <CardTitle className="text-lg">{grant.opportunity_title}</CardTitle>
            <CardDescription>{grant.agency_name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {grant.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Deadline:</span>{' '}
                {grant.close_date ? new Date(grant.close_date).toLocaleDateString() : 'Not specified'}
              </div>
              <div>
                <span className="font-semibold">Amount:</span>{' '}
                {grant.award_floor && grant.award_ceiling
                  ? `$${grant.award_floor.toLocaleString()} - $${grant.award_ceiling.toLocaleString()}`
                  : 'Not specified'}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Eligibility:</span>{' '}
                {grant.eligibility || 'Not specified'}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" asChild>
              <a 
                href={`https://www.grants.gov/web/grants/view-opportunity.html?oppId=${grant.opportunity_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
