'use client'
import { Loader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { logoFont } from '@/fonts/font'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
interface Data {
	email: FormDataEntryValue | null
	password: FormDataEntryValue | null
}

function Page() {
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
		<div className='relative w-full min-h-screen flex items-center justify-center'>
			<Image
				src={'/backgroundImage.webp'}
				alt='Background Image'
				fill
				className='absolute top-0 left-0 w-full h-full pointer-events-none bg-cover'
			/>

			{/* Login Form */}
			<form
				onSubmit={e => handleSubmit(e)}
				className='relative w-[420px] m-[30px] bg-white/20 bg-opacity-70 backdrop-blur-lg p-6 rounded-lg shadow-lg'
			>
				<div
					className={`my-3 flex justify-start items-center text-2xl font-bold uppercase tracking-widest select-none ${logoFont.className}`}
				>
					tsukurou!
				</div>
				<h2 className='text-xl font-semibold'>Login</h2>
				<Input
					autoComplete='off'
					type='email'
					placeholder='Email'
					name='email'
					className='w-full p-2 border rounded-md mt-4'
				/>
				<div className='relative mb-4'>
					<Input
						autoComplete='off'
						name='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						className='w-full p-2 border rounded-md mt-4 pr-10'
					/>
					<div
						className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
						onClick={() => setShowPassword(prev => !prev)}
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</div>
				</div>
				{isLoading ? (
					<Loader className='w-full p-2 rounded-md' />
				) : (
					<Button
						type='submit'
						className='w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md'
					>
						Login
					</Button>
				)}
			</form>
		</div>
	)
}

export default Page
