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
import Image from 'next/image'
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
	const [title, setTitle] = useState(currentTitle)
	const [open, setOpen] = useState<boolean>(false)
	const updateLessonTitle = useUpdateLessonTitle()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!title.trim()) {
			return
		}

		updateLessonTitle.mutate(
			{ lessonId, title: title.trim() },
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
						<Image src={'/edit-icon.webp'} alt='edit-icon' height={35} width={35} />
						{/* <Edit color='black' /> */}
						Edit
					</DialogTitle>

					<DialogDescription>Edit title</DialogDescription>
					<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
						<Input
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder='Enter lesson title'
							required
						/>
						<div className='flex items-center gap-5'>
							<Button type='submit' disabled={updateLessonTitle.isPending}>
								{updateLessonTitle.isPending ? 'SAVING...' : 'SAVE'}
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
