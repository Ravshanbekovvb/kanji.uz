'use client'
import { User } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { Actions } from './actions'

export const columns: ColumnDef<User>[] = [
	// {
	// 	accessorKey: 'id',
	// 	header: 'Id',
	// },
	// {
	// 	accessorKey: 'name',
	// 	header: 'Name',
	// },
	// {
	// 	accessorKey: 'last_name',
	// 	header: 'Last name',
	// },
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
	// {
	// 	accessorKey: 'local_lang',
	// 	header: 'Language',
	// },
	// {
	// 	accessorKey: 'role',
	// 	header: 'Role',
	// },
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => <Actions email={row.original.email} />,
	},
]
