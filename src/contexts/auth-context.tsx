'use client'
import { useLogin, useLogout } from '@/hooks/useAuth'
import { User } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createContext, useContext } from 'react'

interface AuthContextType {
	isSignIn: boolean
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
	logout: () => void
	refetchUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: React.ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
	const route = useRouter()
	// Use React Query for auth check
	const {
		data: userData,
		isLoading,
		refetch: refetchUser,
	} = useQuery({
		queryKey: ['auth', 'user'],
		queryFn: async (): Promise<User | null> => {
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
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})

	// Login mutation
	const LoginData = useLogin()

	// Logout mutation
	const LogoutData = useLogout()

	const login = async (
		email: string,
		password: string
	): Promise<{ success: boolean; error?: string }> => {
		try {
			await LoginData.mutateAsync({ email, password })
			return { success: true }
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Login failed'
			return { success: false, error: errorMessage }
		} finally {
		}
	}

	const logout = () => {
		LogoutData.mutate()
		route.push('/login')
	}

	const value: AuthContextType = {
		user: (userData as User) || null,
		isLoading,
		isAuthenticated: !!userData,
		isSignIn: LoginData.isPending,
		login,
		logout,
		refetchUser,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
