import { apiResponse, apiResponseError } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

type RankingUser = {
	id: string
	userName: string
	role: string | null
	lessonsCount: number
	wordsCount: number
	rank: number
}

type RankingPayload = {
	topUsers: RankingUser[]
	currentUser: RankingUser | null
	totalUsers: number
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponseType>> {
	const accessToken = request.cookies.get('accessToken')?.value

	if (!accessToken) {
		return apiResponse(
			{ success: false, message: 'No access token provided', data: null },
			{ status: 401 },
		)
	}

	try {
		const decoded = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTType
		const userId = decoded.sub.replace('user-', '')

		const users = await prisma.user.findMany({
			select: {
				id: true,
				userName: true,
				role: true,
				createdAt: true,
				_count: {
					select: {
						lesson: true,
					},
				},
				lesson: {
					select: {
						_count: {
							select: {
								words: true,
							},
						},
					},
				},
			},
		})

		const rankedUsers = users
			.map(user => {
				const wordsCount = user.lesson.reduce((total, lesson) => total + lesson._count.words, 0)

				return {
					id: user.id,
					userName: user.userName,
					role: user.role,
					lessonsCount: user._count.lesson,
					wordsCount,
					createdAt: user.createdAt,
				}
			})
			.sort((a, b) => {
				if (b.wordsCount !== a.wordsCount) {
					return b.wordsCount - a.wordsCount
				}

				if (b.lessonsCount !== a.lessonsCount) {
					return b.lessonsCount - a.lessonsCount
				}

				return a.createdAt.getTime() - b.createdAt.getTime()
			})
			.map((user, index) => ({
				id: user.id,
				userName: user.userName,
				role: user.role,
				lessonsCount: user.lessonsCount,
				wordsCount: user.wordsCount,
				rank: index + 1,
			}))

		const payload: RankingPayload = {
			topUsers: rankedUsers.slice(0, 5),
			currentUser: rankedUsers.find(user => user.id === userId) || null,
			totalUsers: rankedUsers.length,
		}

		return apiResponse(
			{ success: true, message: 'Ranking returned successfully', data: payload },
			{ status: 200 },
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
