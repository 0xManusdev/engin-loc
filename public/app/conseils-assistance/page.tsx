"use client"

import { useState } from "react"
import { HelpCircle, MessageCircle, Video, FileText, Users, Calendar, ArrowRight, Search, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ConseilsAssistancePage() {
  const [activeTab, setActiveTab] = useState("conseils")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null)

  // Données fictives pour les articles de conseil
  const articles = [
    {
      id: 1,
      titre: "Comment choisir le bon engin BTP pour votre chantier",
      categorie: "btp",
      date: "15/04/2025",
      auteur: "Jean Dupont",
      image: "/placeholder.svg?height=200&width=300",
      lecture: "10 min",
      description: "Guide complet pour sélectionner l'équipement BTP adapté à vos besoins spécifiques.",
    },
    {
      id: 2,
      titre: "Optimiser la consommation de carburant de vos véhicules",
      categorie: "vehicules",
      date: "10/04/2025",
      auteur: "Marie Martin",
      image: "/placeholder.svg?height=200&width=300",
      lecture: "8 min",
      description: "Conseils pratiques pour réduire la consommation et les coûts d'exploitation de votre flotte.",
    },
    {
      id: 3,
      titre: "Maintenance préventive des groupes électrogènes",
      categorie: "energie",
      date: "05/04/2025",
      auteur: "Paul Lefebvre",
      image: "/placeholder.svg?height=200&width=300",
      lecture: "12 min",
      description: "Les étapes essentielles pour prolonger la durée de vie de vos équipements énergétiques.",
    },
    {
      id: 4,
      titre: "Guide d'utilisation des tractopelles",
      categorie: "btp",
      date: "01/04/2025",
      auteur: "Sophie Dubois",
      image: "/placeholder.svg?height=200&width=300",
      lecture: "15 min",
      description: "Techniques et bonnes pratiques pour une utilisation optimale des tractopelles sur vos chantiers.",
    },
  ]

  // Données fictives pour les experts
  const experts = [
    {
      id: 1,
      nom: "Thomas Laurent",
      specialite: "Expert BTP",
      experience: "15 ans",
      disponible: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Spécialiste des engins de chantier et des équipements de construction.",
      tarif: "5 000 FCFA / 30 min",
    },
    {
      id: 2,
      nom: "Camille Moreau",
      specialite: "Experte Véhicules",
      experience: "12 ans",
      disponible: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Spécialiste de la gestion de flotte et de l'optimisation des véhicules professionnels.",
      tarif: "4 500 FCFA / 30 min",
    },
    {
      id: 3,
      nom: "Michel Petit",
      specialite: "Expert Énergie",
      experience: "20 ans",
      disponible: false,
      image: "/placeholder.svg?height=100&width=100",
      description: "Spécialiste des solutions énergétiques, groupes électrogènes et panneaux solaires.",
      tarif: "6 000 FCFA / 30 min",
    },
  ]

  // Filtrer les articles
  const filteredArticles = articles.filter(
    (article) =>
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrer les experts
  const filteredExperts = experts.filter(
    (expert) =>
      expert.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Conseils & Assistance</h1>
        </div>
        <p className="text-zinc-500">
          Expertise, conseils techniques et assistance pour tous vos besoins en équipements
        </p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="conseils">Conseils</TabsTrigger>
          <TabsTrigger value="experts">Experts</TabsTrigger>
          <TabsTrigger value="formations">Formations</TabsTrigger>
        </TabsList>

        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder={`Rechercher des ${activeTab === "conseils" ? "articles" : activeTab === "experts" ? "experts" : "formations"}...`}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="conseils" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.titre}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary">{article.categorie.toUpperCase()}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
                    <span>{article.date}</span>
                    <span>{article.lecture} de lecture</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{article.titre}</h3>
                  <p className="text-sm text-zinc-500 mb-2">{article.description}</p>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>{article.auteur.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{article.auteur}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Lire l&apos;article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ressources techniques</CardTitle>
              <CardDescription>Accédez à notre bibliothèque de ressources pour tous vos équipements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Manuels d&apos;utilisation</h3>
                    <p className="text-sm text-zinc-500 mt-1">Guides complets pour tous vos équipements</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Consulter
                    </Button>
                  </div>
                </div>
                <div className="flex items-start p-4 border rounded-lg">
                  <Video className="h-8 w-8 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Tutoriels vidéo</h3>
                    <p className="text-sm text-zinc-500 mt-1">Démonstrations et instructions pas à pas</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Regarder
                    </Button>
                  </div>
                </div>
                <div className="flex items-start p-4 border rounded-lg">
                  <MessageCircle className="h-8 w-8 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Forum d&apos;entraide</h3>
                    <p className="text-sm text-zinc-500 mt-1">Échangez avec la communauté</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Participer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experts" className="space-y-6">
          {selectedExpert === null ? (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={expert.image || "/placeholder.svg"} alt={expert.nom} />
                        <AvatarFallback>{expert.nom.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{expert.nom}</h3>
                      <p className="text-primary">{expert.specialite}</p>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={expert.disponible ? "default" : "outline"}
                          className={expert.disponible ? "bg-green-500" : ""}
                        >
                          {expert.disponible ? "Disponible" : "Indisponible"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-zinc-500 mb-4">
                      <p>Expérience: {expert.experience}</p>
                      <p>Tarif: {expert.tarif}</p>
                      <p className="text-zinc-600">{expert.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      disabled={!expert.disponible}
                      onClick={() => setSelectedExpert(expert.id)}
                    >
                      Consulter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{experts.find((e) => e.id === selectedExpert)?.nom}</CardTitle>
                  <CardDescription>{experts.find((e) => e.id === selectedExpert)?.specialite}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedExpert(null)}>
                  Retour
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={experts.find((e) => e.id === selectedExpert)?.image || "/placeholder.svg"}
                      alt={experts.find((e) => e.id === selectedExpert)?.nom}
                    />
                    <AvatarFallback>{experts.find((e) => e.id === selectedExpert)?.nom.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-medium">À propos</h3>
                      <p className="text-zinc-600 mt-1">{experts.find((e) => e.id === selectedExpert)?.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium">Expérience</h4>
                        <p className="text-zinc-600">{experts.find((e) => e.id === selectedExpert)?.experience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Tarif</h4>
                        <p className="text-zinc-600">{experts.find((e) => e.id === selectedExpert)?.tarif}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Prendre rendez-vous</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heure">Heure</Label>
                        <Select>
                          <SelectTrigger id="heure">
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sujet">Sujet de la consultation</Label>
                      <Input id="sujet" placeholder="Ex: Conseil sur l'achat d'un tractopelle" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea id="message" placeholder="Précisez votre demande..." rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type de consultation</Label>
                      <Select defaultValue="video">
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Vidéoconférence</SelectItem>
                          <SelectItem value="telephone">Téléphone</SelectItem>
                          <SelectItem value="message">Messagerie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Confirmer le rendez-vous</Button>
              </CardFooter>
            </Card>
          )}

          {selectedExpert === null && (
            <Card>
              <CardHeader>
                <CardTitle>Besoin d&apos;une assistance personnalisée ?</CardTitle>
                <CardDescription>
                  Nos experts sont disponibles pour vous aider avec vos questions techniques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <Video className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Consultation vidéo</h3>
                    <p className="text-sm text-zinc-500 mt-1">Échangez en face à face avec nos experts</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <Phone className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Consultation téléphonique</h3>
                    <p className="text-sm text-zinc-500 mt-1">Discutez directement avec un spécialiste</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <MessageCircle className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Messagerie</h3>
                    <p className="text-sm text-zinc-500 mt-1">Posez vos questions par écrit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="formations" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Formation utilisation des engins BTP"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-primary">BTP</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">Formation à l&apos;utilisation des engins BTP</h3>
                <p className="text-sm text-zinc-500 mb-2">
                  Apprenez à utiliser efficacement et en toute sécurité les engins de chantier.
                </p>
                <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Prochaine session: 25/04/2025</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>12 places disponibles</span>
                  </div>
                </div>
                <div className="font-medium">75 000 FCFA / personne</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">S&apos;inscrire</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Formation maintenance préventive"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-secondary">MAINTENANCE</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">Maintenance préventive des équipements</h3>
                <p className="text-sm text-zinc-500 mb-2">
                  Techniques et bonnes pratiques pour prolonger la durée de vie de vos machines.
                </p>
                <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Prochaine session: 10/05/2025</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>8 places disponibles</span>
                  </div>
                </div>
                <div className="font-medium">60 000 FCFA / personne</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">S&apos;inscrire</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Formation gestion de flotte"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-accent">VÉHICULES</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">Gestion efficace de flotte de véhicules</h3>
                <p className="text-sm text-zinc-500 mb-2">
                  Optimisez la gestion et les coûts d&apos;exploitation de votre parc automobile.
                </p>
                <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Prochaine session: 15/05/2025</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>10 places disponibles</span>
                  </div>
                </div>
                <div className="font-medium">50 000 FCFA / personne</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">S&apos;inscrire</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Formation solutions énergétiques"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-green-500">ÉNERGIE</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">Solutions énergétiques pour chantiers</h3>
                <p className="text-sm text-zinc-500 mb-2">
                  Maîtrisez l&apos;utilisation et l&apos;entretien des groupes électrogènes et panneaux solaires.
                </p>
                <div className="flex justify-between items-center text-sm text-zinc-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Prochaine session: 20/05/2025</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>15 places disponibles</span>
                  </div>
                </div>
                <div className="font-medium">65 000 FCFA / personne</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">S&apos;inscrire</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formations sur mesure</CardTitle>
              <CardDescription>
                Nous proposons des formations adaptées aux besoins spécifiques de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-zinc-600">
                Nos formateurs experts peuvent intervenir directement sur votre site pour former vos équipes sur vos
                propres équipements. Contactez-nous pour établir un programme personnalisé.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Formation d&apos;équipe</h3>
                    <p className="text-sm text-zinc-500">Sur votre site</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Programme sur mesure</h3>
                    <p className="text-sm text-zinc-500">Adapté à vos besoins</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Planning flexible</h3>
                    <p className="text-sm text-zinc-500">Selon vos disponibilités</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Demander un devis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
