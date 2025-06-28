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
import { Trash2 } from 'lucide-react'
import { ReactNode } from 'react'
import { Loader } from '../loader'
interface DeleteDialogProps {
	dialogTrigger: ReactNode
	itemId: string
	deleteItemFn: (id: string) => void
	isPending: boolean
}
export const DeleteDialog: React.FC<DeleteDialogProps> = ({
	dialogTrigger: triger,
	itemId,
	deleteItemFn,
	isPending,
}) => {
	return (
		<Dialog>
			<DialogTrigger>{triger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Trash2 size={35} />
						Are you absolutely sure?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</DialogDescription>
					<div className='flex justify-start items-center gap-5'>
						{isPending ? (
							<Loader title='Deleting...' variant='destructive' />
						) : (
							<Button onClick={() => deleteItemFn(itemId)} variant='destructive'>
								Yes
							</Button>
						)}

						<DialogClose asChild>
							<Button variant='default' disabled={isPending}>
								No
							</Button>
						</DialogClose>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
