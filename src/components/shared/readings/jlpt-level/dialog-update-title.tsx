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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateReadingSectionTitle } from '@/hooks/useReadings'
import { useStore } from '@/store/store'
import { Loader2 } from 'lucide-react'
import { FormEvent, ReactNode, useState } from 'react'
import { toast } from 'sonner'
interface DialogUpdateTitleProps {
	trigger: ReactNode
	data: string
	id: string
}
export const DialogUpdateTitle: React.FC<DialogUpdateTitleProps> = ({ id, trigger, data }) => {
	const { setAddingReading } = useStore()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { mutate, isPending } = useUpdateReadingSectionTitle(id)
	const update = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const title = formData.get('title') as string
		if (!title || title.trim() === '') {
			toast.warning('Title cannot be empty')
			return
		}
		mutate(
			{ title: title.trim() },
			{
				onSuccess: data => {
					setIsOpen(false)
					setAddingReading(data.data.id, data.data.title, data.data.jlptLevel)
				},
			}
		)
	}
	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={update}>
					<DialogHeader>
						<DialogTitle>Edit Title</DialogTitle>
						<DialogDescription>
							Update the reading section title. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-2'>
						<div className='grid gap-3'>
							<Label htmlFor='title'>Title</Label>
							<Input id='title' name='title' defaultValue={data} required />
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline' disabled={isPending}>
								Cancel
							</Button>
						</DialogClose>
						{isPending ? (
							<Button type='button' variant={'outline'} disabled={isPending}>
								<Loader2 className='animate-spin' />
								saving...
							</Button>
						) : (
							<Button type='submit'>Save changes</Button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
