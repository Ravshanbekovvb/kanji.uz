'use client'

import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { ArrowLeft, Menu } from 'lucide-react'

interface NavbarButtonProps {
	className?: string
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({ className }) => {
	const { isOpen: isOpened, setIsOpen } = useStore()

	const handleNavbar = (width: string) => {
		if (width === 'lg') {
			setIsOpen(!isOpened)
		} else if (width === 'md') {
			setIsOpen(!isOpened)
		}
	}

	return (
		<button className={cn('flex cursor-pointer', className)}>
			<Menu className='hidden max-md:block' onClick={() => handleNavbar('md')} />
			<ArrowLeft
				onClick={() => handleNavbar('lg')}
				size={24}
				className={cn('duration-300 max-md:hidden', !isOpened && 'rotate-180')}
			/>
		</button>
	)
}
