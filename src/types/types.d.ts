import { navbarIconMap } from '@/components/shared/sidebar/navigation'
import { Token, User } from '@/lib'

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

export type ApiResponseType<T = unknown> = SuccessResponseType<T> | ErrorResponseType
