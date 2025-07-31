import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType> | NextResponse> {
	try {
		// Verify token
		const authResult = verifyToken(request)
		if (!authResult.isValid) {
			return authResult.response!
		}

		const decoded = authResult.user!
		const userId = decoded.sub?.replace('user-', '')

		if (!userId) {
			return apiResponse(
				{ success: false, message: 'Invalid token format', data: null },
				{ status: 401 }
			)
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				userName: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) {
			return apiResponse({ success: false, message: 'User not found', data: null }, { status: 404 })
		}

		return apiResponse(
			{ success: true, message: 'User authenticated', data: user },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
