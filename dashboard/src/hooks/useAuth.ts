import { User } from '@/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface LoginCredentials {
	email: string
	password: string
}
// Auth API functions
const authAPI = {
	checkAuth: async (): Promise<User | null> => {
		const response = await fetch('/api/auth/me', {
			method: 'GET',
			credentials: 'include',
		})

		if (!response.ok) {
			return null
		}

		const result = await response.json()
		if (result.success) {
			return result.data
		}
		return null
	},

	login: async (credentials: LoginCredentials): Promise<User> => {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(credentials),
		})

		const result = await response.json()

		if (!response.ok || !result.success) {
			throw new Error(result.message || 'Login failed')
		}

		return result.data
	},

	logout: async (): Promise<void> => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Logout failed')
		}
	},
}

// Custom hooks
export function useCheckAuth() {
	return useQuery({
		queryKey: ['auth', 'user'],
		queryFn: authAPI.checkAuth,
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})
}

export function useLogin() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: authAPI.login,
		onSuccess: userData => {
			// Update the auth query cache
			queryClient.setQueryData(['auth', 'user'], userData)
		},
		onError: error => {
			console.error('Login failed:', error)
		},
	})
}

export function useLogout() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: authAPI.logout,
		onSuccess: () => {
			// Clear auth data from cache
			queryClient.removeQueries({ queryKey: ['auth'] })
		},
		onError: error => {
			console.error('Logout failed:', error)
			// Even if logout fails, clear local state
			queryClient.removeQueries({ queryKey: ['auth'] })
		},
	})
}
