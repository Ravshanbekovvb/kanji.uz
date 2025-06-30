'use client'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface User {
	id: string
	email: string
	userName: string
	role: string
}

interface AuthContextType {
	user: User | null
	isLoading: boolean
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
	logout: () => void
	checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	const checkAuth = async () => {
		try {
			setIsLoading(true)
			const response = await fetch('/api/auth/me', {
				method: 'GET',
				credentials: 'include',
			})

			if (response.ok) {
				const result = await response.json()
				if (result.success) {
					setUser(result.data)
				} else {
					setUser(null)
				}
			} else {
				setUser(null)
			}
		} catch (error) {
			console.error('Auth check failed:', error)
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	const login = async (
		email: string,
		password: string
	): Promise<{ success: boolean; error?: string }> => {
		try {
			setIsLoading(true)
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email, password }),
			})

			const result = await response.json()
			console.log(result)

			if (response.ok && result.success) {
				setUser(result.data)
				return { success: true }
			} else {
				return { success: false, error: result.message || 'Login failed' }
			}
		} catch (error) {
			console.error('Login failed:', error)
			return { success: false, error: 'Network error. Please try again.' }
		} finally {
			setIsLoading(false)
		}
	}

	const logout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			})

			if (response.ok) {
				setUser(null)
				router.push('/login')
			}
		} catch (error) {
			console.error('Logout failed:', error)
			// Force logout on client side even if server request fails
			setUser(null)
			router.push('/login')
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	const value: AuthContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout,
		checkAuth,
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
