'use client'

import { DarsData } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { Actions } from './actions'

export const columns: ColumnDef<DarsData>[] = [
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorFn: row => row.words.length,
		header: 'Word Count',
		id: 'wordCount',
	},
	{
		accessorKey: 'user',
		header: 'User',
	},
	{
		header: 'Actions',
		id: 'actions',
		cell: ({ row }) => <Actions row={row} />,
	},
]
