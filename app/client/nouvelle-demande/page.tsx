"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Upload, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function NouvelleDemandePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    titre: "",
    equipement: "",
    type: "",
    description: "",
    urgence: "",
  })
  const [files, setFiles] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Demande envoyée",
        description: "Votre demande a été envoyée avec succès. Nous vous contacterons rapidement.",
      })
      router.push("/service-apres-vente")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/service-apres-vente" className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au service après-vente
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nouvelle demande de service</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Décrivez votre problème ou demande de service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la demande</Label>
                <Input
                  id="titre"
                  name="titre"
                  placeholder="Ex: Réparation groupe électrogène"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipement">Équipement concerné</Label>
                  <Input
                    id="equipement"
                    name="equipement"
                    placeholder="Ex: Groupe électrogène 20kVA"
                    value={formData.equipement}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de demande</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reparation">Réparation</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="depannage">Dépannage d'urgence</SelectItem>
                      <SelectItem value="conseil">Conseil technique</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre problème ou demande en détail..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgence">Niveau d'urgence</Label>
                <Select value={formData.urgence} onValueChange={(value) => handleSelectChange("urgence", value)}>
                  <SelectTrigger id="urgence">
                    <SelectValue placeholder="Sélectionnez un niveau d'urgence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faible">Faible - Pas d'urgence</SelectItem>
                    <SelectItem value="moyen">Moyen - À traiter dans la semaine</SelectItem>
                    <SelectItem value="eleve">Élevé - À traiter dans les 48h</SelectItem>
                    <SelectItem value="critique">Critique - Intervention immédiate nécessaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Photos et documents</CardTitle>
              <CardDescription>Ajoutez des photos ou documents pour faciliter le diagnostic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-zinc-400 mb-2" />
                  <p className="text-zinc-500 mb-2">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
                  <p className="text-xs text-zinc-400 mb-4">PNG, JPG, PDF (max 5MB par fichier)</p>
                  <Input
                    id="files"
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="files">
                    <Button type="button" variant="outline">
                      Sélectionner des fichiers
                    </Button>
                  </label>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-medium">Fichiers sélectionnés</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-zinc-500 mr-2" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-zinc-500 ml-2">({(file.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => removeFile(index)}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Disponibilités</CardTitle>
              <CardDescription>Indiquez vos disponibilités pour l'intervention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date souhaitée</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heure">Plage horaire</Label>
                  <Select>
                    <SelectTrigger id="heure">
                      <SelectValue placeholder="Sélectionnez une plage horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matin">Matin (8h - 12h)</SelectItem>
                      <SelectItem value="apres-midi">Après-midi (13h - 17h)</SelectItem>
                      <SelectItem value="journee">Toute la journée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse d'intervention</Label>
                <Input id="adresse" placeholder="Adresse complète du lieu d'intervention" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/service-apres-vente")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Envoyer la demande
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
