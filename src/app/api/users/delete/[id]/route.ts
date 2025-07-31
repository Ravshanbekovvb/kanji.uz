import { apiResponse, apiResponseError, userService, verifyToken, requireAdmin } from '@/lib'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType> | NextResponse> {
	const { id } = await params
	
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	// Check if user is admin
	const roleCheck = requireAdmin(authResult.user!.role)
	if (!roleCheck.isValid) {
		return roleCheck.response!
	}
	
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
