import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/notification.service'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType>> {
	try {
		const { searchParams } = new URL(req.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return apiResponse({
				data: null,
				message: 'User ID is required',
				success: false,
			})
		}

		const count = await notificationService.getUnreadCount(userId)

		return apiResponse({
			data: { count },
			message: 'Unread count retrieved successfully',
			success: true,
		})
	} catch (error: any) {
		return apiResponseError(error)
	}
}
