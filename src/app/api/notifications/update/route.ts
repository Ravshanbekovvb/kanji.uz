import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request): Promise<NextResponse<ApiResponseType>> {
	const body: { message: string; userId: string | null; notificationId: string } =
		await request.json()

	try {
		const updatedNotification = await notificationService.update(
			{ message: body.message, userId: body.userId },
			body.notificationId
		)

		return apiResponse({
			data: updatedNotification,
			message: 'Notification updated successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
