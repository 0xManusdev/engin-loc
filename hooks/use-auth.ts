'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const API_URL = "http://localhost:8000/api";

export interface RegisterClientData {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    cni: string;
    password: string;
}

export interface RegisterPartnerData {
    nomEntreprise: string;
    typeEngins: string;
    email: string;
    phone: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export function useRegisterClient() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: RegisterClientData) => {
            const response = await fetch(`${API_URL}/auth/register/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Compte créé avec succès",
                description: "Vous pouvez maintenant vous connecter",
            });
            router.push('/connexion');
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message,
            });
        },
    });
}

export function useRegisterPartner() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: RegisterPartnerData) => {
            const response = await fetch(`${API_URL}/auth/register/partner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Compte partenaire créé avec succès",
                description: "Vous pouvez maintenant vous connecter",
            });
            router.push('/connexion');
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message,
            });
        },
    });
}

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        onSuccess: (data) => {
            toast({
                title: "Connexion réussie",
                description: "Bienvenue sur K&R Secure",
            });

            // Redirect based on user type
            if (data.userType === 'client') {
                router.push('/client/tableau-de-bord');
            } else {
                router.push('/partenaire/tableau-de-bord');
            }
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Erreur de connexion",
                description: error.message,
            });
        },
    });
}


export function useLogout() {
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion');
            }

            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Déconnexion réussie",
                description: "Vous avez été déconnecté avec succès",
            });
            router.push('/');
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message,
            });
        },
    });
}