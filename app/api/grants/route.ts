import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  if (!process.env.GRANTS_API_KEY) {
    console.error('GRANTS_API_KEY is not configured')
    return NextResponse.json({ error: 'Grants API is not properly configured' }, { status: 500 })
  }

  try {
    console.log('Searching grants for:', query)

    const requestBody = {
      filters: {
        opportunity_status: {
          one_of: ["forecasted", "posted"]
        }
      },
      pagination: {
        order_by: "opportunity_id",
        page_offset: 1,
        page_size: 25,
        sort_direction: "descending"
      },
      query: query
    }

    console.log('Grants API request:', JSON.stringify(requestBody))

    const response = await fetch('https://api.simpler.grants.gov/v1/opportunities/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-Auth': process.env.GRANTS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const responseText = await response.text()
    console.log('Grants API raw response:', responseText)

    if (!response.ok) {
      throw new Error(`Grants API returned ${response.status}: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    return NextResponse.json({ data: data.data || [] })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Detailed Grants API error:', errorMessage)
    return NextResponse.json({ error: 'Failed to fetch grants', details: errorMessage }, { status: 500 })
  }
}
