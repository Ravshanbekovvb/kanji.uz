// ActionsCell.tsx
'use client'
import { Button } from '@/components/ui/button'
import { useDeleteSignupRequest, useUpdateStatusSignupRequest } from '@/hooks/useSignupRequests'
import { Check, Loader2, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteDialog } from '../../delete-dialog'

export const ActionsCell = ({
	id,
	status: statusProps,
}: {
	id: string
	status: 'APPROVED' | 'REJECTED' | 'PENDING'
}) => {
	const { mutate } = useUpdateStatusSignupRequest()
	const { mutate: deleteSignupRequest, isPending } = useDeleteSignupRequest()
	const [loadingAction, setLoadingAction] = useState<'APPROVED' | 'REJECTED' | null>(null)

	const handleStatusChange = (status: 'APPROVED' | 'REJECTED') => {
		if (
			(status === 'APPROVED' && statusProps === 'APPROVED') ||
			(status === 'REJECTED' && statusProps === 'REJECTED')
		) {
			toast.warning(`O'zi hozirgi holati ${status}`)
			return
		}
		setLoadingAction(status)
		mutate(
			{ id, status },
			{
				onError: () => {
					toast.error('Nomaʼlum xatolik')
					setLoadingAction(null)
				},
				onSuccess: () => {
					toast.success('Status muvaffaqiyatli yangilandi!')
					setLoadingAction(null)
				},
			}
		)
	}

	return (
		<div className='flex items-center gap-2'>
			{/* APPROVE */}
			<Button
				size={'sm'}
				onClick={e => {
					e.stopPropagation()
					handleStatusChange('APPROVED')
				}}
				className='flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition'
				title='Tasdiqlash'
				disabled={loadingAction !== null}
			>
				{loadingAction === 'APPROVED' ? (
					<Loader2 className='rotate-right' />
				) : (
					<Check className='w-4 h-4' />
				)}
			</Button>

			{/* REJECT */}
			<Button
				onClick={e => {
					e.stopPropagation()
					handleStatusChange('REJECTED')
				}}
				className='flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition'
				title='Rad etish'
				disabled={loadingAction !== null}
			>
				{loadingAction === 'REJECTED' ? (
					<Loader2 className='rotate-right' />
				) : (
					<X className='w-4 h-4' />
				)}
			</Button>
			<DeleteDialog
				deleteItemFn={deleteSignupRequest}
				dialogTrigger={
					<div
						className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
						onClick={e => e.stopPropagation()}
					>
						<Trash2 color='red' />
					</div>
				}
				isPending={isPending}
				itemId={id}
			/>
		</div>
	)
}
