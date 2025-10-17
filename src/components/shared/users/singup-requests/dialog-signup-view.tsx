import { Badge } from '@/components/ui/badge'
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
import { Separator } from '@/components/ui/separator'
import { SignUpType } from '@/types/types'
import { CalendarDays, Mail, StickyNote, User } from 'lucide-react'
import { ReactNode } from 'react'

interface DialogSignupViewProps {
	triger: ReactNode
	data: SignUpType
}

export const DialogSignupView: React.FC<DialogSignupViewProps> = ({ triger, data }) => {
	const statusColor = {
		PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
		APPROVED: 'bg-green-100 text-green-800 border-green-300',
		REJECTED: 'bg-red-100 text-red-800 border-red-300',
	}[data.status]

	return (
		<Dialog>
			<DialogTrigger asChild>{triger}</DialogTrigger>
			<DialogContent className='sm:max-w-md rounded-2xl'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold text-center text-gray-800'>
						Signup Request
					</DialogTitle>
					<DialogDescription className='text-center text-gray-500'>
						Request details and current status
					</DialogDescription>
				</DialogHeader>

				<Separator className='my-3' />

				<div className='space-y-4'>
					<div className='flex items-center gap-2 text-gray-700'>
						<User className='w-4 h-4 text-gray-500' />
						<span className='font-medium'>{data.name}</span>
					</div>

					<div className='flex items-center gap-2 text-gray-700'>
						<Mail className='w-4 h-4 text-gray-500' />
						<span>{data.email}</span>
					</div>

					<div className='flex items-center gap-2 text-gray-700'>
						<StickyNote className='w-4 h-4 text-gray-500' />
						<span className='break-words whitespace-pre-wrap max-h-30 overflow-auto'>
							{data.note}
						</span>
					</div>

					<div className='flex items-center gap-2'>
						<CalendarDays className='w-4 h-4 text-gray-500' />
						<span className='text-sm text-gray-600'>
							Created: {new Date(data.createdAt).toLocaleString()}
						</span>
					</div>

					{data.approvedAt && (
						<div className='flex items-center gap-2'>
							<CalendarDays className='w-4 h-4 text-green-500' />
							<span className='text-sm text-gray-600'>
								Approved: {new Date(data.approvedAt).toLocaleDateString()}
							</span>
						</div>
					)}

					<div className='flex justify-between items-center mt-4'>
						<Badge variant='outline' className={`px-3 py-1 rounded-full border ${statusColor}`}>
							{data.status}
						</Badge>
						<DialogClose asChild>
							<Button variant='outline' size='sm'>
								Close
							</Button>
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
