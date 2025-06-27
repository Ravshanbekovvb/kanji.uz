'use client'
import { AdminNavbar, navbarMenus } from '@/lib/db'
import { cn } from '@/lib/utils'
import {
	BadgePlusIcon,
	BellDot,
	BookHeart,
	ChevronRightIcon,
	FileText,
	HelpCircle,
	ListCheck,
	LogOut,
	Settings,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useTranslations } from 'use-intl'

// import { getDataFromToken } from '@/services/getDatafromToken'
export const navbarIconMap = {
	badge: <BadgePlusIcon />,
	bookHeart: <BookHeart />,
	listCheck: <ListCheck />,
	users: <Users />,
	bell: <BellDot />,
	settings: <Settings />,
	help: <HelpCircle />,
	logout: <LogOut />,
	textFromImage: <FileText />,
} as const
type NavbarIconKey = keyof typeof navbarIconMap

export const Navigation: React.FC = () => {
	const [role, setRole] = useState<string | unknown>(null)
	// const t = useTranslations()
	const pathname = usePathname()
	const activePath = '/' + (pathname.split('/')[1] || '')

	let renderedMenu = null
	useEffect(() => {
		// const role = getDataFromToken()?.role
		setRole('ADMIN')
	}, [])

	if (role === 'ADMIN' && AdminNavbar) {
		renderedMenu = AdminNavbar.map(menuItem => {
			const isActive = activePath === menuItem.link
			const activeColor =
				menuItem.className && menuItem.title === 'Help'
					? 'bg-green-500/30'
					: menuItem.className && menuItem.title === 'Logout'
					? 'bg-red-500/30'
					: 'bg-blue-200'

			return (
				<li
					key={menuItem.title}
					className={cn(
						'w-full flex justify-between items-center',
						menuItem.title === 'Logout' ? 'flex-1 items-end' : ''
					)}
				>
					<Link
						href={menuItem.link}
						className={cn(
							'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
							isActive && activeColor,
							menuItem.className || 'hover:bg-blue-200'
						)}
					>
						<span className='flex justify-center items-center gap-2 text-base'>
							{navbarIconMap[menuItem.icon as NavbarIconKey]} {menuItem.title}
						</span>
						{menuItem.title !== 'Logout' && (
							<ChevronRightIcon
								className={cn(
									'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
									isActive && 'visible opacity-100 pr-0'
								)}
								size={18}
							/>
						)}
					</Link>
				</li>
			)
		})
	}

	if (['USER', 'STUDENT', 'TEACHER'].includes(role as string)) {
		renderedMenu = navbarMenus.map(menuItem => {
			const isActive = activePath === menuItem.link
			const activeColor =
				menuItem.className && menuItem.title === 'Help'
					? 'bg-green-500/30'
					: menuItem.className && menuItem.title === 'Logout'
					? 'bg-red-500/30'
					: 'bg-blue-200'

			return (
				<li
					key={menuItem.title}
					className={cn(
						'w-full flex justify-between items-center',
						menuItem.title === 'Help' ? 'flex-1 items-end' : ''
					)}
				>
					<Link
						href={menuItem.link}
						className={cn(
							'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
							isActive && activeColor,
							menuItem.className || 'hover:bg-blue-200'
						)}
					>
						<span className='flex justify-center items-center gap-2 text-base'>
							{navbarIconMap[menuItem.icon]} {menuItem.title}
						</span>
						{menuItem.title !== 'Logout' && (
							<ChevronRightIcon
								className={cn(
									'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
									isActive && 'visible opacity-100 pr-0'
								)}
								size={18}
							/>
						)}
					</Link>
				</li>
			)
		})
	}

	return (
		<nav className='flex flex-col py-5 px-3 h-full w-full'>
			<ul className='flex flex-col flex-1 gap-1 w-full'>{renderedMenu}</ul>
		</nav>
	)
}
