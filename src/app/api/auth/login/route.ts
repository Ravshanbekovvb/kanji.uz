import { apiResponse, apiResponseError, authService } from '@/lib'
import { ApiResponseType, CreateUserRequestType } from '@/types/types'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
	const cookie = await cookies()
	const payload: Pick<CreateUserRequestType, 'email' | 'password'> = await request.json()

	try {
		const registeredUser = await authService.login(payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = registeredUser

		return apiResponse(
			{ success: true, message: 'User created successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
