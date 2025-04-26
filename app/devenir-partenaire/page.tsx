import Link from "next/link"
import { ArrowRight, Check, Zap, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function DevenirPartenairePage() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Devenez Partenaire</h1>
        <p className="text-xl text-zinc-500 max-w-3xl mx-auto">
          Rejoignez notre réseau de partenaires et générez des revenus supplémentaires en louant vos équipements
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img src="/placeholder.svg?height=400&width=600" alt="Partenaire K&R Secure" className="rounded-lg shadow-lg" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Pourquoi devenir partenaire ?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Revenus supplémentaires</h3>
                <p className="text-zinc-500">Rentabilisez vos équipements inutilisés en les proposant à la location</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Gestion simplifiée</h3>
                <p className="text-zinc-500">
                  Notre plateforme s&apos;occupe de la gestion des réservations et des paiements
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Visibilité accrue</h3>
                <p className="text-zinc-500">
                  Accédez à une large clientèle à la recherche d&apos;équipements de qualité
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Support dédié</h3>
                <p className="text-zinc-500">
                  Bénéficiez d&apos;un accompagnement personnalisé pour optimiser vos locations
                </p>
              </div>
            </div>
          </div>
          <Link href="/inscription">
            <Button size="lg" className="mt-4">
              Devenir partenaire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
        <p className="text-zinc-500 max-w-3xl mx-auto">Rejoindre notre réseau de partenaires est simple et rapide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Inscrivez-vous</h3>
          <p className="text-zinc-500">Créez votre compte partenaire en quelques minutes et complétez votre profil</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Ajoutez vos équipements</h3>
          <p className="text-zinc-500">Enregistrez vos équipements avec photos, descriptions et tarifs</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Recevez des réservations</h3>
          <p className="text-zinc-500">Gérez vos réservations et recevez vos paiements de manière sécurisée</p>
        </div>
      </div>

      <div className="bg-zinc-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Types d&apos;équipements recherchés</h2>
          <p className="text-zinc-500 max-w-3xl mx-auto">
            Nous recherchons principalement des équipements dans la catégorie Énergie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-zinc-700" />
              Groupes électrogènes
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Groupes électrogènes diesel</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Groupes électrogènes essence</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Groupes électrogènes silencieux</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Puissances variées (de 2kVA à 50kVA)</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Sun className="mr-2 h-5 w-5 text-zinc-700" />
              Panneaux solaires
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Panneaux solaires monocristallins</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Panneaux solaires polycristallins</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Kits solaires complets</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Puissances variées (de 100W à 1000W)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Témoignages de partenaires</h2>
        <p className="text-zinc-500 max-w-3xl mx-auto">Découvrez ce que nos partenaires disent de leur expérience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg border">
          <p className="italic text-zinc-600 mb-4">
            "Depuis que j&apos;ai rejoint K&R Secure, mes équipements sont loués régulièrement. La plateforme est facile à
            utiliser et le support est très réactif."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-200 mr-3"></div>
            <div>
              <p className="font-medium">Entreprise Énergie Plus</p>
              <p className="text-sm text-zinc-500">Partenaire depuis 2024</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <p className="italic text-zinc-600 mb-4">
            "J&apos;ai pu rentabiliser rapidement mon investissement en groupes électrogènes grâce à K&R Secure. Je
            recommande vivement à tous les propriétaires d&apos;équipements."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-200 mr-3"></div>
            <div>
              <p className="font-medium">Société ElectroTech</p>
              <p className="text-sm text-zinc-500">Partenaire depuis 2023</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <p className="italic text-zinc-600 mb-4">
            "La gestion des réservations est simplifiée et les paiements sont toujours ponctuels. Une excellente
            plateforme pour les professionnels du secteur."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-200 mr-3"></div>
            <div>
              <p className="font-medium">SolarPower SARL</p>
              <p className="text-sm text-zinc-500">Partenaire depuis 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 text-white rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre notre réseau ?</h2>
        <p className="text-zinc-300 max-w-3xl mx-auto mb-6">
          Inscrivez-vous dès aujourd&apos;hui et commencez à générer des revenus avec vos équipements
        </p>
        <Link href="/inscription">
          <Button size="lg" variant="default" className="bg-white text-zinc-900 hover:bg-zinc-100">
            Devenir partenaire maintenant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
