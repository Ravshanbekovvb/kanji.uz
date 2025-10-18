import { apiResponse, apiResponseError, isAdmin, signupService } from '@/lib'
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
	const isAdminUser = await isAdmin(accessToken)
	if (!isAdminUser) {
		return apiResponse(
			{ success: false, message: 'you are not Admin!', data: null },
			{ status: 401 }
		)
	}
	try {
		const signupRequests = await signupService.findAll()

		return apiResponse(
			{
				success: true,
				message: 'signup Requests returned successfully from database',
				data: signupRequests,
			},
			{ status: 200 }
		)
	} catch (error) {
		if (error instanceof NotFoundError)
			return NextResponse.json(
				{ success: false, message: 'singup Requests not found', data: [] },
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
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	const payload: { note: string; email: string; name: string } = await request.json()

	try {
		const createdSignupRequest = await signupService.create(payload)

		const { createdAt, ...safeSignupRequest } = createdSignupRequest

		return apiResponse(
			{ success: true, message: 'User created successfully', data: safeSignupRequest },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
