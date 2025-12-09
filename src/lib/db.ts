import { MenuItem } from '@/types/types'

export const userNavbar: MenuItem[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'brain',
		title: 'Memorize',
		link: '/memorize',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},

	{
		icon: 'books',
		title: 'Books',
		link: '/books',
		isViewInMobile: false,
		badge: 'NEW!',
		isViewInHeaderMobile: true,
	},
	{
		icon: 'badge',
		title: 'Create Lesson',
		link: '/create-lesson',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'bookHeart',
		title: 'My Lessons',
		link: '/my-lessons',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'reading',
		title: 'Readings',
		link: '/readings',
		badge: 'NEW!',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	// {
	// 	icon: 'settings',
	// 	title: 'Settings',
	// 	link: '/settings',
	// 	isViewInMobile: false,
	// 	isViewInHeaderMobile: true,
	// },
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
		isViewInHeaderMobile: false,
	},
	// {
	// 	icon: 'logout',
	// 	title: 'Logout',
	// 	link: '/login',
	// 	className: 'hover:bg-red-500/30',
	// 	isViewInMobile: false,
	// 	isViewInHeaderMobile: false,
	// },
]
export const defaultNavbar: MenuItem[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},
	// {
	// 	icon: 'settings',
	// 	title: 'Settings',
	// 	link: '/settings',
	// 	isViewInMobile: false,
	// 	isViewInHeaderMobile: false,
	// },
	{
		icon: 'help',
		title: 'Help',
		link: '/help',
		className: 'hover:bg-green-500/30',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},
	// {
	// 	icon: 'FileUser',
	// 	title: 'Resume builder',
	// 	link: '/kasbnoma.uz',
	// 	badge: 'NEW!',
	// },
]

export const AdminNavbar: MenuItem[] = [
	{
		icon: 'home',
		title: 'Home',
		link: '/',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'users',
		title: 'Users',
		link: '/users',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'listCheck',
		title: 'All Lessons',
		link: '/all-lessons',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'bookHeart',
		title: 'My Lessons',
		link: '/my-lessons',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},
	{
		icon: 'ChartColumnDecreasing',
		title: 'Diagnostics',
		link: '/diagnostics',
		isViewInMobile: true,
		isViewInHeaderMobile: false,
	},

	// {
	// 	icon: 'FileUser',
	// 	title: 'Resume builder',
	// 	link: '/kasbnoma.uz',
	// 	badge: 'NEW!',
	// },

	{
		icon: 'brain',
		title: 'Memorize',
		link: '/memorize',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},

	{
		icon: 'books',
		title: 'Books',
		link: '/books',
		isViewInMobile: false,
		badge: 'NEW!',
		isViewInHeaderMobile: true,
	},

	{
		icon: 'badge',
		title: 'Create Lesson',
		link: '/create-lesson',
		isViewInMobile: false,
		isViewInHeaderMobile: true,
	},

	{
		icon: 'reading',
		title: 'Readings',
		link: '/readings',
		badge: 'NEW!',
		isViewInMobile: false,
		isViewInHeaderMobile: true,
	},
	{
		icon: 'help',
		title: 'Help',
		link: '/help',
		className: 'hover:bg-green-500/30',
		isViewInMobile: false,
		isViewInHeaderMobile: false,
	},
	// {
	// 	icon: 'settings',
	// 	title: 'Settings',
	// 	link: '/settings',
	// 	isViewInMobile: false,
	// 	isViewInHeaderMobile: true,
	// },
]
