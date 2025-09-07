import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageTitle } from '../title'
import { Profile } from './profile'
import { AiSettings } from './ai-settings'
export const Settings: React.FC = () => {
	return (
		<div>
			<PageTitle title='Settings' className='mb-5' />
			<Tabs defaultValue='profile' className='w-full'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='ai-setting'>AI settings</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
				<TabsContent value='ai-setting'>
					<AiSettings />
				</TabsContent>
			</Tabs>
		</div>
	)
}
