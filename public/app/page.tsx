import Link from "next/link"
import {
  ArrowRight,
  Users,
  Building,
  PenToolIcon as Tool,
  Car,
  Zap,
  ShoppingBag,
  Headset,
  Lock,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Location et vente d&apos;équipements professionnels
                </h1>
                <p className="max-w-[600px] text-zinc-500 md:text-xl">
                  Trouvez, louez ou achetez des équipements de qualité pour vos projets. Engins BTP, véhicules, énergie
                  et plus encore.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/catalogue">
                  <Button className="px-8 bg-primary hover:bg-primary/90">Voir le catalogue</Button>
                </Link>
                <Link href="/vente-achat">
                  <Button variant="outline" className="px-8 border-primary text-primary hover:bg-primary/10">
                    Acheter & Vendre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Équipement professionnel"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Catégories</h2>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez notre large gamme d&apos;équipements professionnels
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/catalogue/btp">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative bg-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Tool className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-bold">Engins BTP</h3>
                  <p className="text-sm text-zinc-500 mt-1">Grues, tractopelles, chargeuses et plus</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue/vehicules">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative bg-secondary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="h-16 w-16 text-secondary" />
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-bold">Véhicules</h3>
                  <p className="text-sm text-zinc-500 mt-1">Avec ou sans conducteur, co-voiturage</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/catalogue/energie">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative bg-accent/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-16 w-16 text-accent" />
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-bold">Énergie</h3>
                  <p className="text-sm text-zinc-500 mt-1">Groupes électrogènes, panneaux solaires</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 bg-zinc-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Services</h2>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Une plateforme complète pour tous vos besoins professionnels
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/vente-achat">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Vente & Achat</h3>
                  <p className="text-sm text-zinc-500 mt-2">Achetez ou vendez vos équipements</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/service-apres-vente">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-secondary/10 p-3 mb-4">
                    <Headset className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-bold">Service Après-Vente</h3>
                  <p className="text-sm text-zinc-500 mt-2">Support et maintenance</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/surete-securite">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-accent/10 p-3 mb-4">
                    <Lock className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold">Sûreté & Sécurité</h3>
                  <p className="text-sm text-zinc-500 mt-2">Sécurisez vos actifs et équipements</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/conseils-assistance">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold">Conseils & Assistance</h3>
                  <p className="text-sm text-zinc-500 mt-2">Expertise et accompagnement</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Vous possédez des équipements?</h2>
            <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Rejoignez notre réseau de partenaires et générez des revenus supplémentaires en louant ou vendant vos
              machines.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Link href="/devenir-partenaire">
              <Button className="px-8 bg-primary hover:bg-primary/90 btn-hover-effect">
                Devenir Partenaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Témoignages</h2>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ce que nos clients et partenaires disent de nous
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 card-hover-effect">
              <p className="text-zinc-500 italic">
                "J&apos;ai pu trouver rapidement un groupe électrogène pour mon chantier. Service impeccable et
                livraison rapide."
              </p>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-1">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Thomas Dubois</p>
                  <p className="text-xs text-zinc-500">Client</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 card-hover-effect">
              <p className="text-zinc-500 italic">
                "En tant que partenaire, j&apos;ai pu rentabiliser mes équipements inutilisés. La plateforme est
                intuitive et efficace."
              </p>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-secondary/10 p-1">
                  <Building className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Entreprise Énergie Plus</p>
                  <p className="text-xs text-zinc-500">Partenaire</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 card-hover-effect">
              <p className="text-zinc-500 italic">
                "J&apos;ai vendu mon tractopelle en quelques jours grâce à la plateforme. Le processus était simple et
                sécurisé."
              </p>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-accent/10 p-1">
                  <Tool className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Marie Laurent</p>
                  <p className="text-xs text-zinc-500">Vendeuse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
