'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	useCreateNotification,
	useDeleteNotification,
	useNotificationsPrivate,
} from '@/hooks/useNotifications'
import { useUsers } from '@/hooks/useUsers'
import { Edit, EllipsisVertical, LoaderIcon, SendHorizontal, Trash2 } from 'lucide-react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { DeleteDialog } from '../delete-dialog'
import { Loader } from '../loader'
import { NotificationEditDialog } from './notification-edit-dialog'

export const NotificationPrivate: React.FC = () => {
	const { data, error, isPending } = useNotificationsPrivate()
	const { data: userData, isPending: userIsPending, error: userError } = useUsers(true)
	const { mutate: createNotificationPrivate, isPending: notificationIsPending } =
		useCreateNotification()
	const { mutate: deleteNotification, isPending: deleteNotificationIsPanding } =
		useDeleteNotification()
	if (isPending || userIsPending) {
		return (
			<div className='flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading private notifications...
			</div>
		)
	}
	if (error || userError) {
		return 'error...'
	}

	const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)

		const message = formData.get('message')
		const userId = formData.get('userId')

		if (!message || !userId) {
			toast.error('Message and user must not be empty!')
			return
		}

		createNotificationPrivate(
			{
				message,
				userId,
			},
			{
				onSuccess: () => {
					form.reset()
				},
			}
		)
	}
	return (
		<div>
			<form className='flex items-center gap-2' onSubmit={handlesubmit}>
				<input
					name='message'
					type='text'
					placeholder='type new notification personal...'
					className='border p-2 rounded w-full'
				/>
				<Select name='userId'>
					<SelectTrigger className='w-[180px] h-42'>
						<SelectValue placeholder='Select User' />
					</SelectTrigger>
					<SelectContent>
						{userData.map((user: { userName: string; id: string }, index: number) => (
							<SelectItem value={user.id} key={index} className='cursor-pointer'>
								{user.userName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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
						className='shadow-xl rounded-2xl flex justify-between items-center w-full hover:bg-gray-200 p-3 my-5 border'
					>
						<div className='flex flex-col gap-1'>
							<div className='text-2xl font-semibold'>
								<span className='text-lg mr-2'>🧔🏻</span>
								{item.user && <>{item.user.userName}</>}
							</div>
							<div className='text-lg font-semibold'>
								<span className='text-lg mr-2'>💬</span>
								{item.message}
							</div>
							<div className='text-sm font-semibold text-gray-400'>
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
