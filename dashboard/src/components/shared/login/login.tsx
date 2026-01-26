'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { logoFont } from '@/fonts/font'
import { Play } from 'lucide-react'
import { useState } from 'react'
import { Signin } from './signin'
import { Signup } from './signup'
export const Login: React.FC = () => {
	const [isVideoOpen, setIsVideoOpen] = useState(false)

	return (
		<div className='relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden'>
			{/* Video Tutorial Button - Fixed Position */}
			<Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						title='Watch tutorial video about KANJI.UZ platform'
						className='fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-lg border-white/20 shadow-md hover:bg-white transition-all duration-200 group flex items-center gap-2 px-3 py-2 cursor-pointer'
					>
						<Play className='h-4 w-4 text-blue-600 group-hover:text-blue-700' />
						<span className='text-sm font-medium text-blue-600 group-hover:text-blue-700 hidden sm:inline'>
							Tutorial
						</span>
					</Button>
				</DialogTrigger>
				<DialogContent className='max-w-2xl w-full p-0 bg-black border-0'>
					<DialogTitle></DialogTitle>
					<div className='relative aspect-video w-full'>
						{isVideoOpen ? (
							<video
								src='/tutorial.mp4'
								className='w-full h-full rounded-lg p-0'
								controls
								autoPlay
								preload='metadata'
								poster='/working-men-on-laptop.png' // Video yuklanmagan vaqtda ko'rsatiladigan rasm
								onError={e => console.error('Video yuklanishda xatolik:', e)}
							>
								<source src='/tutorial.mp4' type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						) : (
							<div className='w-full h-full bg-gray-900 rounded-lg flex items-center justify-center'>
								<div className='text-center text-white'>
									<Play className='h-16 w-16 mx-auto mb-4 text-blue-400' />
									<h3 className='text-xl font-semibold mb-2'>Welcome to kanji.uz!</h3>
									<p className='text-gray-300 max-w-md px-4'>
										Watch this tutorial to learn how to master Japanese vocabulary with our platform
									</p>
								</div>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
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
							<div className={` ${logoFont.className} uppercase`}>kanji.uz</div>
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
