'use client'
import { Section } from '@/components/ui/section'
import { useUsers } from '@/hooks/useUsers'
import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { UsersHeader } from './users-header'
export default function Users() {
	const { data, isPending, error } = useUsers(true)

	if (isPending) {
		return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	}
	if (error) {
		return 'error..'
	}

	return (
		<Section className={cn('flex flex-col gap-5')}>
			<UsersHeader />
			<DataTable columns={columns} data={data} />
		</Section>
	)
}
