// app/api/send/route.ts

import { apiResponse, apiResponseError, isAdmin } from '@/lib'
import { sendMailService } from '@/lib/services/send-mail.service'
import { type ApiResponseType, JWTType, SendMailType } from '@/types/types'

import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}

	const isTokenValid = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType

	if (!isTokenValid) {
		return apiResponse({ success: false, message: 'Token is expired', data: null }, { status: 401 })
	}
	const isAdminUser = await isAdmin(accessToken)
	if (!isAdminUser) {
		return apiResponse(
			{ success: false, message: 'you are not Admin!', data: null },
			{ status: 401 }
		)
	}
	const payload: SendMailType = await request.json()

	try {
		const result = await sendMailService.create(payload)

		return apiResponse(
			{ success: true, message: 'Email sent successfully', data: result },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
