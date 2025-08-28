
import type React from "react"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/lib/react-query-provider"
import { AuthProvider } from "@/components/auth-provider"
import { API_URL } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })


export const metadata = {
	title: "K&R Secure - Location d'équipements professionnels",
	description: "Plateforme de location et vente d'équipements professionnels pour entreprises et particuliers",
}


async function getSession() {
    const res = await fetch(`${API_URL}/auth/me`, {
        cache: "no-store",
    });
    if (!res.ok) return { user: null };
    return res.json();
  }


export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const session = await getSession()

	return (
		<html lang="fr">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					<ReactQueryProvider>
						<AuthProvider session={session}>
							<div className="relative flex min-h-screen flex-col">
								<SiteHeader />
								<main className="flex-1">{children}</main>
								<SiteFooter />
								<Toaster position="top-center" richColors />
							</div>
						</AuthProvider>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}


