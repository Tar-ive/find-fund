import ResearchList from '@/components/research-list'
import SearchForm from '@/components/search-form'

export default function ResearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Funded Research</h1>
        <p className="text-lg text-muted-foreground">
          Explore funded research in your field
        </p>
      </div>
      <SearchForm type="research" />
      <ResearchList query={searchParams.q} />
    </div>
  )
}
