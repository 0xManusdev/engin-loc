
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { API_URL } from '@/lib/utils';

// const API_URL = "http://localhost:8000/api";

interface Machine {
    name: string;
    description: string;
    state: string;
    location: string;
    subCategoryId: string;
    brandId: string;
    subCategory: {
        id: number;
        categoryId: number;
        nom: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    };
    brand: {
        id: number;
        nom: string;
        createdAt: string;
        updatedAt: string;
    };
    images: {
        id: number;
        machineId: number;
        imageUrl: string;
        altText: string;
        position: number;
        createdAt: string;
    }[];
}

export function useGetAllMachines() {
    return useQuery({
        queryKey: ['machines'],
        queryFn: async (): Promise<Machine[]> => {
            const response = await fetch(`${API_URL}/machines`, {
                method: 'GET',
                credentials: 'include',
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
                method: 'GET',
                credentials: 'include',
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
