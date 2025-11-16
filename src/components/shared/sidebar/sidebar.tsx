'use client'

// import { useTranslations } from 'next-intl'
import { logoFont } from '@/fonts/font'
import { cn } from '@/lib/func/utils'
import { useStore } from '@/store/store'
import Image from 'next/image'
import { Navigation } from './navigation'

type Props = {
	className?: string
}

export const Sidebar: React.FC<Props> = ({ className }) => {
	// const t = useTranslations('navBar')
	const { isOpen: isOpened } = useStore()
	return (
		<aside
			className={cn(
				'bg-white sticky top-0 w-[300px] h-screen border-r border-gray-400 flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
				isOpened
					? 'translate-x-0 opacity-100'
					: '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0',
				className
			)}
		>
			<a
				href='/'
				className={`min-h-[50px] flex justify-center items-center  border-b border-gray-400 gap-2 hover:bg-gray-50 pt-1 ${logoFont.className}`}
			>
				<Image src={'/logo.png'} alt='Main logo' height={35} width={35} className='rounded-md' />
				<span className='text-2xl font-bold uppercase tracking-wide text-[#1F2E4F] pt-1'>
					kanji.uz
				</span>
			</a>

			<div className='flex-1 overflow-y-auto'>
				<Navigation />
			</div>
		</aside>
	)
}
