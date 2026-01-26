'use client'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/func/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type UserRoleProps = {
	className?: string
}

export const UserRole: React.FC<UserRoleProps> = ({ className }: UserRoleProps) => {
	const { user, isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className={cn('flex items-center gap-3 px-4 py-3 border-t h-[66px]', className)}>
				<div className='w-[30px] h-[30px] bg-gray-200 rounded-full animate-pulse' />
				<div className='flex flex-col gap-2'>
					<div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
					<div className='h-3 w-12 bg-gray-200 rounded animate-pulse' />
				</div>
			</div>
		)
	}

	if (!user) {
		return null
	}

	return (
		<Link href={'/profile'}>
			<div
				className={cn('flex items-center justify-between px-4 py-3 border-t h-[66px]', className)}
			>
				<div className='flex items-center gap-3'>
					<Image
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&s'
						alt='User avatar'
						width={30}
						height={30}
						className='rounded-full'
					/>
					<div className='flex flex-col'>
						<div className='font-medium  truncate capitalize'>{user.userName}</div>
						<div className=' text-[10px] capitalize text-xs text-slate-400 truncate'>
							{user.role}
						</div>
					</div>
				</div>
				<ChevronRight className='text-slate-600' />
			</div>
		</Link>
	)
}
