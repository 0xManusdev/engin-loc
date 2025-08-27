import { API_URL } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // Récupérer les cookies de la requête
        const cookieHeader = request.headers.get('cookie')
        
        if (!cookieHeader) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
        }

        // Faire une requête vers l'API backend pour vérifier l'authentification
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
        }

        const userData = await response.json()
        
        return NextResponse.json({
            user: userData.user,
            message: 'Utilisateur authentifié'
        })

    } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error)
        return NextResponse.json(
            { error: 'Erreur interne du serveur' }, 
            { status: 500 }
        )
    }
}
