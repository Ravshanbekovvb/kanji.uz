'use client'
import { useCheckAuth, useLogin, useLogout } from '@/hooks/useAuth'
import { User } from '@/lib'
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
	const router = useRouter()

	// Use the custom hook instead of duplicating API logic
	const { data: userData, isLoading, refetch: refetchUser } = useCheckAuth()

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
		}
	}

	const logout = () => {
		LogoutData.mutate(undefined, {
			onSuccess: () => {
				router.push('/login')
			},
			onError: () => {
				// Even on error, redirect to login
				router.push('/login')
			},
		})
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
