'use client'
import { Loader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/auth-context'
import { logoFont } from '@/fonts/font'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
interface Data {
	email: FormDataEntryValue | null
	password: FormDataEntryValue | null
}

export default function Page() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const { login, isLoading, user, isAuthenticated } = useAuth()
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
		<div className='relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden'>
			{/* Background decorative elements */}
			<div className='absolute inset-0 w-full h-full'>
				<div className='absolute top-10 left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
				<div className='absolute top-0 right-4 w-32 h-32 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
				<div className='absolute -bottom-8 left-20 w-32 h-32 md:w-72 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
			</div>

			<div className='relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-0'>
				{/* left content */}
				<div className='flex-1 flex flex-col items-center lg:items-start max-w-lg mb-8 lg:mb-0 max-lg:hidden'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight'>
							Welcome to
							<span
								className={`block motion-preset-pulse-sm  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ${logoFont.className} `}
							>
								Tsukurou!
							</span>
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4 lg:px-0'>
							Master new languages with our intelligent vocabulary learning platform
						</p>
					</div>
				</div>

				{/* right content */}
				<div className='flex-1 flex justify-center lg:justify-end w-full lg:w-auto'>
					<form
						onSubmit={e => handleSubmit(e)}
						className='w-full max-w-sm sm:max-w-md bg-white/90 sm:bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-[inset_0px_0px_20px_rgba(0,0,0,0.3)] border border-white/20'
					>
						<Tabs defaultValue='login' className='w-full'>
							<TabsList className='grid w-full grid-cols-2 bg-gray-100 rounded-lg sm:rounded-xl p-1 h-10 sm:h-auto'>
								<TabsTrigger
									value='login'
									className='rounded-md sm:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm py-2'
								>
									Sign in
								</TabsTrigger>
								<TabsTrigger
									value='register'
									className='rounded-md sm:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm py-2'
								>
									Sign up
								</TabsTrigger>
							</TabsList>

							{/* login */}
							<TabsContent value='login' className='mt-4 sm:mt-6 space-y-3 sm:space-y-4'>
								<div className='space-y-1 sm:space-y-2'>
									<label className='text-xs sm:text-sm font-medium text-gray-700'>Email</label>
									<Input
										autoComplete='off'
										type='email'
										placeholder='john@gmail.com'
										name='email'
										className='w-full p-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
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
											className='w-full p-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 pr-12 text-sm sm:text-base'
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
							</TabsContent>

							{/* register */}
							<TabsContent value='register' className='mt-4 sm:mt-6 space-y-3 sm:space-y-4'>
								<div className='space-y-1 sm:space-y-2'>
									<label className='text-xs sm:text-sm font-medium text-gray-700'>Email</label>
									<Input
										required
										autoComplete='off'
										type='email'
										placeholder='john@gmail.com'
										name='email'
										className='w-full p-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
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
										className='w-full p-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
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
										className='w-full p-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm sm:text-base'
									/>
								</div>

								<div className='bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-3 sm:mt-4'>
									<p className='text-xs sm:text-sm text-blue-800'>
										📧 Your request will be reviewed by our admin team. You'll receive your login
										credentials within 24 hours.
									</p>
								</div>

								<div className='pt-2 sm:pt-2'>
									{isLoading ? (
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
							</TabsContent>
						</Tabs>
					</form>
				</div>
			</div>
		</div>
	)
}
