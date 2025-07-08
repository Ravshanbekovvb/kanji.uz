'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/auth-context'
import { NotificationAll } from './notification-all'
import { NotificationPrivate } from './notification-private'
import { NotificiationForUsers } from './notificiation-for-users'

export const Notifications: React.FC = () => {
	const { user } = useAuth()
	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>Notifications</h2>
			{user?.role === 'ADMIN' ? (
				<Tabs defaultValue='all'>
					<TabsList>
						<TabsTrigger value='all'>All</TabsTrigger>
						<TabsTrigger value='personal'>Personal</TabsTrigger>
					</TabsList>
					<TabsContent value='all'>
						<NotificationAll />
					</TabsContent>
					<TabsContent value='personal'>
						<NotificationPrivate />
					</TabsContent>
				</Tabs>
			) : (
				<NotificiationForUsers userId={user?.id as string} />
			)}
		</div>
	)
}
