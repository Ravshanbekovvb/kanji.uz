'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DarsData } from '@/types/types'
import { Row } from '@tanstack/react-table'
import { Download, EllipsisVertical, Trash2 } from 'lucide-react'

interface Props {
	row: Row<DarsData>
}

export const Actions: React.FC<Props> = ({ row }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='hover:bg-gray-100' onClick={e => e.stopPropagation()}>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' onClick={e => e.stopPropagation()}>
				<DropdownMenuItem
					className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
					onSelect={e => e.preventDefault()}
				>
					<Trash2 color='red' />
					DELETE
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer flex items-center gap-2'
					onSelect={e => e.preventDefault()}
				>
					<Download color='black' />
					DOWNLOAD
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
