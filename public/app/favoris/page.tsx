"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Trash2, Search, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function FavorisPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("tous")
  const [searchTerm, setSearchTerm] = useState("")

  // Données fictives pour les favoris
  const favoris = [
    {
      id: 1,
      nom: "Grue à tour 40m",
      type: "Grue",
      categorie: "btp",
      sousCategorie: "levage",
      prix: 150000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 2,
      nom: "Tractopelle JCB 3CX",
      type: "Tractopelle",
      categorie: "btp",
      sousCategorie: "tractopelle",
      prix: 8000000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "vente",
    },
    {
      id: 3,
      nom: "Groupe électrogène 20kVA",
      type: "Groupe électrogène",
      categorie: "energie",
      sousCategorie: "groupes-electrogenes",
      prix: 35000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
  ]

  // Filtrer les favoris
  const filteredFavoris = favoris
    .filter(
      (favori) =>
        favori.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        favori.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((favori) => activeTab === "tous" || favori.typeOffre === activeTab)

  const handleRemoveFavorite = (id: number) => {
    // Ici, vous implémenteriez la logique de suppression des favoris
    toast({
      title: "Favori supprimé",
      description: "L'élément a été retiré de vos favoris.",
    })
  }

  const handleAddToCart = (id: number) => {
    // Ici, vous implémenteriez la logique d'ajout au panier
    toast({
      title: "Ajouté au panier",
      description: "L'élément a été ajouté à votre panier.",
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Mes Favoris</h1>
        </div>
        <p className="text-zinc-500">Retrouvez tous les équipements que vous avez ajoutés à vos favoris</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <Tabs defaultValue="tous" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tous">Tous</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="vente">Vente</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredFavoris.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavoris.map((favori) => (
            <Card key={favori.id} className="overflow-hidden">
              <div className="relative">
                <img src={favori.image || "/placeholder.svg"} alt={favori.nom} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  {favori.typeOffre === "location" ? "Location" : "Vente"}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleRemoveFavorite(favori.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{favori.nom}</h3>
                <div className="flex flex-col space-y-1 text-sm text-zinc-500 mb-2">
                  <p>Catégorie: {favori.categorie.toUpperCase()}</p>
                  <p>Type: {favori.type}</p>
                  <p className="font-medium text-black">
                    {favori.prix.toLocaleString()} FCFA {favori.typeOffre === "location" ? "/ jour" : ""}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link href={`/client/catalogue/${favori.categorie}/${favori.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Voir détails
                  </Button>
                </Link>
                <Button className="flex-none" size="icon" onClick={() => handleAddToCart(favori.id)}>
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Aucun favori trouvé</h3>
          <p className="text-zinc-500 mt-2 mb-6">
            Vous n&apos;avez pas encore ajouté d&apos;équipements à vos favoris ou aucun ne correspond à votre
            recherche.
          </p>
          <Link href="/catalogue">
            <Button>Parcourir le catalogue</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
