'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='hover:bg-gray-100' onClick={e => e.stopPropagation()}>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56' onClick={e => e.stopPropagation()}>
				<EditUserDialog
					currentData={row}
					trigger={
						<DropdownMenuItem className='cursor-pointer' onSelect={e => e.preventDefault()}>
							EDIT
							<DropdownMenuShortcut>
								<Edit />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					}
				/>
				<DropdownMenuSeparator />
				<DeleteDialog
					isPending={isPending}
					deleteItemFn={deleteUser}
					itemId={row.id}
					dialogTrigger={
						<DropdownMenuItem
							className='cursor-pointer text-red-400 '
							onSelect={e => e.preventDefault()}
						>
							DELETE
							<DropdownMenuShortcut>
								<Trash2 className=' text-red-400 ' />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
