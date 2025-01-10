'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GrantsList from '@/components/grants-list'
import ResearchList from '@/components/research-list'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (query) {
      console.log('Searching for:', query)
      setIsLoading(false)
    }
  }, [query])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!query) {
    return <div>Enter a search query to find research funding opportunities.</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Results for "{query}"</h2>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="research">Funded Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Available Grants</h3>
            <GrantsList query={query} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Similar Funded Research</h3>
            <ResearchList query={query} />
          </div>
        </TabsContent>
        
        <TabsContent value="grants">
          <GrantsList query={query} />
        </TabsContent>
        
        <TabsContent value="research">
          <ResearchList query={query} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
