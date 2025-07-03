import { navbarIconMap } from '@/components/shared/sidebar/navigation'
import { Token, User, UserRole } from '@/lib'
import { JwtPayload } from 'jsonwebtoken'

type NavbarType = {
	top: navbarMenuType[]
	bottom: navbarMenuType[]
}

type NavbarMenuType = {
	icon: keyof typeof navbarIconMap
	title: string
	link: string
	className?: string
}

type CreateUserRequestType = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
type CreateUserWithRepeatPasswordRequestType = CreateUserRequestType & { repeatPassword: string }

type SuccessResponseType<T> = {
	success: true
	message: string
	data: T
}

type ErrorResponseType = {
	success: false
	message: string
	data: null
}

type UserWithTokens = User & {
	tokens: Token | null
}

type JWTType = JwtPayload & {
	sub: string
	email: string
	role: UserRole
}

interface DarsData {
	user: string
	title: string
	words: {
		kanji: string
		translation: string
		transcription: string
		example: string
	}[]
}

export type ApiResponseType<T = unknown> = SuccessResponseType<T> | ErrorResponseType
