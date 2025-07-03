'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteUser } from '@/hooks/useUsers'
import { User } from '@/lib'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'
import { DeleteDialog } from '../delete-dialog'
import { EditUserDialog } from './edit-user-dialog'

interface Props {
	row: User
}

export const Actions: React.FC<Props> = ({ row }) => {
	const { mutate: deleteUser, isPending } = useDeleteUser()

	const handleDeleteUser = (
		id: string,
		callbacks?: { onSuccess?: () => void; onError?: (error: any) => void }
	) => {
		deleteUser(id, {
			onSuccess: () => {
				callbacks?.onSuccess?.()
			},
			onError: error => {
				callbacks?.onError?.(error)
			},
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='hover:bg-gray-100' onClick={e => e.stopPropagation()}>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' onClick={e => e.stopPropagation()}>
				<EditUserDialog
					currentData={row}
					trigger={
						<DropdownMenuItem
							className='cursor-pointer flex items-center gap-2'
							onSelect={e => e.preventDefault()}
						>
							<Edit color='black' />
							EDIT
						</DropdownMenuItem>
					}
				></EditUserDialog>

				<DeleteDialog
					isPending={isPending}
					deleteItemFn={handleDeleteUser}
					itemId={row.id}
					dialogTrigger={
						<DropdownMenuItem
							className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
							onSelect={e => e.preventDefault()}
						>
							<Trash2 color='red' />
							DELETE
						</DropdownMenuItem>
					}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
