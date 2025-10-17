'use client'

import { Badge } from '@/components/ui/badge'
import { RequestStatus } from '@/lib'
import { SignUpType } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { ActionsCell } from './actions'
export const truncateText = (text: string, limit = 20): string => {
	if (!text) return ''
	return text.length > limit ? text.slice(0, limit) + '...' : text
}
export const columns: ColumnDef<SignUpType>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => row.index + 1,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => row.getValue('email'),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => row.getValue('name'),
	},
	{
		accessorKey: 'note',
		header: 'Note',
		cell: ({ row }) => truncateText(row.getValue('note')),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status: RequestStatus = row.getValue('status')

			const statusVariant =
				{
					PENDING: 'pending',
					APPROVED: 'approved',
					REJECTED: 'destructive',
				}[status] || 'pending'

			const statusText =
				{
					PENDING: 'PENDING',
					APPROVED: 'APPROVED',
					REJECTED: 'REJECTED',
				}[status] || status

			return (
				<Badge variant={statusVariant as 'pending' | 'approved' | 'destructive'}>
					{statusText}
				</Badge>
			)
		},
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
		cell: ({ row }) => <ActionsCell id={row.original.id} status={row.original.status} />,
	},
]
