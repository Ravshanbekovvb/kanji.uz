import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateSignupRequest } from '@/hooks/useSignupRequests'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'
import { SignupSuccessModal } from '../successModal'
export const Signup: React.FC = () => {
	const { mutate: createSignupRequest, isPending } = useCreateSignupRequest()
	const [IsEmail, setEmail] = useState<string>('')
	const [showModal, setShowModal] = useState(false)
	const handleCreateSignupRequest = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const email = formData.get('email') as string
		const name = formData.get('name') as string
		const note = formData.get('note') as string
		if (!email || !note || !name) {
			toast.error('Please fill in all fields')
			return
		}
		try {
			createSignupRequest(
				{ email, name, note },
				{
					onSuccess: () => {
						toast.success('Sign up Request was created successfully!')
						form.reset()
						setShowModal(true)
					},
				}
			)
		} catch (err) {
			toast.error('An unexpected error occurred')
		}
	}
	return (
		<form onSubmit={handleCreateSignupRequest} className='mt-4 sm:mt-6 space-y-3 sm:space-y-4'>
			{showModal && <SignupSuccessModal onClose={() => setShowModal(false)} email={IsEmail} />}
			<div className='space-y-1 sm:space-y-2'>
				<label className='text-xs sm:text-sm font-medium text-gray-700'>Email</label>
				<Input
					onChange={e => setEmail(e.currentTarget.value)}
					required
					autoComplete='off'
					type='email'
					placeholder='john@gmail.com'
					name='email'
					className='w-full p-3 border-2 border-gray-200 sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
				/>
			</div>

			<div className='space-y-1 sm:space-y-2'>
				<label className='text-xs sm:text-sm font-medium text-gray-700'>Full Name</label>
				<Input
					required
					autoComplete='off'
					type='text'
					placeholder='John Doe'
					name='name'
					className='w-full p-3 border-2 border-gray-200 sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
				/>
			</div>

			<div className='space-y-1 sm:space-y-2'>
				<label className='text-xs sm:text-sm font-medium text-gray-700'>
					Why do you want to join?
				</label>
				<Input
					required
					autoComplete='off'
					type='text'
					placeholder='I want to use Tsukurou to memorize words.'
					name='note'
					className='w-full p-3 border-2 border-gray-200 sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
				/>
			</div>

			<div className='bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 sm:mt-4'>
				<p className='text-xs sm:text-sm text-blue-800'>
					📧 Your request will be reviewed by our admin team. You'll receive your login credentials
					within 24 hours.
				</p>
			</div>

			<div className='pt-2 sm:pt-2'>
				{isPending ? (
					<Loader className='w-full' title='Submitting request...' />
				) : (
					<Button
						type='submit'
						className='w-full bg-gradient-to-r from-sky-600 border-t-violet-600 hover:from-sky-700 hover:to-blue-700 duration-100 transition'
					>
						Request Access
					</Button>
				)}
			</div>
		</form>
	)
}
