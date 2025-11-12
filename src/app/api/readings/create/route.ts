import { apiResponse, apiResponseError } from '@/lib'
import { cleanUserId } from '@/lib/func/clean-user-id'
import { isTeacher } from '@/lib/func/is-teacher'
import { readingsService } from '@/lib/services/readings.service'
import { ApiResponseType, JWTType, ReadingType } from '@/types/types'
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
	if (!(jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType)) {
		return apiResponse({ success: false, message: 'Token is expired', data: null }, { status: 401 })
	}

	if (!(await isTeacher(accessToken))) {
		return apiResponse(
			{ success: false, message: 'you are not Teacher!', data: null },
			{ status: 401 }
		)
	}
	const teacherId = cleanUserId((jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType).sub)

	const body: ReadingType = await request.json()

	try {
		const createdReadingTest = await readingsService.create({ teacherId, ...body })

		return apiResponse({
			data: createdReadingTest,
			message: 'Notification created successfully',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
