import {
	useMarkAllAsRead,
	useMarkAsRead,
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
	const { mutate: markAllAsRead, isPending: markAllPending } = useMarkAllAsRead()

	if (error) {
		return <div className='text-center text-red-500 mt-10'>❌ Error loading notifications</div>
	}

	if (isPending) {
		return (
			<div className='flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading notifications...
			</div>
		)
	}

	const unreadCount = data.filter(item => !item.isRead && item.userId === userId).length

	return (
		<div>
			{data.length > 0 && unreadCount > 0 && (
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
						{markAllPending ? 'Marking...' : 'Mark All as Read'}
					</Button>
				</div>
			)}

			{data.length > 0 ? (
				data.map(item => {
					const isPublic = !item.userId
					const isPersonal = item.userId === userId

					return (
						<div
							key={item.id}
							className={`shadow-xl rounded-2xl flex justify-between items-center w-full hover:bg-gray-50 p-5 my-5 border transition-all duration-200 ${
								!item.isRead && isPersonal ? 'border-l-4 border-l-blue-500 bg-blue-50/20' : ''
							}`}
						>
							<div className='flex items-center gap-3 w-full'>
								{isPersonal && (
									<div className='flex flex-col items-center'>
										{item.isRead ? (
											<MailOpen size={24} className='text-gray-400' />
										) : (
											<Mail size={24} className='text-blue-600' />
										)}
										{!item.isRead && <div className='w-3 h-3 bg-red-500 rounded-full mt-1'></div>}
									</div>
								)}
								<div className='flex justify-between w-full'>
									<div className='flex flex-col gap-2'>
										<div
											className={`text-lg font-semibold ${
												!item.isRead && isPersonal ? 'text-blue-900' : ''
											}`}
										>
											<span className='text-lg mr-2'>{isPublic ? '📢' : '📩'}</span>
											{item.message}
										</div>
										<div className='text-sm text-gray-600'>
											<span className='text-lg mr-2'>📅</span>
											{new Date(item.createdAt).toLocaleString()}
										</div>
										{item.isRead && isPersonal && (
											<div className='text-xs text-green-600 flex items-center gap-1'>
												<CheckCircle size={12} />
												Read
											</div>
										)}
									</div>
									<div className='flex flex-col items-end gap-1'>
										<div
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												isPublic ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
											}`}
										>
											{isPublic ? 'PUBLIC' : 'PERSONAL'}
										</div>
										<div className='text-xs text-gray-500 font-medium'>ADMIN</div>
										{!item.isRead && isPersonal && (
											<Button
												variant='outline'
												size='sm'
												onClick={() => markAsRead(item.id)}
												disabled={markAsReadPending}
												className='text-blue-600 border-blue-600 hover:bg-blue-50 mt-2'
											>
												Mark as Read
											</Button>
										)}
									</div>
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
