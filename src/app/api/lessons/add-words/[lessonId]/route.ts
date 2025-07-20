import { apiResponse } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function POST(request: NextRequest, { params }: { params: Promise<{ lessonId: string }> }) {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}

	try {
		const isTokenValid = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType

		if (!isTokenValid) {
			return apiResponse(
				{ success: false, message: 'Token is expired', data: null },
				{ status: 401 }
			)
		}

		const { sub } = isTokenValid
		const userId = sub.replace('user-', '')

		const { lessonId } = await params

		const body = await request.json()
		const { words } = body

		if (!words || !Array.isArray(words)) {
			return apiResponse(
				{ success: false, message: 'Words array is required', data: null },
				{ status: 400 }
			)
		}

		// Check if the lesson belongs to the authenticated user
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
