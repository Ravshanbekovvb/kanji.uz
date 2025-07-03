import { ConflictError, UnauthorizedError } from '@/types/errors'
import {
	CreateUserRequestType,
	CreateUserWithRepeatPasswordRequestType,
	UserWithTokens,
} from '@/types/types'
import { userService, UserServiceType } from './user.service'

import { v4 as uuidv4 } from 'uuid'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

class AuthService {
	constructor(private readonly userService: UserServiceType) {}

	async register(payload: CreateUserWithRepeatPasswordRequestType): Promise<UserWithTokens> {
		const { email, userName } = payload

		const existingUser = await this.userService.findByEmail(email)

		if (existingUser) throw new ConflictError(`There is have user with this email: ${email}`)

		const refreshToken = jwt.sign(
			{
				sub: `${userName}-${email}`,
				email,
				jti: uuidv4(),
			},
			JWT_SECRET_KEY
		)

		const createdUser = await this.userService.create(payload)

		const createdUserWithRefreshToken = await prisma.user.upsert({
			where: {
				email: createdUser.email,
			},
			update: { ...createdUser, tokens: {} },
			create: {
				...createdUser,
				tokens: {
					create: {
						refreshToken,
					},
				},
			},
			include: {
				tokens: true,
			},
		})

		return createdUserWithRefreshToken
	}

	async login(payload: Pick<CreateUserRequestType, 'email' | 'password'>): Promise<UserWithTokens> {
		const { email, password } = payload
		console.log('P' + JSON.stringify(payload))

		const existingUser = await this.userService.findByEmail(email)

		if (!existingUser) throw new UnauthorizedError('Incorrect password or email')

		const isPasswordsMatching = await bcrypt.compare(password, existingUser.password)

		if (!isPasswordsMatching) throw new UnauthorizedError('Incorrect password or email')

		const accessToken = jwt.sign(
			{
				sub: `user-${existingUser.id}`,
				email,
				jti: uuidv4(),
			},
			JWT_SECRET_KEY
		)

		return {
			...existingUser,
			tokens: {
				id: '',
				accessToken,
				refreshToken: null,
				userId: existingUser.id,
			},
		}
	}
}

const authService = new AuthService(userService)
type AuthServiceType = typeof authService

export { authService, type AuthServiceType }
