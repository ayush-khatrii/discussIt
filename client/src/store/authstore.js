import { create } from 'zustand';
import config from '../constants/config';
const { SERVER_URL } = config;
const useAuthStore = create((set) => ({
	user: null,
	isAdmin: false,
	isLoading: false,
	isLoggedIn: false,
	signup: async (fullName, password, username, gender, bio) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${SERVER_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ fullName, username, password, gender, bio })
			});

			const resut = await response.json();

			if (response.ok) {
				set({ user: resut });
			} else {
				throw new Error(resut.message);
			}
		} catch (error) {
			throw error;
		} finally {
			set({ isLoading: false })
		}
	},
	// login: async (username, password) => {
	// 	try {
	// 		const response = await fetch(`${SERVER_URL}/api/auth/login`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			credentials: 'include',
	// 			body: JSON.stringify({ username, password })
	// 		});

	// 		const userData = await response.json();
	// 		if (!response.ok) {
	// 			throw new Error(userData.message)
	// 		}
	// 		return userData;

	// 	} catch (error) {
	// 		throw error
	// 	} finally {
	// 		set({ isLoading: false })
	// 	}
	// },

	login: async (username, password) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${SERVER_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ username, password })
			});

			const userData = await response.json();
			if (!response.ok) {
				throw new Error(userData.message)
			}
			set({ user: userData, isLoggedIn: true }); // Update user state and isLoggedIn
			return userData;
		} catch (error) {
			throw error
		} finally {
			set({ isLoading: false })
		}
	},
	logout: async () => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${SERVER_URL}/api/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
			});

			const result = response.json();
			if (response.ok) {
				set({ user: null });
				set({ isLoggedIn: false });
			}
		} catch (error) {
			console.log('Error logging out:', error);
		} finally {
			set({ isLoading: false })
		}
	},
	getUser: async () => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${SERVER_URL}/api/user/profile`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			const userData = await response.json();
			if (response.ok) {
				set({ isLoggedIn: true });
				set({ user: userData });
				return userData;
			}
		} catch (error) {
			console.error("getUser error:", error);
		} finally {
			set({ isLoading: false });
		}
	}
}));
export default useAuthStore;