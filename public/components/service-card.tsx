import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export function ServiceCard({ title, description, icon: Icon, href, color }: ServiceCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className={`rounded-full bg-${color}/10 p-3 mb-4`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-zinc-500 mt-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
