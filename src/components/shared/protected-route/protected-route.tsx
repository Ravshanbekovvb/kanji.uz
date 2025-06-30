'use client'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader } from '../loader'

interface ProtectedRouteProps {
	children: React.ReactNode
	requiredRole?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
	const { user, isLoading, isAuthenticated } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login')
		}

		if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
			router.push('/') // Redirect to home if user doesn't have required role
		}
	}, [isLoading, isAuthenticated, user, requiredRole, router])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<Loader />
			</div>
		)
	}

	if (!isAuthenticated) {
		return null
	}

	if (requiredRole && user?.role !== requiredRole) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<h2 className='text-xl font-semibold text-gray-900'>Access Denied</h2>
					<p className='text-gray-600'>You don't have permission to access this page.</p>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
