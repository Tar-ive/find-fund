import { NextResponse } from 'next/server'
import Exa from "exa-js"

// Cache interface
interface CacheItem {
  data: any
  timestamp: number
}

// Cache object with multiple queries
const cache: Record<string, CacheItem> = {}
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

function getCacheKey(query: string): string {
  return `serendipity_${query}`
}

async function getFromCache(query: string) {
  const key = getCacheKey(query)
  const item = cache[key]
  
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    console.log('Cache hit for query:', query)
    return item.data
  }
  
  return null
}

async function setCache(query: string, data: any) {
  const key = getCacheKey(query)
  cache[key] = {
    data,
    timestamp: Date.now()
  }
}

export async function GET(request: Request) {
  console.log('Serendipity API route called')
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || 'recommendation models research at texas state university'

  // Try to get from cache first
  const cachedData = await getFromCache(query)
  if (cachedData) {
    console.log('Returning cached serendipity results for query:', query)
    return NextResponse.json(cachedData)
  }

  try {
    const exa = new Exa(process.env.EXA_API_KEY || "")
    const result = await exa.search(query, {
      type: "auto",
      includeDomains: ["www.txst.edu"]
    })

    // Cache the results
    await setCache(query, result)
    console.log('Caching new serendipity results for query:', query)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Exa API error:', error)
    return NextResponse.json({ error: 'Failed to fetch serendipitous content' }, { status: 500 })
  }
}
