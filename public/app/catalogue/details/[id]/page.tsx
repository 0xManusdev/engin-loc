"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Truck, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données fictives pour les équipements
const equipements = [
  {
    id: 1,
    nom: "Groupe électrogène 5kVA",
    type: "Groupe électrogène",
    categorie: "Énergie",
    puissance: "5kVA",
    prix: 15000,
    image: "/placeholder.svg?height=200&width=300",
    disponible: true,
    description:
      "Groupe électrogène diesel de 5kVA, idéal pour les petits chantiers et les besoins domestiques. Autonomie de 8 heures à pleine charge.",
    specifications: [
      "Puissance: 5kVA",
      "Carburant: Diesel",
      "Autonomie: 8 heures",
      "Niveau sonore: 68 dB",
      "Dimensions: 68 x 52 x 56 cm",
      "Poids: 85 kg",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 2,
    nom: "Groupe électrogène 10kVA",
    type: "Groupe électrogène",
    categorie: "Énergie",
    puissance: "10kVA",
    prix: 25000,
    image: "/placeholder.svg?height=200&width=300",
    disponible: true,
    description:
      "Groupe électrogène diesel de 10kVA, parfait pour les chantiers de taille moyenne et les événements. Autonomie de 10 heures à pleine charge.",
    specifications: [
      "Puissance: 10kVA",
      "Carburant: Diesel",
      "Autonomie: 10 heures",
      "Niveau sonore: 72 dB",
      "Dimensions: 90 x 60 x 75 cm",
      "Poids: 160 kg",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
]

export default function EquipementDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const id = Number.parseInt(params.id)
  const equipement = equipements.find((e) => e.id === id)

  const [activeTab, setActiveTab] = useState("details")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [lieu, setLieu] = useState("")
  const [usage, setUsage] = useState("")

  if (!equipement) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Équipement non trouvé</h1>
        <p className="mb-6">L&apos;équipement que vous recherchez n&apos;existe pas.</p>
        <Link href="/catalogue">
          <Button>Retour au catalogue</Button>
        </Link>
      </div>
    )
  }

  const handleReservation = () => {
    if (dateRange.from && dateRange.to && lieu && usage) {
      // Ici, vous implémenteriez la logique de réservation
      router.push(
        `/client/devis?equipement=${id}&debut=${dateRange.from.toISOString()}&fin=${dateRange.to.toISOString()}&lieu=${lieu}&usage=${usage}`,
      )
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/catalogue" className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={equipement.images[0] || "/placeholder.svg"}
              alt={equipement.nom}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {equipement.images.slice(1).map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${equipement.nom} - vue ${index + 2}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{equipement.nom}</h1>
          <div className="flex items-center text-zinc-500 mb-4">
            <span className="mr-4">{equipement.type}</span>
            <span>{equipement.puissance}</span>
          </div>

          <div className="text-2xl font-bold mb-6">
            {equipement.prix.toLocaleString()} FCFA <span className="text-sm font-normal text-zinc-500">/ jour</span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="reservation">Réservation</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <p>{equipement.description}</p>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Spécifications</h3>
                <ul className="space-y-2">
                  {equipement.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("reservation")}>Réserver maintenant</Button>
              </div>
            </TabsContent>
            <TabsContent value="reservation" className="space-y-4 pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Période de location</Label>
                    <DatePickerWithRange id="date-range" value={dateRange} onChange={setDateRange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lieu">Lieu de livraison</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-zinc-500" />
                      <Input
                        id="lieu"
                        placeholder="Adresse de livraison"
                        value={lieu}
                        onChange={(e) => setLieu(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usage">Type d&apos;usage</Label>
                    <Select value={usage} onValueChange={setUsage}>
                      <SelectTrigger id="usage">
                        <SelectValue placeholder="Sélectionnez un type d'usage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chantier">Chantier</SelectItem>
                        <SelectItem value="evenement">Événement</SelectItem>
                        <SelectItem value="domestique">Usage domestique</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={handleReservation}
                      disabled={!dateRange.from || !dateRange.to || !lieu || !usage}
                    >
                      Générer un devis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-zinc-500">
                  <Truck className="h-4 w-4" />
                  <span>Livraison et installation incluses</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-500">
                  <Calendar className="h-4 w-4" />
                  <span>Réservation flexible, annulation gratuite jusqu&apos;à 48h avant</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-500">
                  <Clock className="h-4 w-4" />
                  <span>Support technique disponible 24/7</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
