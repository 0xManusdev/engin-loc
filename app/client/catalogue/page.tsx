"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, PenToolIcon as Tool, Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllMachines } from "@/hooks/use-machines"
import { useGetAllCategories } from "@/hooks/use-categories"

export default function CataloguePage() {
	// États locaux pour la gestion des filtres et de l'interface
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [disponibilite, setDisponibilite] = useState(false)
	const [sortBy, setSortBy] = useState("nom-asc")
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("location")

	// Récupération des données depuis l'API
	const { data: machinesResponse, isLoading: machinesLoading } = useGetAllMachines()
	const { data: categoriesResponse, isLoading: categoriesLoading } = useGetAllCategories()

	// Extraction des données
	const machines = machinesResponse || []
	const categories =
		Array.isArray(categoriesResponse?.data)
			? categoriesResponse?.data
			: Array.isArray(categoriesResponse?.data?.categories)
				? categoriesResponse?.data.categories
				: []

	console.log('categories', categories)


	// Création des catégories avec sous-catégories pour l'affichage
	interface SubCategory {
		id: number
		nom: string
		description?: string
	}

	interface Category {
		id: number
		nom: string
		subCategories?: SubCategory[]
	}

	interface CategoryWithSubcategories {
		id: string
		name: string
		icon: typeof Tool
		subcategories: SubCategoryWithDescription[]
	}

	interface SubCategoryWithDescription {
		id: string
		name: string
		description?: string
	}

	const categoriesWithSubcategories: CategoryWithSubcategories[] = categories.map((category: Category) => ({
		id: `cat-${category.id}`,
		name: category.nom,
		icon: Tool, // Icône par défaut, vous pouvez adapter selon la catégorie
		subcategories: category.subCategories?.map((sub: SubCategory) => ({
			id: `sub-${sub.id}`,
			name: sub.nom,
			description: sub.description
		})) || []
	}))

	// Fonction pour obtenir le nom de la catégorie
	const getCategoryName = (categoryId: number) => {
		const category = categories.find(cat => cat.id === categoryId)
		return category ? category.nom : "Catégorie inconnue"
	}

	// Fonction pour obtenir le nom de la sous-catégorie
	const getSubCategoryName = (subCategoryId: number) => {
		// On cherche dans toutes les catégories pour trouver la sous-catégorie
		for (const category of categories) {
			const subCategory = category.subCategories?.find((sub: SubCategory) => sub.id === subCategoryId)
			if (subCategory) {
				return subCategory.nom
			}
		}
		return "Sous-catégorie inconnue"
	}

	const filteredMachines = machines
		.filter((machine) => {
			const q = searchTerm.toLowerCase();
			const name = machine.name.toLowerCase();
			const desc = (machine.description ?? '').toLowerCase();
			const catName = getCategoryName(machine.subCategory?.categoryId ?? -1).toLowerCase();
			const subcatName = getSubCategoryName(machine.subCategoryId).toLowerCase();

			return (
				name.includes(q) ||
				desc.includes(q) ||
				catName.includes(q) ||
				subcatName.includes(q)
			);
		})
		.filter((machine) => (disponibilite ? machine.state === 'AVAILABLE' : true))
		.filter((machine) => {
			if (selectedCategories.length === 0) return true;

			const subKey = `sub-${machine.subCategoryId}`;
			const catKey = `cat-${machine.subCategory?.categoryId ?? ''}`;

			return selectedCategories.includes(subKey) || selectedCategories.includes(catKey);
		})
		.sort((a, b) => (sortBy === 'nom-desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));


	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
		)
	}

	// État de chargement
	// if (machinesLoading || categoriesLoading) {
	// 	return (
	// 		<div className="flex-1 items-center justify-center py-8">
	// 			<div className="flex justify-center items-center">
	// 				<div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
	// 			</div>
	// 		</div>
	// 	)
	// }

	return (
		<div className="container py-8">
			<div className="mb-8 space-y-4">
				<h1 className="text-3xl font-bold">Catalogue d&apos;équipements</h1>
				<p className="text-zinc-500">
					Découvrez notre sélection d&apos;équipements disponibles à la location et à la vente
				</p>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Filtres pour desktop */}
				<div className="hidden md:block w-64 space-y-6">
					<div className="rounded-lg border p-4">
						<h3 className="font-medium mb-4">Filtres</h3>

						<div className="space-y-6">
							<div className="space-y-2">
								<h4 className="text-sm font-medium">Catégories</h4>
								<div className="space-y-2">
									{categoriesWithSubcategories.map((category) => (
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
											{category.subcategories.length > 0 && (
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
									setSelectedCategories([])
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

										<div className="space-y-2">
											<h4 className="text-sm font-medium">Catégories</h4>
											<div className="space-y-2">
												{categoriesWithSubcategories.map((category) => (
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
												setSelectedCategories([])
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
					{
						machinesLoading ? (
							<div className="flex items-center justify-center py-8">
								<div className="flex justify-center items-center">
									<div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
								</div>
							</div>
						) : filteredMachines.length > 0 ? (
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
											<div className="absolute top-2 left-2 rounded-full bg-primary text-white text-xs px-2 py-1">
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
						)
					}
				</div>
			</div>
		</div>
	)
}
