'use client'

import { useAuth } from '@/contexts/auth-context'
import { useFindLessonById } from '@/hooks/useLessons'

export const MyDocs: React.FC = () => {
	const { user } = useAuth()
	const { data, error, isPending } = useFindLessonById(user?.id)
	if (error) {
		return 'error...'
	}
	if (isPending) {
		return 'loading...'
	}
	if (!data) {
		return 'data is not defined'
	}
	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>My Documents</h2>
			{data.words.length > 0 ? '' : ''}
		</div>
	)
}
