import { apiResponse, apiResponseError } from '@/lib'
import { isTeacher } from '@/lib/func/is-teacher'
import { readingsService } from '@/lib/services/readings.service'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ sectionId: string }> }
): Promise<NextResponse<ApiResponseType>> {
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

	const { sectionId } = await params
	const body = await request.json()

	try {
		const newReadingTest = await readingsService.addReadingToSection(sectionId, body)

		return apiResponse({
			data: newReadingTest,
			message: 'Reading test added successfully to section',
			success: true,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
