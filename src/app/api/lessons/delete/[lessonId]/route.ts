import { apiResponse, apiResponseError } from '@/lib'
import { lessonService } from '@/lib/lesson.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ lessonId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { lessonId } = await params

	try {
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
