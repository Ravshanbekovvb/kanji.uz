'use client'
import { Loader } from '@/components/shared/loader/loader'
import { Button } from '@/components/ui/button'
import { logoFont } from '@/fonts/font'
// import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react' // ikonalar uchun
import Image from 'next/image'
import { FormEvent, useState } from 'react'
// import { toast, Toaster } from 'sonner'
interface Data {
	email: FormDataEntryValue | null
	password: FormDataEntryValue | null
}

function Page() {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className='relative w-full min-h-screen flex items-center justify-center'>
			{/* <Toaster position='top-center' richColors /> */}
			{/* Background Image */}

			<Image
				src={'/backgroundImage.webp'}
				alt='Background Image'
				layout='fill'
				objectFit='cover'
				className='absolute top-0 left-0 w-full h-full pointer-events-none'
			/>

			{/* Login Form */}
			<form
				// onSubmit={e => handleSubmit(e)}
				className='relative w-[420px] m-[30px] bg-white/20 bg-opacity-70 backdrop-blur-lg p-6 rounded-lg shadow-lg'
			>
				<div
					className={`my-3 flex justify-start items-center text-2xl font-bold uppercase tracking-widest select-none ${logoFont.className}`}
				>
					tsukurou!
				</div>
				<h2 className='text-xl font-semibold'>Login</h2>
				<input
					autoComplete='off'
					type='email'
					placeholder='Email'
					name='email'
					className='w-full p-2 border rounded-md mt-4'
				/>
				<div className='relative'>
					<input
						autoComplete='off'
						name='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						className='w-full p-2 border rounded-md mt-4 pr-10'
					/>
					<div
						className='absolute top-1/2 mt-2 right-3 transform -translate-y-1/2 cursor-pointer'
						onClick={() => setShowPassword(prev => !prev)}
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</div>
				</div>
				<div className='text-sm underline mt-2 cursor-no-drop hover:text-blue-700 inline-flex  text-right'>
					Forgot password
				</div>
				<Button
					type='submit'
					className='w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md mt-4'
				>
					Login
				</Button>
			</form>
		</div>
	)
}

export default Page
