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
		<div
			className='rounded-full bg-blue-800 hover:bg-blue-900 w-10 h-10 flex justify-center items-center text-slate-50 borde  cursor-pointer'
			onClick={reset}
		>
			<RefreshCcw />
		</div>
	)
}
