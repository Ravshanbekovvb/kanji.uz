import { apiResponse, apiResponseError } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	try {
		const accessToken = request.cookies.get('accessToken')?.value

		if (!accessToken) {
			return apiResponse(
				{ success: false, message: 'No access token provided', data: null },
				{ status: 401 }
			)
		}

		const decoded = jwt.verify(accessToken, JWT_SECRET_KEY) as any
		const userId = decoded.sub?.replace('user-', '')

		if (!userId) {
			return apiResponse(
				{ success: false, message: 'Invalid token format', data: null },
				{ status: 401 }
			)
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				userName: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		})

		if (!user) {
			return apiResponse({ success: false, message: 'User not found', data: null }, { status: 404 })
		}

		return apiResponse(
			{ success: true, message: 'User authenticated', data: user },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
