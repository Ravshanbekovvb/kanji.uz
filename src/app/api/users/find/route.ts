import { apiResponse, userService } from '@/lib'
import { BadRequest, ConflictError, NotFoundError, UnauthorizedError } from '@/types/errors'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponseType> | NextResponse> {
	try {
		const foundedUser = await userService.findAll()

		const safeUsers = foundedUser.map(
			({ createdAt, password, updatedAt, tokens, ...safeUser }) => safeUser
		)

		return apiResponse(
			{
				success: true,
				message: 'Users returned successfully from database',
				data: safeUsers,
			},
			{ status: 200 }
		)
	} catch (error) {
		if (error instanceof NotFoundError)
			return NextResponse.json(
				{ success: false, message: 'Users not found', data: [] },
				{ status: 404 }
			)

		if (
			error instanceof ConflictError ||
			error instanceof BadRequest ||
			error instanceof UnauthorizedError
		)
			return apiResponse(
				{ success: false, message: error.message, data: null },
				{ status: error.status }
			)

		return apiResponse(
			{
				success: false,
				message: 'Something went wrong' + error,
				data: null,
			},
			{ status: 500 }
		)
	}
}
