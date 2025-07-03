import {
	CreateUserRequestType,
	CreateUserWithRepeatPasswordRequestType,
	UserWithTokens,
} from '@/types/types'
import { prisma, PrismaClient } from './prisma'

import { BadRequest, ConflictError, NotFoundError } from '@/types/errors'
import * as bcrypt from 'bcrypt'

class UserService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<UserWithTokens> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tokens: true,
			},
		})

		if (!existingUser) throw new NotFoundError(`There is no user with this ID: #${id}`)

		return existingUser
	}

	async findByEmail(email: string): Promise<UserWithTokens | null> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				tokens: true,
			},
		})

		return existingUser
	}

	async findAll(): Promise<UserWithTokens[]> {
		const existingUsers = await this.prisma.user.findMany({
			include: {
				tokens: true,
			},
		})

		if (existingUsers.length === 0) throw new NotFoundError(`There is no users in databases`)

		return existingUsers
	}

	async create(payload: CreateUserWithRepeatPasswordRequestType): Promise<UserWithTokens> {
		const { email, password, userName, repeatPassword } = payload

		const existingUser = await this.findByEmail(email)

		if (existingUser) throw new ConflictError(`User with this email "${email}" is already exists`)

		const isPasswordsMatching = password === repeatPassword

		if (!isPasswordsMatching) throw new BadRequest('Passwords is not matching')

		const hashedPassword = await bcrypt.hash(password, 10)

		const createdUser = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				userName,
			},
			include: {
				tokens: true,
			},
		})

		return createdUser
	}

	async update(email: string, payload: CreateUserRequestType): Promise<UserWithTokens> {
		const existingUser = await this.findByEmail(email)

		if (!existingUser) throw new NotFoundError(`There is no user with this email: ${email}`)

		const hashedPassword = await bcrypt.hash(payload.password, 10)

		const updatedUser = await this.prisma.user.update({
			where: {
				email: existingUser.email,
			},
			data: {
				...payload,
				password: hashedPassword,
			},
			include: {
				tokens: true,
			},
		})

		return updatedUser
	}

	async deleteById(id: string): Promise<UserWithTokens> {
		const existingUser = await this.findById(id)

		const deletedUser = await this.prisma.user.delete({
			where: {
				id: existingUser.id,
			},
			include: {
				tokens: true,
			},
		})

		return deletedUser
	}

	async deleteByEmail(email: string): Promise<UserWithTokens> {
		const existingUser = await this.findByEmail(email)

		if (!existingUser) throw new NotFoundError(`There is no user with this email: ${email}`)

		const deletedUser = await this.prisma.user.delete({
			where: {
				email: existingUser.email,
			},
			include: {
				tokens: true,
			},
		})

		return deletedUser
	}
}

const userService = new UserService(prisma)
type UserServiceType = typeof userService

export { userService, type UserServiceType }
