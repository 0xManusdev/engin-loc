"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Search, Filter, PenToolIcon as Tool, Car, Zap, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [disponibilite, setDisponibilite] = useState(false)
  const [sortBy, setSortBy] = useState("prix-asc")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("location")

  // Catégories et sous-catégories
  const categories = {
    btp: {
      name: "Engins BTP",
      icon: Tool,
      subcategories: [
        {
          id: "levage",
          name: "Engins de Levage",
          children: [
            { id: "grues", name: "Grues" },
            { id: "chariot-elevateur", name: "Chariot Élévateur" },
          ],
        },
        { id: "tractopelle", name: "Tractopelle" },
        { id: "chargeuses", name: "Chargeuses" },
        {
          id: "divers",
          name: "Engins et Outils Divers",
          children: [
            { id: "porte-engins", name: "Porte Engins" },
            { id: "betonniere", name: "Bétonnière" },
          ],
        },
      ],
    },
    vehicules: {
      name: "Véhicules",
      icon: Car,
      subcategories: [
        { id: "avec-conducteur", name: "Avec Conducteur / Guide" },
        { id: "sans-conducteur", name: "Sans Conducteur" },
        {
          id: "co-voiturage",
          name: "Co-voiturage",
          children: [
            { id: "quartier", name: "Quartier" },
            { id: "itineraire", name: "Itinéraire", children: [{ id: "quartier-itineraire", name: "Quartier" }] },
          ],
        },
      ],
    },
    energie: {
      name: "Énergie",
      icon: Zap,
      subcategories: [
        { id: "groupes-electrogenes", name: "Groupes Électrogènes" },
        { id: "panneaux-solaires", name: "Panneaux Solaires" },
      ],
    },
  }

  const currentCategory = categories[category as keyof typeof categories]

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
    },
    {
      id: 2,
      nom: "Chariot élévateur 3T",
      type: "Chariot élévateur",
      categorie: "btp",
      sousCategorie: "levage",
      sousCategorieFine: "chariot-elevateur",
      prix: 50000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 3,
      nom: "Tractopelle JCB 3CX",
      type: "Tractopelle",
      categorie: "btp",
      sousCategorie: "tractopelle",
      prix: 80000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 4,
      nom: "Chargeuse Caterpillar 950H",
      type: "Chargeuse",
      categorie: "btp",
      sousCategorie: "chargeuses",
      prix: 120000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "vente",
    },
    {
      id: 5,
      nom: "Porte-engins 3 essieux",
      type: "Porte-engins",
      categorie: "btp",
      sousCategorie: "divers",
      sousCategorieFine: "porte-engins",
      prix: 90000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: false,
      typeOffre: "location",
    },
    {
      id: 6,
      nom: "Bétonnière 350L",
      type: "Bétonnière",
      categorie: "btp",
      sousCategorie: "divers",
      sousCategorieFine: "betonniere",
      prix: 15000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 7,
      nom: "Camion Benne avec Chauffeur",
      type: "Camion",
      categorie: "vehicules",
      sousCategorie: "avec-conducteur",
      prix: 45000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 8,
      nom: "Voiture Utilitaire",
      type: "Utilitaire",
      categorie: "vehicules",
      sousCategorie: "sans-conducteur",
      prix: 25000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: false,
      typeOffre: "location",
    },
    {
      id: 9,
      nom: "Co-voiturage Quartier Nord",
      type: "Co-voiturage",
      categorie: "vehicules",
      sousCategorie: "co-voiturage",
      sousCategorieFine: "quartier",
      prix: 5000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 10,
      nom: "Co-voiturage Itinéraire Centre-Ville",
      type: "Co-voiturage",
      categorie: "vehicules",
      sousCategorie: "co-voiturage",
      sousCategorieFine: "itineraire",
      sousCategorieTres: "quartier-itineraire",
      prix: 7000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
    {
      id: 11,
      nom: "Groupe électrogène 20kVA",
      type: "Groupe électrogène",
      categorie: "energie",
      sousCategorie: "groupes-electrogenes",
      prix: 35000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "vente",
    },
    {
      id: 12,
      nom: "Panneau solaire 1000W",
      type: "Panneau solaire",
      categorie: "energie",
      sousCategorie: "panneaux-solaires",
      prix: 20000,
      image: "/placeholder.svg?height=200&width=300",
      disponible: true,
      typeOffre: "location",
    },
  ]

  // Filtrer les équipements par catégorie
  const categoryEquipements = equipements.filter((equip) => equip.categorie === category)

  // Filtrer les équipements
  const filteredEquipements = categoryEquipements
    .filter(
      (equip) =>
        equip.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equip.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((equip) => equip.prix >= priceRange[0] && equip.prix <= priceRange[1])
    .filter(
      (equip) =>
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(equip.sousCategorie) ||
        selectedSubcategories.includes(equip.sousCategorieFine) ||
        selectedSubcategories.includes(equip.sousCategorieTres),
    )
    .filter((equip) => !disponibilite || equip.disponible)
    .filter((equip) => activeTab === "tous" || equip.typeOffre === activeTab)
    .sort((a, b) => {
      if (sortBy === "prix-asc") return a.prix - b.prix
      if (sortBy === "prix-desc") return b.prix - a.prix
      if (sortBy === "nom-asc") return a.nom.localeCompare(b.nom)
      if (sortBy === "nom-desc") return b.nom.localeCompare(a.nom)
      return 0
    })

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((c) => c !== subcategory) : [...prev, subcategory],
    )
  }

  if (!currentCategory) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
        <p className="mb-6">La catégorie que vous recherchez n&apos;existe pas.</p>
        <Link href="/catalogue">
          <Button>Retour au catalogue</Button>
        </Link>
      </div>
    )
  }

  const CategoryIcon = currentCategory.icon

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/catalogue" className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au catalogue
        </Link>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <CategoryIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
        </div>
        <p className="text-zinc-500">
          Découvrez notre sélection de {currentCategory.name.toLowerCase()} disponibles à la location et à la vente
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtres pour desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-4">Filtres</h3>

            <div className="space-y-6">
              <Tabs defaultValue="location" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="vente">Vente</TabsTrigger>
                  <TabsTrigger value="tous">Tous</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Prix (FCFA)</h4>
                <Slider
                  defaultValue={[0, 50000]}
                  max={200000}
                  step={5000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs">{priceRange[0]} FCFA</span>
                  <span className="text-xs">{priceRange[1]} FCFA</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sous-catégories</h4>
                <div className="space-y-2">
                  {currentCategory.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={subcategory.id}
                          checked={selectedSubcategories.includes(subcategory.id)}
                          onCheckedChange={() => handleSubcategoryChange(subcategory.id)}
                        />
                        <Label htmlFor={subcategory.id} className="font-medium">
                          {subcategory.name}
                        </Label>
                      </div>
                      {subcategory.children && (
                        <div className="ml-6 space-y-1">
                          {subcategory.children.map((child) => (
                            <div key={child.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={child.id}
                                checked={selectedSubcategories.includes(child.id)}
                                onCheckedChange={() => handleSubcategoryChange(child.id)}
                              />
                              <Label htmlFor={child.id}>{child.name}</Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Disponibilité</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="disponible"
                    checked={disponibilite}
                    onCheckedChange={(checked) => setDisponibilite(checked as boolean)}
                  />
                  <Label htmlFor="disponible">Disponible uniquement</Label>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setPriceRange([0, 200000])
                  setSelectedSubcategories([])
                  setDisponibilite(false)
                  setSortBy("prix-asc")
                  setActiveTab("location")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Rechercher un équipement..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prix-asc">Prix (croissant)</SelectItem>
                  <SelectItem value="prix-desc">Prix (décroissant)</SelectItem>
                  <SelectItem value="nom-asc">Nom (A-Z)</SelectItem>
                  <SelectItem value="nom-desc">Nom (Z-A)</SelectItem>
                </SelectContent>
              </Select>

              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filtres</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                    <SheetDescription>Affinez votre recherche d&apos;équipements</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 py-4">
                    <Tabs defaultValue="location" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="location">Location</TabsTrigger>
                        <TabsTrigger value="vente">Vente</TabsTrigger>
                        <TabsTrigger value="tous">Tous</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Prix (FCFA)</h4>
                      <Slider
                        defaultValue={[0, 50000]}
                        max={200000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{priceRange[0]} FCFA</span>
                        <span className="text-xs">{priceRange[1]} FCFA</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sous-catégories</h4>
                      <div className="space-y-2">
                        {currentCategory.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-${subcategory.id}`}
                              checked={selectedSubcategories.includes(subcategory.id)}
                              onCheckedChange={() => handleSubcategoryChange(subcategory.id)}
                            />
                            <Label htmlFor={`mobile-${subcategory.id}`}>{subcategory.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Disponibilité</h4>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disponible-mobile"
                          checked={disponibilite}
                          onCheckedChange={(checked) => setDisponibilite(checked as boolean)}
                        />
                        <Label htmlFor="disponible-mobile">Disponible uniquement</Label>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm("")
                        setPriceRange([0, 200000])
                        setSelectedSubcategories([])
                        setDisponibilite(false)
                        setSortBy("prix-asc")
                        setActiveTab("location")
                        setIsFilterOpen(false)
                      }}
                    >
                      Réinitialiser les filtres
                    </Button>

                    <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                      Appliquer les filtres
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {filteredEquipements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipements.map((equip) => (
                <Card key={equip.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={equip.image || "/placeholder.svg"} alt={equip.nom} className="w-full h-48 object-cover" />
                    {!equip.disponible && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Non disponible
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      {equip.typeOffre === "location" ? "Location" : "Vente"}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{equip.nom}</h3>
                    <div className="flex flex-col space-y-1 text-sm text-zinc-500 mb-2">
                      <p>Type: {equip.type}</p>
                      <p>
                        Sous-catégorie: {currentCategory.subcategories.find((s) => s.id === equip.sousCategorie)?.name}
                      </p>
                      <p className="font-medium text-black">
                        {equip.prix.toLocaleString()} FCFA {equip.typeOffre === "location" ? "/ jour" : ""}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/client/catalogue/details/${equip.id}`} className="w-full">
                      <Button className="w-full" disabled={!equip.disponible}>
                        {equip.disponible ? "Voir détails" : "Indisponible"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Aucun équipement trouvé</h3>
              <p className="text-zinc-500 mt-2">Essayez de modifier vos filtres de recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
