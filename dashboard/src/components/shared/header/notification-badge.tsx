'use client'
import { useAuth } from '@/contexts/auth-context'
import { useCombinedUnreadCount } from '@/hooks/useNotifications'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export const NotificationBadge: React.FC = () => {
	const { user } = useAuth()
	const { data: unreadCount = 0 } = useCombinedUnreadCount(user?.id || '')
	return (
		<Link href='/notifications' className='relative'>
			<div className='relative p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95'>
				<Bell size={20} className='text-gray-700' />
				{unreadCount > 0 && user?.role !== 'ADMIN' && (
					<>
						{/* Desktop badge */}
						<div className='absolute top-1 right-1 min-w-[10px] min-h-[10px] bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg max-sm:hidden'>
							{unreadCount > 99 ? '99+' : unreadCount}
						</div>
						{/* Mobile badge - larger and more visible */}
						<div className='absolute -top-1 -right-1 min-w-[22px] h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg sm:hidden animate-pulse'>
							{unreadCount > 99 ? '99+' : unreadCount}
						</div>
						{/* Pulsing ring effect for mobile */}
						<div className='absolute -top-1 -right-1 min-w-[22px] h-6 bg-red-500 rounded-full animate-ping opacity-75 sm:hidden'></div>
					</>
				)}
			</div>
		</Link>
	)
}
