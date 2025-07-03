import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ lessonId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { lessonId } = await params

	try {
		const words = await lessonService.findWordsByLessonId(lessonId)

		const singleWordsArray = words.flatMap(item => item.words)

		return apiResponse(
			{ success: true, message: 'Words returned successfully', data: singleWordsArray },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
