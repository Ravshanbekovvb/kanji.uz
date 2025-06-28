'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteUser } from '@/hooks/useUsers'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { DeleteDialog } from '../delete-dialog'

interface Props {
	email: string
}

export const Actions: React.FC<Props> = ({ email }) => {
	const { mutate: deleteUser, isPending } = useDeleteUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem className='cursor-pointer w-full'>
					<Link href='users' className='flex items-center gap-2 text-black'>
						<Eye color='black' />
						VIEW
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='' className='flex items-center gap-2 text-black'>
						<Edit color='black' />
						EDIT
					</Link>
				</DropdownMenuItem>
				<DeleteDialog
					isPending={isPending}
					deleteItemFn={deleteUser}
					itemId={email}
					dialogTrigger={
						<DropdownMenuItem className='cursor-pointer' onSelect={e => e.preventDefault()} asChild>
							<div className='flex items-center gap-2 text-red-500'>
								<Trash2 color='red' />
								DELETE
							</div>
						</DropdownMenuItem>
					}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
