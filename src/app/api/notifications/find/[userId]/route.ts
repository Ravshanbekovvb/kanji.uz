import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { userId } = await params

	try {
		const notifications = await notificationService.findByUserId(userId)

		return apiResponse({
			data: notifications,
			message: 'Notifications returned by user ID successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
