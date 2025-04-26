"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function InscriptionPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("client")

  const [clientForm, setClientForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    cni: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [partenaireForm, setPartenaireForm] = useState({
    nomEntreprise: "",
    typeEngins: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setClientForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePartenaireChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setPartenaireForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePartenaireSelectChange = (value: string) => {
    setPartenaireForm((prev) => ({
      ...prev,
      typeEngins: value,
    }))
  }

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique d'inscription client
    router.push("/client/tableau-de-bord")
  }

  const handlePartenaireSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique d'inscription partenaire
    router.push("/partenaire/tableau-de-bord")
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Inscription</h1>
          <p className="text-zinc-500">Créez votre compte pour commencer</p>
        </div>

        <Tabs defaultValue="client" onValueChange={setUserType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Client
            </TabsTrigger>
            <TabsTrigger value="partenaire" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Partenaire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Inscription Client</CardTitle>
                <CardDescription>
                  Créez votre compte client pour accéder à notre catalogue d&apos;équipements.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleClientSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        placeholder="Votre prénom"
                        required
                        value={clientForm.prenom}
                        onChange={handleClientChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        name="nom"
                        placeholder="Votre nom"
                        required
                        value={clientForm.nom}
                        onChange={handleClientChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Numéro de téléphone</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      placeholder="Votre numéro de téléphone"
                      required
                      value={clientForm.telephone}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Votre adresse email"
                      required
                      value={clientForm.email}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cni">Numéro de CNI</Label>
                    <Input
                      id="cni"
                      name="cni"
                      placeholder="Votre numéro de carte nationale d'identité"
                      required
                      value={clientForm.cni}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Créez un mot de passe"
                        required
                        value={clientForm.password}
                        onChange={handleClientChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                          {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      required
                      value={clientForm.confirmPassword}
                      onChange={handleClientChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={clientForm.acceptTerms}
                      onCheckedChange={(checked) =>
                        setClientForm((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      J&apos;accepte les{" "}
                      <Link href="/conditions-utilisation" className="text-primary hover:underline">
                        conditions d&apos;utilisation
                      </Link>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={!clientForm.acceptTerms}>
                    S&apos;inscrire
                  </Button>
                  <p className="text-center text-sm text-zinc-500">
                    Déjà un compte?{" "}
                    <Link href="/connexion" className="text-zinc-900 hover:underline">
                      Se connecter
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="partenaire">
            <Card>
              <CardHeader>
                <CardTitle>Inscription Partenaire</CardTitle>
                <CardDescription>
                  Créez votre compte partenaire pour proposer vos équipements à la location.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePartenaireSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomEntreprise">Nom de l&apos;entreprise</Label>
                    <Input
                      id="nomEntreprise"
                      name="nomEntreprise"
                      placeholder="Nom de votre entreprise"
                      required
                      value={partenaireForm.nomEntreprise}
                      onChange={handlePartenaireChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="typeEngins">Type d&apos;engins proposés</Label>
                    <Select value={partenaireForm.typeEngins} onValueChange={handlePartenaireSelectChange}>
                      <SelectTrigger id="typeEngins">
                        <SelectValue placeholder="Sélectionnez un type d'engin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groupes-electrogenes">Groupes électrogènes</SelectItem>
                        <SelectItem value="panneaux-solaires">Panneaux solaires</SelectItem>
                        <SelectItem value="mixte">Mixte (les deux)</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email de l'entreprise"
                      required
                      value={partenaireForm.email}
                      onChange={handlePartenaireChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Numéro de téléphone</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      placeholder="Téléphone de l'entreprise"
                      required
                      value={partenaireForm.telephone}
                      onChange={handlePartenaireChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Créez un mot de passe"
                        required
                        value={partenaireForm.password}
                        onChange={handlePartenaireChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                          {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      required
                      value={partenaireForm.confirmPassword}
                      onChange={handlePartenaireChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={partenaireForm.acceptTerms}
                      onCheckedChange={(checked) =>
                        setPartenaireForm((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      J&apos;accepte les{" "}
                      <Link href="/conditions-utilisation" className="text-primary hover:underline">
                        conditions d&apos;utilisation
                      </Link>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={!partenaireForm.acceptTerms}>
                    S&apos;inscrire
                  </Button>
                  <p className="text-center text-sm text-zinc-500">
                    Déjà partenaire?{" "}
                    <Link href="/connexion" className="text-zinc-900 hover:underline">
                      Se connecter
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
