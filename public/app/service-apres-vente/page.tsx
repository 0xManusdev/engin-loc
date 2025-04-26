"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Headset,
  PenToolIcon as Tool,
  Clock,
  Search,
  ArrowRight,
  MessageCircle,
  FileText,
  Calendar,
  Settings,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ServiceApresVentePage() {
  const [activeTab, setActiveTab] = useState("suivi")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  // Données fictives pour les tickets de support
  const tickets = [
    {
      id: 1,
      titre: "Réparation groupe électrogène",
      equipement: "Groupe électrogène 20kVA",
      date: "15/04/2025",
      statut: "en-cours",
      progression: 50,
      description: "Le groupe électrogène ne démarre pas correctement.",
      messages: [
        {
          auteur: "Client",
          date: "15/04/2025 10:30",
          contenu:
            "Bonjour, mon groupe électrogène ne démarre pas correctement. Il fait un bruit étrange puis s'arrête.",
        },
        {
          auteur: "Support",
          date: "15/04/2025 11:45",
          contenu:
            "Bonjour, merci pour votre signalement. Pouvez-vous nous préciser depuis quand ce problème est apparu ?",
        },
        {
          auteur: "Client",
          date: "15/04/2025 12:15",
          contenu: "Depuis hier, après l'avoir utilisé pendant environ 5 heures.",
        },
        {
          auteur: "Support",
          date: "15/04/2025 14:30",
          contenu:
            "Nous allons envoyer un technicien demain entre 9h et 12h. Merci de vous assurer que quelqu'un sera présent pour l'accueillir.",
        },
      ],
    },
    {
      id: 2,
      titre: "Maintenance tractopelle",
      equipement: "Tractopelle JCB 3CX",
      date: "10/04/2025",
      statut: "terminé",
      progression: 100,
      description: "Maintenance régulière du tractopelle.",
      messages: [
        {
          auteur: "Client",
          date: "10/04/2025 09:15",
          contenu: "Bonjour, je souhaite planifier la maintenance régulière de mon tractopelle JCB 3CX.",
        },
        {
          auteur: "Support",
          date: "10/04/2025 10:00",
          contenu:
            "Bonjour, nous pouvons programmer cette maintenance pour le 12/04/2025. Est-ce que cette date vous convient ?",
        },
        {
          auteur: "Client",
          date: "10/04/2025 10:30",
          contenu: "Oui, parfait pour le 12/04.",
        },
        {
          auteur: "Support",
          date: "12/04/2025 18:00",
          contenu:
            "La maintenance a été effectuée avec succès. Votre tractopelle est maintenant prêt à l'emploi. N'hésitez pas à nous contacter si vous avez des questions.",
        },
      ],
    },
    {
      id: 3,
      titre: "Panne système hydraulique",
      equipement: "Chargeuse Caterpillar 950H",
      date: "05/04/2025",
      statut: "en-attente",
      progression: 25,
      description: "Le système hydraulique présente des fuites.",
      messages: [
        {
          auteur: "Client",
          date: "05/04/2025 14:20",
          contenu: "Bonjour, j'ai constaté des fuites au niveau du système hydraulique de ma chargeuse.",
        },
        {
          auteur: "Support",
          date: "05/04/2025 15:45",
          contenu:
            "Bonjour, nous avons bien reçu votre signalement. Pouvez-vous nous envoyer des photos des fuites pour que nous puissions évaluer la situation ?",
        },
        {
          auteur: "Client",
          date: "05/04/2025 16:30",
          contenu: "Voici les photos des fuites. Elles se situent principalement au niveau des vérins de levage.",
        },
        {
          auteur: "Support",
          date: "06/04/2025 09:15",
          contenu:
            "Merci pour les photos. Nous attendons la disponibilité des pièces de rechange. Nous vous tiendrons informé dès que nous pourrons intervenir.",
        },
      ],
    },
  ]

  // Données fictives pour les maintenances planifiées
  const maintenances = [
    {
      id: 1,
      equipement: "Tractopelle JCB 3CX",
      type: "Maintenance régulière",
      date: "25/04/2025",
      heure: "09:00 - 12:00",
      statut: "planifié",
    },
    {
      id: 2,
      equipement: "Groupe électrogène 20kVA",
      type: "Révision complète",
      date: "30/04/2025",
      heure: "14:00 - 17:00",
      statut: "planifié",
    },
    {
      id: 3,
      equipement: "Chargeuse Caterpillar 950H",
      type: "Maintenance préventive",
      date: "15/05/2025",
      heure: "10:00 - 15:00",
      statut: "planifié",
    },
  ]

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.equipement.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en-cours":
        return <Badge className="bg-blue-500">En cours</Badge>
      case "terminé":
        return <Badge className="bg-green-500">Terminé</Badge>
      case "en-attente":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "planifié":
        return <Badge className="bg-purple-500">Planifié</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique d'envoi de message
    setMessage("")
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Headset className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Service Après-Vente</h1>
        </div>
        <p className="text-zinc-500">Suivi de réparations, maintenance et support technique pour vos équipements</p>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button
                  variant={activeTab === "suivi" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("suivi")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Suivi des réparations
                </Button>
                <Button
                  variant={activeTab === "maintenance" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("maintenance")}
                >
                  <Tool className="mr-2 h-4 w-4" />
                  Maintenance préventive
                </Button>
                <Button
                  variant={activeTab === "support" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("support")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Support technique
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Besoin d&apos;aide ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-500">
                Notre équipe de support est disponible pour vous aider avec vos équipements.
              </p>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contacter le support
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full md:hidden">
              <TabsTrigger value="suivi">
                <FileText className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Suivi</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance">
                <Tool className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Maintenance</span>
              </TabsTrigger>
              <TabsTrigger value="support">
                <MessageCircle className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="suivi" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <h2 className="text-2xl font-bold">Suivi des réparations</h2>
                <Link href="/client/nouvelle-demande">
                  <Button>Nouvelle demande</Button>
                </Link>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Rechercher un ticket..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedTicket === null ? (
                  filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold">{ticket.titre}</h3>
                              <p className="text-sm text-zinc-500">{ticket.equipement}</p>
                            </div>
                            {getStatusBadge(ticket.statut)}
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progression</span>
                              <span>{ticket.progression}%</span>
                            </div>
                            <Progress value={ticket.progression} className="h-2" />
                          </div>
                          <div className="flex justify-between items-center mt-4 text-sm text-zinc-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{ticket.date}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                              Voir détails
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <h3 className="text-lg font-medium">Aucun ticket trouvé</h3>
                      <p className="text-zinc-500 mt-2">Vous n&apos;avez pas encore de demandes de réparation</p>
                      <Link href="/client/nouvelle-demande">
                        <Button className="mt-4">Créer une demande</Button>
                      </Link>
                    </div>
                  )
                ) : (
                  <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{tickets.find((t) => t.id === selectedTicket)?.titre}</CardTitle>
                        <p className="text-sm text-zinc-500 mt-1">
                          {tickets.find((t) => t.id === selectedTicket)?.equipement} -
                          {tickets.find((t) => t.id === selectedTicket)?.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(tickets.find((t) => t.id === selectedTicket)?.statut || "")}
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                          Retour
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Description</h3>
                        <p className="text-zinc-600">{tickets.find((t) => t.id === selectedTicket)?.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{tickets.find((t) => t.id === selectedTicket)?.progression}%</span>
                        </div>
                        <Progress value={tickets.find((t) => t.id === selectedTicket)?.progression} className="h-2" />
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Conversation</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                          {tickets
                            .find((t) => t.id === selectedTicket)
                            ?.messages.map((msg, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                  msg.auteur === "Client" ? "bg-primary/10 ml-8" : "bg-zinc-100 mr-8"
                                }`}
                              >
                                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                  <span>{msg.auteur}</span>
                                  <span>{msg.date}</span>
                                </div>
                                <p className="text-sm">{msg.contenu}</p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmitMessage} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="message">Votre message</Label>
                          <Textarea
                            id="message"
                            placeholder="Écrivez votre message ici..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <Button type="submit" disabled={!message.trim()}>
                          Envoyer
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <h2 className="text-2xl font-bold">Maintenance préventive</h2>
                <Link href="/client/planifier-maintenance">
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Planifier une maintenance
                  </Button>
                </Link>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenances planifiées</CardTitle>
                  <CardDescription>Consultez vos prochaines maintenances programmées</CardDescription>
                </CardHeader>
                <CardContent>
                  {maintenances.length > 0 ? (
                    <div className="space-y-4">
                      {maintenances.map((maintenance) => (
                        <div key={maintenance.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{maintenance.equipement}</h3>
                            <p className="text-sm text-zinc-500">{maintenance.type}</p>
                            <div className="flex items-center text-sm text-zinc-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{maintenance.date}</span>
                              <Clock className="h-3 w-3 mx-1 ml-2" />
                              <span>{maintenance.heure}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(maintenance.statut)}
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium">Aucune maintenance planifiée</h3>
                      <p className="text-zinc-500 mt-2">Vous n&apos;avez pas encore de maintenances programmées</p>
                      <Link href="/client/planifier-maintenance">
                        <Button className="mt-4">Planifier une maintenance</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommandations de maintenance</CardTitle>
                  <CardDescription>Basées sur l&apos;utilisation de vos équipements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-yellow-50">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-yellow-100 p-2 mt-1">
                          <Tool className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Tractopelle JCB 3CX</h3>
                          <p className="text-sm text-zinc-600 mt-1">
                            Votre tractopelle a atteint 500 heures d&apos;utilisation. Nous recommandons une révision
                            complète du système hydraulique.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Planifier
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-blue-100 p-2 mt-1">
                          <Settings className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Groupe électrogène 20kVA</h3>
                          <p className="text-sm text-zinc-600 mt-1">
                            Maintenance régulière recommandée. Le dernier entretien date de plus de 6 mois.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Planifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <h2 className="text-2xl font-bold">Support technique</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Contacter notre équipe de support</CardTitle>
                  <CardDescription>Nous sommes là pour vous aider avec vos questions techniques</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sujet">Sujet</Label>
                    <Select>
                      <SelectTrigger id="sujet">
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technique">Problème technique</SelectItem>
                        <SelectItem value="utilisation">Aide à l&apos;utilisation</SelectItem>
                        <SelectItem value="pieces">Pièces détachées</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipement">Équipement concerné</Label>
                    <Select>
                      <SelectTrigger id="equipement">
                        <SelectValue placeholder="Sélectionnez un équipement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tractopelle">Tractopelle JCB 3CX</SelectItem>
                        <SelectItem value="groupe">Groupe électrogène 20kVA</SelectItem>
                        <SelectItem value="chargeuse">Chargeuse Caterpillar 950H</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description du problème</Label>
                    <Textarea id="description" placeholder="Décrivez votre problème en détail..." rows={5} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fichier">Joindre des fichiers (optionnel)</Label>
                    <Input id="fichier" type="file" multiple />
                    <p className="text-xs text-zinc-500">
                      Vous pouvez joindre des photos ou des documents (max 5MB par fichier)
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Annuler</Button>
                  <Button>Envoyer</Button>
                </CardFooter>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assistance téléphonique</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-zinc-600">Notre équipe de support technique est disponible par téléphone :</p>
                    <div className="flex items-center gap-2 font-medium">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>+123 456 789</span>
                    </div>
                    <p className="text-sm text-zinc-500">Lundi au vendredi : 8h - 18h</p>
                    <p className="text-sm text-zinc-500">Samedi : 9h - 12h</p>
                    <p className="text-sm text-zinc-500">Urgences 24/7</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documentation technique</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-zinc-600">Consultez notre base de connaissances :</p>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="flex items-center text-primary hover:underline">
                          <FileText className="mr-2 h-4 w-4" />
                          Manuels d&apos;utilisation
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-primary hover:underline">
                          <Tool className="mr-2 h-4 w-4" />
                          Guides de maintenance
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-primary hover:underline">
                          <Settings className="mr-2 h-4 w-4" />
                          Fiches techniques
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center text-primary hover:underline">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
