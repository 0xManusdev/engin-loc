"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, sujet: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simuler un envoi de formulaire
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
            setFormData({
                nom: "",
                email: "",
                telephone: "",
                sujet: "",
                message: "",
            })
        }, 1500)
    }

    return (
        <div className="container py-12">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Contactez-nous</h1>
                <p className="text-xl text-zinc-500 max-w-3xl mx-auto">
                    Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Envoyez-nous un message</CardTitle>
                            <CardDescription>
                                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                            </CardDescription>
                        </CardHeader>
                        {!isSuccess ? (
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nom">Nom complet</Label>
                                        <Input
                                            id="nom"
                                            name="nom"
                                            placeholder="Votre nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Adresse email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Votre email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telephone">Numéro de téléphone</Label>
                                            <Input
                                                id="telephone"
                                                name="telephone"
                                                placeholder="Votre téléphone"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sujet">Sujet</Label>
                                        <Select value={formData.sujet} onValueChange={handleSelectChange}>
                                            <SelectTrigger id="sujet">
                                                <SelectValue placeholder="Sélectionnez un sujet" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="information">Demande d&apos;information</SelectItem>
                                                <SelectItem value="reservation">Question sur une réservation</SelectItem>
                                                <SelectItem value="partenariat">Devenir partenaire</SelectItem>
                                                <SelectItem value="support">Support technique</SelectItem>
                                                <SelectItem value="autre">Autre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Votre message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Envoyer le message
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        ) : (
                            <CardContent className="py-6">
                                <div className="text-center space-y-4">
                                    <div className="mx-auto rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center">
                                        <MessageSquare className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-600">Message envoyé avec succès !</h3>
                                    <p className="text-zinc-500">
                                        Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                                    </p>
                                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
                                        Envoyer un autre message
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Nos coordonnées</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                                    <Phone className="h-5 w-5 text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Téléphone</h3>
                                    <p className="text-zinc-500">+123 456 789</p>
                                    <p className="text-zinc-500">Lun-Ven: 8h-18h</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                                    <Mail className="h-5 w-5 text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Email</h3>
                                    <p className="text-zinc-500">contact@K&R Secure.com</p>
                                    <p className="text-zinc-500">support@K&R Secure.com</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                                    <MapPin className="h-5 w-5 text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Adresse</h3>
                                    <p className="text-zinc-500">123 Rue Principale</p>
                                    <p className="text-zinc-500">Ville, Pays</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Foire aux questions</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="font-medium mb-2">Comment fonctionne la location d&apos;équipements ?</h3>
                                <p className="text-zinc-500">
                                    Parcourez notre catalogue, sélectionnez l&apos;équipement qui vous intéresse, choisissez la période de
                                    location et effectuez votre réservation en ligne. Nous nous occupons de la livraison et de
                                    l&apos;installation.
                                </p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="font-medium mb-2">Comment devenir partenaire ?</h3>
                                <p className="text-zinc-500">
                                    Pour devenir partenaire, inscrivez-vous sur notre plateforme en tant que partenaire, complétez votre
                                    profil et ajoutez vos équipements. Notre équipe validera votre compte et vous pourrez commencer à
                                    recevoir des réservations.
                                </p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="font-medium mb-2">Quels sont les délais de livraison ?</h3>
                                <p className="text-zinc-500">
                                    Les délais de livraison varient en fonction de votre localisation et de la disponibilité des
                                    équipements. En général, nous livrons dans un délai de 24 à 48 heures après confirmation de la
                                    réservation.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Comment annuler une réservation ?</h3>
                                <p className="text-zinc-500">
                                    Vous pouvez annuler votre réservation jusqu&apos;à 48 heures avant la date de début sans frais. Pour
                                    cela, connectez-vous à votre compte et accédez à la section &quot;Mes réservations&quot;.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
