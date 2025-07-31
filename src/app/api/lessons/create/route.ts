import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType> | NextResponse> {
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	try {
		const { sub } = authResult.user!
		const userId = sub.replace('user-', '')

		// Get request body
		const body = await request.json()
		const { title, words } = body

		if (!title || typeof title !== 'string' || title.trim().length === 0) {
			return apiResponse(
				{ success: false, message: 'Title is required and must be a non-empty string', data: null },
				{ status: 400 }
			)
		}

		if (!words || !Array.isArray(words) || words.length === 0) {
			return apiResponse(
				{ success: false, message: 'At least one word is required', data: null },
				{ status: 400 }
			)
		}

		// Validate word structure
		for (const word of words) {
			if (
				!word.kanji ||
				!word.translation ||
				!word.transcription ||
				!word.example ||
				!word.jlptLevel
			) {
				return apiResponse(
					{
						success: false,
						message:
							'Each word must have kanji, translation, transcription, example, and jlptLevel',
						data: null,
					},
					{ status: 400 }
				)
			}
		}

		const newLesson = await lessonService.createLessonWithWords(userId, title.trim(), words)

		return apiResponse(
			{
				success: true,
				message: 'Lesson created successfully',
				data: newLesson,
			},
			{ status: 201 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
