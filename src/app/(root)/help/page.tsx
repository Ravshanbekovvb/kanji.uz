import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Bell,
	BookOpen,
	FileText,
	HelpCircle,
	LogOut,
	MessageCircle,
	Settings,
	Target,
	Users,
	Zap,
} from 'lucide-react'

export default function Page() {
	const features = [
		{
			icon: <FileText className='h-6 w-6 text-blue-600' />,
			title: 'Create PDF',
			description:
				'Enter words or materials and download them in PDF format for easy printing and studying.',
		},
		{
			icon: <BookOpen className='h-6 w-6 text-green-600' />,
			title: 'My Docs',
			description:
				'View, manage and download all your prepared PDF files in one convenient location.',
		},
		{
			icon: <Bell className='h-6 w-6 text-orange-600' />,
			title: 'Notifications',
			description: 'Stay updated with notifications about new features and important site updates.',
		},
		{
			icon: <Settings className='h-6 w-6 text-purple-600' />,
			title: 'Settings',
			description: 'Customize your personal preferences and account settings to suit your needs.',
		},
		{
			icon: <LogOut className='h-6 w-6 text-red-600' />,
			title: 'Secure Logout',
			description: 'Safely log out from your account to protect your personal information.',
		},
	]

	const benefits = [
		{
			icon: <Target className='h-8 w-8 text-blue-500' />,
			title: 'Focused Learning',
			description: 'Designed specifically for vocabulary memorization and language learning',
		},
		{
			icon: <Users className='h-8 w-8 text-green-500' />,
			title: 'For Everyone',
			description: 'Perfect for both teachers and students of all levels',
		},
		{
			icon: <Zap className='h-8 w-8 text-yellow-500' />,
			title: 'Quick & Easy',
			description: 'Create and download flashcards in just a few clicks',
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header Section */}
				<div className='text-center space-y-4'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
						<HelpCircle className='h-8 w-8 text-white' />
					</div>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Help & Support</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
						Welcome to your vocabulary learning companion! This platform is designed to help
						teachers and students create, manage, and use flashcards for effective vocabulary
						memorization.
					</p>
				</div>

				{/* Benefits Section */}
				<div className='grid md:grid-cols-3 gap-6 my-12'>
					{benefits.map((benefit, index) => (
						<Card
							key={index}
							className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'
						>
							<CardContent className='p-6 text-center'>
								<div className='flex justify-center mb-4'>{benefit.icon}</div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>{benefit.title}</h3>
								<p className='text-gray-600 text-sm'>{benefit.description}</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Features Section */}
				<Card className='border-0 shadow-xl bg-white'>
					<CardHeader className='text-center pb-8'>
						<CardTitle className='text-3xl font-bold text-gray-900 mb-2'>
							Platform Features
						</CardTitle>
						<CardDescription className='text-lg text-gray-600'>
							Discover all the tools available to enhance your learning experience
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{features.map((feature, index) => (
								<div
									key={index}
									className='flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'
								>
									<div className='flex-shrink-0 mt-1'>{feature.icon}</div>
									<div>
										<h3 className='font-semibold text-gray-900 mb-1'>{feature.title}</h3>
										<p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* How It Works Section */}
				<Card className='border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
					<CardHeader className='text-center'>
						<CardTitle className='text-3xl font-bold mb-2'>How It Works</CardTitle>
						<CardDescription className='text-blue-100 text-lg'>
							Simple steps to get started with your vocabulary learning journey
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid md:grid-cols-3 gap-8 mt-8'>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
									<span className='text-2xl font-bold'>1</span>
								</div>
								<h3 className='text-xl font-semibold mb-2'>Create</h3>
								<p className='text-blue-100'>Enter your vocabulary words and definitions</p>
							</div>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
									<span className='text-2xl font-bold'>2</span>
								</div>
								<h3 className='text-xl font-semibold mb-2'>Download</h3>
								<p className='text-blue-100'>Generate and download your PDF flashcards</p>
							</div>
							<div className='text-center'>
								<div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
									<span className='text-2xl font-bold'>3</span>
								</div>
								<h3 className='text-xl font-semibold mb-2'>Study</h3>
								<p className='text-blue-100'>
									Print and use your flashcards for effective learning
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contact Section */}
				<Card className='border-0 shadow-xl bg-white'>
					<CardHeader className='text-center'>
						<div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4'>
							<MessageCircle className='h-6 w-6 text-green-600' />
						</div>
						<CardTitle className='text-2xl font-bold text-gray-900 mb-2'>
							Need Additional Help?
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Our admin is here to assist you with any questions or issues you might have
						</CardDescription>
					</CardHeader>
					<CardContent className='text-center'>
						<div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6'>
							<p className='text-gray-700 mb-4'>
								Have questions, suggestions, or need technical support?
								<br />
								Connect with our admin on Telegram for quick assistance.
							</p>
							<a
								href='https://t.me/Ravshanbekovb'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-block'
							>
								<Button
									size='lg'
									className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
								>
									<MessageCircle className='h-5 w-5 mr-2' />
									Contact Admin on Telegram
								</Button>
							</a>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className='text-center text-gray-500 text-sm py-8'>
					<p>© 2025 Vocabulary Learning Platform. Made with ❤️ for educators and learners.</p>
				</div>
			</div>
		</div>
	)
}
