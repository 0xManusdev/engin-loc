"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingCart, MessageCircle, User, Building, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Rediriger vers la page de recherche avec la requête
    window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <span className="font-bold text-xl text-primary">K&R Secure</span>
        </Link>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 px-2">
                  Catalogue
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/client/catalogue/btp">Engins BTP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/client/catalogue/vehicules">Véhicules</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/client/catalogue/energie">Énergie</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/catalogue">Voir tout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 px-2">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/vente-achat">Vente & Achat</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-apres-vente">Service Après-Vente</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/surete-securite">Sûreté & Sécurité</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/conseils-assistance">Conseils & Assistance</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/devenir-partenaire" className="text-sm font-medium transition-colors hover:text-primary">
              Devenir Partenaire
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-60">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Link href="/favoris">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
              </Button>
            </Link>

            <Link href="/messages">
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/connexion" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Connexion</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/inscription" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    <span>Inscription</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/client/tableau-de-bord" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Espace Client</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/partenaire/tableau-de-bord" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    <span>Espace Partenaire</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="md:hidden flex items-center ml-auto space-x-4">
          <Link href="/favoris">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto">
              <div className="py-4">
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Catalogue</h3>
                    <div className="space-y-2 pl-2">
                      <Link
                        href="/client/catalogue/btp"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Engins BTP
                      </Link>
                      <Link
                        href="/client/catalogue/vehicules"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Véhicules
                      </Link>
                      <Link
                        href="/client/catalogue/energie"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Énergie
                      </Link>
                      <Link
                        href="/catalogue"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Voir tout
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">Services</h3>
                    <div className="space-y-2 pl-2">
                      <Link
                        href="/vente-achat"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Vente & Achat
                      </Link>
                      <Link
                        href="/service-apres-vente"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Service Après-Vente
                      </Link>
                      <Link
                        href="/surete-securite"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Sûreté & Sécurité
                      </Link>
                      <Link
                        href="/conseils-assistance"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Conseils & Assistance
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/devenir-partenaire"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm font-medium hover:text-primary"
                    >
                      Devenir Partenaire
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm font-medium hover:text-primary"
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="mb-2 text-sm font-medium">Compte</h3>
                    <div className="space-y-2 pl-2">
                      <Link
                        href="/connexion"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Connexion
                      </Link>
                      <Link
                        href="/inscription"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Inscription
                      </Link>
                      <Link
                        href="/client/tableau-de-bord"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Espace Client
                      </Link>
                      <Link
                        href="/partenaire/tableau-de-bord"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-500 hover:text-primary"
                      >
                        Espace Partenaire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
