import { apiResponse, apiResponseError, userService } from '@/lib'
import { NotFoundError } from '@/types/errors'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { id } = await params

	try {
		const foundedUser = await userService.findById(id)

		if (!foundedUser) throw new NotFoundError(`User with this id not found: ${id}`)

		const { updatedAt, password, tokens, ...safeUser } = foundedUser

		return apiResponse(
			{
				success: true,
				message: 'User returned successfully from database',
				data: safeUser,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
