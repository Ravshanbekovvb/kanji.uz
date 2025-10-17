import { apiResponse, apiResponseError, isAdmin, signupService } from '@/lib'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { id } = await params
	const body: { status: 'APPROVED' | 'REJECTED' } = await request.json()
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 }
		)
	}

	const isTokenValid = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType

	if (!isTokenValid) {
		return apiResponse({ success: false, message: 'Token is expired', data: null }, { status: 401 })
	}
	const isAdminUser = await isAdmin(accessToken)
	if (!isAdminUser) {
		return apiResponse(
			{ success: false, message: 'you are not Admin!', data: null },
			{ status: 401 }
		)
	}
	try {
		const isUpdatedStatus = signupService.updateRequestStatus(id, body.status)

		return apiResponse(
			{
				success: true,
				message: 'Singup request updated successfully from database',
				data: isUpdatedStatus,
			},
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
