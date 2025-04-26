"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Check, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function AjouterAnnoncePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    titre: "",
    categorie: "",
    sousCategorie: "",
    type: "vente",
    description: "",
    prix: "",
    etat: "occasion",
    annee: "",
    marque: "",
    modele: "",
    disponibilite: true,
    negociable: false,
  })
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...filesArray])
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setDocuments((prevDocs) => [...prevDocs, ...filesArray])
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Annonce publiée",
        description: "Votre annonce a été publiée avec succès.",
      })
      router.push("/vente-achat")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/vente-achat" className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux annonces
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-primary/10 p-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Publier une annonce</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Décrivez l&apos;équipement que vous souhaitez vendre ou louer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de l&apos;annonce</Label>
                <Input
                  id="titre"
                  name="titre"
                  placeholder="Ex: Tractopelle JCB 3CX en excellent état"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categorie">Catégorie</Label>
                  <Select value={formData.categorie} onValueChange={(value) => handleSelectChange("categorie", value)}>
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btp">Engins BTP</SelectItem>
                      <SelectItem value="vehicules">Véhicules</SelectItem>
                      <SelectItem value="energie">Énergie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                  <Select
                    value={formData.sousCategorie}
                    onValueChange={(value) => handleSelectChange("sousCategorie", value)}
                    disabled={!formData.categorie}
                  >
                    <SelectTrigger id="sousCategorie">
                      <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.categorie === "btp" && (
                        <>
                          <SelectItem value="levage">Engins de Levage</SelectItem>
                          <SelectItem value="tractopelle">Tractopelle</SelectItem>
                          <SelectItem value="chargeuses">Chargeuses</SelectItem>
                          <SelectItem value="divers">Engins et Outils Divers</SelectItem>
                        </>
                      )}
                      {formData.categorie === "vehicules" && (
                        <>
                          <SelectItem value="avec-conducteur">Avec Conducteur / Guide</SelectItem>
                          <SelectItem value="sans-conducteur">Sans Conducteur</SelectItem>
                          <SelectItem value="co-voiturage">Co-voiturage</SelectItem>
                        </>
                      )}
                      {formData.categorie === "energie" && (
                        <>
                          <SelectItem value="groupes-electrogenes">Groupes Électrogènes</SelectItem>
                          <SelectItem value="panneaux-solaires">Panneaux Solaires</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type d&apos;annonce</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vente" id="vente" />
                    <Label htmlFor="vente">Vente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="location" id="location" />
                    <Label htmlFor="location">Location</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre équipement en détail (caractéristiques, état, historique d'utilisation, etc.)"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Caractéristiques et prix</CardTitle>
              <CardDescription>Précisez les détails techniques et le prix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prix">Prix ({formData.type === "location" ? "FCFA / jour" : "FCFA"})</Label>
                  <Input
                    id="prix"
                    name="prix"
                    type="number"
                    placeholder="Ex: 8000000"
                    value={formData.prix}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="etat">État</Label>
                  <Select value={formData.etat} onValueChange={(value) => handleSelectChange("etat", value)}>
                    <SelectTrigger id="etat">
                      <SelectValue placeholder="Sélectionnez l'état" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neuf">Neuf</SelectItem>
                      <SelectItem value="occasion">Occasion</SelectItem>
                      <SelectItem value="reconditionne">Reconditionné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annee">Année</Label>
                  <Input
                    id="annee"
                    name="annee"
                    placeholder="Ex: 2020"
                    value={formData.annee}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marque">Marque</Label>
                  <Input
                    id="marque"
                    name="marque"
                    placeholder="Ex: JCB"
                    value={formData.marque}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modele">Modèle</Label>
                  <Input
                    id="modele"
                    name="modele"
                    placeholder="Ex: 3CX"
                    value={formData.modele}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="disponibilite" className="cursor-pointer">
                    Disponible immédiatement
                  </Label>
                  <Switch
                    id="disponibilite"
                    checked={formData.disponibilite}
                    onCheckedChange={(checked) => handleSwitchChange("disponibilite", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="negociable" className="cursor-pointer">
                    Prix négociable
                  </Label>
                  <Switch
                    id="negociable"
                    checked={formData.negociable}
                    onCheckedChange={(checked) => handleSwitchChange("negociable", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Photos et documents</CardTitle>
              <CardDescription>Ajoutez des photos et documents relatifs à l&apos;équipement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Photos (max 10)</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                    <p className="text-zinc-500 mb-2">Glissez-déposez vos images ici ou cliquez pour parcourir</p>
                    <p className="text-xs text-zinc-400 mb-4">PNG, JPG ou JPEG (max 5MB par image)</p>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={images.length >= 10}
                    />
                    <label htmlFor="images">
                      <Button type="button" variant="outline" disabled={images.length >= 10}>
                        Sélectionner des images
                      </Button>
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Aperçu ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          onClick={() => removeImage(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Documents (factures, certificats, etc.)</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                    <p className="text-zinc-500 mb-2">Glissez-déposez vos documents ici ou cliquez pour parcourir</p>
                    <p className="text-xs text-zinc-400 mb-4">PDF, DOC, DOCX (max 5MB par document)</p>
                    <Input
                      id="documents"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      className="hidden"
                      onChange={handleDocumentChange}
                    />
                    <label htmlFor="documents">
                      <Button type="button" variant="outline">
                        Sélectionner des documents
                      </Button>
                    </label>
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 text-zinc-500"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                          <span className="text-xs text-zinc-500 ml-2">({(doc.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeDocument(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>Comment les acheteurs potentiels peuvent vous contacter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-nom">Nom du contact</Label>
                  <Input id="contact-nom" placeholder="Votre nom ou nom de l'entreprise" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-telephone">Téléphone</Label>
                  <Input id="contact-telephone" placeholder="Votre numéro de téléphone" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-lieu">Lieu</Label>
                <Input id="contact-lieu" placeholder="Ville ou quartier où se trouve l'équipement" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/vente-achat")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Publication en cours...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Publier l&apos;annonce
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
