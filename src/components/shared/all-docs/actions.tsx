'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteLesson } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { DarsData } from '@/types/types'
import { Row } from '@tanstack/react-table'
import { Download, EllipsisVertical, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DeleteDialog } from '../delete-dialog'

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
	console.log(row.original.words)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='hover:bg-gray-100' onClick={e => e.stopPropagation()}>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' onClick={e => e.stopPropagation()}>
				<DeleteDialog
					deleteItemFn={handleDeleteUser}
					dialogTrigger={
						<DropdownMenuItem
							className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
							onSelect={e => e.preventDefault()}
						>
							<Trash2 color='red' />
							DELETE
						</DropdownMenuItem>
					}
					itemId={row.original.id}
					isPending={isPending}
				/>

				<DropdownMenuItem
					className='cursor-pointer flex items-center gap-2'
					onSelect={e => e.preventDefault()}
					onClick={async () => {
						const ind = toast.loading('downloading')

						setTimeout(() => {
							try {
								createPdf({ words: row.original.words, title: row.original.title })
							} catch (error) {
								console.error('PDF yaratishda xatolik:', error)
							} finally {
								setTimeout(() => toast.dismiss(ind), 200)
							}
						}, 100)
					}}
				>
					<Download color='black' />
					DOWNLOAD
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
