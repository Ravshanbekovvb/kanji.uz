import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
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
