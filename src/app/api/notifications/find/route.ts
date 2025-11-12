import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/services/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse<ApiResponseType>> {
	const url = new URL(request.url)

	try {
		const notifications = await notificationService.findAll(url)

		return apiResponse({
			data: notifications,
			message: 'Notifications returned successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
