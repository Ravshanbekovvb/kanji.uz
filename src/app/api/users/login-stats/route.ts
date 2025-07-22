import { apiResponse, apiResponseError } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponseType>> {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				userName: true,
				email: true,
				loginCount: true,
				role: true,
				createdAt: true,
			},
			orderBy: {
				loginCount: 'desc',
			},
		})

		return apiResponse({
			success: true,
			message: 'Users login statistics retrieved successfully',
			data: users,
		})
	} catch (error) {
		return apiResponseError(error)
	}
}
