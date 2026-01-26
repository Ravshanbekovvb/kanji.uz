import { apiResponse, apiResponseError } from '@/lib'
import { cleanUserId } from '@/lib/func/clean-user-id'
import { readingsService } from '@/lib/services/readings.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { ReadingProgress } from '../../../../../prisma/__generated__'
const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	const accessToken = request.cookies.get('accessToken')?.value
	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}
	if (!(jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType)) {
		return apiResponse({ success: false, message: 'Token is expired', data: null }, { status: 401 })
	}

	const userId = cleanUserId((jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType).sub)

	const body: ReadingProgress = await request.json()
	const { isCorrect, solvedTime, testLevel } = body
	try {
		const createdReadingTest = await readingsService.createReadingProgress({
			userId,
			isCorrect,
			solvedTime,
			testLevel,
		})

		return apiResponse({
			data: createdReadingTest,
			message: 'Notification created successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
