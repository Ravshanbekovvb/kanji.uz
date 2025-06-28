import { apiResponse, apiResponseError, userService } from '@/lib'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponseType>> {
	try {
		const foundedUser = await userService.findAll()

		const safeUsers = foundedUser.map(({ createdAt, password, updatedAt, ...safeUser }) => safeUser)

		return apiResponse(
			{
				success: true,
				message: 'Users returned successfully from database',
				data: safeUsers,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
