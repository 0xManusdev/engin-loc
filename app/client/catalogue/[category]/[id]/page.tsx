"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Truck,
    Check,
    Heart,
    Share2,
    MessageCircle,
    ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function EquipementDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()

    const category = params.category as string
    const id = Number.parseInt(params.id as string)

    const [activeTab, setActiveTab] = useState("details")
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    })
    const [lieu, setLieu] = useState("")
    const [usage, setUsage] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    // Données fictives pour les équipements
    const equipements = [
        {
            id: 1,
            nom: "Grue à tour 40m",
            type: "Grue",
            categorie: "btp",
            sousCategorie: "levage",
            sousCategorieFine: "grues",
            prix: 150000,
            image: "/placeholder.svg?height=200&width=300",
            disponible: true,
            typeOffre: "location",
            description:
                "Grue à tour de 40 mètres de hauteur, idéale pour les chantiers de construction de grande envergure. Capacité de levage de 6 tonnes.",
            specifications: [
                "Hauteur: 40 mètres",
                "Capacité de levage: 6 tonnes",
                "Portée: 60 mètres",
                "Alimentation: Électrique",
                "Dimensions base: 6 x 6 mètres",
                "Poids: 80 tonnes",
            ],
            images: [
                "/placeholder.svg?height=400&width=600",
                "/placeholder.svg?height=400&width=600",
                "/placeholder.svg?height=400&width=600",
            ],
            vendeur: {
                nom: "Entreprise BTP Pro",
                note: 4.8,
                avis: 24,
            },
        },
        {
            id: 7,
            nom: "Groupe électrogène 20kVA",
            type: "Groupe électrogène",
            categorie: "energie",
            sousCategorie: "groupes-electrogenes",
            prix: 35000,
            image: "/placeholder.svg?height=200&width=300",
            disponible: true,
            typeOffre: "vente",
            description:
                "Groupe électrogène diesel de 20kVA, parfait pour les chantiers de taille moyenne et les événements. Autonomie de 12 heures à pleine charge.",
            specifications: [
                "Puissance: 20kVA",
                "Carburant: Diesel",
                "Autonomie: 12 heures",
                "Niveau sonore: 72 dB",
                "Dimensions: 120 x 80 x 95 cm",
                "Poids: 320 kg",
            ],
            images: [
                "/placeholder.svg?height=400&width=600",
                "/placeholder.svg?height=400&width=600",
                "/placeholder.svg?height=400&width=600",
            ],
            vendeur: {
                nom: "Énergie Solutions",
                note: 4.5,
                avis: 18,
            },
        },
    ]

    const equipement = equipements.find((e) => e.id === id)

    if (!equipement) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Équipement non trouvé</h1>
                <p className="mb-6">L&apos;équipement que vous recherchez n&apos;existe pas.</p>
                <Link href={`/client/catalogue/${category}`}>
                    <Button>Retour à la catégorie</Button>
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

    const handleAchat = () => {
        // Ici, vous implémenteriez la logique d'achat
        toast({
            title: "Ajouté au panier",
            description: `${equipement.nom} a été ajouté à votre panier.`,
        })
    }

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        toast({
            title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
            description: `${equipement.nom} a été ${isFavorite ? "retiré de" : "ajouté à"} votre liste de favoris.`,
        })
    }

    const handleShare = () => {
        // Ici, vous implémenteriez la logique de partage
        toast({
            title: "Lien copié",
            description: "Le lien a été copié dans votre presse-papiers.",
        })
    }

    const handleContact = () => {
        // Ici, vous implémenteriez la logique de contact
        router.push(`/messages?vendeur=${equipement.vendeur.nom}`)
    }

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Link href={`/client/catalogue/${category}`} className="flex items-center text-zinc-500 hover:text-zinc-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la catégorie
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
                    <div className="flex items-center justify-between mb-2">
                        <Badge className={equipement.typeOffre === "location" ? "bg-primary" : "bg-secondary"}>
                            {equipement.typeOffre === "location" ? "Location" : "Vente"}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={handleFavorite}>
                                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                <span className="sr-only">Ajouter aux favoris</span>
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleShare}>
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Partager</span>
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">{equipement.nom}</h1>
                    <div className="flex items-center text-zinc-500 mb-4">
                        <span className="mr-4">{equipement.type}</span>
                        <span>Catégorie: {equipement.categorie.toUpperCase()}</span>
                    </div>

                    <div className="text-2xl font-bold mb-2">
                        {equipement.prix.toLocaleString()} FCFA{" "}
                        <span className="text-sm font-normal text-zinc-500">
                            {equipement.typeOffre === "location" ? "/ jour" : ""}
                        </span>
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(equipement.vendeur.note) ? "text-yellow-300" : "text-gray-300"}`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))}
                            <p className="ml-2 text-sm font-medium text-gray-500">
                                {equipement.vendeur.note} sur 5 ({equipement.vendeur.avis} avis)
                            </p>
                        </div>
                        <span className="mx-2 text-zinc-300">|</span>
                        <span className="text-sm text-zinc-500">Vendeur: {equipement.vendeur.nom}</span>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Détails</TabsTrigger>
                            {equipement.typeOffre === "location" ? (
                                <TabsTrigger value="reservation">Réservation</TabsTrigger>
                            ) : (
                                <TabsTrigger value="achat">Achat</TabsTrigger>
                            )}
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
                                <Button onClick={() => setActiveTab(equipement.typeOffre === "location" ? "reservation" : "achat")}>
                                    {equipement.typeOffre === "location" ? "Réserver maintenant" : "Acheter maintenant"}
                                </Button>
                            </div>
                        </TabsContent>

                        {equipement.typeOffre === "location" ? (
                            <TabsContent value="reservation" className="space-y-4 pt-4">
                                <Card>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date-range">Période de location</Label>
                                            <DatePickerWithRange
                                                id="date-range"
                                                value={dateRange}
                                                onChange={(date) => {
                                                    if (date) {
                                                        setDateRange({
                                                            from: date.from,
                                                            to: date.to || undefined
                                                        })
                                                    }
                                                }}
                                            />
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
                                                    <SelectItem value="industriel">Usage industriel</SelectItem>
                                                    <SelectItem value="autre">Autre</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="pt-4 flex gap-2">
                                            <Button
                                                className="flex-1"
                                                onClick={handleReservation}
                                                disabled={!dateRange.from || !dateRange.to || !lieu || !usage}
                                            >
                                                Générer un devis
                                            </Button>
                                            <Button variant="outline" className="flex-none" onClick={handleContact}>
                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                Contacter
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
                        ) : (
                            <TabsContent value="achat" className="space-y-4 pt-4">
                                <Card>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="quantity">Quantité</Label>
                                            <div className="flex items-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    disabled={quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                                <Input
                                                    id="quantity"
                                                    type="number"
                                                    min="1"
                                                    className="w-16 mx-2 text-center"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                                                />
                                                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                                    +
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="lieu-livraison">Lieu de livraison</Label>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="lieu-livraison"
                                                    placeholder="Adresse de livraison"
                                                    value={lieu}
                                                    onChange={(e) => setLieu(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex gap-2">
                                            <Button className="flex-1" onClick={handleAchat}>
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Ajouter au panier
                                            </Button>
                                            <Button variant="outline" className="flex-none" onClick={handleContact}>
                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                Contacter
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-zinc-500">
                                        <Truck className="h-4 w-4" />
                                        <span>Livraison disponible dans tout le pays</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-zinc-500">
                                        <Check className="h-4 w-4" />
                                        <span>Garantie 12 mois incluse</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-zinc-500">
                                        <Clock className="h-4 w-4" />
                                        <span>Service après-vente disponible</span>
                                    </div>
                                </div>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
