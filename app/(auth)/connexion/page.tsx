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
import { useLogin } from "@/hooks/use-auth"

export default function ConnexionPage() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [userType, setUserType] = useState("client")
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const login = useLogin()
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		console.log(formData)
		login.mutate(formData)

		setIsLoading(false)

		// Redirection basée sur le type d'utilisateur
		if (userType === "client") {
			router.push("/client/tableau-de-bord")
		} else {
			router.push("/partenaire/tableau-de-bord")
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Connexion</h1>
					<p className="text-zinc-500">Connectez-vous à votre compte</p>
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
								<CardTitle>Espace Client</CardTitle>
								<CardDescription>Accédez à votre espace client pour gérer vos locations.</CardDescription>
							</CardHeader>
							<form onSubmit={handleSubmit}>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											placeholder="Entrez votre email"
											required
											value={formData.email}
											onChange={handleChange}
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="password">Mot de passe</Label>
											<Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:underline">
												Mot de passe oublié?
											</Link>
										</div>
										<div className="relative">
											<Input
												id="password"
												name="password"
												type={showPassword ? "text" : "password"}
												placeholder="Entrez votre mot de passe"
												required
												value={formData.password}
												onChange={handleChange}
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
								</CardContent>
								<CardFooter className="flex flex-col space-y-4">
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<>
												<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
												Connexion en cours...
											</>
										) : (
											"Se connecter"
										)}
									</Button>
									<p className="text-center text-sm text-zinc-500">
										Pas encore de compte?{" "}
										<Link href="/inscription" className="text-primary hover:underline">
											S&apos;inscrire
										</Link>
									</p>
								</CardFooter>
							</form>
						</Card>
					</TabsContent>

					<TabsContent value="partenaire">
						<Card>
							<CardHeader>
								<CardTitle>Espace Partenaire</CardTitle>
								<CardDescription>Accédez à votre espace partenaire pour gérer vos équipements.</CardDescription>
							</CardHeader>
							<form onSubmit={handleSubmit}>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											placeholder="Entrez votre email"
											required
											value={formData.email}
											onChange={handleChange}
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="password">Mot de passe</Label>
											<Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:underline">
												Mot de passe oublié?
											</Link>
										</div>
										<div className="relative">
											<Input
												id="password"
												name="password"
												type={showPassword ? "text" : "password"}
												placeholder="Entrez votre mot de passe"
												required
												value={formData.password}
												onChange={handleChange}
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
								</CardContent>
								<CardFooter className="flex flex-col space-y-4">
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<>
												<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
												Connexion en cours...
											</>
										) : (
											"Se connecter"
										)}
									</Button>
									<p className="text-center text-sm text-zinc-500">
										Pas encore partenaire?{" "}
										<Link href="/devenir-partenaire" className="text-primary hover:underline">
											Devenir partenaire
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
