import { useNotificationById } from '@/hooks/useNotifications'

interface NotificiationForUsersProps {
	userId: string
}
export const NotificiationForUsers: React.FC<NotificiationForUsersProps> = ({ userId }) => {
	const { data, isPending, error } = useNotificationById(userId)
	if (error) {
		return 'error...'
	}
	if (isPending) {
		return 'loading...'
	}
	console.log('data' + data)

	return (
		<div>
			{data.length > 0 ? (
				data.map(item => (
					<div
						key={item.id}
						className='shadow-xl rounded-2xl flex justify-between items-center w-full hover:bg-gray-200 p-5 my-5 border'
					>
						<div className='flex justify-between w-full'>
							<div className='flex flex-col gap-2'>
								<div className='text-lg font-semibold'>
									<span className='text-lg mr-2'>📩</span>
									{item.message}
								</div>
								<div className='text-sm font-semibold'>
									<span className='text-lg mr-2'>📅</span>
									{new Date(item.createdAt).toISOString().split('T')[0]}
								</div>
							</div>
							<div className='font-semibold italic'>ADMIN</div>
						</div>
					</div>
				))
			) : (
				<div className='text-center text-gray-500 italic mt-10'>📭 No notifications available</div>
			)}
		</div>
	)
}
