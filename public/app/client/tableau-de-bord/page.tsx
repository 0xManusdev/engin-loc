"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Package, Settings, User, FileText, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Données fictives pour les locations
const locations = [
  {
    id: 1,
    equipement: "Groupe électrogène 5kVA",
    debut: new Date("2025-04-15"),
    fin: new Date("2025-04-20"),
    statut: "en-cours",
    prix: 75000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    equipement: "Panneau solaire 300W",
    debut: new Date("2025-03-10"),
    fin: new Date("2025-03-15"),
    statut: "terminé",
    prix: 40000,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    equipement: "Groupe électrogène 10kVA",
    debut: new Date("2025-05-01"),
    fin: new Date("2025-05-10"),
    statut: "à-venir",
    prix: 250000,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TableauDeBordClient() {
  const [activeTab, setActiveTab] = useState("locations")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en-cours":
        return <Badge className="bg-primary text-white">En cours</Badge>
      case "terminé":
        return (
          <Badge variant="outline" className="text-zinc-500">
            Terminé
          </Badge>
        )
      case "à-venir":
        return <Badge className="bg-secondary text-white">À venir</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-zinc-500">Gérez vos locations et votre compte</p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Client Nom</p>
            <p className="text-sm text-zinc-500">client@example.com</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="space-y-4">
          <div className="hidden md:block">
            <h3 className="font-medium mb-2">Menu</h3>
            <nav className="space-y-1">
              <Button
                variant={activeTab === "locations" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("locations")}
              >
                <Package className="mr-2 h-4 w-4" />
                Mes locations
              </Button>
              <Button
                variant={activeTab === "profil" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profil")}
              >
                <User className="mr-2 h-4 w-4" />
                Mon profil
              </Button>
              <Button
                variant={activeTab === "support" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("support")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Support
              </Button>
              <Button
                variant={activeTab === "parametres" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("parametres")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </nav>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-zinc-500">Locations totales</p>
                <p className="text-2xl font-bold">{locations.length}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">En cours</p>
                <p className="text-2xl font-bold">{locations.filter((l) => l.statut === "en-cours").length}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Dépenses totales</p>
                <p className="text-2xl font-bold">
                  {locations.reduce((sum, loc) => sum + loc.prix, 0).toLocaleString()} FCFA
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="md:hidden mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="locations">
                <Package className="h-4 w-4" />
                <span className="sr-only">Locations</span>
              </TabsTrigger>
              <TabsTrigger value="profil">
                <User className="h-4 w-4" />
                <span className="sr-only">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="support">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Support</span>
              </TabsTrigger>
              <TabsTrigger value="parametres">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Paramètres</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <TabsContent value="locations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Mes locations</h2>
              <Link href="/catalogue">
                <Button className="bg-primary hover:bg-primary/90">Nouvelle location</Button>
              </Link>
            </div>

            {locations.length > 0 ? (
              <div className="space-y-4">
                {locations.map((location) => (
                  <Card key={location.id} className="card-hover-effect">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={location.image || "/placeholder.svg"}
                          alt={location.equipement}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{location.equipement}</h3>
                              <div className="flex items-center text-sm text-zinc-500 mt-1">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>
                                  {location.debut.toLocaleDateString("fr-FR")} -{" "}
                                  {location.fin.toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(location.statut)}
                              <p className="text-sm font-medium mt-1">{location.prix.toLocaleString()} FCFA</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-2 border-t flex justify-between">
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Voir détails
                      </Button>
                      {location.statut === "en-cours" && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contacter support
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium mb-2">Aucune location</h3>
                  <p className="text-zinc-500 mb-4">Vous n&apos;avez pas encore de locations</p>
                  <Link href="/catalogue">
                    <Button className="bg-primary hover:bg-primary/90">Parcourir le catalogue</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profil">
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                    <AvatarFallback className="text-lg">CN</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">Prénom</p>
                    <p className="font-medium">Client</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Nom</p>
                    <p className="font-medium">Nom</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Email</p>
                    <p className="font-medium">client@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Téléphone</p>
                    <p className="font-medium">+123 456 789</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Numéro CNI</p>
                    <p className="font-medium">1234567890</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Membre depuis</p>
                    <p className="font-medium">Avril 2025</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-primary hover:bg-primary/90">Modifier le profil</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support client</CardTitle>
                <CardDescription>Besoin d&apos;aide ? Contactez notre équipe de support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="location">Question sur une location</option>
                    <option value="facturation">Problème de facturation</option>
                    <option value="technique">Problème technique</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Décrivez votre problème ou question..."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-primary hover:bg-primary/90">Envoyer</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="parametres">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>Gérez les paramètres de votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-zinc-500">Recevoir des emails pour les mises à jour de location</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par SMS</p>
                      <p className="text-sm text-zinc-500">Recevoir des SMS pour les alertes importantes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Sécurité</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Changer le mot de passe
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Préférences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mode sombre</p>
                      <p className="text-sm text-zinc-500">Activer le mode sombre pour l&apos;interface</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Déconnexion
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
