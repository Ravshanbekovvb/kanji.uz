import { apiResponse, apiResponseError } from '@/lib'
import { notificationService } from '@/lib/services/notification.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
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

		// Get both public notifications and user-specific notifications
		const publicNotifications = await notificationService.findAll(
			new URL(request.url.replace(/\/user-combined.*/, '/find?public=true'))
		)
		const userNotifications = await notificationService.findByUserId(userId)

		// Combine and sort by creation date (newest first)
		const allNotifications = [...publicNotifications, ...userNotifications].sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)

		return apiResponse({
			data: allNotifications,
			message: 'User notifications returned successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
