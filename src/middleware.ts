import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

// Use Web Crypto API compatible with Edge Runtime
const getJWTSecretKey = () => {
	const secret = process.env.JWT_SECRET!
	return new TextEncoder().encode(secret)
}

interface JWTPayload {
	sub: string
	role: 'ADMIN' | 'USER'
	iat: number
	exp: number
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	console.log('🔥 MIDDLEWARE EXECUTING:', pathname)

	// Skip middleware for auth pages and API routes
	if (
		pathname.startsWith('/login') ||
		pathname.startsWith('/api/') ||
		pathname.startsWith('/_next/') ||
		pathname.startsWith('/fonts/') ||
		pathname.includes('.')
	) {
		console.log('⏭️ SKIPPING:', pathname)
		return NextResponse.next()
	}

	const accessToken = request.cookies.get('accessToken')?.value
	const allCookies = request.cookies.getAll()

	console.log(
		'🍪 All cookies:',
		allCookies.map(c => `${c.name}=${c.value.substring(0, 20)}...`)
	)
	console.log(
		'🔑 Access token:',
		accessToken ? `Found (${accessToken.substring(0, 20)}...)` : 'NOT FOUND'
	)

	// Redirect to login if no token
	if (!accessToken) {
		console.log('🚫 NO TOKEN - REDIRECTING TO LOGIN')
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const { payload } = await jwtVerify(accessToken, getJWTSecretKey())
		const decoded = payload as unknown as JWTPayload
		const userRole = decoded.role

		console.log('✅ JWT VALID:', {
			pathname,
			userRole,
			decoded: { sub: decoded.sub, role: decoded.role },
		})

		// Define role-based access
		const adminOnlyRoutes = ['/users', '/all-docs', '/diagnostics']
		const userOnlyRoutes = ['/my-docs', '/create-pdf']
		const commonRoutes = ['/', '/settings', '/notifications']

		// Check if admin is accessing user-only routes
		if (userRole === 'ADMIN' && userOnlyRoutes.some(route => pathname.startsWith(route))) {
			// Redirect admin to home if they try to access user-only routes
			return NextResponse.redirect(new URL('/', request.url))
		}

		// Check if regular user is accessing admin-only routes
		if (userRole === 'USER' && adminOnlyRoutes.some(route => pathname.startsWith(route))) {
			// Redirect user to home if they try to access admin-only routes
			return NextResponse.redirect(new URL('/', request.url))
		}

		console.log('🚫 ALLOWING ACCESS TO:', pathname)
		// Allow access to common routes for both roles
		return NextResponse.next()
	} catch (error) {
		console.log('❌ JWT ERROR:', error)
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
