'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { AdminNavbar, userNavbar } from '@/lib/db'
import { NavbarIconKey, NavbarMenuType } from '@/types/types'
import { HelpCircle, Home, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navbarIconMap } from '../sidebar/navigation'

export default function MobileNav() {
	const pathname = usePathname()
	const { user, logout } = useAuth()

	const navItems: NavbarMenuType[] = (() => {
		switch (user?.role) {
			case 'ADMIN':
				return AdminNavbar

			case 'USER':
				return userNavbar
			case 'TEACHER':
				return userNavbar
			case 'STUDENT':
				return userNavbar

			default:
				return []
		}
	})()

	return (
		<div className='md:hidden'>
			{/* Bottom Navigation */}
			<div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 pb-safe'>
				<div className={`grid gap-1 px-2 py-2 grid-cols-4`}>
					{navItems &&
						navItems.length > 0 &&
						navItems
							.filter(item => item.isViewInMobile === true)
							.map(item => {
								const isActive = pathname === item.link
								return (
									<Link key={item.title} href={item.link}>
										<div
											className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 active:scale-95 ${
												isActive
													? 'bg-blue-100 text-blue-600'
													: 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
											}`}
										>
											{navbarIconMap[item.icon as NavbarIconKey]}
											<span className='text-xs font-medium mt-1 truncate'>{item.title}</span>
										</div>
									</Link>
								)
							})}
				</div>
			</div>

			{/* Top Mobile Header */}
			<div className='fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40 pt-safe max-h-[59px]'>
				<div className='flex items-center justify-between px-4 py-3'>
					<div className='flex items-center gap-3'>
						<Image
							src={'/logo.png'}
							alt='Main logo'
							height={40}
							width={40}
							className='rounded-md'
						/>
					</div>
					<div className='flex items-center gap-2'>
						{navItems.map(item => {
							const isActive = pathname === item.link
							if (item.isViewInHeaderMobile) {
								return (
									<Link key={item.title} href={item.link}>
										<div
											className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
												isActive
													? 'bg-blue-100 text-blue-600'
													: 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
											}`}
										>
											{navbarIconMap[item.icon as NavbarIconKey]}
										</div>
									</Link>
								)
							}
						})}

						{user && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className='ml-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
										<span className='text-white font-semibold text-xs'>
											{user.userName?.charAt(0).toUpperCase()}
										</span>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56'>
									<DropdownMenuLabel className='flex flex-col'>
										<span className='font-bold'>{user.userName}</span>
										<span className='font-light text-sm'>{user.email}</span>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />
									<Link href={'/'}>
										<DropdownMenuItem className='text-gray-500 '>
											Home
											<DropdownMenuShortcut>
												<Home />
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link>
									<Link href={'/help'}>
										<DropdownMenuItem className='text-gray-500 '>
											Help
											<DropdownMenuShortcut>
												<HelpCircle />
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link>
									<DropdownMenuItem className='text-red-500 ' onClick={logout}>
										Logout
										<DropdownMenuShortcut>
											<LogOut color='red' />
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
