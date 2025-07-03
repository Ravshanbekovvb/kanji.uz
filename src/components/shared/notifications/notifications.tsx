import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationAll } from './notification-all'
import { NotificationPersonal } from './notification-personal'

export const Notifications: React.FC = () => {
	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>Notifications</h2>
			<Tabs defaultValue='all'>
				<TabsList>
					<TabsTrigger value='all'>All</TabsTrigger>
					<TabsTrigger value='personal'>Personal</TabsTrigger>
				</TabsList>
				<TabsContent value='all'>
					<NotificationAll />
				</TabsContent>
				<TabsContent value='personal'>
					<NotificationPersonal />
				</TabsContent>
			</Tabs>
		</div>
	)
}
