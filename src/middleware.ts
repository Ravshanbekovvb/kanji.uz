import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const getJWTSecretKey = () => {
	const secret = process.env.JWT_SECRET!
	return new TextEncoder().encode(secret)
}

interface JWTPayload {
	sub: string
	role: 'ADMIN' | 'USER' | 'TEACHER' | 'STUDENT'
	iat: number
	exp: number
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const accessToken = request.cookies.get('accessToken')?.value

	// Define public routes that don't require authentication
	const publicRoutes = ['/login', '/register', '/forgot-password']
	const isPublicRoute = publicRoutes.includes(pathname)

	// If no token and trying to access protected route, redirect to login
	if (!accessToken && !isPublicRoute) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	// If token exists but accessing login page, redirect to dashboard
	if (accessToken && pathname === '/login') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// If no token and accessing public route, allow access
	if (!accessToken && isPublicRoute) {
		return NextResponse.next()
	}

	try {
		const { payload } = await jwtVerify(accessToken!, getJWTSecretKey())
		const decoded = payload as unknown as JWTPayload
		const userRole = decoded.role

		// Define role-based route access
		const adminOnlyRoutes = ['/users', '/all-lessons', '/diagnostics']
		const userOnlyRoutes = ['/my-lessons', '/create-lesson', '/memorize']
		const teacherOnlyRoutes = ['/create-reading']
		const commonRoutes = ['/settings', '/notifications']

		// Check if current path matches any restricted routes
		const isAdminRoute = adminOnlyRoutes.some(route => pathname.startsWith(route))
		const isUserRoute = userOnlyRoutes.some(route => pathname.startsWith(route))
		const isTeacherRoute = teacherOnlyRoutes.some(route => pathname.startsWith(route))
		const isCommonRoute = commonRoutes.some(route => pathname.startsWith(route))

		// Role-based access control
		switch (userRole) {
			case 'ADMIN':
				// Admin hamma joyga kira oladi
				break

			case 'TEACHER':
				// Teacher admin page-larga kirmaydi
				if (isAdminRoute) {
					return NextResponse.redirect(new URL('/', request.url))
				}
				break

			case 'USER':
			case 'STUDENT':
				// USER/STUDENT admin yoki teacher route-larga kira olmaydi
				if (isAdminRoute || isTeacherRoute) {
					return NextResponse.redirect(new URL('/', request.url))
				}
				break

			default:
				return NextResponse.redirect(new URL('/login', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		// Invalid token, clear cookie and redirect to login
		const response = NextResponse.redirect(new URL('/login', request.url))
		response.cookies.delete('accessToken')
		return response
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.|login).*)'],
}
