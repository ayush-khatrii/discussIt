import { create } from 'zustand';
import config from '../constants/config';

const { SERVER_URL } = config;

const useAuthStore = create((set) => ({
	user: null,
	isAdmin: false,
	isLoading: true,
	isLoggedIn: false,
	signup: async (fullName, password, username, gender) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${SERVER_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ fullName, username, password, gender })
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
	login: async (username, password) => {
		try {
			const response = await fetch(`${SERVER_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({ username, password })
			});

			const userData = await response.json();
			console.log(userData);

			if (!response.ok) {
				throw new Error(userData.message)
			}

		} catch (error) {
			throw error
		} finally {
			set({ isLoading: false })
		}
	},
	logout: async () => {
		try {

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
			}

			else {
				throw new Error('Error logging out', result.message);
			}
		} catch (error) {
			throw error
		} finally {
			set({ isLoading: false })
		}
	},
	getUser: async () => {
		try {
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