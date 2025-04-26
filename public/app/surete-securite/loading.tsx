import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function SureteSecuriteLoading() {
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

        <div className="grid md:grid-cols-2 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-5 w-32" />
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
                  <div key={i} className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-full mb-2" />
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
