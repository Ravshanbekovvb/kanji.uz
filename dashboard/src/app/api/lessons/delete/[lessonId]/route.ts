import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/services/lesson.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ lessonId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { lessonId } = await params
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

	try {
		const deletedLesson = await lessonService.deleteById(lessonId)

		return apiResponse({
			success: true,
			message: 'Lesson deleted successfully',
			data: deletedLesson,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
