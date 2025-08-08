'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { logoFont } from '@/fonts/font'
import {
	Bell,
	BookOpen,
	Brain,
	ChartColumnDecreasing,
	FileText,
	Home,
	LogOut,
	Plus,
	Settings,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function MobileNav() {
	const pathname = usePathname()
	const { user, logout } = useAuth()

	const navItems = [
		{
			label: 'Home',
			href: '/',
			icon: Home,
		},
		...(user?.role === 'ADMIN'
			? [
					{
						label: 'Users',
						href: '/users',
						icon: Users,
					},
					{
						label: 'Diagnostics',
						href: '/diagnostics',
						icon: ChartColumnDecreasing,
					},
					{
						label: 'All Docs',
						href: '/all-docs',
						icon: FileText,
					},
			  ]
			: [
					{
						label: 'Memorize',
						href: '/memorize',
						icon: Brain,
					},
					{
						label: 'Create',
						href: '/create-lesson',
						icon: Plus,
					},
					{
						label: 'My Docs',
						href: '/my-lessons',
						icon: BookOpen,
					},
			  ]),
	]

	const secondaryItems = [
		{
			label: 'Notifications',
			href: '/notifications',
			icon: Bell,
		},
		{
			label: 'Settings',
			href: '/settings',
			icon: Settings,
		},
	]

	return (
		<div className='md:hidden'>
			{/* Bottom Navigation */}
			<div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 safe-area-pb'>
				<div
					className={`grid gap-1 px-2 py-2 ${
						user?.role === 'ADMIN' ? 'grid-cols-4' : 'grid-cols-4'
					}`}
				>
					{navItems.map(item => {
						const Icon = item.icon
						const isActive = pathname === item.href
						return (
							<Link key={item.href} href={item.href}>
								<div
									className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 active:scale-95 ${
										isActive
											? 'bg-blue-100 text-blue-600'
											: 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
									}`}
								>
									<Icon size={20} />
									<span className='text-xs font-medium mt-1'>{item.label}</span>
								</div>
							</Link>
						)
					})}
				</div>
			</div>

			{/* Top Mobile Header */}
			<div className='fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40 safe-area-pt'>
				<div className='flex items-center justify-between px-4 py-3'>
					<div className='flex items-center gap-3'>
						<div
							className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${logoFont.className}`}
						>
							Tsukurou
						</div>
					</div>
					<div className='flex items-center gap-2'>
						{secondaryItems.map(item => {
							const Icon = item.icon
							const isActive = pathname === item.href
							return (
								<Link key={item.href} href={item.href}>
									<div
										className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
											isActive
												? 'bg-blue-100 text-blue-600'
												: 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
										}`}
									>
										<Icon size={18} />
									</div>
								</Link>
							)
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
								<DropdownMenuContent>
									<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className='flex items-center text-red-500 hover:text-red-500'
										onClick={logout}
									>
										<LogOut color='red' />
										Logout
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
