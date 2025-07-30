import Link from "next/link"
import {
	ArrowRight,
	Users,
	Building,
	PenToolIcon as Tool,
	Car,
	Zap,
	ShoppingBag,
	Headset,
	Lock,
	HelpCircle,
	HandCoins,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const categorie = [
	{
		name: "Engins BTP",
		description: "Grues, tractopelles, chargeuses et plus",
		bgUrl: "/btp-img.jpg",
		href: "/catalogue/btp",
		color: "primary",
	},
	{
		name: "Véhicules",
		description: "Avec ou sans conducteur, co-voiturage",
		bgUrl: "/voiture-img.jpg",
		href: "/catalogue/vehicules",
		color: "secondary",
	},
	{
		name: "Énergie",
		description: "Groupes électrogènes, panneaux solaires",
		bgUrl: "/energy-img.jpg",
		href: "/catalogue/energie",
		color: "accent",
	},
]

const services = [
	{
		name: "Vente & Achat",
		description: "Achetez ou vendez vos équipements",
		icon: ShoppingBag,
		href: "/vente-achat",
		color: "primary",
	},
	{
		name: "Service Après-Vente",
		description: "Support et maintenance de vos équipements",
		icon: Headset,
		href: "/service-apres-vente",
		color: "secondary",
	},
	{
		name: "Sûreté & Sécurité",
		description: "Sécurisez vos actifs et équipements",
		icon: Lock,
		href: "/surete-securite",
		color: "accent",
	},
	{
		name: "Conseils & Assistance",
		description: "Expertise et accompagnement",
		icon: HelpCircle,
		href: "/conseils-assistance",
		color: "green",
	},
]

const testimonials = [
	{
		name: "Thomas Dubois",
		content: "J'ai pu trouver rapidement un groupe électrogène pour mon chantier. Service impeccable et livraison rapide.",
		icon: Users,
		bgUrl: "/testimonial-1.jpg",
		rating: 5,
		color: "primary",
	},
	{
		name: "Entreprise Énergie Plus",
		content: "En tant que partenaire, j'ai pu rentabiliser mes équipements inutilisés. La plateforme est intuitive et efficace.",
		icon: Building,
		bgUrl: "/testimonial-1.jpg",
		rating: 5,
		color: "secondary",
	},
	{
		name: "Marie Laurent",
		content: "J'ai vendu mon tractopelle en quelques jours grâce à la plateforme. Le processus était simple et sécurisé.",
		icon: HandCoins,
		bgUrl: "/testimonial-1.jpg",
		rating: 5,
		color: "accent",
	},
]

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen w-auto">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 relative">
				<div className="absolute inset-0 bg-[url('/banner-img.jpg')] bg-cover bg-center bg-no-repeat blur-sm from-primary/10 to-white" />
				<div className="absolute inset-0 bg-black/50" />
				<div className="container relative flex items-center justify-center px-4 md:px-6">
					<div className="flex flex-col justify-center items-center space-y-4 max-w-3xl text-center z-10">
						<h1 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl">Location et vente d'équipements professionnels</h1>
						<p className="text-white/80 text-base sm:text-lg md:text-xl">
							Trouvez, louez ou achetez des équipements de qualité pour vos projets. Engins BTP, véhicules, énergie et plus encore.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link href="/catalogue">
								<Button className="px-8 rounded-full bg-primary hover:bg-primary/90">Voir le catalogue</Button>
							</Link>
							<Link href="/vente-achat">
								<Button variant="outline" className="px-8 rounded-full border-none hover:text-white hover:bg-primary/10">
									Acheter & Vendre
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className="w-full py-12 md:py-24 bg-white">
				<div className="container px-4 md:px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Nos Catégories</h2>
						<p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto">
							Découvrez notre large gamme d'équipements professionnels
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{categorie.map((categorie, i) => (
							<Link href={categorie.href} key={i}>
								<Card className="overflow-hidden transition-all hover:shadow-lg">
									<div className="aspect-video relative">
										<Image src={categorie.bgUrl} alt={categorie.name} fill className="object-cover" />
									</div>
									<CardContent className="p-4 text-center">
										<h3 className="text-xl font-bold">{categorie.name}</h3>
										<p className="text-sm text-zinc-500 mt-1">{categorie.description}</p>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="w-full py-12 md:py-24 bg-white">
				<div className="container px-4 md:px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Nos Services</h2>
						<p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto">
							Une plateforme complète pour tous vos besoins professionnels
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
						{services.map((service, i) => (
							<Link href={service.href} key={i}>
								<Card className="overflow-hidden w-60 h-48 transition-all hover:shadow-lg">
									<CardContent className="p-6 flex flex-col items-center text-center">
										<div className="rounded-full bg-primary/10 p-3 mb-4">
											<service.icon className="h-6 w-6 text-primary" />
										</div>
										<h3 className="font-bold">{service.name}</h3>
										<p className="text-sm text-zinc-500 mt-2">{service.description}</p>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="w-full py-12 md:py-24 bg-gradient-to-r from-[#D9D9D9] to-[#D9D9D9]/90">
				<div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 items-center">
					<div>
						<h2 className="text-3xl font-bold md:text-4xl">Vous possédez des équipements?</h2>
						<p className="text-zinc-500 mt-2 max-w-xl text-base sm:text-lg">
							Rejoignez notre réseau de partenaires et générez des revenus supplémentaires en louant ou vendant vos machines.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row sm:justify-end gap-3">
						<Link href="/devenir-partenaire">
							<Button className="px-8 bg-accent hover:bg-accent/90">
								Devenir Partenaire <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="w-full py-12 md:py-24 bg-white">
				<div className="container px-4 md:px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Témoignages</h2>
						<p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto">
							Ce que nos clients et partenaires disent de nous
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial, i) => (
							<div key={i} className="border rounded-lg p-6">
								<p className="text-sm text-zinc-500 mb-4">{testimonial.content}</p>
								<div className="flex items-center space-x-2">
									<testimonial.icon className={`h-5 w-5 text-${testimonial.color}`} />
									<p className="text-sm font-medium">{testimonial.name}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}