import { apiResponse } from '@/lib'
import { JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export interface AuthResult {
	isValid: boolean
	user?: JWTType
	response?: NextResponse
}

/**
 * Verify JWT token from request cookies
 */
export function verifyToken(request: NextRequest): AuthResult {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return {
			isValid: false,
			response: apiResponse(
				{ success: false, message: 'No access token provided', data: null },
				{ status: 401 }
			)
		}
	}

	try {
		const decoded = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType
		return {
			isValid: true,
			user: decoded
		}
	} catch (error) {
		return {
			isValid: false,
			response: apiResponse(
				{ success: false, message: 'Token is invalid or expired', data: null },
				{ status: 401 }
			)
		}
	}
}

/**
 * Check if user has required role
 */
export function requireRole(userRole: string, requiredRole: string): AuthResult {
	if (userRole !== requiredRole) {
		return {
			isValid: false,
			response: apiResponse(
				{ success: false, message: `Access denied. ${requiredRole} role required.`, data: null },
				{ status: 403 }
			)
		}
	}
	return { isValid: true }
}

/**
 * Check if user has any of the required roles
 */
export function requireAnyRole(userRole: string, requiredRoles: string[]): AuthResult {
	if (!requiredRoles.includes(userRole)) {
		return {
			isValid: false,
			response: apiResponse(
				{ success: false, message: `Access denied. One of these roles required: ${requiredRoles.join(', ')}`, data: null },
				{ status: 403 }
			)
		}
	}
	return { isValid: true }
}

/**
 * Check if user is admin
 */
export function requireAdmin(userRole: string): AuthResult {
	return requireRole(userRole, 'ADMIN')
}
