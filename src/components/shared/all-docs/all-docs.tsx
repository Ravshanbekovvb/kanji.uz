'use client'
import { useLessons } from '@/hooks/useLessons'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function AllDocs() {
	const { data, error } = useLessons()
	console.log(error)

	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>All documents</h2>
			<DataTable columns={columns} data={data} />
		</div>
	)
}
