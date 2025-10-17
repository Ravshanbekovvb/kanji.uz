'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSignupRequestCounts } from '@/hooks/useSignupRequests'
import { cn } from '@/lib/utils'
import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { PageTitle } from '../title'
import { DialogCreateUser } from './dialog-create-user'
export const UsersHeader: React.FC = () => {
	const { data, error, isPending } = useSignupRequestCounts()

	useEffect(() => {
		if (error) {
			toast.warning('Pending requestlar sonida error keldi...')
		}
	}, [error])
	return (
		<div className='flex justify-between items-center'>
			<PageTitle title='Users' />
			<div className='flex items-center justify-center gap-5'>
				<Link href={'/users/signup-requests'} className='relative'>
					{data > 0 && (
						<Badge
							variant={isPending ? 'secondary' : 'destructive'}
							className={cn(
								'absolute z-50 rounded-full -right-3 -top-3 min-w-5 min-h-5',
								isPending && 'animate-pulse'
							)}
						>
							{!isPending && data}
						</Badge>
					)}
					<Button variant={'outline'} className='cursor-pointer'>
						<ClipboardList />
					</Button>
				</Link>

				<DialogCreateUser triger={<Button className='cursor-pointer'>Create User</Button>} />
			</div>
		</div>
	)
}
