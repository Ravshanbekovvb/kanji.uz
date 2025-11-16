import { NavbarButton } from './navbar-button'
import { NotificationBadge } from './notification-badge'
import { UserRole } from './user-role'

interface HeaderProps {
	className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header
			className={`flex justify-between items-center px-5 border-b border-gray-400 sticky top-0 z-10 bg-white min-h-[50px] ${className}`}
		>
			<NavbarButton />
			<div className='flex gap-3 items-center'>
				<NotificationBadge />
				{/* <LocaleSwitcher /> */}
				<UserRole />
			</div>
		</header>
	)
}
