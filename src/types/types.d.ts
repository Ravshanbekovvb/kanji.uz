import { navbarIconMap } from '@/components/shared/sidebar/navigation'

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

type Word = {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

type User = {
	id: number
	name: string
	last_name: string
	email: string
	role: 'ADMIN' | 'STUDENT' | 'TEACHER' | 'USER'
	local_lang: 'UZ' | 'RU' | 'JA' | 'EN'
}
