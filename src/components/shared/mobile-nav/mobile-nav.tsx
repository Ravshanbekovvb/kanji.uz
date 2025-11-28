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
import { HelpCircle, LogOut, UserCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navbarIconMap } from '../sidebar/navIconMap'

export default function MobileNav() {
	const pathname = usePathname()
	const { user, logout } = useAuth()

	const Menu =
		user?.role === 'ADMIN'
			? AdminNavbar
			: ['USER', 'STUDENT', 'TEACHER'].includes(user?.role as string)
				? userNavbar
				: []

	return (
		<div className='md:hidden'>
			{/* Bottom Navigation */}
			<div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 pb-safe'>
				<div className={`grid gap-1 px-2 py-2 grid-cols-4`}>
					{Menu &&
						Menu.length > 0 &&
						Menu.filter(item => item.isViewInMobile === true).map(item => {
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
										{navbarIconMap[item.icon as keyof typeof navbarIconMap]}
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
						{Menu.map(item => {
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
											{navbarIconMap[item.icon as keyof typeof navbarIconMap]}
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
									{/* <Link href={'/'}>
										<DropdownMenuItem className='text-gray-500 '>
											Home
											<DropdownMenuShortcut>
												<Home />
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link> */}
									<Link href={'/profile'}>
										<DropdownMenuItem className='text-gray-500 '>
											Profile
											<DropdownMenuShortcut>
												<UserCircle2 />
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
