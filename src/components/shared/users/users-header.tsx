'use client'
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
import { FormEvent, useState } from 'react'
import { Loader } from '../loader'
export const UsersHeader: React.FC = () => {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const createUserFn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsloading(true)
		setTimeout(() => {
			setIsloading(false)
		}, 2000)
		try {
		} catch (error) {}
	}
	return (
		<div className='flex justify-between'>
			<h2 className='mb-4 text-4xl font-semibold'>Users</h2>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='cursor-pointer'>Create User</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='text-2xl'>Create New User</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>

					{/* FORM */}
					<form onSubmit={createUserFn}>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Name</label>
								<Input placeholder='Enter name' />
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Email</label>
								<Input placeholder='Enter email' type='email' />
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Password</label>
								<Input placeholder='Enter password' type='password' />
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Repeat Password</label>
								<Input placeholder='Repeat password' type='password' />
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Gender</label>
								<Select>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select gender' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='female'>Female</SelectItem>
										<SelectItem value='male'>Male</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-1'>
								<label className='text-sm font-medium'>Role</label>
								<Select>
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

						<div className='flex justify-start pt-4'>
							{isLoading ? <Loader variant='default' /> : <Button type='submit'>Create</Button>}
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
