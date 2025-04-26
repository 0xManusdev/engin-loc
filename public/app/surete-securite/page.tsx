"use client"

import { useState } from "react"
import { Lock, Shield, AlertTriangle, FileText, CheckCircle, ArrowRight, Search, Eye, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function SureteSecuritePage() {
  const [activeTab, setActiveTab] = useState("services")
  const [searchTerm, setSearchTerm] = useState("")

  // Données fictives pour les services de sécurité
  const services = [
    {
      id: 1,
      titre: "Surveillance d'équipements",
      description: "Système de surveillance et de géolocalisation pour vos engins et véhicules.",
      icon: Eye,
      prix: "À partir de 15 000 FCFA / mois",
      populaire: true,
    },
    {
      id: 2,
      titre: "Sécurisation de chantier",
      description: "Service de gardiennage et de sécurisation de vos chantiers et sites de travail.",
      icon: Shield,
      prix: "À partir de 50 000 FCFA / semaine",
      populaire: false,
    },
    {
      id: 3,
      titre: "Système d'alarme",
      description: "Installation de systèmes d'alarme et d'alerte pour vos équipements et locaux.",
      icon: Bell,
      prix: "À partir de 100 000 FCFA",
      populaire: false,
    },
    {
      id: 4,
      titre: "Audit de sécurité",
      description: "Évaluation complète des risques et recommandations pour sécuriser vos actifs.",
      icon: FileText,
      prix: "À partir de 75 000 FCFA",
      populaire: true,
    },
  ]

  // Données fictives pour les conseils de sécurité
  const conseils = [
    {
      id: 1,
      titre: "Sécurisation des engins BTP",
      description: "Comment protéger efficacement vos engins de chantier contre le vol et le vandalisme.",
      categorie: "btp",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      titre: "Protection des véhicules",
      description: "Mesures préventives pour sécuriser votre flotte de véhicules professionnels.",
      categorie: "vehicules",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      titre: "Sécurité des équipements énergétiques",
      description: "Conseils pour protéger vos groupes électrogènes et panneaux solaires.",
      categorie: "energie",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filtrer les conseils
  const filteredConseils = conseils.filter(
    (conseil) =>
      conseil.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conseil.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Sûreté & Sécurité</h1>
        </div>
        <p className="text-zinc-500">Solutions et conseils pour sécuriser vos équipements, véhicules et chantiers</p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="conseils">Conseils</TabsTrigger>
          <TabsTrigger value="evaluation">Évaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className={`overflow-hidden ${service.populaire ? "border-primary" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{service.titre}</CardTitle>
                    </div>
                    {service.populaire && <Badge className="bg-primary">Populaire</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">{service.description}</p>
                  <p className="font-medium">{service.prix}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Services sur mesure</CardTitle>
              <CardDescription>
                Nous proposons des solutions de sécurité adaptées à vos besoins spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Protection physique</h3>
                  <p className="text-sm text-zinc-500 mt-1">Gardiennage, barrières, systèmes anti-intrusion</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <Eye className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Surveillance électronique</h3>
                  <p className="text-sm text-zinc-500 mt-1">Caméras, détecteurs, systèmes de géolocalisation</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <Bell className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Alertes et interventions</h3>
                  <p className="text-sm text-zinc-500 mt-1">Systèmes d&apos;alerte, intervention rapide</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Demander un devis personnalisé</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="conseils" className="space-y-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Rechercher des conseils de sécurité..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredConseils.map((conseil) => (
              <Card key={conseil.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={conseil.image || "/placeholder.svg"}
                    alt={conseil.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{conseil.titre}</h3>
                  <p className="text-sm text-zinc-500 mb-2">{conseil.description}</p>
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
              <CardTitle>Téléchargez nos guides de sécurité</CardTitle>
              <CardDescription>Ressources complètes pour sécuriser vos équipements et chantiers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Guide de sécurisation des engins BTP</h3>
                    <p className="text-sm text-zinc-500 mt-1">PDF - 25 pages - Dernière mise à jour: Avril 2025</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Télécharger
                    </Button>
                  </div>
                </div>
                <div className="flex items-start p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Sécurité des chantiers</h3>
                    <p className="text-sm text-zinc-500 mt-1">PDF - 18 pages - Dernière mise à jour: Mars 2025</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Télécharger
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évaluation des risques</CardTitle>
              <CardDescription>
                Complétez ce formulaire pour recevoir une évaluation personnalisée des risques pour vos équipements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type-equipement">Type d&apos;équipements</Label>
                <Select>
                  <SelectTrigger id="type-equipement">
                    <SelectValue placeholder="Sélectionnez un type d'équipement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btp">Engins BTP</SelectItem>
                    <SelectItem value="vehicules">Véhicules</SelectItem>
                    <SelectItem value="energie">Équipements énergétiques</SelectItem>
                    <SelectItem value="mixte">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre d&apos;équipements</Label>
                <Input id="nombre" type="number" min="1" placeholder="Ex: 5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lieu">Lieu de stockage principal</Label>
                <Select>
                  <SelectTrigger id="lieu">
                    <SelectValue placeholder="Sélectionnez un type de lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chantier">Chantier</SelectItem>
                    <SelectItem value="depot">Dépôt sécurisé</SelectItem>
                    <SelectItem value="entrepot">Entrepôt</SelectItem>
                    <SelectItem value="exterieur">Extérieur non sécurisé</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mesures de sécurité existantes</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cameras" />
                    <Label htmlFor="cameras">Caméras de surveillance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="alarmes" />
                    <Label htmlFor="alarmes">Systèmes d&apos;alarme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gardiennage" />
                    <Label htmlFor="gardiennage">Gardiennage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gps" />
                    <Label htmlFor="gps">Traceurs GPS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cloture" />
                    <Label htmlFor="cloture">Clôture sécurisée</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="autre" />
                    <Label htmlFor="autre">Autre</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidents">Incidents passés</Label>
                <Select>
                  <SelectTrigger id="incidents">
                    <SelectValue placeholder="Avez-vous déjà subi des incidents ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aucun">Aucun incident</SelectItem>
                    <SelectItem value="vol">Vol d&apos;équipement</SelectItem>
                    <SelectItem value="vandalisme">Vandalisme</SelectItem>
                    <SelectItem value="intrusion">Intrusion sur site</SelectItem>
                    <SelectItem value="multiple">Incidents multiples</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commentaires">Commentaires supplémentaires</Label>
                <Input id="commentaires" placeholder="Précisez vos besoins spécifiques..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Demander une évaluation gratuite</Button>
            </CardFooter>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold">Évaluation complète</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Analyse détaillée des risques et vulnérabilités de vos équipements et sites
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold">Recommandations personnalisées</h3>
                <p className="text-sm text-zinc-500 mt-2">Solutions adaptées à votre situation et à votre budget</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-purple-100 p-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold">Prévention des risques</h3>
                <p className="text-sm text-zinc-500 mt-2">
                  Anticipez les menaces potentielles et protégez vos investissements
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
