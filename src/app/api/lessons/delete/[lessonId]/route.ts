import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ lessonId: string }> }
): Promise<NextResponse<ApiResponseType> | NextResponse> {
	const { lessonId } = await params
	
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	const { role, sub } = authResult.user!
	const userId = sub.replace('user-', '')

	try {
		// Check if user owns the lesson (except for admin)
		if (role !== 'ADMIN') {
			const lesson = await lessonService.findById(lessonId)
			if (!lesson || lesson.userId !== userId) {
				return apiResponse(
					{ success: false, message: 'Access denied. You can only delete your own lessons.', data: null },
					{ status: 403 }
				)
			}
		}

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
