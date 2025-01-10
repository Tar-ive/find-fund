import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ExternalLink } from 'lucide-react'

interface GrantCardProps {
  title: string
  institution: string
  description: string
  deadline: string
  amount: string
  eligibility: string
}

export function GrantCard({ title, institution, description, deadline, amount, eligibility }: GrantCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{institution}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-semibold">Deadline:</span> {deadline}
          </div>
          <div>
            <span className="font-semibold">Amount:</span> {amount}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Eligibility:</span> {eligibility}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <BookmarkIcon className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}
