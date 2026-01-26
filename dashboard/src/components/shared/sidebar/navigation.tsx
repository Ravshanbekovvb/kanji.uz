'use client'
import { useAuth } from '@/contexts/auth-context'
import { AdminNavbar, defaultNavbar, userNavbar } from '@/lib/db'
import { cn } from '@/lib/func/utils'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navbarIconMap } from './navIconMap'
import { useTranslations } from 'next-intl'

export const Navigation: React.FC = () => {
	const t = useTranslations('navbar')
	const { user, isLoading } = useAuth()
	const pathname = usePathname()
	const activePath = '/' + (pathname.split('/')[1] || '')

	if (isLoading || !user) {
		return (
			<nav className='flex flex-col py-3 px-3 h-full w-full'>
				<ul className='flex flex-col flex-1 gap-1 w-full'>
					{defaultNavbar.map(menuItem => {
						const isActive = activePath === menuItem.link

						return (
							<li key={menuItem.title} className={cn('w-full flex justify-between items-center')}>
								{
									<Link
										href={menuItem.link}
										className={cn(
											'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
											isActive && 'bg-blue-200',
											menuItem.className || 'hover:bg-blue-200',
											isActive && menuItem.className && 'bg-green-500/30'
										)}
									>
										<span className='flex justify-center items-center gap-2 text-base'>
											{navbarIconMap[menuItem.icon as keyof typeof navbarIconMap]}{' '}
											{t(menuItem.title)}
										</span>
										<ChevronRightIcon
											className={cn(
												'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
												isActive && 'visible opacity-100 pr-0'
											)}
											size={18}
										/>
									</Link>
								}
							</li>
						)
					})}
				</ul>
			</nav>
		)
	}

	const Menu =
		user?.role === 'ADMIN'
			? AdminNavbar
			: ['USER', 'STUDENT', 'TEACHER'].includes(user.role as string)
				? userNavbar
				: []

	return (
		<nav className='flex flex-col py-3 px-3 h-full w-full'>
			<ul className='flex flex-col flex-1 gap-1 w-full'>
				{Menu.map(menuItem => {
					const isActive = activePath === menuItem.link

					return (
						<li
							key={menuItem.title}
							className={cn('w-full flex justify-between items-center relative')}
						>
							{menuItem.badge && (
								<span className='absolute  right-7 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse border-2 border-white transform z-10'>
									{menuItem.badge}
								</span>
							)}
							{
								<Link
									href={menuItem.link}
									className={cn(
										'flex justify-between items-center px-3 py-2 group rounded-md duration-300 whitespace-nowrap w-full',
										isActive && 'bg-blue-200',
										menuItem.className || 'hover:bg-blue-200',
										isActive && menuItem.className && 'bg-green-500/30'
									)}
								>
									<span className='flex justify-center items-center gap-2 text-base'>
										{navbarIconMap[menuItem.icon as keyof typeof navbarIconMap]} {t(menuItem.title)}
									</span>
									<ChevronRightIcon
										className={cn(
											'opacity-0 invisible pr-4 group-hover:visible group-hover:opacity-100 group-hover:pr-0 duration-300',
											isActive && 'visible opacity-100 pr-0'
										)}
										size={18}
									/>
								</Link>
							}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
