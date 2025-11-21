import { NavbarMenuType } from '@/types/types'

export const userNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: false,
	},
	{
		icon: 'brain',
		title: 'Memorize',
		link: '/memorize',
		isViewInMobile: true,
	},
	{
		icon: 'badge',
		title: 'Create Lesson',
		link: '/create-lesson',
		isViewInMobile: true,
	},
	{
		icon: 'bookHeart',
		title: 'My Lessons',
		link: '/my-lessons',
		isViewInMobile: true,
	},
	{
		icon: 'reading',
		title: 'Readings',
		link: '/readings',
		badge: 'NEW!',
		isViewInMobile: true,
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
		isViewInMobile: false,
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
		isViewInMobile: false,
	},
	{
		icon: 'logout',
		title: 'Logout',
		link: '/login',
		className: 'hover:bg-red-500/30',
		isViewInMobile: false,
	},
]
export const defaultNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: false,
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
		isViewInMobile: false,
	},
	{
		icon: 'help',
		title: 'Help',
		link: '/help',
		className: 'hover:bg-green-500/30',
		isViewInMobile: false,
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
		isViewInMobile: false,
	},
]

export const AdminNavbar: NavbarMenuType[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: true,
	},
	{
		icon: 'users',
		title: 'Users',
		link: '/users',
		isViewInMobile: true,
	},
	{
		icon: 'listCheck',
		title: 'All Lessons',
		link: '/all-lessons',
		isViewInMobile: true,
	},
	{
		icon: 'ChartColumnDecreasing',
		title: 'Diagnostics',
		link: '/diagnostics',
		isViewInMobile: true,
	},
	{
		icon: 'settings',
		title: 'Settings',
		link: '/settings',
		isViewInMobile: false,
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
		isViewInMobile: false,
	},
]
