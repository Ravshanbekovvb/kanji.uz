'use client'

import { Section } from '@/components/ui/section'
import { ArrowRight, Download, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function KasbnomePage() {
	return (
		<Section className='bg-gradient-to-br from-blue-50 max-h-[180vh] via-white to-purple-50 h-full relative'>
			{/* Background decorations */}
			<div className='absolute inset-0 h-full overflow-hidden'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
				<div className='absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000'></div>
				<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000'></div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 items-center w-full relative z-10'>
				{/* Left Side - Content */}
				<div className='text-center lg:text-left space-y-4'>
					{/* Badge */}
					<div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full border border-blue-200'>
						<Sparkles className='w-4 h-4 text-blue-600' />
						<span className='text-sm font-medium text-blue-800'>Yangi loyiha!</span>
					</div>

					{/* Main heading */}
					<div className='space-y-4'>
						<h1 className='text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight'>
							Kasbnoma.uz
						</h1>
						<p className='text-xl lg:text-2xl text-gray-700 font-medium'>
							Professional CV yarating
						</p>
						<p className='text-gray-600 text-lg max-w-md mx-auto lg:mx-0'>
							Bir necha daqiqada o'zingizning professional CV'ingizni yarating va yuklab oling
						</p>
					</div>

					{/* Payment methods */}
					<div className='space-y-3'>
						<p className='text-sm text-gray-500 font-medium'>To'lov usullari:</p>
						<div className='flex items-center justify-center lg:justify-start gap-4'>
							<div className='bg-white p-2 rounded-lg shadow-sm border'>
								<Image
									src='/bank-logos/click-logo.png'
									alt='Click'
									width={40}
									height={40}
									className='object-contain'
								/>
							</div>
							<div className='bg-white p-2 rounded-lg shadow-sm border'>
								<Image
									src='/bank-logos/payme-logo.png'
									alt='Payme'
									width={40}
									height={40}
									className='object-contain'
								/>
							</div>
							<div className='bg-white p-2 rounded-lg shadow-sm border'>
								<Image
									src='/bank-logos/uzum-logo.png'
									alt='Uzum Bank'
									width={40}
									height={40}
									className='object-contain'
								/>
							</div>
						</div>
					</div>

					{/* CTA Button */}
					<div className='pt-2'>
						<Link
							href='https://kasbnoma.uz'
							target='_blank'
							className='inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
						>
							<span className='text-lg'>Boshlaymiz</span>
							<ArrowRight className='w-5 h-5' />
						</Link>
					</div>

					{/* Stats */}
					<div className='flex items-center justify-center lg:justify-start gap-6 pt-2'>
						<div className='flex items-center gap-1'>
							<Star className='w-4 h-4 text-yellow-500 fill-current' />
							<span className='text-sm text-gray-600'>4.9 reyting</span>
						</div>
						<div className='flex items-center gap-1'>
							<Download className='w-4 h-4 text-green-500' />
							<span className='text-sm text-gray-600'>112+ yuklab olindi</span>
						</div>
					</div>
					<p className='text-gray-400 text-sm'>
						<a href='https://ravshanbekov.uz' className='underline text-blue-400'>
							Ravshanbekov
						</a>
						dan yangi loyiha
					</p>
				</div>

				{/* Right Side - Template Preview */}
				<div className='relative lg:pr-20 max-lg:mt-10'>
					{/* Template showcase */}
					<div className='relative flex items-center justify-center'>
						{/* Main template (center) */}
						<div className='relative z-30 transform hover:scale-105 transition-transform duration-300'>
							<div className='bg-white p-4 rounded-xl shadow-2xl border-2 border-gray-100'>
								<Image
									src='/kasbnoma-template-images/template-classic.png'
									alt='Classic Template'
									width={250}
									height={330}
									className='rounded-lg object-cover'
								/>
								<div className='mt-3 text-center'>
									<p className='font-semibold text-gray-800'>Classic</p>
								</div>
							</div>
						</div>

						{/* Side templates */}
						<div className='absolute left-0 top-8 z-20 transform -rotate-12 hover:rotate-0 transition-transform duration-300'>
							<div className='bg-white p-3 rounded-xl shadow-xl border border-gray-100 opacity-80 hover:opacity-100'>
								<Image
									src='/kasbnoma-template-images/template-creative.png'
									alt='Creative Template'
									width={200}
									height={260}
									className='rounded-lg object-cover'
								/>
								<div className='mt-2 text-center'>
									<p className='text-sm font-semibold text-gray-800'>Creative</p>
									<p className='text-xs text-blue-600'>Premium</p>
								</div>
							</div>
						</div>

						<div className='absolute right-0 top-8 z-20 transform rotate-12 hover:rotate-0 transition-transform duration-300'>
							<div className='bg-white p-3 rounded-xl shadow-xl border border-gray-100 opacity-80 hover:opacity-100'>
								<Image
									src='/kasbnoma-template-images/template-minimalism.png'
									alt='Minimalism Template'
									width={200}
									height={260}
									className='rounded-lg object-cover'
								/>
								<div className='mt-2 text-center'>
									<p className='text-sm font-semibold text-gray-800'>Minimal</p>
									<p className='text-xs text-purple-600'>Premium</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}
