import { cn } from '@/lib/utils'
import { User } from '@/types/types'
import { columns } from './columns'
import { DataTable } from './data-table'
import { UsersHeader } from './users-header'

async function getUsers(): Promise<User[]> {
	return [
		{
			id: 1,
			name: 'Bekhruz',
			last_name: 'Abdullayev',
			email: 'bekhruz@example.com',
			role: 'ADMIN',
			local_lang: 'UZ',
		},
		{
			id: 2,
			name: 'Nazarbek',
			last_name: 'Qodirov',
			email: 'nazarbek@example.com',
			role: 'STUDENT',
			local_lang: 'RU',
		},
		{
			id: 3,
			name: 'Yuki',
			last_name: 'Tanaka',
			email: 'yuki@example.jp',
			role: 'TEACHER',
			local_lang: 'JA',
		},
		{
			id: 4,
			name: 'Alice',
			last_name: 'Smith',
			email: 'alice@example.com',
			role: 'USER',
			local_lang: 'EN',
		},
	]
}
export default async function Users() {
	const data = await getUsers()
	return (
		<div className={cn('flex flex-col gap-5')}>
			<UsersHeader />
			<DataTable columns={columns} data={data} />
		</div>
	)
}
