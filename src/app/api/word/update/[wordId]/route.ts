import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { wordService } from '@/lib/word.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ wordId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { wordId } = await params
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

		const { role, sub } = isTokenValid
		const userId = sub.replace('user-', '')

		// Get request body
		const body = await request.json()
		const { kanji, translation, transcription, example, jlptLevel } = body

		// Validate at least one field is provided
		if (!kanji && !translation && !transcription && !example && !jlptLevel) {
			return apiResponse(
				{ success: false, message: 'At least one field must be provided to update', data: null },
				{ status: 400 }
			)
		}

		// Check if word exists
		const existingWord = await wordService.findById(wordId)

		if (!existingWord) {
			return apiResponse({ success: false, message: 'Word not found', data: null }, { status: 404 })
		}

		// Check if user has permission to update this word (by checking if they own the lesson)
		const lesson = await lessonService.findById(existingWord.lessonId)

		if (!lesson) {
			return apiResponse(
				{ success: false, message: 'Associated lesson not found', data: null },
				{ status: 404 }
			)
		}

		// Users can only update words from their own lessons unless they are admin
		if (role !== 'ADMIN' && lesson.userId !== userId) {
			return apiResponse({ success: false, message: 'Access denied', data: null }, { status: 403 })
		}

		// Prepare update data (only include fields that were provided)
		const updateData: any = {}
		if (kanji !== undefined) updateData.kanji = kanji
		if (translation !== undefined) updateData.translation = translation
		if (transcription !== undefined) updateData.transcription = transcription
		if (example !== undefined) updateData.example = example
		if (jlptLevel !== undefined) updateData.jlptLevel = jlptLevel

		const updatedWord = await wordService.update(wordId, updateData)

		return apiResponse(
			{
				success: true,
				message: 'Word updated successfully',
				data: updatedWord,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
