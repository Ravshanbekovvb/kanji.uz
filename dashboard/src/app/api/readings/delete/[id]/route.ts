import { apiResponse, apiResponseError, readingsService } from '@/lib'
import { isTeacher } from '@/lib/func/is-teacher'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponseType>> {
	const { id } = await params
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
	if (!(await isTeacher(accessToken))) {
		return apiResponse(
			{ success: false, message: 'you are not Teacher!', data: null },
			{ status: 401 }
		)
	}
	try {
		const deletedReadingSection = await readingsService.deleteById(id)

		return apiResponse({
			success: true,
			message: 'Reading Section deleted successfully',
			data: deletedReadingSection,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
