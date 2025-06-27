import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'
interface DeleteDialogProps {
	DialogTrigger: ReactNode
}
export const DeleteDialog: React.FC<DeleteDialogProps> = ({ DialogTrigger: triger }) => {
	return (
		<Dialog>
			<DialogTrigger>{triger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
