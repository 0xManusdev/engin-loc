import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ConseilsAssistanceLoading() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-full" />

        <div className="grid md:grid-cols-2 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center mt-4">
                    <Skeleton className="h-6 w-6 rounded-full mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />
            <div className="grid md:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-start p-4 border rounded-lg">
                    <Skeleton className="h-8 w-8 mr-3 mt-1" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-3 w-48 mb-2" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
