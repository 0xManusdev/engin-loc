"use client"

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const checkAuth = useAuthStore(s => s.checkAuth)
    const isLoading = useAuthStore(s => s.isLoading)

    useEffect(() => {
        // Vérifier l'authentification au chargement de l'application
        checkAuth()
    }, [checkAuth])

    // Optionnel : afficher un indicateur de chargement pendant la vérification
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        )
    }

    return <>{children}</>
}
