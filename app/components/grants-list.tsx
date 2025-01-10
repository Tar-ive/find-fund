import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GrantCard } from "./grant-card"

async function searchGrants(): Promise<any[]> {
  try {
    console.log('Attempting to fetch grants')
    console.log('Using Grants API Key:', process.env.GRANTS_API_KEY?.substring(0, 5) + '...')
    
    const requestBody = {
      keyword: "",
      pagination: {
        order_by: "opportunity_id",
        page_offset: 1,
        page_size: 25,
        sort_direction: "ascending"
      }
    }
    console.log('Request body:', JSON.stringify(requestBody))

    const res = await fetch('https://api.simpler.grants.gov/v1/opportunities/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-Auth': process.env.GRANTS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      next: { revalidate: 3600 }
    })

    console.log('Grants API Response Status:', res.status)
    const responseText = await res.text()
    console.log('Grants API Raw Response:', responseText)

    if (!res.ok) {
      throw new Error(`Grants API returned ${res.status}: ${responseText}`)
    }
    
    const data = JSON.parse(responseText)
    console.log('Parsed Grants Data:', data)

    if (!data.data) {
      throw new Error('Unexpected response format from Grants API')
    }

    return data.data
  } catch (error) {
    console.error('Detailed Grants API error:', error)
    throw error
  }
}

export default async function GrantsList() {
  let grants = []
  let error = null

  try {
    grants = await searchGrants()
  } catch (e) {
    console.error('Grants fetch failed:', e)
    error = e as Error
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch grants data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (grants.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Results</AlertTitle>
        <AlertDescription>No grants found.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant: any) => (
        <GrantCard
          key={grant.opportunity_id}
          title={grant.opportunity_title}
          institution={grant.agency_name}
          description={grant.summary?.summary_description || 'No description available'}
          deadline={new Date(grant.summary?.close_date).toLocaleDateString()}
          amount={`$${grant.summary?.award_floor} - $${grant.summary?.award_ceiling}`}
          eligibility={grant.summary?.applicant_eligibility_description || 'Not specified'}
        />
      ))}
    </div>
  )
}
