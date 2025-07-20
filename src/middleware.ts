import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

interface JWTPayload {
	sub: string
	role: 'ADMIN' | 'USER'
	iat: number
	exp: number
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	console.log('Middleware triggered for:', pathname)

	// Skip middleware for auth pages and API routes
	if (
		pathname.startsWith('/login') ||
		pathname.startsWith('/api/') ||
		pathname.startsWith('/_next/') ||
		pathname.startsWith('/fonts/') ||
		pathname.includes('.')
	) {
		console.log('Skipping middleware for:', pathname)
		return NextResponse.next()
	}

	const accessToken = request.cookies.get('accessToken')?.value
	console.log('Access token found:', !!accessToken)

	// Redirect to login if no token
	if (!accessToken) {
		console.log('No token, redirecting to login')
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const decoded = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTPayload
		const userRole = decoded.role

		console.log('Middleware Debug:', {
			pathname,
			userRole,
			decoded: { sub: decoded.sub, role: decoded.role },
		})

		// Define role-based access
		const adminOnlyRoutes = ['/users', '/all-docs']
		const userOnlyRoutes = ['/my-docs', '/create-pdf']
		const commonRoutes = ['/', '/settings', '/notifications']

		// Check if admin is accessing user-only routes
		if (userRole === 'ADMIN' && userOnlyRoutes.some(route => pathname.startsWith(route))) {
			console.log('Redirecting admin from user-only route:', pathname)
			// Redirect admin to home if they try to access user-only routes
			return NextResponse.redirect(new URL('/', request.url))
		}

		// Check if regular user is accessing admin-only routes
		if (userRole === 'USER' && adminOnlyRoutes.some(route => pathname.startsWith(route))) {
			console.log('Redirecting user from admin-only route:', pathname)
			// Redirect user to home if they try to access admin-only routes
			return NextResponse.redirect(new URL('/', request.url))
		}

		console.log('Allowing access to:', pathname)
		// Allow access to common routes for both roles
		return NextResponse.next()
	} catch (error) {
		console.log('Middleware error:', error)
		// Invalid token, redirect to login
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (images, fonts, etc.)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
	],
}
