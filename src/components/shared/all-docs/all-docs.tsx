'use client'
import { useLessons } from '@/hooks/useLessons'
import { LoaderIcon } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function AllDocs() {
	const { data, error, isPending } = useLessons()

	if (isPending) {
		return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	}
	if (error) {
		return 'error..'
	}

	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>All documents</h2>
			<DataTable columns={columns} data={data.data} />
		</div>
	)
}
