'use client'

// import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/auth-context'
import { logoFont } from '@/fonts/font'
import { cn } from '@/lib/func/utils'
import { useStore } from '@/store/store'
import Image from 'next/image'
import { Navigation } from './navigation'
import { UserRole } from './user-role'

type Props = {
	className?: string
}

export const Sidebar: React.FC<Props> = ({ className }) => {
	// const t = useTranslations('navBar')
	const { user, isLoading } = useAuth()
	const { isOpen: isOpened } = useStore()

	return (
		<aside
			className={cn(
				' sticky top-0 w-[280px] h-screen border-r  flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
				isOpened
					? 'translate-x-0 opacity-100'
					: '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0',
				className
			)}
		>
			<div className='px-6 py-2 border-b '>
				<a href='/' className={`flex items-center gap-3 transition-opacity ${logoFont.className}`}>
					<div className='relative'>
						<div className='absolute inset-0 bg-blue-500/20 rounded-xl blur-sm'></div>
						<div className='relative bg-white rounded-xl p-2 border'>
							<Image src={'/logo.png'} alt='Main logo' height={28} width={28} />
						</div>
					</div>
					<div className='flex flex-col'>
						<span className='text-xl font-bold uppercase tracking-wider text-[#1E2F4F]'>
							kanji.uz
						</span>
						<span className='text-xs text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
							Learning Platform
						</span>
					</div>
				</a>
			</div>

			<div className='flex-1 overflow-y-auto'>
				<Navigation />
			</div>

			{/* Optional: Add user profile section at bottom */}

			<UserRole />
		</aside>
	)
}
