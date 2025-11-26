'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { useEditUser, useFindUserById } from '@/hooks/useUsers'
import { UserRole } from '@/lib'
import { Camera, Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'
import { Skleton } from '../loader/skleton'
import { ReqiredStar } from '../reqiredStar'

export const Profile: React.FC = () => {
	const { user, refetchUser } = useAuth()
	const { isPending: UserEditIsPending, mutate: editUser } = useEditUser(user?.id as string)
	const { data, error, isPending } = useFindUserById(user?.id as string)
	if (isPending)
		return (
			<Section>
				<Skleton variant='profile' />
			</Section>
		)
	if (error) return <div>Error loading user</div>
	if (!data) return <div>data not found</div>
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('userName') as string
		const email = formData.get('email') as string
		const currentPassword = formData.get('currentPassword') as string
		const password = formData.get('newPassword') as string
		console.log({
			email: email,
			password: password,
			currentPassword: currentPassword,
			userName: name,
			role: user?.role as UserRole,
			userLang: null,
			loginCount: data.loginCount, // Preserve existing loginCount
		})

		editUser(
			{
				email: email,
				password: password,
				currentPassword: currentPassword,
				userName: name,
				role: user?.role as UserRole,
				userLang: null,
				loginCount: data.loginCount, // Preserve existing loginCount
			},
			{
				onSuccess: () => {
					toast.success('Edited successfully!')
					refetchUser()
				},
			}
		)
	}
	return (
		<Section>
			<div className='space-y-6'>
				{/* Profile Header Card */}

				<div className='flex flex-col md:flex-row items-center gap-8'>
					{/* Avatar Section */}
					<div className=''>
						<div className=' rounded-full overflow-hidden shadow-xl border-4 border-white'>
							<Image
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&s'
								alt='User avatar'
								width={60}
								height={30}
							/>
						</div>
						<div className='absolute bottom-2 right-2 group max-md:hidden'>
							<Button className='rounded-full' variant={'outline'}>
								<Camera className='w-4 h-4 text-gray-600' />
							</Button>
							<div className='absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
								Coming soon..
								<div className='absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-black'></div>
							</div>
						</div>
					</div>

					{/* User Info */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='text-xl font-bold text-gray-800'>{user?.role}</h2>
						<div className='flex items-center justify-center md:justify-start gap-2 text-gray-600'>
							Login Count:<span className='text-lg text-blue-700'>{data.loginCount}</span>
						</div>
					</div>
				</div>
				<div>
					Joined:{' '}
					<span className='text-blue-700'>{new Date(user?.createdAt ?? '').toDateString()}</span>
				</div>
				<form onSubmit={handleSubmit}>
					{/* Current Password Field */}
					<div className='grid grid-cols-2 grid-rows-2 max-lg:grid-cols-1 gap-5'>
						<div className='space-y-2 w-full'>
							<Label
								htmlFor='email'
								className='text-sm font-medium text-gray-700 flex items-center gap-2'
							>
								<Mail className='w-4 h-4' />
								Email
								<ReqiredStar />
							</Label>
							<Input
								id='email'
								type='text'
								name='email'
								placeholder='Enter your Email'
								className='h-12 px-4 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								required
								defaultValue={data.email}
							/>
						</div>

						{/* New Password Field */}
						<div className='space-y-2'>
							<Label
								htmlFor='UserName'
								className='text-sm font-medium text-gray-700 flex items-center gap-2'
							>
								<User className='w-4 h-4' />
								User name
								<ReqiredStar />
							</Label>
							<Input
								id='UserName'
								type='text'
								name='userName'
								placeholder='Enter your User name'
								className='h-12 px-4 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								required
								defaultValue={data.userName}
							/>
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='currentPassword'
								className='text-sm font-medium text-gray-700 flex items-center gap-2'
							>
								<Lock className='w-4 h-4' />
								Current Password
								<ReqiredStar />
							</Label>
							<Input
								id='currentPassword'
								type='text'
								name='currentPassword'
								placeholder='Enter your new password'
								className='h-12 px-4 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='newPassword'
								className='text-sm font-medium text-gray-700 flex items-center gap-2'
							>
								<Lock className='w-4 h-4' />
								New Password
								<ReqiredStar />
							</Label>
							<Input
								id='newPassword'
								type='text'
								name='newPassword'
								placeholder='Enter your new password'
								className='h-12 px-4 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								required
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className='my-4'>
						{UserEditIsPending ? (
							<Loader title='Updating password...' className='h-12 max-lg:w-full' />
						) : (
							<Button type='submit' className='h-12 max-lg:w-full'>
								Update Password
							</Button>
						)}
					</div>
				</form>
			</div>
		</Section>
	)
}
