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
import { useGetAllMachines } from "@/hooks/use-machines"
import { useGetAllCategories } from "@/hooks/use-categories"

export default function CategoryPage() {
    const params = useParams()
    const category = params.category as string

    // Récupération des données depuis l'API
    const { data: machinesResponse, isLoading: machinesLoading } = useGetAllMachines()
    const { data: categoriesResponse, isLoading: categoriesLoading } = useGetAllCategories()

    // Extraction des données
    const machines = machinesResponse || []
    const categories = categoriesResponse?.data || []

    const [searchTerm, setSearchTerm] = useState("")
    // const [priceRange, setPriceRange] = useState([0, 50000]) // Temporairement désactivé
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
    const [disponibilite, setDisponibilite] = useState(false)
    const [sortBy, setSortBy] = useState("nom-asc")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("location")

    // Fonction pour obtenir le nom de la catégorie
    const getCategoryName = (categoryId: number) => {
        const category = categories.find(cat => cat.id === categoryId)
        return category ? category.nom : "Catégorie inconnue"
    }

    // Fonction pour obtenir le nom de la sous-catégorie
    const getSubCategoryName = (subCategoryId: number) => {
        // On cherche dans toutes les catégories pour trouver la sous-catégorie
        for (const category of categories) {
            const subCategory = category.subCategories?.find(sub => sub.id === subCategoryId)
            if (subCategory) {
                return subCategory.nom
            }
        }
        return "Sous-catégorie inconnue"
    }

    // Filtrer les machines par catégorie
    const categoryMachines = machines.filter((machine) => {
        // On filtre par le nom de la catégorie dans l'URL
        const machineCategory = getCategoryName(machine.subCategory.categoryId)
        return machineCategory.toLowerCase().includes(category.toLowerCase())
    })

    // Filtrer les machines
    const filteredMachines = categoryMachines
        .filter(
            (machine) =>
                machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                machine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCategoryName(machine.subCategory.categoryId).toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((machine) => {
            // Filtrage par disponibilité basée sur l'état
            if (disponibilite) {
                return machine.state === "AVAILABLE"
            }
            return true
        })
        .filter((machine) => {
            // Filtrage par sous-catégorie
            if (selectedSubcategories.length === 0) return true
            return selectedSubcategories.includes(machine.subCategoryId.toString()) ||
                   selectedSubcategories.includes(machine.subCategory.categoryId.toString())
        })
        .sort((a, b) => {
            // Tri par nom
            if (sortBy === "nom-asc") return a.name.localeCompare(b.name)
            if (sortBy === "nom-desc") return b.name.localeCompare(a.name)
            // Tri par nom par défaut
            return a.name.localeCompare(b.name)
        })

    const handleSubcategoryChange = (subcategory: string) => {
        setSelectedSubcategories((prev) =>
            prev.includes(subcategory) ? prev.filter((c) => c !== subcategory) : [...prev, subcategory],
        )
    }

    // État de chargement
    if (machinesLoading || categoriesLoading) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
                <p className="mb-6">Récupération des données en cours.</p>
            </div>
        )
    }

    // Vérifier si la catégorie existe
    const categoryExists = categories.some(cat => 
        cat.nom.toLowerCase().includes(category.toLowerCase())
    )

    if (!categoryExists) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
                <p className="mb-6">La catégorie que vous recherchez n&apos;existe pas.</p>
                <Link href="/client/catalogue">
                    <Button>Retour au catalogue</Button>
                </Link>
            </div>
        )
    }

    // Obtenir le nom de la catégorie pour l'affichage
    const currentCategoryName = categories.find(cat => 
        cat.nom.toLowerCase().includes(category.toLowerCase())
    )?.nom || category

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Link href="/client/catalogue" className="flex items-center text-zinc-500 hover:text-zinc-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>

            <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Tool className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">{currentCategoryName}</h1>
                </div>
                <p className="text-zinc-500">
                    Découvrez notre sélection de {currentCategoryName.toLowerCase()} disponibles à la location et à la vente
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

                            {/* Prix temporairement désactivé - à adapter selon vos besoins */}
                            {/* <div className="space-y-2">
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
                            </div> */}

                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Sous-catégories</h4>
                                <div className="space-y-2">
                                    {/* On affiche les sous-catégories disponibles dans cette catégorie */}
                                    {Array.from(new Set(categoryMachines.map(m => m.subCategoryId))).map((subCategoryId) => {
                                        const subCategoryName = getSubCategoryName(subCategoryId)
                                        
                                        return (
                                            <div key={subCategoryId} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={subCategoryId.toString()}
                                                    checked={selectedSubcategories.includes(subCategoryId.toString())}
                                                    onCheckedChange={() => handleSubcategoryChange(subCategoryId.toString())}
                                                />
                                                <Label htmlFor={subCategoryId.toString()}>
                                                    {subCategoryName}
                                                </Label>
                                            </div>
                                        )
                                    })}
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
                                    // setPriceRange([0, 200000]) // Temporairement désactivé
                                    setSelectedSubcategories([])
                                    setDisponibilite(false)
                                    setSortBy("nom-asc")
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

                                        {/* Prix temporairement désactivé - à adapter selon vos besoins */}
                                        {/* <div className="space-y-2">
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
                                        </div> */}

                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium">Sous-catégories</h4>
                                            <div className="space-y-2">
                                                {Array.from(new Set(categoryMachines.map(m => m.subCategoryId))).map((subCategoryId) => {
                                                    const subCategoryName = getSubCategoryName(subCategoryId)
                                                    
                                                    return (
                                                        <div key={subCategoryId} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`mobile-${subCategoryId}`}
                                                                checked={selectedSubcategories.includes(subCategoryId.toString())}
                                                                onCheckedChange={() => handleSubcategoryChange(subCategoryId.toString())}
                                                            />
                                                            <Label htmlFor={`mobile-${subCategoryId}`}>
                                                                {subCategoryName}
                                                            </Label>
                                                        </div>
                                                    )
                                                })}
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
                                                // setPriceRange([0, 200000]) // Temporairement désactivé
                                                setSelectedSubcategories([])
                                                setDisponibilite(false)
                                                setSortBy("nom-asc")
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

                    {filteredMachines.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMachines.map((machine) => (
                                <Card key={machine.id} className="overflow-hidden">
                                    <div className="relative">
                                        <img 
                                            src={machine.images && machine.images.length > 0 ? machine.images[0].imageUrl : "/placeholder.svg"} 
                                            alt={machine.images && machine.images.length > 0 ? machine.images[0].altText : machine.name} 
                                            className="w-full h-48 object-cover" 
                                        />
                                        {machine.state !== "AVAILABLE" && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Non disponible
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                                            Location
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-1">{machine.name}</h3>
                                        <div className="flex flex-col space-y-1 text-sm text-zinc-500 mb-2">
                                            <p>Catégorie: {getCategoryName(machine.subCategory.categoryId)}</p>
                                            <p>Sous-catégorie: {getSubCategoryName(machine.subCategoryId)}</p>
                                            <p>Marque: {machine.brand.nom}</p>
                                            <p>Localisation: {machine.location}</p>
                                            <p className="font-medium text-black">
                                                {machine.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Link href={`/client/catalogue/details/${machine.id}`} className="w-full">
                                            <Button className="w-full" disabled={machine.state !== "AVAILABLE"}>
                                                {machine.state === "AVAILABLE" ? "Voir détails" : "Indisponible"}
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
