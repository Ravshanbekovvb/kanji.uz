import { apiResponse, apiResponseError, userService, verifyToken, requireAdmin } from '@/lib'
import {
	type ApiResponseType,
	CreateUserWithRepeatPasswordRequestType,
} from '@/types/types'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponseType> | NextResponse> {
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	// Check if user is admin
	const roleCheck = requireAdmin(authResult.user!.role)
	if (!roleCheck.isValid) {
		return roleCheck.response!
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
