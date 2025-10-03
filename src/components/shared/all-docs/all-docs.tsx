'use client'
import { useLessons } from '@/hooks/useLessons'
import { LoaderIcon } from 'lucide-react'
import { PageTitle } from '../title'
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
	console.log(data)

	return (
		<div>
			<PageTitle title='All Lessons' className='mb-4' />
			<DataTable columns={columns} data={data.data} />
		</div>
	)
}
