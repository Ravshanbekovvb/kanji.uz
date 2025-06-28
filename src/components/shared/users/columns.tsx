'use client'

import { User } from '@/lib'
import { ColumnDef } from '@tanstack/react-table'
import { Actions } from './actions'

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => row.getValue('id'),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.getValue('email'),
	},
	{
		accessorKey: 'userName',
		header: 'Name',
		cell: ({ row }) => row.getValue('userName'),
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => row.getValue('role'),
	},
	{
		accessorKey: 'userLang',
		header: 'Language',
		cell: ({ row }) => row.getValue('userLang'),
	},
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => <Actions row={row.original} />,
	},
]
