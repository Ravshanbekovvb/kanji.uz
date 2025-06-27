'use client'

import { logoFont } from '@/fonts/font'
// import { useTranslations } from 'next-intl'
import { Navigation } from './navigation'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'

type Props = {
	className?: string
}

export const Sidebar: React.FC<Props> = ({ className }) => {
	// const t = useTranslations('navBar')
	const { isOpen: isOpened } = useStore()
	return (
		<aside
			className={cn(
				'bg-[#ffffff] relative w-[250px] h-dvh border-r border-black flex flex-col justify-between duration-200 overflow-hidden',
				isOpened ? 'w-[300px] opacity-100 visible' : 'w-0 opacity-0 invisible',
				className
			)}
		>
			<a
				href='/'
				className={`min-h-[75px] flex justify-center items-center text-2xl font-bold uppercase tracking-widest border-b border-b-black pt-3 ${logoFont.className}`}
			>
				tsukurou!
			</a>

			<Navigation />
		</aside>
	)
}
