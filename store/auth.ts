import { create } from 'zustand';

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
}

export const useAuthStore = create<AuthState>((set) => ({
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
}));
