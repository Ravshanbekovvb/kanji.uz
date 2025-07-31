import { apiResponse, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { NextRequest } from 'next/server'

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ lessonId: string }> }
) {
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	const { role, sub } = authResult.user!
	const userId = sub.replace('user-', '')

	try {
		const { lessonId } = await params

		const body = await request.json()
		const { words } = body

		if (!words || !Array.isArray(words)) {
			return apiResponse(
				{ success: false, message: 'Words array is required', data: null },
				{ status: 400 }
			)
		}

		// Check if the lesson belongs to the authenticated user (except for admin)
		if (role !== 'ADMIN') {
			const existingLesson = await lessonService.findById(lessonId)

			if (!existingLesson) {
				return apiResponse(
					{ success: false, message: 'Lesson not found', data: null },
					{ status: 404 }
				)
			}

			if (existingLesson.userId !== userId) {
				return apiResponse(
					{ success: false, message: 'You do not have permission to modify this lesson', data: null },
					{ status: 403 }
				)
			}
		}

		const updatedLesson = await lessonService.addWordsToLesson(lessonId, words)

		return apiResponse({
			success: true,
			message: 'Words added successfully',
			data: updatedLesson,
		})
	} catch (error: any) {
		console.error('Error adding words to lesson:', error)
		return apiResponse(
			{ success: false, message: error.message || 'Internal server error', data: null },
			{ status: 500 }
		)
	}
}
