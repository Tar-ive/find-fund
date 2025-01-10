import { Suspense } from 'react'
import { RecommendationsList } from '@/components/recommendations-list'
import { Skeleton } from '@/components/ui/skeleton'

export default function RecommendationsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Recommendations</h1>
      <p className="text-lg text-muted-foreground">Personalized research opportunities based on your interests</p>
      <Suspense fallback={<RecommendationsSkeletons />}>
        <RecommendationsList />
      </Suspense>
    </div>
  )
}

function RecommendationsSkeletons() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
