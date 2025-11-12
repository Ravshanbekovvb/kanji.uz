import { Section } from '@/components/ui/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageTitle } from '../title'
import { Profile } from './profile'
export const Settings: React.FC = () => {
	return (
		<Section>
			<PageTitle title='Settings' className='mb-5' />
			<Tabs defaultValue='profile' className='w-full'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					{/* <TabsTrigger value='ai-setting'>AI settings</TabsTrigger> */}
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
				{/* <TabsContent value='ai-setting'>
					<AiSettings />
				</TabsContent> */}
			</Tabs>
		</Section>
	)
}
