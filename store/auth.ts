import { API_URL } from '@/lib/utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type RoleName = 'admin' | 'client' | 'partner' | string;

interface User {
	email: string;
	name: string;
	lastName: string;
	phone: string;
	role: { nom: RoleName };
}

interface AuthState {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	error: string | null;

	// dérivés stockés (ou à calculer via sélecteurs, au choix)
	isAdmin: boolean;
	isClient: boolean;
	isPartner: boolean;

	// actions
	setUser: (u: User | null) => void;
	setLoading: (b: boolean) => void;
	setError: (msg: string | null) => void;
	logout: () => void;
	checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isLoading: false,
			isAuthenticated: false,
			error: null,
			isAdmin: false,
			isClient: false,
			isPartner: false,

			setUser: (user) =>
				set(() => {
					const role = (user?.role?.nom ?? '').toLowerCase();
					return {
						user,
						isAuthenticated: !!user,
						isAdmin: role === 'admin',
						isClient: role === 'client',
						isPartner: role === 'partner',
						error: null,
					};
				}),

			setLoading: (b) => set({ isLoading: b }),
			setError: (msg) => set({ error: msg }),

			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					isAdmin: false,
					isClient: false,
					isPartner: false,
				}),

			checkAuth: async () => {
				try {
					set({ isLoading: true });
					const response = await fetch(`${API_URL}/auth/me`, {
						credentials: 'include',
					});
					
					if (response.ok) {
						const userData = await response.json();
						get().setUser(userData.user);
					} else {
						// Si pas d'utilisateur connecté, on s'assure que l'état est déconnecté
						get().logout();
					}
				} catch (error) {
					console.error('Erreur lors de la vérification d\'authentification:', error);
					get().logout();
				} finally {
					set({ isLoading: false });
				}
			},
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
