"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ShoppingBag, ArrowRight, Plus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function VenteAchatPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [etat, setEtat] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("prix-asc")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("achat")

  // Catégories principales
  const categories = [
    {
      id: "btp",
      name: "Engins BTP",
      subcategories: [
        { id: "levage", name: "Engins de Levage" },
        { id: "tractopelle", name: "Tractopelle" },
        { id: "chargeuses", name: "Chargeuses" },
        { id: "divers", name: "Engins et Outils Divers" },
      ],
    },
    {
      id: "vehicules",
      name: "Véhicules",
      subcategories: [
        { id: "avec-conducteur", name: "Avec Conducteur / Guide" },
        { id: "sans-conducteur", name: "Sans Conducteur" },
        { id: "co-voiturage", name: "Co-voiturage" },
      ],
    },
    {
      id: "energie",
      name: "Énergie",
      subcategories: [
        { id: "groupes-electrogenes", name: "Groupes Électrogènes" },
        { id: "panneaux-solaires", name: "Panneaux Solaires" },
      ],
    },
  ]

  // Données fictives pour les équipements à vendre
  const equipements = [
    {
      id: 1,
      nom: "Grue à tour 40m",
      type: "Grue",
      categorie: "btp",
      sousCategorie: "levage",
      prix: 15000000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "occasion",
      annee: 2018,
      vendeur: "Entreprise BTP Pro",
    },
    {
      id: 2,
      nom: "Tractopelle JCB 3CX",
      type: "Tractopelle",
      categorie: "btp",
      sousCategorie: "tractopelle",
      prix: 8000000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "neuf",
      annee: 2023,
      vendeur: "Machines BTP",
    },
    {
      id: 3,
      nom: "Chargeuse Caterpillar 950H",
      type: "Chargeuse",
      categorie: "btp",
      sousCategorie: "chargeuses",
      prix: 12000000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "occasion",
      annee: 2019,
      vendeur: "CAT Équipements",
    },
    {
      id: 4,
      nom: "Bétonnière 350L",
      type: "Bétonnière",
      categorie: "btp",
      sousCategorie: "divers",
      prix: 450000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "neuf",
      annee: 2023,
      vendeur: "Outils Pro",
    },
    {
      id: 5,
      nom: "Camion Benne",
      type: "Camion",
      categorie: "vehicules",
      sousCategorie: "sans-conducteur",
      prix: 9500000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "occasion",
      annee: 2020,
      vendeur: "Auto Transport",
    },
    {
      id: 6,
      nom: "Voiture Utilitaire",
      type: "Utilitaire",
      categorie: "vehicules",
      sousCategorie: "sans-conducteur",
      prix: 3500000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "occasion",
      annee: 2021,
      vendeur: "Auto Pro",
    },
    {
      id: 7,
      nom: "Groupe électrogène 20kVA",
      type: "Groupe électrogène",
      categorie: "energie",
      sousCategorie: "groupes-electrogenes",
      prix: 1200000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "neuf",
      annee: 2023,
      vendeur: "Énergie Solutions",
    },
    {
      id: 8,
      nom: "Panneau solaire 1000W",
      type: "Panneau solaire",
      categorie: "energie",
      sousCategorie: "panneaux-solaires",
      prix: 800000,
      image: "/placeholder.svg?height=200&width=300",
      etat: "neuf",
      annee: 2023,
      vendeur: "Solar Energy",
    },
  ]

  // Filtrer les équipements
  const filteredEquipements = equipements
    .filter(
      (equip) =>
        equip.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equip.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((equip) => equip.prix >= priceRange[0] && equip.prix <= priceRange[1])
    .filter(
      (equip) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(equip.categorie) ||
        selectedCategories.includes(equip.sousCategorie),
    )
    .filter((equip) => etat.length === 0 || etat.includes(equip.etat))
    .sort((a, b) => {
      if (sortBy === "prix-asc") return a.prix - b.prix
      if (sortBy === "prix-desc") return b.prix - a.prix
      if (sortBy === "nom-asc") return a.nom.localeCompare(b.nom)
      if (sortBy === "nom-desc") return b.nom.localeCompare(a.nom)
      if (sortBy === "annee-desc") return b.annee - a.annee
      if (sortBy === "annee-asc") return a.annee - b.annee
      return 0
    })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleEtatChange = (etatValue: string) => {
    setEtat((prev) => (prev.includes(etatValue) ? prev.filter((e) => e !== etatValue) : [...prev, etatValue]))
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Vente & Achat d&apos;Équipements</h1>
        </div>
        <p className="text-zinc-500">Achetez ou vendez des équipements professionnels de qualité</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Tabs defaultValue="achat" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achat">Acheter</TabsTrigger>
            <TabsTrigger value="vente">Vendre</TabsTrigger>
          </TabsList>
        </Tabs>

        <Link href={activeTab === "vente" ? "/partenaire/ajouter-annonce" : "/catalogue"}>
          <Button className="hidden sm:flex items-center gap-2">
            {activeTab === "vente" ? (
              <>
                <Plus className="h-4 w-4" />
                Publier une annonce
              </>
            ) : (
              <>
                Voir le catalogue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </Link>
      </div>

      {activeTab === "vente" ? (
        <div className="text-center py-12 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">Vendez vos équipements</h2>
          <p className="text-zinc-500">
            Publiez facilement vos annonces et touchez des milliers d&apos;acheteurs potentiels. Notre plateforme vous
            permet de vendre vos équipements en toute sécurité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="flex flex-col items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Créez votre annonce</h3>
              <p className="text-sm text-zinc-500 text-center mt-1">Ajoutez photos et description</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Recevez des offres</h3>
              <p className="text-sm text-zinc-500 text-center mt-1">Négociez avec les acheteurs</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Finalisez la vente</h3>
              <p className="text-sm text-zinc-500 text-center mt-1">Sécurisez votre transaction</p>
            </div>
          </div>
          <Link href="/partenaire/ajouter-annonce">
            <Button size="lg" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Publier une annonce
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres pour desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">Filtres</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Prix (FCFA)</h4>
                  <Slider
                    defaultValue={[0, 500000]}
                    max={20000000}
                    step={500000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{priceRange[0].toLocaleString()} FCFA</span>
                    <span className="text-xs">{priceRange[1].toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <Label htmlFor={category.id} className="font-medium">
                            {category.name}
                          </Label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={sub.id}
                                checked={selectedCategories.includes(sub.id)}
                                onCheckedChange={() => handleCategoryChange(sub.id)}
                              />
                              <Label htmlFor={sub.id}>{sub.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">État</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="neuf"
                        checked={etat.includes("neuf")}
                        onCheckedChange={() => handleEtatChange("neuf")}
                      />
                      <Label htmlFor="neuf">Neuf</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="occasion"
                        checked={etat.includes("occasion")}
                        onCheckedChange={() => handleEtatChange("occasion")}
                      />
                      <Label htmlFor="occasion">Occasion</Label>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("")
                    setPriceRange([0, 20000000])
                    setSelectedCategories([])
                    setEtat([])
                    setSortBy("prix-asc")
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
                    <SelectItem value="annee-desc">Année (récent)</SelectItem>
                    <SelectItem value="annee-asc">Année (ancien)</SelectItem>
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
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Prix (FCFA)</h4>
                        <Slider
                          defaultValue={[0, 500000]}
                          max={20000000}
                          step={500000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{priceRange[0].toLocaleString()} FCFA</span>
                          <span className="text-xs">{priceRange[1].toLocaleString()} FCFA</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Catégories</h4>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                              />
                              <Label htmlFor={`mobile-${category.id}`}>{category.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">État</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="neuf-mobile"
                              checked={etat.includes("neuf")}
                              onCheckedChange={() => handleEtatChange("neuf")}
                            />
                            <Label htmlFor="neuf-mobile">Neuf</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="occasion-mobile"
                              checked={etat.includes("occasion")}
                              onCheckedChange={() => handleEtatChange("occasion")}
                            />
                            <Label htmlFor="occasion-mobile">Occasion</Label>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSearchTerm("")
                          setPriceRange([0, 20000000])
                          setSelectedCategories([])
                          setEtat([])
                          setSortBy("prix-asc")
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
                      <img
                        src={equip.image || "/placeholder.svg"}
                        alt={equip.nom}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary">
                        {equip.etat === "neuf" ? "Neuf" : "Occasion"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{equip.nom}</h3>
                      <div className="flex flex-col space-y-1 text-sm text-zinc-500 mb-2">
                        <p>Catégorie: {categories.find((c) => c.id === equip.categorie)?.name}</p>
                        <p>Type: {equip.type}</p>
                        <p>Année: {equip.annee}</p>
                        <p>Vendeur: {equip.vendeur}</p>
                        <p className="font-medium text-black text-lg">{equip.prix.toLocaleString()} FCFA</p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/vente-achat/${equip.id}`} className="w-full">
                        <Button className="w-full">Voir détails</Button>
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
      )}
    </div>
  )
}
