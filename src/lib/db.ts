import { NavbarMenuType } from '@/types/types'

export const navbarMenus: NavbarMenuType[] = [
	{
		icon: 'badge',
		title: 'Create PDF',
		link: '/',
	},
	{
		icon: 'bookHeart',
		title: 'My Docs',
		link: '/my-docs',
	},

	// {
	// 	icon: 'textFromImage',
	// 	title: 'Text from image',
	// 	link: '/text-from-image',
	// },
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
	},
	{
		icon: 'bell',
		title: 'Notifications',
		link: '/notifications',
	},
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

export const AdminNavbar = [
	{
		icon: 'users',
		title: 'Users',
		link: '/users',
	},
	{
		icon: 'listCheck',
		title: 'All Docs',
		link: '/all-docs',
	},
	{
		icon: 'bell',
		title: 'Notifications',
		link: '/notifications',
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
	},
	{
		icon: 'logout',
		title: 'Logout',
		link: '/login',
		className: 'hover:bg-red-500/30',
	},
]

export const list = [
	{
		Item: 1,
	},
	{
		Item: 1,
	},
	{
		Item: 1,
	},
	{
		Item: 1,
	},
	{
		Item: 1,
	},
	{
		Item: 1,
	},
	{
		Item: 1,
	},
]
