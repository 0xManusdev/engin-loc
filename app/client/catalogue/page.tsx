"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, PenToolIcon as Tool, Car, Zap, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CataloguePage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [priceRange, setPriceRange] = useState([0, 50000])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [disponibilite, setDisponibilite] = useState(false)
	const [sortBy, setSortBy] = useState("prix-asc")
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("location")

	// Catégories principales
	const categories = [
		{
			id: "btp",
			name: "Engins BTP",
			icon: Tool,
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
			icon: Car,
			subcategories: [
				{ id: "avec-conducteur", name: "Avec Conducteur / Guide" },
				{ id: "sans-conducteur", name: "Sans Conducteur" },
				{ id: "co-voiturage", name: "Co-voiturage" },
			],
		},
		{
			id: "energie",
			name: "Énergie",
			icon: Zap,
			subcategories: [
				{ id: "groupes-electrogenes", name: "Groupes Électrogènes" },
				{ id: "panneaux-solaires", name: "Panneaux Solaires" },
			],
		},
	]

	// Données fictives pour les équipements
	const equipements = [
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
			prix: 80000,
			image: "/placeholder.svg?height=200&width=300",
			disponible: true,
			typeOffre: "location",
		},
		{
			id: 3,
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
			id: 4,
			nom: "Bétonnière 350L",
			type: "Bétonnière",
			categorie: "btp",
			sousCategorie: "divers",
			prix: 15000,
			image: "/placeholder.svg?height=200&width=300",
			disponible: true,
			typeOffre: "location",
		},
		{
			id: 5,
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
			id: 6,
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
			id: 7,
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
			id: 8,
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
		.filter((equip) => !disponibilite || equip.disponible)
		.filter((equip) => activeTab === "tous" || equip.typeOffre === activeTab)
		.sort((a, b) => {
			if (sortBy === "prix-asc") return a.prix - b.prix
			if (sortBy === "prix-desc") return b.prix - a.prix
			if (sortBy === "nom-asc") return a.nom.localeCompare(b.nom)
			if (sortBy === "nom-desc") return b.nom.localeCompare(a.nom)
			return 0
		})

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
		)
	}

	return (
		<div className="container py-8">
			<div className="mb-8 space-y-4">
				<h1 className="text-3xl font-bold">Catalogue d&apos;équipements</h1>
				<p className="text-zinc-500">
					Découvrez notre sélection d&apos;équipements disponibles à la location et à la vente
				</p>
			</div>

			{/* Catégories principales */}
			{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{categories.map((category) => (
					<Link key={category.id} href={`/catalogue/${category.id}`}>
						<Card className="overflow-hidden transition-all hover:shadow-lg">
							<div className="aspect-video relative bg-primary/10">
								<div className="absolute inset-0 flex items-center justify-center">
									<category.icon className="h-16 w-16 text-primary" />
								</div>
							</div>
							<CardContent className="p-4 text-center">
								<h3 className="text-xl font-bold">{category.name}</h3>
								<p className="text-sm text-zinc-500 mt-1">{category.subcategories.map((sub) => sub.name).join(", ")}</p>
							</CardContent>
							<CardFooter className="p-4 pt-0 flex justify-center">
								<Button variant="ghost" size="sm" className="gap-1">
									Voir les équipements
									<ArrowRight className="h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div> */}

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
									setSelectedCategories([])
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
											<h4 className="text-sm font-medium">Catégories</h4>
											<div className="space-y-2">
												{categories.map((category) => (
													<div key={category.id} className="space-y-1">
														<div className="flex items-center space-x-2">
															<Checkbox
																id={`mobile-${category.id}`}
																checked={selectedCategories.includes(category.id)}
																onCheckedChange={() => handleCategoryChange(category.id)}
															/>
															<Label htmlFor={`mobile-${category.id}`} className="font-medium">
																{category.name}
															</Label>
														</div>
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
												setSelectedCategories([])
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
											<p>Catégorie: {categories.find((c) => c.id === equip.categorie)?.name}</p>
											<p>Type: {equip.type}</p>
											<p className="font-medium text-black">
												{equip.prix.toLocaleString()} FCFA {equip.typeOffre === "location" ? "/ jour" : ""}
											</p>
										</div>
									</CardContent>
									<CardFooter className="p-4 pt-0">
										<Link href={`/catalogue/details/${equip.id}`} className="w-full">
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
