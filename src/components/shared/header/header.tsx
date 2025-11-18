import { NavbarButton } from './navbar-button'
import { NotificationBadge } from './notification-badge'

interface HeaderProps {
	className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header
			className={`flex justify-between items-center px-6 border-b sticky top-0 z-10 bg-white min-h-[65px] ${className}`}
		>
			<NavbarButton />
			<div className='flex gap-3 items-center'>
				<NotificationBadge />
				{/* <LocaleSwitcher /> */}
				{/* <UserRole /> */}
			</div>
		</header>
	)
}
