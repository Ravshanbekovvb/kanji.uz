'use client'
import { logoFont } from '@/fonts/font'
import { AdminNavbar, navbarMenus } from '@/lib/db'
import { cn } from '@/lib/utils'
// import { getDataFromToken } from '@/services/getDatafromToken'
import { useStore } from '@/store/store'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MobileMenuProps {
	className: string
}
export const MobileMenu = ({ className }: MobileMenuProps) => {
	const { isOpen, setIsOpen } = useStore()
	const [role, setRole] = useState<string | unknown>(null)

	const pathname = usePathname()
	const activePath = '/' + (pathname.split('/')[1] || '')
	useEffect(() => {
		// const role = getDataFromToken()?.role
		setRole(role)
	}, [])
	let currentMenu
	if (role === 'ADMIN') {
		currentMenu = AdminNavbar
	}

	if (role !== 'ADMIN') {
		currentMenu = navbarMenus
	}
	return (
		<div
			className={cn(
				className,
				'fixed top-0 left-0 min-w-full h-full duration-300 transform z-1000 bg-pink-50',
				isOpen ? 'translate-x-0' : '-translate-x-full'
			)}
		>
			<div className='absolute top-0 left-0 w-full z-1000 p-10 flex flex-col gap-15'>
				<div className=' flex justify-between items-center text-5xl'>
					<div>MENUasdasdasddddddddd</div>
					<X
						className='cursor-pointer'
						size={40}
						onClick={() => {
							setIsOpen(!isOpen)
						}}
					/>
				</div>

				<ul className='text-3xl flex flex-col gap-5'>
					{currentMenu?.map((item, ind) => (
						<Link
							onClick={() => setIsOpen(!isOpen)}
							href={item.link}
							key={ind}
							className={cn(
								'cursor-pointer',
								item.link === activePath ? 'font-semibold underline' : ''
							)}
						>
							{item.title}
						</Link>
					))}
				</ul>

				<div className={`${logoFont.className} select-none mt-30`}>@TSUKasdasdUROU!</div>
			</div>
		</div>
	)
}
