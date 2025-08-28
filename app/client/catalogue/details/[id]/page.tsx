"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Truck, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateReservation, useGetMachineById } from "@/hooks/use-machines"
import { useAuthStore } from "@/store/auth"

// Import du type DateRange depuis react-day-picker
import type { DateRange } from "react-day-picker"

export default function MachineDetailPage() {
    const router = useRouter()
    const params = useParams()
    const { user, isAuthenticated } = useAuthStore()
    const createReservation = useCreateReservation()

    const idParam = Array.isArray(params.id) ? params.id[0] : params.id
    const id = Number.parseInt(idParam as string)

    // Validation que l'ID est un nombre valide
    if (!idParam || isNaN(id)) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">ID invalide</h1>
                <p className="mb-6">L'identifiant de la machine n'est pas valide.</p>
                <Link href="/client/catalogue">
                    <Button>Retour au catalogue</Button>
                </Link>
            </div>
        )
    }

    // Récupération de la machine depuis l'API via le hook useGetMachineById
    const { data: machine, isLoading, error } = useGetMachineById(id)

    const [activeTab, setActiveTab] = useState("details")
    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    })
    const [lieu, setLieu] = useState("")
    const [usage, setUsage] = useState("")

    // État de chargement
    if (isLoading) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
                <p className="mb-6">Récupération des détails de la machine en cours.</p>
            </div>
        )
    }

    // Gestion des erreurs
    if (error || !machine) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Machine non trouvée</h1>
                <p className="mb-6">La machine que vous recherchez n&apos;existe pas ou n&apos;a pas pu être chargée.</p>
                <Link href="/client/catalogue">
                    <Button>Retour au catalogue</Button>
                </Link>
            </div>
        )
    }

    const handleReservation = async () => {
        if (!dateRange.from || !dateRange.to || !lieu || !usage) return

        if (!isAuthenticated || !user) {
            router.push(`/inscription?redirect=/client/catalogue/details/${id}`)
            return
        }

        const payload = {
            clientId: user.id,
            machineId: id,
            startDate: dateRange.from.toISOString(),
            endDate: dateRange.to.toISOString(),
            deliveryAddress: lieu,
            usageType: usage.toUpperCase() as any,
            whatsappPhone: user.phone,
        }

        try {
            await createReservation.mutateAsync(payload)
        } catch (err) {
            // handled in hook toast
        }
    }

    // Fonction pour obtenir le nom de la catégorie
    const getCategoryName = () => {
        return machine.subCategory?.nom || "Catégorie inconnue"
    }

    // Fonction pour obtenir le nom de la marque
    const getBrandName = () => {
        return machine.brand?.nom || "Marque inconnue"
    }

    // Fonction pour obtenir les images
    const getImages = () => {
        if (machine.images && machine.images.length > 0) {
            return machine.images
        }
        return [{ imageUrl: "/placeholder.svg", altText: machine.name }]
    }

    // Fonction pour vérifier la disponibilité
    const isAvailable = () => {
        return machine.state === "AVAILABLE"
    }

    return (
        <div className="container py-8">
            <div className="mb-6">
                <Link href="/client/catalogue" className="flex items-center text-zinc-500 hover:text-zinc-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au catalogue
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="rounded-lg overflow-hidden mb-4">
                        <img
                            src={getImages()[0]?.imageUrl || "/placeholder.svg"}
                            alt={getImages()[0]?.altText || machine.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {getImages().length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                            {getImages().slice(1).map((img, index) => (
                                <div key={index} className="rounded-lg overflow-hidden">
                                    <img
                                        src={img.imageUrl || "/placeholder.svg"}
                                        alt={img.altText || `${machine.name} - vue ${index + 2}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{machine.name}</h1>
                    <div className="flex items-center text-zinc-500 mb-4">
                        <span className="mr-4">{getCategoryName()}</span>
                        <span>{getBrandName()}</span>
                    </div>

                    <div className="text-2xl font-bold mb-6">
                        <span className="text-lg font-normal text-zinc-500">Prix sur demande</span>
                    </div>

                    <div>Détails</div>
                    <div className="space-y-4 pt-4">
                        <p>{machine.description}</p>

                        <Separator />

                        <div>
                            <h3 className="font-medium mb-2">Informations</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    <span>Catégorie: {getCategoryName()}</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    <span>Marque: {getBrandName()}</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    <span>Localisation: {machine.location}</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    <span>État: {machine.state === "AVAILABLE" ? "Disponible" : "Non disponible"}</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    <span>Créé le: {new Date(machine.createdAt).toLocaleDateString('fr-FR')}</span>
                                </li>
                            </ul>
                        </div>

                        <Separator />

                    </div>
                    <div className="mt-6">
                        {!isAvailable() ? (
                            <Card>
                                <CardTitle>Machine non disponible</CardTitle>
                                <CardContent className="pt-6 text-center">
                                    <p className="text-red-500 mb-4">Cette machine n'est actuellement pas disponible à la réservation.</p>
                                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                                        Retour aux détails
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                <Card>
                                    <CardHeader>Remplissez le formulaire pour faire votre demande de réservation</CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date-range">Période de location</Label>
                                            <DatePickerWithRange
                                                id="date-range"
                                                value={dateRange}
                                                onChange={(date) => {
                                                    if (date) {
                                                        setDateRange(date)
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
                                                    <SelectItem value="CHANTIER">Chantier</SelectItem>
                                                    <SelectItem value="EVENEMENT">Événement</SelectItem>
                                                    <SelectItem value="DOMESTIQUE">Usage domestique</SelectItem>
                                                    <SelectItem value="AUTRE">Autre</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="pt-4">
                                            <Button
                                                className="w-full"
                                                onClick={handleReservation}
                                                disabled={!dateRange.from || !dateRange.to || !lieu || !usage || createReservation.isPending}
                                            >
                                                {createReservation.isPending ? 'Envoi en cours...' : 'Soumettre la demande'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-4 mt-3">
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
