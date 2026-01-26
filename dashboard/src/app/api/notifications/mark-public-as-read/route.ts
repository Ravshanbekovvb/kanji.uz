import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/services/notification.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function PATCH(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}

	try {
		const isTokenValid = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType

		if (!isTokenValid) {
			return apiResponse(
				{ success: false, message: 'Token is expired', data: null },
				{ status: 401 }
			)
		}

		const { sub } = isTokenValid
		const userId = sub.replace('user-', '')

		const { notificationId } = await request.json()

		if (!notificationId) {
			return apiResponse({
				data: null,
				message: 'Notification ID is required',
				success: false,
			})
		}

		await notificationService.markPublicNotificationAsReadByUser(notificationId, userId)

		return apiResponse({
			data: null,
			message: 'Public notification marked as read successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
