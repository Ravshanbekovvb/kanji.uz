import { navbarIconMap } from '@/components/shared/sidebar/navigation'
import { User } from '@/lib'

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

type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

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

export type ApiResponseType<T = unknown> = SuccessResponseType<T> | ErrorResponseType
