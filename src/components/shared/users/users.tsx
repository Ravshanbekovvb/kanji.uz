'use client'
import { useUsers } from '@/hooks/useUsers'
import { cn } from '@/lib/utils'
import { columns } from './columns'
import { DataTable } from './data-table'
import { UsersHeader } from './users-header'
export default function Users() {
	const { data, isPending, error } = useUsers(true)

	if (isPending) {
		return 'loading..'
	}
	if (error) {
		return 'error..'
	}
	return (
		<div className={cn('flex flex-col gap-5')}>
			<UsersHeader />
			<DataTable columns={columns} data={data} />
		</div>
	)
}
