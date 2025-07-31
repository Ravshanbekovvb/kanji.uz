import { apiResponse, apiResponseError, verifyToken } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ lessonId: string }> }
): Promise<NextResponse<ApiResponseType> | NextResponse> {
	const { lessonId } = await params
	
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	try {
		const words = await lessonService.findWordsByLessonId(lessonId)

		const singleWordsArray = words.flatMap(item => item.words)
		const singleTitle = words.flatMap(item => item.title)

		return apiResponse(
			{
				success: true,
				message: 'Words returned successfully',
				data: { title: singleTitle, words: singleWordsArray },
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
