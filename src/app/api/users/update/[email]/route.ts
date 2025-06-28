import { apiResponse, apiResponseError, userService } from '@/lib'
import { ApiResponseType, CreateUserRequestType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ email: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { email } = await params
	const payload: CreateUserRequestType = await request.json()

	try {
		const updatedUser = await userService.update(email, payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = updatedUser

		return apiResponse(
			{ success: true, message: 'User updated successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
