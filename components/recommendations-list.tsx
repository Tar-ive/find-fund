'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink } from 'lucide-react'

interface Recommendation {
  id: string
  title: string
  type: 'grant' | 'research'
  description: string
  matchScore: number
  link: string
}

export function RecommendationsList() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const [grantsRes, researchRes] = await Promise.all([
          fetch('/api/grants'),
          fetch('/api/research')
        ])

        const [grantsData, researchData] = await Promise.all([
          grantsRes.json(),
          researchRes.json()
        ])

        // Combine and process recommendations
        const combined = [
          ...(grantsData.data || []).map((grant: any) => ({
            id: grant.id || grant.opportunity_id,
            title: grant.title || grant.opportunity_title,
            type: 'grant' as const,
            description: grant.description || grant.opportunity_description,
            matchScore: Math.random() * 100, // Replace with actual matching logic
            link: grant.link || `https://grants.gov/opportunities/${grant.opportunity_id}`
          })),
          ...(researchData.results || []).map((paper: any) => ({
            id: paper.id,
            title: paper.title,
            type: 'research' as const,
            description: paper.abstract || 'No abstract available',
            matchScore: Math.random() * 100, // Replace with actual matching logic
            link: paper.doi ? `https://doi.org/${paper.doi}` : '#'
          }))
        ]

        setRecommendations(combined.sort((a, b) => b.matchScore - a.matchScore))
      } catch (err) {
        console.error('Failed to fetch recommendations:', err)
        setError('Failed to load recommendations. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) return null // Using Suspense fallback instead
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription>
              {item.type === 'grant' ? 'Research Grant' : 'Research Paper'} • 
              Match Score: {Math.round(item.matchScore)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {item.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" asChild>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
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
