'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	useCreateNotification,
	useDeleteNotification,
	useNotificationsAll,
} from '@/hooks/useNotifications'
import { Edit, EllipsisVertical, LoaderIcon, SendHorizontal, Trash2 } from 'lucide-react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { DeleteDialog } from '../delete-dialog'
import { Loader } from '../loader'
import { NotificationEditDialog } from './notification-edit-dialog'

export const NotificationAll: React.FC = () => {
	const { data, error, isPending } = useNotificationsAll()
	const { mutate: deleteNotification, isPending: deleteNotificationIsPanding } =
		useDeleteNotification()
	const { mutate: createNotificationPrivate, isPending: notificationIsPending } =
		useCreateNotification()
	if (isPending) {
		return (
			<div className='flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading all notifications...
			</div>
		)
	}
	if (error) {
		return 'error...'
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const message = formData.get('message')

		if (!message) {
			toast.error('Message must not be empty!')
			return
		}
		createNotificationPrivate(
			{ message: message, userId: null },
			{
				onSuccess: () => {
					form.reset()
				},
			}
		)
	}
	return (
		<div>
			<form className='flex items-center gap-2' onSubmit={handleSubmit}>
				<input
					name='message'
					type='text'
					placeholder='type new notification...'
					className='border p-2 rounded w-full'
				/>
				{notificationIsPending ? (
					<Loader title='' />
				) : (
					<Button
						type='submit'
						className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
					>
						SEND
						<SendHorizontal />
					</Button>
				)}
			</form>

			{data.length > 0 ? (
				data.map((item, ind) => (
					<div
						key={item.id ?? ind}
						className='shadow-xl rounded-2xl flex justify-between items-center w-full hover:bg-gray-200 p-5 my-5 border'
					>
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
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='hover:bg-gray-100'
										onClick={e => e.stopPropagation()}
									>
										<EllipsisVertical className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align='end'
									onClick={e => e.stopPropagation()}
									className='flex flex-col'
								>
									<DeleteDialog
										deleteItemFn={deleteNotification}
										dialogTrigger={
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
												onSelect={e => e.preventDefault()}
											>
												<Trash2 className='text-red-500' />
												DELETE
											</DropdownMenuItem>
										}
										itemId={item.id}
										isPending={deleteNotificationIsPanding}
									/>
									<NotificationEditDialog
										currentData={item}
										trigger={
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2'
												onSelect={e => e.preventDefault()}
											>
												<Edit className='text-black' />
												EDIT
											</DropdownMenuItem>
										}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))
			) : (
				<div className='text-center text-gray-500 italic mt-10'>📭 No notifications available</div>
			)}
		</div>
	)
}
