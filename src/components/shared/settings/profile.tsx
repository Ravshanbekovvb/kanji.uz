'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { useEditUser, useFindUserById } from '@/hooks/useUsers'
import { UserRole } from '@/lib'
import { LoaderIcon } from 'lucide-react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'

export const Profile: React.FC = () => {
	const { user, checkAuth } = useAuth()
	const { isPending: UserEditIsPending, mutate: editUser } = useEditUser(user?.id as string)
	const { data, error, isPending } = useFindUserById(user?.id as string)
	if (isPending) return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	if (error) return <div>Error loading user</div>
	if (!data) return <div>data not found</div>
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		editUser(
			{
				email: email,
				password: password,
				userName: name,
				role: user?.role as UserRole,
				userLang: null,
			},
			{
				onSuccess: () => {
					toast.success('Edited successfully!')
					// Refresh the auth context to update the header
					checkAuth()
				},
				onError: (error: Error) => {
					toast.error(error?.message)
				},
			}
		)
	}
	return (
		<div>
			<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<div>
					<div>Email</div>
					<Input type='text' name='email' defaultValue={data.email} />
				</div>
				<div>
					<div>Name</div>
					<Input type='text' name='name' defaultValue={data.userName} />
				</div>
				<div>
					<div>New Password *</div>
					<Input type='text' name='password' required />
				</div>

				{UserEditIsPending ? <Loader title='Editing...' /> : <Button type='submit'>SAVE</Button>}
			</form>
		</div>
	)
}
