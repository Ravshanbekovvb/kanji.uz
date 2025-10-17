import { navbarIconMap } from '@/components/shared/sidebar/navigation'
import { Lesson, Token, User, UserRole, Word } from '@/lib'
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
	badge?: string
}

type CreateUserRequestType = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
type CreateUserWithRepeatPasswordRequestType = CreateUserRequestType & { repeatPassword: string }
type SignUpType = {
	id: string
	note: string
	email: string
	name: string
	status: 'PENDING' | 'APPROVED' | 'REJECTED'
	approvedAt: Date | null
	createdAt: Date
}
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

type UserWithLessons = User & {
	lesson: LessonWithWords[]
}

type LessonWithWords = Lesson & {
	words: Word[]
}

type JWTType = JwtPayload & {
	sub: string
	email: string
	role: UserRole
}

interface DarsData {
	id: string
	title: string
	createdAt: string
	words: {
		kanji: string
		translation: string
		transcription: string
		example: string
		jlptLevel: string
	}[]
	user: {
		userName: string
	}
}

export type ApiResponseType<T = unknown> = SuccessResponseType<T> | ErrorResponseType
