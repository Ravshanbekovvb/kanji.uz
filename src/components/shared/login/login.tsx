'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { logoFont } from '@/fonts/font'
import { Signin } from './signin'
import { Signup } from './signup'
export const Login: React.FC = () => {
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
				<div className='flex-1 flex flex-col items-center lg:items-start max-w-lg mb-8 lg:mb-0'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight'>
							Welcome to
							<span
								className={`block motion-preset-pulse-sm  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ${logoFont.className} `}
							>
								Tsukurou!
							</span>
						</h1>
						<p className='text-base max-lg:hidden sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4 lg:px-0'>
							Master new languages with our intelligent vocabulary learning platform
						</p>
					</div>
				</div>

				{/* right content */}
				<div className='flex-1 flex justify-center lg:justify-end w-full lg:w-auto'>
					<div className='w-full max-w-sm sm:max-w-md bg-white/90 sm:bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-[inset_0px_0px_20px_rgba(0,0,0,0.3)] border border-white/20'>
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

							<TabsContent value='login'>
								<Signin />
							</TabsContent>

							<TabsContent value='register'>
								<Signup />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	)
}
