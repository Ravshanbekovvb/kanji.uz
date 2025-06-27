'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { DeleteDialog } from '../delete-dialog'

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'last_name',
		header: 'Last name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'local_lang',
		header: 'Language',
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<EllipsisVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w'>
						<DropdownMenuItem className='cursor-pointer w-full'>
							<Link href={`users`} className='flex items-center gap-2 text-black'>
								<Eye color='black' />
								VIEW
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='cursor-pointer w-full' asChild>
							<Link href={``} className='flex items-center gap-2 text-black'>
								<Edit color='black' />
								EDIT
							</Link>
						</DropdownMenuItem>

						<DeleteDialog
							DialogTrigger={
								<DropdownMenuItem
									className='cursor-pointer'
									onSelect={e => e.preventDefault()}
									asChild
								>
									<div className='flex items-center gap-2 text-red-500 group-'>
										<Trash2 color='red' />
										DELETE
									</div>
								</DropdownMenuItem>
							}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
