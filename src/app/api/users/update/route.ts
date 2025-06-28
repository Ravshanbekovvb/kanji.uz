import { apiResponse, apiResponseError, userService } from '@/lib'
import { ApiResponseType, CreateUserRequest } from '@/types/types'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request): Promise<NextResponse<ApiResponseType>> {
	const payload: CreateUserRequest = await request.json()

	try {
		const updatedUser = await userService.update(payload)

		const { createdAt, updatedAt, password, ...safeUser } = updatedUser

		return apiResponse(
			{ success: true, message: 'User updated successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
