import { Suspense } from 'react'
import { SearchResults } from './components/SearchResults'
import SearchForm from '@/components/search-form'

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Research Funding Search</h1>
        <p className="text-lg text-muted-foreground">
          Find grants and explore similar funded research for your topic
        </p>
      </div>
      <SearchForm type="all" />
      <Suspense fallback={<div className="p-8">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}
