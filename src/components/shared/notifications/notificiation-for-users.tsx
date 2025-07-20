import { useUserCombinedNotifications } from '@/hooks/useNotifications'
import { LoaderIcon } from 'lucide-react'

interface NotificiationForUsersProps {
	userId: string
}
export const NotificiationForUsers: React.FC<NotificiationForUsersProps> = ({ userId }) => {
	const { data, isPending, error } = useUserCombinedNotifications()

	if (error) {
		return <div className='text-center text-red-500 mt-10'>❌ Error loading notifications</div>
	}

	if (isPending) {
		return (
			<div className='text-center text-gray-500 mt-10'>
				<LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />⏳ Loading
				notifications...
			</div>
		)
	}

	return (
		<div>
			{data.length > 0 ? (
				data.map(item => {
					const isPublic = !item.userId
					const isPersonal = item.userId === userId

					return (
						<div
							key={item.id}
							className='shadow-xl rounded-2xl flex justify-between items-center w-full hover:bg-gray-50 p-5 my-5 border transition-all duration-200'
						>
							<div className='flex justify-between w-full'>
								<div className='flex flex-col gap-2'>
									<div className='text-lg font-semibold'>
										<span className='text-lg mr-2'>{isPublic ? '📢' : '📩'}</span>
										{item.message}
									</div>
									<div className='text-sm text-gray-600'>
										<span className='text-lg mr-2'>📅</span>
										{new Date(item.createdAt).toLocaleString()}
									</div>
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
