import { API_URL } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Brand {
    id: string;
    nom: string;
}

export function useGetAllBrands() {
    return useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/brands`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    })
}

export function useGetBrandById(id: string) {
    return useQuery({
        queryKey: ['brand', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/brands/${id}`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        }
    })
}

export function useCreateBrand() {  
    return useMutation({
        mutationFn: async (brand: Brand) => {
            const response = await fetch(`${API_URL}/brands`, {
                method: 'POST',
                body: JSON.stringify(brand),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        }
    })
}

export function useUpdateBrand() {
    return useMutation({
        mutationFn: async (brand: Brand) => {
            const response = await fetch(`${API_URL}/brands/${brand.id}`, {
                method: 'PUT',
                body: JSON.stringify(brand),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        }
    })
}   