import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
	const body: { message: string; userId: string | null } = await request.json()

	try {
		const createdNotification = await notificationService.create(body)

		return apiResponse({
			data: createdNotification,
			message: 'Notification created successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
