import { apiResponse, apiResponseError, authService } from '@/lib'
import { ApiResponseType, CreateUserRequest } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
	const payload: CreateUserRequest = await request.json()

	try {
		const registeredUser = await authService.register(payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = registeredUser

		return apiResponse(
			{ success: true, message: 'User created successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
