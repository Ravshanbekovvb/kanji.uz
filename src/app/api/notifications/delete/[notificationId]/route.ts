import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ notificationId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { notificationId } = await params

	try {
		const deletedNotification = await notificationService.delete(notificationId)

		return apiResponse({
			data: deletedNotification,
			message: 'Notification deleted successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
