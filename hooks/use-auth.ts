'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { use } from 'react';
import { toast } from 'sonner';


export interface RegisterClientData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
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
            const response = await fetch(`${API_URL}/auth/register/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
            toast.success("Compte créé avec succès");
            router.push('/connexion');
        },
        onError: (error: Error) => {
            toast.error("Erreur");
        },
    });
}

export function useRegisterPartner() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: RegisterPartnerData) => {
            const response = await fetch(`${API_URL}/auth/register/partner`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
            toast.success("Compte partenaire créé avec succès");
            router.push('/connexion');
        },
        onError: (error: Error) => {
            toast.error("Erreur");
        },
    });
}

export function useLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setUser = useAuthStore(s => s.setUser);


    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
            setUser(data.user);

            queryClient.invalidateQueries();
            console.log("User logged in:", useAuthStore.getState().isAuthenticated);
            toast.success("Connexion réussie");

            // Redirect based on user type
            if ((data.user.role.nom).toLowerCase() === 'client') {
                router.push('/client/catalogue');
            } else if ((data.user.role.nom).toLowerCase() === 'admin') {
                router.push('/partenaire/tableau-de-bord');
            }
        },
        onError: (error: Error) => {
            toast.error("Erreur de connexion");
        },
    });
}


export function useLogout() {
    const router = useRouter();
    const logoutStore = useAuthStore(s => s.logout);

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la déconnexion');
            }

            return response.json();
        },
        onSuccess: () => {
            // Mettre à jour le store Zustand
            logoutStore();
            
            toast.success("Déconnexion réussie");
            router.push('/');
        },
        onError: (error: Error) => {
            toast.error("Erreur");
        },
    });
}