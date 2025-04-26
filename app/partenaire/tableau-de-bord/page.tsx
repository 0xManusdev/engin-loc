"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Settings,
  Package,
  Calendar,
  MessageSquare,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function PartenaireTableauDeBord() {
  const [activeTab, setActiveTab] = useState("annonces")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Données fictives pour les annonces
  const annonces = [
    {
      id: 1,
      titre: "Groupe électrogène 20kVA",
      type: "Location",
      categorie: "Énergie",
      prix: 35000,
      statut: "active",
      vues: 124,
      reservations: 3,
      dateCreation: "2023-05-15",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      titre: "Tractopelle JCB 3CX",
      type: "Location",
      categorie: "BTP",
      prix: 80000,
      statut: "en_attente",
      vues: 56,
      reservations: 0,
      dateCreation: "2023-06-02",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      titre: "Chargeuse Caterpillar 950H",
      type: "Vente",
      categorie: "BTP",
      prix: 120000000,
      statut: "inactive",
      vues: 89,
      reservations: 1,
      dateCreation: "2023-04-20",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Données fictives pour les réservations
  const reservations = [
    {
      id: 101,
      client: "Entreprise Construction Alpha",
      equipement: "Groupe électrogène 20kVA",
      debut: "2023-07-10",
      fin: "2023-07-20",
      montant: 350000,
      statut: "confirmee",
      contact: "M. Diallo",
      telephone: "+225 07 12 34 56",
    },
    {
      id: 102,
      client: "Société Événementielle Beta",
      equipement: "Groupe électrogène 20kVA",
      debut: "2023-08-05",
      fin: "2023-08-07",
      montant: 105000,
      statut: "en_attente",
      contact: "Mme Koné",
      telephone: "+225 05 98 76 54",
    },
    {
      id: 103,
      client: "Chantier Résidentiel Gamma",
      equipement: "Groupe électrogène 20kVA",
      debut: "2023-08-15",
      fin: "2023-08-30",
      montant: 525000,
      statut: "annulee",
      contact: "M. Touré",
      telephone: "+225 01 23 45 67",
    },
  ]

  // Données fictives pour les messages
  const messages = [
    {
      id: 201,
      expediteur: "Entreprise Construction Alpha",
      sujet: "Question sur le groupe électrogène",
      message: "Bonjour, je voudrais savoir si le groupe électrogène est disponible pour une location de 3 mois ?",
      date: "2023-07-05",
      lu: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 202,
      expediteur: "Société Événementielle Beta",
      sujet: "Demande de devis personnalisé",
      message:
        "Bonjour, nous organisons un événement et nous aurions besoin de plusieurs équipements. Pouvez-vous nous faire un devis ?",
      date: "2023-07-08",
      lu: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 203,
      expediteur: "Support Technique",
      sujet: "Confirmation de votre inscription",
      message: "Votre compte partenaire a été validé. Vous pouvez maintenant publier vos annonces.",
      date: "2023-06-30",
      lu: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Données fictives pour les statistiques
  const statistiques = {
    vues: 269,
    reservations: 4,
    tauxConversion: 1.5,
    revenuTotal: 980000,
    revenuMensuel: 350000,
    equipementsActifs: 2,
  }

  // Fonction pour afficher le statut des annonces
  const renderStatutAnnonce = (statut: string) => {
    switch (statut) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "en_attente":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            En attente
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return null
    }
  }

  // Fonction pour afficher le statut des réservations
  const renderStatutReservation = (statut: string) => {
    switch (statut) {
      case "confirmee":
        return <Badge className="bg-green-500">Confirmée</Badge>
      case "en_attente":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            En attente
          </Badge>
        )
      case "annulee":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar pour desktop */}
        <div className="hidden md:block w-64">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Entreprise Partenaire</p>
                <p className="text-sm text-zinc-500">Partenaire depuis 2023</p>
              </div>
            </div>

            <Separator />

            <nav className="space-y-2">
              <Button
                variant={activeTab === "annonces" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("annonces")}
              >
                <Package className="mr-2 h-4 w-4" />
                Mes Annonces
              </Button>
              <Button
                variant={activeTab === "reservations" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("reservations")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Réservations
              </Button>
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                <Badge className="ml-auto bg-primary">{messages.filter((m) => !m.lu).length}</Badge>
              </Button>
              <Button
                variant={activeTab === "statistiques" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("statistiques")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistiques
              </Button>
            </nav>

            <Separator />

            <div className="space-y-2">
              <Link href="/partenaire/ajouter-engin">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un équipement
                </Button>
              </Link>
              <Link href="/partenaire/parametres">
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden mb-4">
            <Button variant="outline" className="flex items-center justify-between w-full">
              <span>
                {activeTab === "annonces" && "Mes Annonces"}
                {activeTab === "reservations" && "Réservations"}
                {activeTab === "messages" && "Messages"}
                {activeTab === "statistiques" && "Statistiques"}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu Partenaire</SheetTitle>
              <SheetDescription>Gérez vos équipements et réservations</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Avatar" />
                  <AvatarFallback>EP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Entreprise Partenaire</p>
                  <p className="text-sm text-zinc-500">Partenaire depuis 2023</p>
                </div>
              </div>

              <Separator className="mb-4" />

              <nav className="space-y-2">
                <Button
                  variant={activeTab === "annonces" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("annonces")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Mes Annonces
                </Button>
                <Button
                  variant={activeTab === "reservations" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("reservations")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Réservations
                </Button>
                <Button
                  variant={activeTab === "messages" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("messages")
                    setMobileMenuOpen(false)
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                  <Badge className="ml-auto bg-primary">{messages.filter((m) => !m.lu).length}</Badge>
                </Button>
                <Button
                  variant={activeTab === "statistiques" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("statistiques")
                    setMobileMenuOpen(false)
                  }}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Statistiques
                </Button>
              </nav>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Link href="/partenaire/ajouter-engin">
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un équipement
                  </Button>
                </Link>
                <Link href="/partenaire/parametres">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Contenu principal */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsContent value="annonces">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mes Annonces</h1>
                <Link href="/partenaire/ajouter-engin">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {annonces.map((annonce) => (
                  <Card key={annonce.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-24 h-24 overflow-hidden">
                          <img
                            src={annonce.image || "/placeholder.svg"}
                            alt={annonce.titre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="font-medium">{annonce.titre}</h3>
                            {renderStatutAnnonce(annonce.statut)}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-zinc-500">
                            <div>
                              <p>Type: {annonce.type}</p>
                              <p>Catégorie: {annonce.categorie}</p>
                            </div>
                            <div>
                              <p>Prix: {annonce.prix.toLocaleString()} FCFA</p>
                              <p>Créée le: {annonce.dateCreation}</p>
                            </div>
                            <div>
                              <p>Vues: {annonce.vues}</p>
                              <p>Réservations: {annonce.reservations}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 p-2 bg-zinc-50">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        {annonce.statut === "active" ? "Désactiver" : "Supprimer"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reservations">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Réservations</h1>
              </div>

              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{reservation.equipement}</CardTitle>
                          <CardDescription>Réservation #{reservation.id}</CardDescription>
                        </div>
                        {renderStatutReservation(reservation.statut)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Client</p>
                          <p className="text-zinc-500">{reservation.client}</p>
                          <p className="text-zinc-500">{reservation.contact}</p>
                          <p className="text-zinc-500">{reservation.telephone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Détails</p>
                          <p className="text-zinc-500">
                            Du {reservation.debut} au {reservation.fin}
                          </p>
                          <p className="text-zinc-500">Montant: {reservation.montant.toLocaleString()} FCFA</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-zinc-50">
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                      {reservation.statut === "en_attente" && (
                        <>
                          <Button variant="default" size="sm">
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Confirmer
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="mr-1 h-4 w-4" />
                            Refuser
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Messages</h1>
              </div>

              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className={message.lu ? "" : "border-primary"}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.expediteur} />
                          <AvatarFallback>{message.expediteur.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{message.expediteur}</CardTitle>
                            <span className="text-xs text-zinc-500">{message.date}</span>
                          </div>
                          <CardDescription>{message.sujet}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-zinc-700">{message.message}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-zinc-50">
                      <Button variant="outline" size="sm">
                        Voir la conversation
                      </Button>
                      <Button variant="default" size="sm">
                        Répondre
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistiques">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Statistiques</h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Vues totales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.vues}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Réservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.reservations}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Taux de conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.tauxConversion}%</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Revenu total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.revenuTotal.toLocaleString()} FCFA</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Revenu mensuel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.revenuMensuel.toLocaleString()} FCFA</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-zinc-500">Équipements actifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold">{statistiques.equipementsActifs}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance des annonces</CardTitle>
                  <CardDescription>Visualisation des performances de vos annonces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-zinc-100 rounded-md">
                    <p className="text-zinc-500">Graphique de performance (à implémenter)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
