import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/services/lesson.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function PUT(
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
