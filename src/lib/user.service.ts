import { CreateUserRequest } from '@/types/types'
import { prisma, PrismaClient, User } from './prisma'

import * as bcrypt from 'bcrypt'
import { ConflictError, NotFoundError } from './errors'

class UserService {
	constructor(private readonly prisma: PrismaClient) {}

	async findByEmail(email: string): Promise<User | null> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
		})

		return existingUser
	}

	async findAll(): Promise<User[]> {
		const existingUsers = await this.prisma.user.findMany({})

		if (existingUsers.length === 0) throw new NotFoundError(`There is no users in databases`)

		return existingUsers
	}

	async create(payload: CreateUserRequest): Promise<User> {
		const { email, password, userName } = payload

		const existingUser = await this.findByEmail(email)

		if (existingUser) throw new ConflictError(`User with this email "${email}" is already exists`)

		const hashedPassword = await bcrypt.hash(password, 10)

		const createdUser = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				userName,
			},
		})

		return createdUser
	}

	async update(payload: CreateUserRequest): Promise<User> {
		const { email, password, userName } = payload

		const existingUser = await this.findByEmail(email)

		if (!existingUser) throw new NotFoundError(`There is no user with this email: ${email}`)

		const hashedPassword = await bcrypt.hash(password, 10)

		const updatedUser = await this.prisma.user.update({
			where: {
				email: existingUser.email,
			},
			data: {
				email,
				password: hashedPassword,
				userName,
			},
		})

		return updatedUser
	}

	async deleteByEmail(email: string): Promise<User> {
		const existingUser = await this.findByEmail(email)

		if (!existingUser) throw new NotFoundError(`There is no user with this email: ${email}`)

		const deletedUser = await this.prisma.user.delete({
			where: {
				email: existingUser.email,
			},
		})

		return deletedUser
	}
}

export const userService = new UserService(prisma)
