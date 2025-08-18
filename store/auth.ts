import { create } from 'zustand';


interface User {
	email: string;
	password: string;
	name: string;
	lastName: string;
	phone: string;
	cni: string;
}

interface AuthState {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	isAdmin: boolean;
	isClient: boolean;
	fetchUser: () => Promise<void>;
	setUser: (u: User | null) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isLoading: false,
	isAuthenticated: false,
	loading: false,
	error: null,
	isAdmin: false,
	isClient: false,
	isPartner: false,
	isSuperAdmin: false,
	setUser: (user) => set({ user }),
	fetchUser: async () => {
		set({ isLoading: true });
		try {
			const response = await fetch(`${process.env.API_URL}/auth/me`, { credentials: 'include' });
			if (response.ok) {
				const user = await response.json();
				set({
					user,
					isLoading: false,
					isAuthenticated: true,
					isAdmin: user.role === 'admin',
					isClient: user.role === 'client',
				});
			} else {
				set({ user: null, isLoading: false, isAuthenticated: false });
			}
		} catch (error) {
			console.error(error);
		} finally {
			set({ user: null, isLoading: false });
		}
	},
}));
