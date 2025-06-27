'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
type User = {
	id: number
	name: string
	last_name: string
	email: string
	role: 'ADMIN' | 'STUDENT' | 'TEACHER' | 'USER'
	local_lang: 'UZ' | 'RU' | 'JA' | 'EN'
}

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
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<EllipsisVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>
							<Link href={`users`} className='flex items-center gap-2 text-black'>
								<Eye color='black' />
								VIEW
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='cursor-pointer'>
							<Link href={``} className='flex items-center gap-2 text-black'>
								<Edit color='black' />
								EDIT
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='cursor-pointer'>
							<div className='flex items-center gap-2 text-red-500'>
								<Trash2 color='red' />
								DELETE
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
