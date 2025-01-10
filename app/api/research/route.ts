import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    console.log('Searching funded research for:', query)

    const encodedQuery = encodeURIComponent(query)
    const url = `https://api.openalex.org/works?search=${encodedQuery}&filter=grants.award_id:*&select=id,display_name,grants,cited_by_count&sort=cited_by_count:desc&per-page=10`
    
    console.log('OpenAlex query URL:', url)

    const response = await fetch(url)
    const responseText = await response.text()
    console.log('OpenAlex raw response:', responseText)

    if (!response.ok) {
      throw new Error(`OpenAlex API returned ${response.status}: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    
    const results = data.results.map((paper: any) => ({
      id: paper.id,
      title: paper.display_name,
      fundingOrganizations: paper.grants?.map((g: any) => g.funder_display_name).filter(Boolean) || [],
      citedByCount: paper.cited_by_count,
      url: paper.id.replace('https://openalex.org/', 'https://explore.openalex.org/')
    }))

    return NextResponse.json({ results })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Detailed OpenAlex API error:', errorMessage)
    return NextResponse.json({ error: 'Failed to fetch research papers', details: errorMessage }, { status: 500 })
  }
}
