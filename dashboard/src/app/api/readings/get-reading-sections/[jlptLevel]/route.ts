import { apiResponse, apiResponseError, readingsService } from '@/lib'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ jlptLevel: string }> }
): Promise<NextResponse<ApiResponseType>> {
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
	const { jlptLevel } = await params

	try {
		const ReadingSectionByJlptLevel = await readingsService.findReadingSectionTitlesByJlptLevel(
			jlptLevel as 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
		)

		return apiResponse({
			success: true,
			message: 'Reading Sections by level returned successfully!',
			data: ReadingSectionByJlptLevel,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
