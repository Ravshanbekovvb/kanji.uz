import { apiResponse, apiResponseError, userService } from '@/lib'
import {
	type ApiResponseType,
	CreateUserWithRepeatPasswordRequestType,
	JWTType,
} from '@/types/types'

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
	const payload: CreateUserWithRepeatPasswordRequestType = await request.json()

	try {
		const createdUser = await userService.create(payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = createdUser

		return apiResponse(
			{ success: true, message: 'User created successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
