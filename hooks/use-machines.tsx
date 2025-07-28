'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const API_URL = "http://localhost:8000/api";

interface Machine {
    id: number;
    name: string;
    description: string;
    price: number;
    status: string;
    categoryId: number;
    brandId: number;
    partnerId: number;
    category: {
        id: number;
        name: string;
    };
    brand: {
        id: number;
        name: string; 
    };
    images: {
        id: number;
        imageUrl: string;
    }[];
}

export function useGetAllMachines() {
    return useQuery({
        queryKey: ['machines'],
        queryFn: async (): Promise<Machine[]> => {
            const response = await fetch(`${API_URL}/machines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        }
    });
}

export function useGetMachineById(id: number) {
    return useQuery({
        queryKey: ['machine', id],
        queryFn: async (): Promise<Machine> => {
            const response = await fetch(`${API_URL}/machines/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        enabled: !!id
    });
}

export function useCreateMachine() {
    return useMutation({
        mutationFn: async (data: Partial<Machine>) => {
            const response = await fetch(`${API_URL}/machines`, {
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
                title: "Machine créée avec succès",
                description: "La machine a été ajoutée au catalogue",
            });
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

export function useUpdateMachine() {
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Machine> }) => {
            const response = await fetch(`${API_URL}/machines/${id}`, {
                method: 'PUT',
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
                title: "Machine mise à jour",
                description: "Les modifications ont été enregistrées",
            });
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
