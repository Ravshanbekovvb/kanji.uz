import { navbarIconMap } from '@/components/shared/sidebar/navigation'
import { Lesson, Token, User, UserRole, Word } from '@/lib'
import { JwtPayload } from 'jsonwebtoken'
import { ReactNode } from 'react'

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
type SendMailType = {
	email: string
	html: ReactNode
	from: string
	to: string
	password: string
	name: string
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
type ReadingType = {
	title: string
	jlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
	id: string
	createdAt: Date
	readingTests: Test[]
}
type Test = {
	id: string
	mainQuestion: string
	authorId: string
	author: { userName: string }
	text: string
	difficulty: 'MEDIUM' | 'EASY' | 'HARD'
	questions: Question[]
}
type Question = {
	id: string
	question: string
	options: string[]
	correctAnswer: number
}

type CreateReadingProgress = Omit<ReadingProgress, 'id' | 'createdAt' | 'updatedAt'>
type CreateTest = {
	mainQuestion: string
	authorId: string
	text: string
	difficulty: 'MEDIUM' | 'EASY' | 'HARD'
	questions: CreateQuestion[]
}
type CreateQuestion = {
	question: string
	options: string[]
	correctAnswer: number
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
