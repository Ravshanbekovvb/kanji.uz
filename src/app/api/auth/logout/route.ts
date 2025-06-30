import { apiResponse, apiResponseError } from '@/lib'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse<ApiResponseType>> {
	try {
		const response = apiResponse(
			{ success: true, message: 'Logged out successfully', data: null },
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
