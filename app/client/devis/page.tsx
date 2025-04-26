"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, CreditCard, Smartphone, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Données fictives pour les équipements
const equipements = [
  {
    id: 1,
    nom: "Groupe électrogène 5kVA",
    type: "Groupe électrogène",
    categorie: "Énergie",
    puissance: "5kVA",
    prix: 15000,
    image: "/placeholder.svg?height=200&width=300",
    disponible: true,
  },
  {
    id: 2,
    nom: "Groupe électrogène 10kVA",
    type: "Groupe électrogène",
    categorie: "Énergie",
    puissance: "10kVA",
    prix: 25000,
    image: "/placeholder.svg?height=200&width=300",
    disponible: true,
  },
]

export default function DevisPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const equipementId = searchParams.get("equipement")
  const debut = searchParams.get("debut")
  const fin = searchParams.get("fin")
  const lieu = searchParams.get("lieu")
  const usage = searchParams.get("usage")

  const [equipement, setEquipement] = useState<any>(null)
  const [duree, setDuree] = useState(0)
  const [total, setTotal] = useState(0)
  const [fraisLivraison, setFraisLivraison] = useState(5000)
  const [paymentMethod, setPaymentMethod] = useState("mobile")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (equipementId && debut && fin) {
      const equip = equipements.find((e) => e.id === Number.parseInt(equipementId))
      if (equip) {
        setEquipement(equip)

        const dateDebut = new Date(debut)
        const dateFin = new Date(fin)
        const diffTime = Math.abs(dateFin.getTime() - dateDebut.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        setDuree(diffDays)
        setTotal(equip.prix * diffDays + fraisLivraison)
      }
    } else {
      router.push("/catalogue")
    }
  }, [equipementId, debut, fin, fraisLivraison, router])

  const handlePayment = () => {
    setIsProcessing(true)

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (!equipement) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="container py-12 max-w-md mx-auto">
        <Card className="border-green-200">
          <CardHeader className="bg-green-50 text-center">
            <div className="mx-auto rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Réservation confirmée</CardTitle>
            <CardDescription>Votre réservation a été effectuée avec succès</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Équipement</p>
              <p className="text-sm text-zinc-500">{equipement.nom}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Période de location</p>
              <p className="text-sm text-zinc-500">
                Du {new Date(debut!).toLocaleDateString("fr-FR")} au {new Date(fin!).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Lieu de livraison</p>
              <p className="text-sm text-zinc-500">{lieu}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Montant total</p>
              <p className="text-sm text-zinc-500">{total.toLocaleString()} FCFA</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Numéro de réservation</p>
              <p className="text-sm text-zinc-500">RES-{Math.floor(Math.random() * 1000000)}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le reçu
            </Button>
            <Link href="/client/tableau-de-bord" className="w-full">
              <Button className="w-full">Voir mes réservations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href={`/catalogue/${equipementId}`} className="flex items-center text-zinc-500 hover:text-zinc-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux détails
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Devis de location</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={equipement.image || "/placeholder.svg"}
                  alt={equipement.nom}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{equipement.nom}</h3>
                  <p className="text-sm text-zinc-500">
                    {equipement.type} - {equipement.puissance}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Période</span>
                  <span>
                    {new Date(debut!).toLocaleDateString("fr-FR")} - {new Date(fin!).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Durée</span>
                  <span>
                    {duree} jour{duree > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Lieu de livraison</span>
                  <span>{lieu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Type d&apos;usage</span>
                  <span>{usage}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Prix journalier</span>
                  <span>{equipement.prix.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">
                    Sous-total ({duree} jour{duree > 1 ? "s" : ""})
                  </span>
                  <span>{(equipement.prix * duree).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Frais de livraison</span>
                  <span>{fraisLivraison.toLocaleString()} FCFA</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Méthode de paiement</h2>

          <Tabs defaultValue="mobile" onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Money
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Carte bancaire
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="Entrez votre numéro de téléphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-zinc-500">Vous recevrez une demande de paiement sur ce numéro</p>
                  </div>

                  <Button className="w-full" onClick={handlePayment} disabled={!phoneNumber || isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      "Payer maintenant"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="card">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Numéro de carte</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d&apos;expiration</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handlePayment}
                    disabled={!cardNumber || !cardExpiry || !cardCvc || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      "Payer maintenant"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2 text-zinc-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>Annulation gratuite jusqu&apos;à 48h avant</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>Support client disponible 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
