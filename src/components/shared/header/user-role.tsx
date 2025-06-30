'use client'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

type UserRoleProps = {
	className?: string
}

export const UserRole: React.FC<UserRoleProps> = ({ className }: UserRoleProps) => {
	const { user, isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className={cn('flex items-center gap-2', className)}>
				<div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse' />
				<div className='flex flex-col gap-1'>
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
		<div className={cn('flex items-center gap-2', className)}>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&s'
				alt='User avatar'
				width={40}
				height={40}
				className='rounded-full'
			/>
			<div className='flex flex-col'>
				<div className='font-bold capitalize'>{user.userName}</div>
				<div className='text-black/50 text-[12px] capitalize'>{user.role}</div>
			</div>
		</div>
	)
}
