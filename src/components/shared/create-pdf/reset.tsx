import { Button } from '@/components/ui/button'
import { useStore } from '@/store/store'
import { RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

type ResetProps = {
	existingLessonId?: string | null
}

export const Reset: React.FC<ResetProps> = ({ existingLessonId }) => {
	const { setIsUpdate } = useStore()
	const reset = (): void => {
		if (existingLessonId) {
			// Only clear new words when adding to existing lesson
			localStorage.removeItem('newWords')
		} else {
			// Clear all when creating new lesson
			localStorage.removeItem('words')
			localStorage.removeItem('lessonTitle')
		}
		setIsUpdate(Math.random())
		toast.success('Reset successful')
	}
	return (
		<Button className='cursor-pointer' onClick={reset} variant={'outline'}>
			<RefreshCcw />
		</Button>
	)
}
