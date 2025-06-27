import { ApiResponse, prisma } from '@/lib'

import * as bcrypt from 'bcrypt'

import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

type Body = {
	userName: string
	email: string
	password: string
}

// response.cookies.set({
// 	name: 'refreshToken',
// 	value: refreshToken,
// 	httpOnly: true,
// 	secure: true,
// 	path: '/',
// 	sameSite: 'strict',
// 	maxAge: ms('7d'),
// })

const JWT_SECRET_KEY = process.env.JWT_SECRET!

export async function POST(request: Request) {
	const { email, password, userName }: Body = await request.json()

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (existingUser)
			return ApiResponse(
				{
					success: false,
					message: `There is has user with this email: ${email}`,
					data: null,
				},
				{ status: 409 }
			)

		const hashedPass = await bcrypt.hash(password, 10)

		const refreshToken = jwt.sign(
			{
				sub: ``,
				email,
				jti: uuidv4(),
			},
			JWT_SECRET_KEY
		)

		const registeredUser = await prisma.user.create({
			data: {
				userName,
				email,
				password: hashedPass,
				tokens: {
					create: {
						refreshToken,
					},
				},
			},
		})

		const { createdAt, updatedAt, password: _, ...safeUser } = registeredUser

		return ApiResponse(
			{
				success: true,
				message: 'User created successfully',
				data: safeUser,
			},
			{ status: 201 }
		)
	} catch (error) {
		return ApiResponse(
			{
				success: false,
				message: 'Something went wrong',
				data: null,
			},
			{ status: 500 }
		)
	}
}
