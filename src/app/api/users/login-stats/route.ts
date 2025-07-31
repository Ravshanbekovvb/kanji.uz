import { apiResponse, apiResponseError, verifyToken, requireAdmin } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType> | NextResponse> {
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	// Check if user is admin
	const roleCheck = requireAdmin(authResult.user!.role)
	if (!roleCheck.isValid) {
		return roleCheck.response!
	}

	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				userName: true,
				email: true,
				loginCount: true,
				role: true,
				createdAt: true,
			},
			orderBy: {
				loginCount: 'desc',
			},
		})

		return apiResponse({
			success: true,
			message: 'Users login statistics retrieved successfully',
			data: users,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
