import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType> | NextResponse> {
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	const { role, sub } = authResult.user!
	const userId = sub.replace('user-', '')

	try {
		if (role === 'ADMIN') {
			const lessons = await lessonService.findAllForAdmin()

			return apiResponse(
				{ success: true, message: 'Lessons returned successfully', data: lessons },
				{ status: 200 }
			)
		}

		const userWithLessons = await lessonService.findByUserId(userId)

		return apiResponse(
			{
				success: true,
				message: 'User with lessons returned successfully',
				data: userWithLessons,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
