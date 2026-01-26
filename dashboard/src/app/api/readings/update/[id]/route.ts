import { apiResponse, apiResponseError, readingsService } from '@/lib'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
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

	const { id } = await params
	const payload: {
		title?: string
		jlptLevel?: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
	} = await request.json()

	// Validate that at least one field is provided
	if (!payload.title && !payload.jlptLevel) {
		return apiResponse(
			{
				success: false,
				message: 'At least one field (title or jlptLevel) must be provided',
				data: null,
			},
			{ status: 400 }
		)
	}

	try {
		const updatedReadingSection = await readingsService.updateSection(id, payload)

		return apiResponse(
			{
				success: true,
				message: 'Reading section updated successfully',
				data: updatedReadingSection,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
