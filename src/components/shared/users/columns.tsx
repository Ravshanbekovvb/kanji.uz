'use client'

import { User } from '@/lib'
import { ColumnDef } from '@tanstack/react-table'
import { Actions } from './actions'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Id' />,
		cell: ({ row }) => row.index + 1,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
		cell: ({ row }) => row.getValue('email'),
	},
	{
		accessorKey: 'userName',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
		cell: ({ row }) => row.getValue('userName'),
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => {
			const role = row.getValue('role')
			return (
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${
						role === 'ADMIN'
							? 'bg-red-100 text-red-800'
							: role === 'TEACHER'
								? 'bg-blue-100 text-blue-800'
								: 'bg-gray-100 text-gray-800'
					}`}
				>
					{role as string}
				</span>
			)
		},
	},
	{
		accessorKey: 'userLang',
		header: 'Language',
		cell: ({ row }) => row.getValue('userLang'),
	},
	{
		accessorKey: 'createdAt',
		header: 'Created at',
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string
			const date = new Date(createdAt)
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})
		},
	},
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => <Actions row={row.original} />,
	},
]
