import { apiResponse, apiResponseError } from '@/lib'
import { prisma } from '@/lib/prisma'
import { ApiResponseType, JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ testId: string }> }
): Promise<NextResponse<ApiResponseType>> {
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

	const { testId } = await params
	const payload: {
		text?: string
		mainQuestion?: string
		difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
		questions?: {
			id?: string
			question: string
			options: string[]
			correctAnswer: number
		}[]
	} = await request.json()

	try {
		// Check if reading test exists
		const existingTest = await prisma.readingTest.findUnique({
			where: { id: testId },
			include: { questions: true },
		})

		if (!existingTest) {
			return apiResponse(
				{ success: false, message: 'Reading test not found', data: null },
				{ status: 404 }
			)
		}

		// Update reading test in transaction
		const updatedTest = await prisma.$transaction(async tx => {
			// Update the reading test basic info
			const updatedReadingTest = await tx.readingTest.update({
				where: { id: testId },
				data: {
					...(payload.text && { text: payload.text }),
					...(payload.mainQuestion && { mainQuestion: payload.mainQuestion }),
					...(payload.difficulty && { difficulty: payload.difficulty }),
				},
			})

			// If questions are provided, update them
			if (payload.questions && payload.questions.length > 0) {
				// Delete existing questions
				await tx.readingTestQuestion.deleteMany({
					where: { testId: testId },
				})

				// Create new questions
				await tx.readingTestQuestion.createMany({
					data: payload.questions.map(q => ({
						testId: testId,
						question: q.question,
						options: q.options,
						correctAnswer: q.correctAnswer,
					})),
				})
			}

			// Return updated test with questions
			return await tx.readingTest.findUnique({
				where: { id: testId },
				include: {
					questions: true,
					author: {
						select: {
							userName: true,
							id: true,
						},
					},
				},
			})
		})

		return apiResponse(
			{ success: true, message: 'Reading test updated successfully', data: updatedTest },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
