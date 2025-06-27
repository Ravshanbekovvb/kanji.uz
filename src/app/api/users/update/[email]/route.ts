import { prisma } from '@/lib'
import { ApiResponse } from '@/lib/api-response'

import * as bcrypt from 'bcrypt'

type Body = {
	userName: string
	email: string
	password: string
}

export async function PATCH(request: Request) {
	const { email, password, userName }: Body = await request.json()

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!existingUser)
			return ApiResponse({
				success: false,
				message: `There is no user with this email: ${email}`,
				data: null,
			})

		const hashedPass = await bcrypt.hash(password, 10)

		const editedUser = await prisma.user.update({
			where: {
				email,
			},
			data: {
				email,
				userName,
				password: hashedPass,
			},
		})

		const { createdAt, password: _, updatedAt, ...safeUser } = editedUser

		return ApiResponse({
			success: true,
			message: 'User edited successfully',
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
