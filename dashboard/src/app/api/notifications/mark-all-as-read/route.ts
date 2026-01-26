import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/services/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponseType>> {
	try {
		const body = await req.json()
		const { userId } = body

		if (!userId) {
			return apiResponse({
				data: null,
				message: 'User ID is required',
				success: false,
			})
		}

		const result = await notificationService.markAllAsRead(userId)

		return apiResponse({
			data: result,
			message: `${result.count} notifications marked as read`,
			success: true,
		})
	} catch (error: any) {
		return apiResponseError(error)
	}
}
