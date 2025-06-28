import { apiResponse, apiResponseError, userService } from '@/lib'
import { type ApiResponseType, CreateUserRequest } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
	const payload: CreateUserRequest = await request.json()

	try {
		const createdUser = await userService.create(payload)

		const { createdAt, updatedAt, password, ...safeUser } = createdUser

		return apiResponse(
			{ success: true, message: 'User created successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
