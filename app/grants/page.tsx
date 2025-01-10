import GrantsList from '@/components/grants-list'
import SearchForm from '@/components/search-form'

export default function GrantsPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Research Grants</h1>
        <p className="text-lg text-muted-foreground">
          Find funding opportunities for your research
        </p>
      </div>
      <SearchForm type="grants" />
      <GrantsList query={searchParams.q} />
    </div>
  )
}
