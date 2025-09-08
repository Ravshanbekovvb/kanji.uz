import {
	useMarkAllAsRead,
	useMarkAsRead,
	useMarkPublicAsRead,
	useUserCombinedNotifications,
} from '@/hooks/useNotifications'
import { Button } from '@/components/ui/button'
import { CheckCircle, LoaderIcon, Mail, MailOpen } from 'lucide-react'

interface NotificiationForUsersProps {
	userId: string
}
export const NotificiationForUsers: React.FC<NotificiationForUsersProps> = ({ userId }) => {
	const { data, isPending, error } = useUserCombinedNotifications()
	const { mutate: markAsRead, isPending: markAsReadPending } = useMarkAsRead()
	const { mutate: markPublicAsRead, isPending: markPublicPending } = useMarkPublicAsRead()
	const { mutate: markAllAsRead, isPending: markAllPending } = useMarkAllAsRead()
	if (isPending) {
		return (
			<div className='flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading notifications...
			</div>
		)
	}
	if (error) {
		return <div className='text-center text-red-500 mt-10'>❌ Error loading notifications</div>
	}

	if (!data) {
		return (
			<div className='text-center text-gray-500 italic mt-10 p-10 bg-gray-50 rounded-2xl'>
				📭 No notifications available
			</div>
		)
	}

	const unreadCount = data.filter(item => {
		const isPublic = !item.userId
		const isPersonal = item.userId === userId

		if (isPersonal) {
			return !item.isRead
		}

		if (isPublic) {
			// Check if user has marked this public notification as read
			const readByUser = (item as any).readByUsers?.some(
				(readStatus: any) => readStatus.userId === userId
			)
			return !item.isRead && !readByUser
		}

		return false
	}).length

	return (
		<div>
			{data && data.length > 0 && unreadCount > 0 && (
				<div className='mb-4 flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
					<div>
						<p className='text-blue-800 font-semibold'>
							You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
						</p>
					</div>
					<Button
						onClick={() => markAllAsRead(userId)}
						disabled={markAllPending}
						className='bg-blue-600 hover:bg-blue-700'
					>
						{markAllPending ? (
							<div className='flex items-center gap-5'>
								<LoaderIcon className='rotate-right' size={40} />
								Marking
							</div>
						) : (
							'Mark All as Read'
						)}
					</Button>
				</div>
			)}

			{data && data.length > 0 ? (
				data.map(item => {
					const isPublic = !item.userId
					const isPersonal = item.userId === userId
					const readByUser = isPublic
						? (item as any).readByUsers?.some((readStatus: any) => readStatus.userId === userId)
						: false
					const isNotificationRead = isPersonal
						? item.isRead
						: isPublic
						? item.isRead || readByUser
						: true

					return (
						<div
							key={item.id}
							className={`group border rounded-2xl p-6 my-5 w-full shadow-sm transition-all duration-200 hover:shadow-lg hover:border-gray-300 ${
								!isNotificationRead && (isPersonal || isPublic)
									? 'border-l-4 border-l-blue-500 bg-blue-50/30'
									: 'bg-white'
							}`}
						>
							<div className='flex items-start justify-between gap-6'>
								{/* Chap taraf - Icon va status */}
								{(isPersonal || isPublic) && (
									<div className='flex flex-col items-center shrink-0'>
										{isNotificationRead ? (
											<MailOpen size={28} className='text-gray-400' />
										) : (
											<Mail size={28} className='text-blue-600 animate-pulse' />
										)}
										{!isNotificationRead && (
											<span className='w-3 h-3 bg-red-500 rounded-full mt-2 shadow-md'></span>
										)}
									</div>
								)}

								{/* O‘ng taraf - Asosiy content */}
								<div className='flex flex-col w-full gap-3'>
									{/* Title & message */}
									<div
										className={`text-base font-semibold flex items-center gap-2 ${
											!isNotificationRead && (isPersonal || isPublic)
												? 'text-blue-900'
												: 'text-gray-800'
										}`}
									>
										<span>{isPublic ? '📢' : '📩'}</span>
										{item.message}
									</div>

									{/* Sana */}
									<div className='flex items-center gap-2 text-sm text-gray-500'>
										<span>📅</span>
										{new Date(item.createdAt).toLocaleString()}
									</div>

									{/* Read holati */}
									{isNotificationRead && (isPersonal || isPublic) && (
										<div className='flex items-center gap-1 text-xs font-medium text-green-600'>
											<CheckCircle size={12} />
											Read
										</div>
									)}
								</div>

								{/* Badge va actions */}
								<div className='flex flex-col items-end gap-2 shrink-0'>
									<div
										className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
											isPublic ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
										}`}
									>
										{isPublic ? 'PUBLIC' : 'PERSONAL'}
									</div>
									<div className='text-xs text-gray-500 font-medium'>ADMIN</div>

									{/* Buttons */}
									{!isNotificationRead && isPersonal && (
										<Button
											variant='outline'
											size='sm'
											onClick={() => markAsRead(item.id)}
											disabled={markAsReadPending}
											className='text-blue-600 border-blue-600 hover:bg-blue-50 mt-1'
										>
											Mark as Read
										</Button>
									)}
									{!isNotificationRead && isPublic && (
										<Button
											variant='outline'
											size='sm'
											onClick={() => markPublicAsRead(item.id)}
											disabled={markPublicPending}
											className='text-blue-600 border-blue-600 hover:bg-blue-50 mt-1'
										>
											Mark as Read
										</Button>
									)}
								</div>
							</div>
						</div>
					)
				})
			) : (
				<div className='text-center text-gray-500 italic mt-10 p-10 bg-gray-50 rounded-2xl'>
					📭 No notifications available
				</div>
			)}
		</div>
	)
}
