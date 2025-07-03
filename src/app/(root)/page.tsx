import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, FileText, Globe, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
			{/* Hero Section */}
			<div className='container mx-auto px-4 py-16'>
				<div className='text-center mb-16'>
					<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6'>
						<BookOpen className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
						Welcome to{' '}
						<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
							Words PDF
						</span>
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
						Your ultimate vocabulary learning companion. Create, manage, and export your word
						collections to PDF with ease. Build your language skills one word at a time.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link href='/all-docs'>
							<Button size='lg' className='group'>
								Get Started
								<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
						<Link href='/users'>
							<Button variant='outline' size='lg'>
								Manage Users
							</Button>
						</Link>
					</div>
				</div>

				{/* Features Grid */}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700'>
						<div className='w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4'>
							<FileText className='w-6 h-6 text-blue-600 dark:text-blue-400' />
						</div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>PDF Export</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							Generate beautiful PDF documents from your word collections for offline study and
							sharing.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700'>
						<div className='w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4'>
							<Users className='w-6 h-6 text-purple-600 dark:text-purple-400' />
						</div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							User Management
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							Organize learners and track progress with comprehensive user management features.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700'>
						<div className='w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4'>
							<Globe className='w-6 h-6 text-green-600 dark:text-green-400' />
						</div>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							Multi-language Support
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							Support for multiple languages including Uzbek, Russian, Japanese, and English.
						</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white'>
					<div className='text-center mb-8'>
						<h2 className='text-3xl font-bold mb-2'>Start Your Learning Journey</h2>
						<p className='text-blue-100'>Join thousands of learners improving their vocabulary</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
						<div>
							<div className='text-4xl font-bold mb-2'>∞</div>
							<div className='text-blue-100'>Words to Learn</div>
						</div>
						<div>
							<div className='text-4xl font-bold mb-2'>4+</div>
							<div className='text-blue-100'>Languages Supported</div>
						</div>
						<div>
							<div className='text-4xl font-bold mb-2'>PDF</div>
							<div className='text-blue-100'>Export Ready</div>
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className='text-center mt-16'>
					<div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4'>
						<Sparkles className='w-6 h-6 text-yellow-600 dark:text-yellow-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
						Ready to enhance your vocabulary?
					</h2>
					<p className='text-gray-600 dark:text-gray-300 mb-6'>
						Create your first lesson and start building your word collection today.
					</p>
					<Link href='/all-docs'>
						<Button size='lg' className='group'>
							Create Your First Lesson
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
