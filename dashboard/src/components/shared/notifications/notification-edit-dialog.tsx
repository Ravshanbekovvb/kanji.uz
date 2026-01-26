import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useEditNotification } from '@/hooks/useNotifications'
import { Notification } from '@/lib'
import { FormEvent, ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'
interface NotificationEditDialogProps {
	trigger: ReactNode
	currentData: Notification
}
export const NotificationEditDialog: React.FC<NotificationEditDialogProps> = ({
	trigger,
	currentData,
}) => {
	const { mutate: notificationEdit, isPending } = useEditNotification()
	const [open, setOpen] = useState(false)
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const message = formData.get('message')

		if (!message) {
			toast.error('Message and user must not be empty!')
			return
		}

		const messagdata = {
			message,
			userId: currentData.userId,
			notificationId: currentData.id, // ✅ katta "D" bilan yozildi
		}
		notificationEdit(messagdata, {
			onSuccess: () => {
				setOpen(false)
			},
			onError: err => {
				toast.error(err.message)
				console.error(err)
			},
		})
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit notification</DialogTitle>
						<DialogDescription asChild>
							<Input type='text' name='message' defaultValue={currentData.message} />
						</DialogDescription>
					</DialogHeader>
					<div className='flex justify-start pt-4'>
						{isPending ? (
							<Loader variant='default' title='Editing...' />
						) : (
							<Button type='submit'>Edit</Button>
						)}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
