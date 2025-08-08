import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

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
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const { payload } = await jwtVerify(accessToken, getJWTSecretKey())
		const decoded = payload as unknown as JWTPayload
		const userRole = decoded.role

		const adminOnlyRoutes = ['/users', '/all-docs', '/diagnostics']
		const userOnlyRoutes = ['/my-docs', '/create-lesson']
		const commonRoutes = ['/settings', '/notifications']

		if (userRole === 'ADMIN' && userOnlyRoutes.some(route => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/', request.url))
		}

		if (userRole === 'USER' && adminOnlyRoutes.some(route => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/', request.url))
		}

		return NextResponse.next()
	} catch (error) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.|login).*)'],
}
