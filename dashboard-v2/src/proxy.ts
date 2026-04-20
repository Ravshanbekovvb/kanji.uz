import { NextRequest, NextResponse } from 'next/server'

export default function proxy(req: NextRequest): NextResponse {
	const pathname = req.nextUrl.pathname
	if (pathname === '/') {
		return NextResponse.redirect(new URL('/login', req.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
}
