'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { API_URL } from '@/lib/utils';

// const API_URL = "http://localhost:8000/api";

interface Category {
    id: number;
    nom: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    limit: number;
    offset: number;
    totalPages: number;
}

export interface CategoriesResponse {
    success: boolean;
    message: string;
    data: {
        categories: Category[];
        pagination: Pagination;
    };
}

export function useGetAllCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async (): Promise<CategoriesResponse> => {
            const response = await fetch(`${API_URL}/categories/all-with-subcategories`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log('Fetched categories:', response);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        }
    });
}

export function useGetCategoryById(id: number) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: async (): Promise<Category> => {
            const response = await fetch(`${API_URL}/categories/${id}`, {
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

export function useCreateCategory() {
    return useMutation({
        mutationFn: async (data: Partial<Category>) => {
            const response = await fetch(`${API_URL}/categories`, {
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
                title: "Catégorie créée avec succès",
                description: "La catégorie a été ajoutée au système",
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

export function useUpdateCategory() {
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Category> }) => {
            const response = await fetch(`${API_URL}/categories/${id}`, {
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
                title: "Catégorie mise à jour",
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

export function useDeleteCategory() {
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${API_URL}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "Catégorie supprimée",
                description: "La catégorie a été supprimée du système",
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