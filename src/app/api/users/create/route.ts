import { apiResponse, apiResponseError, userService } from '@/lib'
import { type ApiResponseType, CreateUserWithRepeatPasswordRequestType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
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
