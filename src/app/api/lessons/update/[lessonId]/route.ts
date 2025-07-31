import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
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
		// Get request body
		const body = await request.json()
		const { title } = body

		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return apiResponse(
				{ success: false, message: 'Title is required and must be a non-empty string', data: null },
				{ status: 400 }
			)
		}

		// Check if lesson exists and user has permission
		const existingLesson = await lessonService.findById(lessonId)

		if (!existingLesson) {
			return apiResponse(
				{ success: false, message: 'Lesson not found', data: null },
				{ status: 404 }
			)
		}

		// Users can only update their own lessons unless they are admin
		if (role !== 'ADMIN' && existingLesson.userId !== userId) {
			return apiResponse({ success: false, message: 'Access denied', data: null }, { status: 403 })
		}

		const updatedLesson = await lessonService.updateTitle(lessonId, title.trim())

		return apiResponse(
			{
				success: true,
				message: 'Lesson title updated successfully',
				data: updatedLesson,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
