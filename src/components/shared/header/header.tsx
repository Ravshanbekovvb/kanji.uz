import { LocaleSwitcher } from './locale-switcher'
import { NavbarButton } from './navbar-button'
import { UserRole } from './user-role'

interface HeaderProps {
	className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header
			className={`flex justify-between gap-3 items-center px-10 max-sm:px-6 py-4 border-b border-b-black sticky top-0 z-10 bg-white min-h-[75px] ${className}`}
		>
			<NavbarButton />
			<div className='flex gap-4 items-center'>
				<LocaleSwitcher />
				<UserRole />
			</div>
		</header>
	)
}
