import { apiResponse, apiResponseError, userService, verifyToken } from '@/lib'
import { NotFoundError } from '@/types/errors'
import { ApiResponseType } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType> | NextResponse> {
	const { id } = await params

	console.log('🔍 USER FIND API called with ID:', id)

	// Verify token
	const authResult = verifyToken(request)
	if (!authResult.isValid) {
		console.log('❌ Token verification failed')
		return authResult.response!
	}

	const { role, sub } = authResult.user!
	const currentUserId = sub.replace('user-', '')

	console.log('👤 Auth info:', { role, sub, currentUserId, requestedId: id })

	// Check permissions: Admin can view anyone, Users can only view themselves
	if (role !== 'ADMIN' && currentUserId !== id) {
		console.log('🚫 Permission denied:', { currentUserId, requestedId: id })
		return apiResponse(
			{ success: false, message: 'Access denied. You can only view your own profile.', data: null },
			{ status: 403 }
		)
	}

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
