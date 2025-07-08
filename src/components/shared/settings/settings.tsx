import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Profile } from './profile'
export const Settings: React.FC = () => {
	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>Settings</h2>
			<Tabs defaultValue='profile' className='w-full'>
				<TabsList>
					<TabsTrigger value='profile'>profile</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
			</Tabs>
		</div>
	)
}
