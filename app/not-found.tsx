import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 text-center">
      <h1 className="text-9xl font-bold text-zinc-200">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page non trouvée</h2>
      <p className="text-zinc-500 mt-2 mb-8 max-w-md">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l&apos;accueil
          </Button>
        </Link>
        <Link href="/catalogue">
          <Button variant="outline">Parcourir le catalogue</Button>
        </Link>
      </div>
    </div>
  )
}
