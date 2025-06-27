import { prisma } from '@/lib'
import { ApiResponse } from '@/lib/api-response'

export async function GET(request: Request, { params }: { params: Promise<{ email: string }> }) {
	const { email } = await params

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!existingUser)
			return ApiResponse({
				success: true,
				message: `There is no user with this email: ${email}`,
				data: null,
			})

		const { createdAt, updatedAt, password: _, ...safeUser } = existingUser

		return ApiResponse({
			success: true,
			message: 'User successfully returned from database',
			data: safeUser,
		})
	} catch (error) {
		return ApiResponse({
			success: false,
			message: 'Something went wrong in server',
			data: null,
		})
	}
}
