import { apiResponse, readingsService } from '@/lib'
import { BadRequest, ConflictError, NotFoundError, UnauthorizedError } from '@/types/errors'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!
export async function GET(
	request: NextRequest
): Promise<NextResponse<ApiResponseType> | NextResponse> {
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
	try {
		const foundedReadingSections = await readingsService.findAll()

		return apiResponse(
			{
				success: true,
				message: 'Reading sections returned successfully from database.',
				data: foundedReadingSections,
			},
			{ status: 200 }
		)
	} catch (error) {
		if (error instanceof NotFoundError)
			return NextResponse.json(
				{ success: false, message: 'Reading sections not found', data: [] },
				{ status: 404 }
			)

		if (
			error instanceof ConflictError ||
			error instanceof BadRequest ||
			error instanceof UnauthorizedError
		)
			return apiResponse(
				{ success: false, message: error.message, data: null },
				{ status: error.status }
			)

		return apiResponse(
			{
				success: false,
				message: 'Something went wrong' + error,
				data: null,
			},
			{ status: 500 }
		)
	}
}
