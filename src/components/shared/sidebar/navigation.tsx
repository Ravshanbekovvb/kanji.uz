'use client'
import { useAuth } from '@/contexts/auth-context'
import { AdminNavbar, defaultNavbar, userNavbar } from '@/lib/db'
import { cn } from '@/lib/func/utils'
import { NavbarIconKey } from '@/types/types'
import {
	BadgePlusIcon,
	BellDot,
	BookHeart,
	BookOpenText,
	Brain,
	ChartColumnDecreasing,
	ChevronRightIcon,
	FileUser,
	HelpCircle,
	House,
	ListCheck,
	LogOut,
	Settings,
	Users,
	UserX,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const navbarIconMap = {
	brain: <Brain className={'max-sm:size-5'} />,
	home: <House className={'max-sm:size-5'} />,
	badge: <BadgePlusIcon className={'max-sm:size-5'} />,
	bookHeart: <BookHeart className={'max-sm:size-5'} />,
	listCheck: <ListCheck className={'max-sm:size-5'} />,
	users: <Users className={'max-sm:size-5'} />,
	bell: <BellDot className={'max-sm:size-5'} />,
	settings: <Settings className={'max-sm:size-5'} />,
	help: <HelpCircle className={'max-sm:size-5'} />,
	logout: <LogOut className={'max-sm:size-5'} />,
	FileUser: <FileUser className={'max-sm:size-5'} />,
	reading: <BookOpenText className={'max-sm:size-5'} />,
	ChartColumnDecreasing: <ChartColumnDecreasing className={'max-sm:size-5'} />,
} as const

export const Navigation: React.FC = () => {
	const { user, logout, isLoading } = useAuth()
	const pathname = usePathname()
	const activePath = '/' + (pathname.split('/')[1] || '')

	// Loading holatida yoki user yo'q bo'lsa defaultNavbar ko'rsatamiz
	if (isLoading) {
		const renderedMenu = defaultNavbar.map(menuItem => {
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
					{menuItem.title === 'Logout' ? (
						<button
							onClick={() => logout()}
							className={cn(
								'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
								menuItem.className || 'hover:bg-red-200'
							)}
						>
							<span className='flex justify-center items-center gap-2 text-base'>
								{navbarIconMap[menuItem.icon as NavbarIconKey]} {menuItem.title}
							</span>
						</button>
					) : (
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
							<ChevronRightIcon
								className={cn(
									'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
									isActive && 'visible opacity-100 pr-0'
								)}
								size={18}
							/>
						</Link>
					)}
				</li>
			)
		})

		return (
			<nav className='flex flex-col py-3 px-3 h-full w-full'>
				<ul className='flex flex-col flex-1 gap-1 w-full'>{renderedMenu}</ul>
			</nav>
		)
	}

	if (!user) {
		return (
			<div className='flex flex-col items-center justify-center h-full text-center text-gray-500'>
				<UserX size={48} className='mb-2' />
				<p className='text-lg font-medium'>User not found</p>
				<p className='text-sm'>Please log in again.</p>
			</div>
		)
	}

	if (user?.role === 'ADMIN' && AdminNavbar) {
		const renderedMenu = AdminNavbar.map(menuItem => {
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
						'w-full flex justify-between items-center relative',
						menuItem.title === 'Logout' ? 'flex-1 items-end' : ''
					)}
				>
					{menuItem.badge && (
						<span className='absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse border-2 border-white transform rotate-12 z-10'>
							{menuItem.badge}
						</span>
					)}
					{menuItem.title === 'Logout' ? (
						<button
							onClick={() => logout()}
							className={cn(
								'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
								menuItem.className || 'hover:bg-red-200'
							)}
						>
							<span className='flex justify-center items-center gap-2 text-base'>
								{navbarIconMap[menuItem.icon as NavbarIconKey]} {menuItem.title}
							</span>
						</button>
					) : (
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
							<ChevronRightIcon
								className={cn(
									'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
									isActive && 'visible opacity-100 pr-0'
								)}
								size={18}
							/>
						</Link>
					)}
				</li>
			)
		})

		return (
			<nav className='flex flex-col py-3 px-3 h-full w-full'>
				<ul className='flex flex-col flex-1 gap-1 w-full'>{renderedMenu}</ul>
			</nav>
		)
	}

	if (['USER', 'STUDENT', 'TEACHER'].includes(user.role as string)) {
		const renderedMenu = userNavbar.map(menuItem => {
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
						'w-full flex justify-between items-center relative',
						menuItem.title === 'Help' ? 'flex-1 items-end' : ''
					)}
				>
					{menuItem.badge && (
						<span className='absolute right-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-extrabold px-2 py-1 rounded-full shadow-lg animate-pulse border-2 border-white transform z-10 max-lg:right-0 max-lg:animate-none'>
							{menuItem.badge}
						</span>
					)}
					{menuItem.title === 'Logout' ? (
						<button
							onClick={() => logout()}
							className={cn(
								'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
								menuItem.className || 'hover:bg-red-200'
							)}
						>
							<span className='flex justify-center items-center gap-2 text-base'>
								{navbarIconMap[menuItem.icon]} {menuItem.title}
							</span>
						</button>
					) : (
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
							<ChevronRightIcon
								className={cn(
									'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
									isActive && 'visible opacity-100 pr-0'
								)}
								size={18}
							/>
						</Link>
					)}
				</li>
			)
		})

		return (
			<nav className='flex flex-col py-3 px-3 h-full w-full'>
				<ul className='flex flex-col flex-1 gap-1 w-full'>{renderedMenu}</ul>
			</nav>
		)
	}

	// Fallback - default navbar
	const renderedMenu = defaultNavbar.map(menuItem => {
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
				{menuItem.title === 'Logout' ? (
					<button
						onClick={() => logout()}
						className={cn(
							'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
							menuItem.className || 'hover:bg-red-200'
						)}
					>
						<span className='flex justify-center items-center gap-2 text-base'>
							{navbarIconMap[menuItem.icon as NavbarIconKey]} {menuItem.title}
						</span>
					</button>
				) : (
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
						<ChevronRightIcon
							className={cn(
								'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
								isActive && 'visible opacity-100 pr-0'
							)}
							size={18}
						/>
					</Link>
				)}
			</li>
		)
	})

	return (
		<nav className='flex flex-col py-3 px-3 h-full w-full'>
			<ul className='flex flex-col flex-1 gap-1 w-full'>{renderedMenu}</ul>
		</nav>
	)
}
