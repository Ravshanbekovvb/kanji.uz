import { prisma } from '@/lib'
import { ApiResponse } from '@/lib/api-response'

export async function GET() {
	try {
		const existingUser = await prisma.user.findMany()

		if (!existingUser || existingUser.length === 0)
			return ApiResponse({
				success: false,
				message: 'There are no users in database',
				data: null,
			})

		const safeUsers = existingUser.map(
			({ createdAt, password, updatedAt, ...safeUser }) => safeUser
		)

		return ApiResponse({
			success: true,
			message: 'Users successfully returned from database',
			data: safeUsers,
		})
	} catch (error) {
		return ApiResponse({
			success: false,
			message: 'Something went wrong in server',
			data: null,
		})
	}
}
