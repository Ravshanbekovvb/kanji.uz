import { NotFoundError } from '@/types/errors'
import { SignUpType } from '@/types/types'
import { prisma, PrismaClient } from './prisma'

class SignUpService {
	constructor(private readonly prisma: PrismaClient) {}
	async findById(id: string): Promise<SignUpType> {
		const existingSignupRequest = await this.prisma.signupRequest.findUnique({
			where: {
				id,
			},
		})

		if (!existingSignupRequest)
			throw new NotFoundError(`There is no Sign up Request with this ID: #${id}`)

		return existingSignupRequest
	}

	async updateRequestStatus(
		id: string,
		status: 'APPROVED' | 'REJECTED'
	): Promise<SignUpType | null> {
		const existingSignupRequest = await this.prisma.signupRequest.update({
			where: {
				id,
			},
			data: {
				status: status,
			},
		})
		if (!existingSignupRequest)
			throw new NotFoundError(`There is no Sign up Request with this ID: #${id}`)

		return existingSignupRequest
	}

	async findAll(): Promise<SignUpType[]> {
		const existingSingUpRequests = await this.prisma.signupRequest.findMany()
		return existingSingUpRequests
	}

	async findPendingRequests(): Promise<number> {
		return prisma.signupRequest.count({
			where: { status: 'PENDING' },
		})
	}

	// async update(id: string, payload: CreateUserRequestType): Promise<UserWithTokens> {
	// 	const existingUser = await this.findById(id)

	// 	const hashedPassword = await bcrypt.hash(payload.password, 10)

	// 	const updatedUser = await this.prisma.user.update({
	// 		where: {
	// 			id: existingUser.id,
	// 		},
	// 		data: {
	// 			...payload,
	// 			password: hashedPassword,
	// 		},
	// 		include: {
	// 			tokens: true,
	// 		},
	// 	})

	// 	return updatedUser
	// }

	// async deleteById(id: string): Promise<UserWithTokens> {
	// 	const existingUser = await this.findById(id)

	// 	const deletedUser = await this.prisma.user.delete({
	// 		where: {
	// 			id: existingUser.id,
	// 		},
	// 		include: {
	// 			tokens: true,
	// 		},
	// 	})

	// 	return deletedUser
	// }

	// async deleteByEmail(email: string): Promise<UserWithTokens> {
	// 	const existingUser = await this.findByEmail(email)

	// 	if (!existingUser) throw new NotFoundError(`There is no user with this email: ${email}`)

	// 	const deletedUser = await this.prisma.user.delete({
	// 		where: {
	// 			email: existingUser.email,
	// 		},
	// 		include: {
	// 			tokens: true,
	// 		},
	// 	})

	// 	return deletedUser
	// }
}

const signupService = new SignUpService(prisma)
type SignupServiceType = typeof signupService

export { signupService, type SignupServiceType }
