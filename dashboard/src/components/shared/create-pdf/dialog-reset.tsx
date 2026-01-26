import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { toast } from 'sonner'
type ResetProps = {
	existingLessonId?: string | null
	trigger: ReactNode
}

export const DialogReset: React.FC<ResetProps> = ({ existingLessonId, trigger }) => {
	const route = useRouter()
	const { setIsUpdate } = useStore()
	const reset = (): void => {
		localStorage.removeItem('lessonTitle')
		if (existingLessonId) {
			// Clear new words and lesson title when adding to existing lesson
			localStorage.removeItem('newWords')
		} else {
			// Clear all when creating new lesson
			localStorage.removeItem('words')
		}
		route.replace('/create-lesson')
		setIsUpdate(Math.random())
		toast.success('Reset successful!')
	}
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Reset Lesson Data</DialogTitle>
					<DialogDescription className='my-3'>
						{existingLessonId
							? 'This will remove all newly added words. The existing lesson will remain unchanged.'
							: 'This will clear all words and lesson title. You will start with a clean slate.'}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={reset} variant='destructive' type='button'>
							{existingLessonId ? 'Clear New Words' : 'Reset All'}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
