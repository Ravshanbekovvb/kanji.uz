import { apiResponse, apiResponseError, userService } from '@/lib'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { id } = await params

	try {
		const deletedUser = await userService.deleteById(id)

		const { createdAt, password, updatedAt, tokens, ...safeUser } = deletedUser

		return apiResponse({
			success: true,
			message: 'User deleted successfully',
			data: safeUser,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
