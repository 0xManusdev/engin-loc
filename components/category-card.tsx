import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export function CategoryCard({ title, description, icon: Icon, href, color }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className={`aspect-video relative bg-${color}/10`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`h-16 w-16 text-${color}`} />
          </div>
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
