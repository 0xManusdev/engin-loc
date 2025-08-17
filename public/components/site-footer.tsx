import Link from "next/link"
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-zinc-50">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">K&R Secure</h3>
            <p className="text-sm text-zinc-500">
              Votre plateforme de location et vente d&apos;équipements professionnels.
            </p>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">+123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">contact@K&R Secure.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">123 Rue Principale, Ville</span>
            </div>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-zinc-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Catalogue</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/catalogue/btp" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Engins BTP
                </Link>
              </li>
              <li>
                <Link href="/client/catalogue/vehicules" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link href="/client/catalogue/energie" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Énergie
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Voir tout
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vente-achat" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Vente & Achat
                </Link>
              </li>
              <li>
                <Link href="/service-apres-vente" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Service Après-Vente
                </Link>
              </li>
              <li>
                <Link href="/surete-securite" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Sûreté & Sécurité
                </Link>
              </li>
              <li>
                <Link href="/conseils-assistance" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Conseils & Assistance
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-sm text-zinc-500 hover:text-zinc-900">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/conditions-utilisation" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-zinc-500 hover:text-zinc-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Espace Utilisateur</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/connexion" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/client/tableau-de-bord" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Espace Client
                </Link>
              </li>
              <li>
                <Link href="/partenaire/tableau-de-bord" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Espace Partenaire
                </Link>
              </li>
              <li>
                <Link href="/devenir-partenaire" className="text-sm text-zinc-500 hover:text-zinc-900">
                  Devenir Partenaire
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} K&R Secure. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
