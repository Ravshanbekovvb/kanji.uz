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
import { useDeleteLesson } from '@/hooks/useLessons'
import { DarsData } from '@/types/types'
import { Row } from '@tanstack/react-table'
import { Download, EllipsisVertical, Trash2 } from 'lucide-react'
import { DeleteDialog } from '../delete-dialog'
import { DialogSelectTypePdf } from '../dialog-select-type-pdf/dialog-select-type-pdf'

interface Props {
	row: Row<DarsData>
}

export const Actions: React.FC<Props> = ({ row }) => {
	const { mutate: deleteUser, isPending } = useDeleteLesson()

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
			<DropdownMenuContent align='end' className='w-56' onClick={e => e.stopPropagation()}>
				<DialogSelectTypePdf
					lesson={row.original as any}
					trigger={
						<DropdownMenuItem className='cursor-pointer' onSelect={e => e.preventDefault()}>
							{/* <Download color='black' /> */}
							DOWNLOAD
							<DropdownMenuShortcut>
								<Download />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					}
				/>
				<DropdownMenuSeparator />
				<DeleteDialog
					deleteItemFn={handleDeleteUser}
					dialogTrigger={
						<DropdownMenuItem
							className='cursor-pointer  text-red-400'
							onSelect={e => e.preventDefault()}
						>
							{/* <Trash2 /> */}
							DELETE
							<DropdownMenuShortcut>
								<Trash2 className='text-red-400' />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					}
					itemId={row.original.id}
					isPending={isPending}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
