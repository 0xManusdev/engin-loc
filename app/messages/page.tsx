"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, ArrowLeft, Send, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const vendeur = searchParams.get("vendeur")

  const [activeConversation, setActiveConversation] = useState<number | null>(vendeur ? 1 : null)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Données fictives pour les conversations
  const conversations = [
    {
      id: 1,
      contact: vendeur || "Entreprise BTP Pro",
      lastMessage: "Bonjour, je suis intéressé par votre grue à tour. Est-elle toujours disponible ?",
      timestamp: "10:30",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        {
          sender: "me",
          content: "Bonjour, je suis intéressé par votre grue à tour. Est-elle toujours disponible ?",
          timestamp: "10:25",
        },
        {
          sender: "other",
          content: "Bonjour ! Oui, la grue est toujours disponible pour location.",
          timestamp: "10:27",
        },
        {
          sender: "other",
          content: "Quand souhaiteriez-vous la louer ?",
          timestamp: "10:27",
        },
        {
          sender: "me",
          content: "Je voudrais la louer pour la période du 20 au 30 avril.",
          timestamp: "10:30",
        },
      ],
    },
    {
      id: 2,
      contact: "Support Technique",
      lastMessage: "Votre ticket a été pris en charge. Un technicien vous contactera dans les 24h.",
      timestamp: "Hier",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        {
          sender: "me",
          content: "Bonjour, j'ai un problème avec mon groupe électrogène. Il ne démarre pas correctement.",
          timestamp: "Hier, 14:20",
        },
        {
          sender: "other",
          content: "Bonjour, merci de nous avoir contactés. Pouvez-vous nous donner plus de détails sur le problème ?",
          timestamp: "Hier, 14:35",
        },
        {
          sender: "me",
          content: "Quand je l'allume, il fait un bruit étrange puis s'arrête après quelques secondes.",
          timestamp: "Hier, 14:40",
        },
        {
          sender: "other",
          content: "Votre ticket a été pris en charge. Un technicien vous contactera dans les 24h.",
          timestamp: "Hier, 15:00",
        },
      ],
    },
    {
      id: 3,
      contact: "Michel Petit - Expert Énergie",
      lastMessage: "Je vous recommande de vérifier d'abord le niveau d'huile avant toute chose.",
      timestamp: "Lun",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        {
          sender: "me",
          content: "Bonjour Michel, j'ai besoin de conseils pour l'achat d'un nouveau groupe électrogène.",
          timestamp: "Lundi, 09:15",
        },
        {
          sender: "other",
          content: "Bonjour ! Bien sûr, quelle puissance recherchez-vous et pour quel usage ?",
          timestamp: "Lundi, 09:30",
        },
        {
          sender: "me",
          content: "Je cherche un modèle d'environ 20kVA pour un chantier de construction.",
          timestamp: "Lundi, 09:45",
        },
        {
          sender: "other",
          content: "Je vous recommande de vérifier d'abord le niveau d'huile avant toute chose.",
          timestamp: "Lundi, 10:00",
        },
      ],
    },
  ]

  // Filtrer les conversations
  const filteredConversations = conversations.filter((conv) =>
    conv.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Détecter la vue mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Faire défiler jusqu'au dernier message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Ici, vous implémenteriez la logique d'envoi de message
    setMessage("")
  }

  const showConversationList = !isMobileView || activeConversation === null
  const activeConv = filteredConversations.find((c) => c.id === activeConversation)

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-zinc-500">Gérez vos conversations avec les vendeurs et le support</p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[320px_1fr] h-[600px]">
          {/* Liste des conversations */}
          {showConversationList && (
            <div className="border-r">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(600px-57px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`flex items-center gap-3 p-3 hover:bg-zinc-50 cursor-pointer ${
                        activeConversation === conv.id ? "bg-zinc-100" : ""
                      }`}
                      onClick={() => setActiveConversation(conv.id)}
                    >
                      <Avatar>
                        <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={conv.contact} />
                        <AvatarFallback>{conv.contact[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conv.contact}</h3>
                          <span className="text-xs text-zinc-500">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-zinc-500 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary h-5 w-5 flex items-center justify-center p-0">{conv.unread}</Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-zinc-500">Aucune conversation trouvée</div>
                )}
              </div>
            </div>
          )}

          {/* Conversation active */}
          {activeConversation !== null ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-3 border-b">
                {isMobileView && (
                  <Button variant="ghost" size="icon" onClick={() => setActiveConversation(null)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeConv?.avatar || "/placeholder.svg"} alt={activeConv?.contact} />
                    <AvatarFallback>{activeConv?.contact[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConv?.contact}</h3>
                    <p className="text-xs text-zinc-500">En ligne</p>
                  </div>
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    Voir profil
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConv?.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "me" ? "bg-primary text-white rounded-tr-none" : "bg-zinc-100 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-zinc-500"}`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button type="button" variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <h3 className="font-medium mb-2">Sélectionnez une conversation</h3>
                <p className="text-zinc-500">Choisissez une conversation pour commencer à discuter</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
