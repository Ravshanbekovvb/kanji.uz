import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponseType>> {
	try {
		const body = await req.json()
		const { notificationId } = body

		if (!notificationId) {
			return apiResponse({
				data: null,
				message: 'Notification ID is required',
				success: false,
			})
		}

		const updatedNotification = await notificationService.markAsRead(notificationId)

		return apiResponse({
			data: updatedNotification,
			message: 'Notification marked as read successfully',
			success: true,
		})
	} catch (error: any) {
		return apiResponseError(error)
	}
}
