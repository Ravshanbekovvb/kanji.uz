'use client'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { Award, BookOpen, FileText, Plus, TrendingUp, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
export default function Page() {
	const t = useTranslations('homePage')
	const { user } = useAuth()

	return (
		<Section className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 h-full relative'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-40 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000'></div>
				<div className='absolute top-40 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000'></div>
			</div>
			{/* Hero Section */}
			<div className='relative flex items-center jusstify-center '>
				<div className='w-full grid lg:grid-cols-2 gap-8 lg:gap-8 items-center'>
					{/* Left Content */}
					<div className='text-center lg:text-left space-y-4 md:space-y-6 order-1 lg:order-1'>
						<div className='space-y-2 md:space-y-3'>
							<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
								{t.rich('title', {
									gradient: chunks => (
										<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
											{chunks}
										</span>
									),
								})}
							</h1>
							<p className='text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0'>
								{t('description')}
							</p>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start'>
							<Link href='/create-lesson'>
								<Button
									size='lg'
									className='w-full sm:w-auto px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
								>
									<Plus className='mr-2' size={18} />
									{t('startCreating')}
								</Button>
							</Link>
							<Link href='/my-lessons'>
								<Button
									size='lg'
									variant='outline'
									className='w-full sm:w-auto border-2 border-gray-300 hover:border-blue-500 px-6 py-3 rounded-xl font-semibold transition-all duration-300'
								>
									<BookOpen className='mr-2' size={18} />
									{t('myLessons')}
								</Button>
							</Link>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6'>
							<div className='text-center'>
								<div className='text-xl md:text-2xl font-bold text-blue-600'>1000+</div>
								<div className='text-xs text-gray-500 font-medium'>{t('wordLearned')}</div>
							</div>
							<div className='text-center'>
								<div className='text-xl md:text-2xl font-bold text-purple-600'>50+</div>
								<div className='text-xs text-gray-500 font-medium'>{t('lessonsCreated')}</div>
							</div>
							<div className='text-center'>
								<div className='text-xl md:text-2xl font-bold text-pink-600'>24/7</div>
								<div className='text-xs text-gray-500 font-medium'> {t('aiSupport')}</div>
							</div>
						</div>
					</div>

					{/* Right Content - Features Grid */}
					<div className='grid grid-cols-2 gap-3 md:gap-4 order-2 lg:order-2'>
						{/* Feature Card 1 */}
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2 md:mb-3'>
								<Zap className='text-blue-600' size={16} />
							</div>
							<h3 className='font-semibold text-gray-900 mb-1 md:mb-2 text-xs md:text-sm'>
								{t('aiTranslation')}
							</h3>
							<p className='text-[10px] md:text-xs text-gray-600'>
								{t('aiTranslationDescription')}
							</p>
						</div>

						{/* Feature Card 2 */}
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2 md:mb-3'>
								<FileText className='text-purple-600' size={16} />
							</div>
							<h3 className='font-semibold text-gray-900 mb-1 md:mb-2 text-xs md:text-sm'>
								{t('pdfExport')}
							</h3>
							<p className='text-[10px] md:text-xs text-gray-600'>{t('pdfExportDescription')}</p>
						</div>

						{/* Feature Card 3 */}
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-xl flex items-center justify-center mb-2 md:mb-3'>
								<TrendingUp className='text-green-600' size={16} />
							</div>
							<h3 className='font-semibold text-gray-900 mb-1 md:mb-2 text-xs md:text-sm'>
								{t('progressTrack')}
							</h3>
							<p className='text-[10px] md:text-xs text-gray-600'>
								{t('progressTrackDescription')}
							</p>
						</div>

						{/* Feature Card 4 */}
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
							<div className='w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2 md:mb-3'>
								<Award className='text-orange-600' size={16} />
							</div>
							<h3 className='font-semibold text-gray-900 mb-1 md:mb-2 text-xs md:text-sm'>
								{t('jlptReady')}
							</h3>
							<p className='text-[10px] md:text-xs text-gray-600'>{t('jlptReadyDescription')}</p>
						</div>
					</div>
				</div>

				{/* Welcome Message for Logged Users - Desktop Only */}
			</div>
			{user && (
				<div className='hidden lg:block absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center'>
							<span className='text-white font-semibold text-sm'>
								{user.userName?.charAt(0).toUpperCase()}
							</span>
						</div>
						<div>
							<p className='font-medium text-gray-900'>{t('welcomeBack')}</p>
							<p className='text-sm text-gray-600'>{user.userName}</p>
						</div>
					</div>
				</div>
			)}
		</Section>
	)
}
