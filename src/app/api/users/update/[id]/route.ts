import { apiResponse, apiResponseError, userService, verifyToken } from '@/lib'
import { ApiResponseType, CreateUserRequestType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType> | NextResponse> {
	const { id } = await params
	const payload: CreateUserRequestType = await request.json()
	
	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		return authResult.response!
	}

	const { role, sub } = authResult.user!
	const currentUserId = sub.replace('user-', '')

	// Check permissions: Admin can update anyone, Users can only update themselves
	if (role !== 'ADMIN' && currentUserId !== id) {
		return apiResponse(
			{ success: false, message: 'Access denied. You can only update your own profile.', data: null },
			{ status: 403 }
		)
	}
	
	try {
		const updatedUser = await userService.update(id, payload)

		const { createdAt, updatedAt, password, tokens, ...safeUser } = updatedUser

		return apiResponse(
			{ success: true, message: 'User updated successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
