import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function MessagesLoading() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[320px_1fr] h-[600px]">
          <div className="border-r">
            <div className="p-3 border-b">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-3 space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-9 w-24" />
            </div>

            <div className="flex-1 p-4 space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <Skeleton
                      className={`h-20 w-64 rounded-lg ${i % 2 === 0 ? "rounded-tr-none" : "rounded-tl-none"}`}
                    />
                  </div>
                ))}
            </div>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
