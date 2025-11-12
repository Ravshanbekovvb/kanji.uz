import { NavbarMenuType } from '@/types/types'

export const userNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
	},
	{
		icon: 'brain',
		title: 'Memorize',
		link: '/memorize',
	},
	{
		icon: 'badge',
		title: 'Create Lesson',
		link: '/create-lesson',
	},
	{
		icon: 'bookHeart',
		title: 'My Lessons',
		link: '/my-lessons',
	},
	{
		icon: 'reading',
		title: 'Readings',
		link: '/readings',
		badge: 'NEW!',
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
	},
	// {
	// 	icon: 'FileUser',
	// 	title: 'Resume builder',
	// 	link: '/kasbnoma',
	// 	badge: 'NEW!',
	// },
	{
		icon: 'help',
		title: 'Help',
		link: '/help',
		className: 'hover:bg-green-500/30',
	},
	{
		icon: 'logout',
		title: 'Logout',
		link: '/login',
		className: 'hover:bg-red-500/30',
	},
]
export const defaultNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
	},
	{
		icon: 'help',
		title: 'Help',
		link: '/help',
		className: 'hover:bg-green-500/30',
	},
	// {
	// 	icon: 'FileUser',
	// 	title: 'Resume builder',
	// 	link: '/kasbnoma.uz',
	// 	badge: 'NEW!',
	// },
	{
		icon: 'logout',
		title: 'Logout',
		link: '/login',
		className: 'hover:bg-red-500/30',
	},
]

export const AdminNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
	},
	{
		icon: 'users',
		title: 'Users',
		link: '/users',
	},
	{
		icon: 'listCheck',
		title: 'All Lessons',
		link: '/all-docs',
	},
	{
		icon: 'ChartColumnDecreasing',
		title: 'Diagnostics',
		link: '/diagnostics',
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
	},
	// {
	// 	icon: 'FileUser',
	// 	title: 'Resume builder',
	// 	link: '/kasbnoma.uz',
	// 	badge: 'NEW!',
	// },
	{
		icon: 'logout',
		title: 'Logout',
		link: '/login',
		className: 'hover:bg-red-500/30',
	},
]
