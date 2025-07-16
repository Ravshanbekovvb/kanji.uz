import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { userId } = await params
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}

	const isTokenValid = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType

	if (!isTokenValid) {
		return apiResponse({ success: false, message: 'Token is expired', data: null }, { status: 401 })
	}

	const { role, sub } = isTokenValid
	const tokenUserId = sub.replace('user-', '')

	// Users can only access their own lessons unless they are admin
	if (role !== 'ADMIN' && tokenUserId !== userId) {
		return apiResponse({ success: false, message: 'Access denied', data: null }, { status: 403 })
	}

	try {
		const userWithLessons = await lessonService.findByUserId(userId)

		return apiResponse(
			{
				success: true,
				message: 'User lessons returned successfully',
				data: userWithLessons,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
