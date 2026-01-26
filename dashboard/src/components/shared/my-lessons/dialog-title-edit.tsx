import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateLessonTitle } from '@/hooks/useLessons'
import { Pencil } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface DialogTitleEditProps {
	trigger: ReactNode
	currentTitle: string
	lessonId: string
}
export const DialogTitleEdit: React.FC<DialogTitleEditProps> = ({
	trigger,
	currentTitle,
	lessonId,
}) => {
	const [open, setOpen] = useState<boolean>(false)
	const { mutate: updateLessonTitle, isPending } = useUpdateLessonTitle(lessonId)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const title = formData.get('title') as string
		if (title && !title.trim()) {
			return
		}

		updateLessonTitle(
			{ title: title.trim() },
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Pencil />
						Update
					</DialogTitle>

					<DialogDescription>Update title</DialogDescription>
					<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
						<Input
							name='title'
							type='text'
							placeholder='Enter lesson title'
							required
							defaultValue={currentTitle}
						/>
						<div className='flex items-center gap-5'>
							<Button type='submit' disabled={isPending}>
								{isPending ? 'SAVING...' : 'SAVE'}
							</Button>
							<DialogClose asChild>
								<Button type='button' variant={'outline'}>
									CANCEL
								</Button>
							</DialogClose>
						</div>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
