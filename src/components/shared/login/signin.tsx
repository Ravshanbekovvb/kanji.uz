import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'
export const Signin: React.FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const { login, isLoading } = useAuth()
	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			toast.error('Please fill in all fields')
			return
		}

		try {
			const result = await login(email, password)

			if (result.success) {
				toast.success('Login successful!')
				router.push('/')
			} else {
				toast.error(result.error || 'Login failed')
			}
		} catch (error) {
			console.error('Login error:', error)
			toast.error('An unexpected error occurred')
		}
	}

	return (
		<form onSubmit={e => handleSubmit(e)} className='mt-4 sm:mt-6 space-y-3 sm:space-y-4'>
			<div className='space-y-1 sm:space-y-2'>
				<label className='text-xs sm:text-sm font-medium text-gray-700'>Email</label>
				<Input
					autoComplete='off'
					type='email'
					placeholder='john@gmail.com'
					name='email'
					className='w-full p-3 border-2 border-gray-200 sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
				/>
			</div>

			<div className='space-y-1 sm:space-y-2'>
				<label className='text-xs sm:text-sm font-medium text-gray-700'>Password</label>
				<div className='relative'>
					<Input
						autoComplete='off'
						name='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='•••••••'
						className='w-full p-3 border-2 border-gray-200 sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 pr-12 text-sm sm:text-base'
					/>
					<button
						type='button'
						className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200'
						onClick={() => setShowPassword(prev => !prev)}
					>
						{showPassword ? (
							<EyeOff size={18} className='sm:w-5 sm:h-5' />
						) : (
							<Eye size={18} className='sm:w-5 sm:h-5' />
						)}
					</button>
				</div>
			</div>

			<div className='pt-2 sm:pt-2'>
				{isLoading ? (
					<Loader className='w-full' title='Signing in...' />
				) : (
					<Button type='submit' className='w-full '>
						Sign In
					</Button>
				)}
			</div>
		</form>
	)
}
