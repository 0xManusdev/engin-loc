"use client"

import Link from "next/link"
import { useState } from "react"
import {
    Menu, Search, ShoppingCart, MessageCircle, User, Building, ChevronDown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        window.location.href = `/recherche?q=${encodeURIComponent(searchQuery)}`
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 mr-4">
                    <span className="font-bold text-sm lg:text-xl text-accent">K&R Secure</span>
                </Link>

                {/* Center Nav - Desktop */}
                <nav className="hidden md:flex md:flex-1 md:justify-center items-center gap-6">
                    {/* Catalogue Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-1 px-2 hover:bg-accent/80">
                                Catalogue <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem asChild><Link href="/client/catalogue/btp">Engins BTP</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/catalogue/vehicules">Véhicules</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/catalogue/energie">Énergie</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/catalogue">Voir tout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Services Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-1 px-2">
                                Services <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem asChild><Link href="/client/vente-achat">Vente & Achat</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/service-apres-vente">Service Après-Vente</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/surete-securite">Sûreté & Sécurité</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/conseils-assistance">Conseils & Assistance</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/client/devenir-partenaire" className="text-sm font-medium hover:text-primary">Devenir Partenaire</Link>
                    <Link href="/client/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
                </nav>

                {/* Right actions - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {/* <form onSubmit={handleSearch} className="relative w-60">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="pl-8 pr-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form> */}

                    {/* <Link href="/favoris">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 text-xs">2</Badge>
                        </Button>
                    </Link>

                    <Link href="/messages">
                        <Button variant="ghost" size="icon" className="relative">
                            <MessageCircle className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 text-xs">3</Badge>
                        </Button>
                    </Link> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild><Link href="/connexion"><User className="mr-2 h-4 w-4" />Se connecter</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/inscription"><Building className="mr-2 h-4 w-4" />Inscription</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/client/tableau-de-bord">Espace Client</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/partenaire/tableau-de-bord">Espace Partenaire</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Right actions - Mobile */}
                <div className="md:hidden flex items-center gap-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Menu className="h-5 w-5" />
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
                                        {["btp", "vehicules", "energie"].map((cat) => (
                                            <Link
                                                key={cat}
                                                href={`/client/catalogue/${cat}`}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-sm text-zinc-500 hover:text-primary pl-2"
                                            >
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </Link>
                                        ))}
                                        <Link href="/client/catalogue" onClick={() => setIsOpen(false)} className="block text-sm text-zinc-500 hover:text-primary pl-2">Voir tout</Link>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 text-sm font-medium">Services</h3>
                                        {[
                                            ["vente-achat", "Vente & Achat"],
                                            ["service-apres-vente", "Service Après-Vente"],
                                            ["surete-securite", "Sûreté & Sécurité"],
                                            ["conseils-assistance", "Conseils & Assistance"],
                                        ].map(([href, label]) => (
                                            <Link
                                                key={href}
                                                href={`/client/${href}`}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-sm text-zinc-500 hover:text-primary pl-2"
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="space-y-2 pt-4 border-t">
                                        {[
                                            ["/client/devenir-partenaire", "Devenir Partenaire"],
                                            ["/client/contact", "Contact"],
                                            ["/connexion", "Connexion"],
                                            ["/inscription", "Inscription"],
                                            ["/client/tableau-de-bord", "Espace Client"],
                                            ["/partenaire/tableau-de-bord", "Espace Partenaire"],
                                        ].map(([href, label]) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className="block text-sm font-medium hover:text-primary"
                                            >
                                                {label}
                                            </Link>
                                        ))}
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
