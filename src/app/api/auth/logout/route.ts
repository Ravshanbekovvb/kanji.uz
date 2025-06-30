import { apiResponse, apiResponseError, authService } from '@/lib'
import { ApiResponseType, CreateUserRequestType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse<ApiResponseType>> {
	const payload: Pick<CreateUserRequestType, 'email' | 'password'> = await request.json()

	try {
		const registeredUser = await authService.login(payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = registeredUser

		const response = apiResponse(
			{ success: true, message: 'User logout successfully', data: safeUser },
			{ status: 200 }
		)

		response.cookies.set('accessToken', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 0,
			sameSite: 'lax',
		})

		return response
	} catch (error) {
		return apiResponseError(error)
	}
}
