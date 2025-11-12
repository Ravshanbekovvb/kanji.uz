import { ConflictError, NotFoundError } from '@/types/errors'
import { SignUpType } from '@/types/types'
import { generateRotatingPassword } from '../func/password-generate'
import { prisma, PrismaClient } from '../prisma'
import { sendMailService } from './send-mail.service'
import { userService } from './user.service'

class SignUpService {
	constructor(private readonly prisma: PrismaClient) {}
	async create(payload: { email: string; name: string; note: string }): Promise<SignUpType> {
		const { email, name, note } = payload

		const existingUser = await this.prisma.user.findUnique({ where: { email: email } })

		if (existingUser) throw new ConflictError(`This email "${email}" is already exists`)
		const exisitingSignupRequest = await this.prisma.signupRequest.findUnique({
			where: {
				email: email,
			},
		})
		if (exisitingSignupRequest) throw new ConflictError(`This email "${email}" is already exists`)
		const createdSignupRequest = await this.prisma.signupRequest.create({
			data: {
				email,
				name,
				note,
				status: 'PENDING',
			},
		})

		return createdSignupRequest
	}
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
				approvedAt: new Date(),
			},
		})
		if (!existingSignupRequest)
			throw new NotFoundError(`There is no Sign up Request with this ID: #${id}`)
		if (status === 'APPROVED') {
			const signupRequest = await signupService.findById(id)
			const password = generateRotatingPassword(
				existingSignupRequest.email,
				existingSignupRequest.name,
				6,
				'lokal-dev-asd',
				'weekly'
			)
			const createdUser = await userService.create({
				email: signupRequest.email,
				role: 'USER',
				password: password,
				loginCount: 0,
				repeatPassword: password,
				userLang: 'UZ',
				userName: signupRequest.name,
			})

			await sendMailService.create({
				to: createdUser.email,
				from: process.env.EMAIL_USER!,
				email: createdUser.email,
				name: createdUser.userName,
				password: password,
				html: 'nima gap!',
			})
		}
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

	async deleteById(id: string): Promise<SignUpType> {
		const existingSignupRequest = await this.findById(id)

		const deletedSignupRequest = await this.prisma.signupRequest.delete({
			where: {
				id: existingSignupRequest.id,
			},
		})

		return deletedSignupRequest
	}
}

const signupService = new SignUpService(prisma)
type SignupServiceType = typeof signupService

export { signupService, type SignupServiceType }
