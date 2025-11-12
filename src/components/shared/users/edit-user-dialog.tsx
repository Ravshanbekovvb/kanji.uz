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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useEditUser } from '@/hooks/useUsers'
import { User, UserLang, UserRole } from '@/lib'
import { Edit } from 'lucide-react'
import { FormEvent, ReactNode, useState } from 'react'
import { Loader } from '../loader'

interface EditUserDialogProps {
	trigger: ReactNode
	currentData: User
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ trigger, currentData }) => {
	const { isPending, mutate: editUser } = useEditUser(currentData.id)
	const [open, setOpen] = useState(false)
	const editUserFn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const data = {
			email: String(formData.get('email')),
			userName: String(formData.get('name')),
			password: String(formData.get('password')),
			role: (String(formData.get('role')) as UserRole) ?? null,
			userLang: (String(formData.get('lang')) as UserLang) ?? null,
			loginCount: currentData.loginCount,
		}

		editUser(data, {
			onSuccess: () => {
				setOpen(false)
			},
			onError: err => {
				console.error(err)
			},
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Edit size={35} />
						Edit user
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				{/* FORM */}
				<form onSubmit={editUserFn}>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						<div className='space-y-1'>
							<label className='text-sm font-medium'>Name</label>
							<Input
								placeholder='Enter name'
								name='name'
								required
								defaultValue={currentData.userName}
							/>
						</div>
						<div className='space-y-1'>
							<label className='text-sm font-medium'>Email</label>
							<Input
								placeholder='Enter email'
								type='email'
								name='email'
								required
								defaultValue={currentData.email}
							/>
						</div>
						<div className='space-y-1'>
							<label className='text-sm font-medium'>New Password</label>
							<Input placeholder='Enter password' type='password' name='password' required />
						</div>
						<div className='space-y-1'>
							<label className='text-sm font-medium'>Language</label>
							<Select name='lang' required defaultValue={String(currentData.userLang)}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select language' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='UZ'>UZBEK</SelectItem>
									<SelectItem value='JA'>JAPANESE</SelectItem>
									<SelectItem value='EN'>ENGLISH</SelectItem>
									<SelectItem value='RU'>RUSSIAN</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-1'>
							<label className='text-sm font-medium'>Role</label>
							<Select name='role' required defaultValue={String(currentData.role)}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select role' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='ADMIN'>ADMIN</SelectItem>
									<SelectItem value='STUDENT'>STUDENT</SelectItem>
									<SelectItem value='TEACHER'>TEACHER</SelectItem>
									<SelectItem value='USER'>USER</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className=' pt-4'>
						{isPending ? (
							<Loader variant='default' title='Editing...' className='w-full' />
						) : (
							<Button type='submit' className='w-full'>
								Edit
							</Button>
						)}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
