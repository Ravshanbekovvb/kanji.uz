'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import {
	BookOpen,
	CheckCircle,
	HelpCircle,
	Loader2,
	Mail,
	MessageSquare,
	Phone,
	Send,
	Settings,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
	const { user } = useAuth()
	const [formData, setFormData] = useState({
		name: user?.userName,
		phone: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.message.trim()) {
			toast.error('Please fill in your message')
			return
		}

		setIsSubmitting(true)

		try {
			const response = await fetch('/api/help/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const result = await response.json()

			if (result.success) {
				toast.success('Your message has been sent successfully!')
				setFormData({ name: '', phone: '', message: '' })
			} else {
				toast.error(result.error || 'Failed to send message')
			}
		} catch (error) {
			toast.error('Network error. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const faqItems = [
		{
			question: 'How do I start memorizing words?',
			answer:
				"Go to the 'Memorize' section, select a lesson, and use the keyboard shortcuts (Space, Enter, Ctrl) to interact with the flashcards.",
		},
		{
			question: 'How can I create my own lesson?',
			answer:
				"Navigate to 'Create Lesson' where you can add words, translations, and organize them into custom lessons.",
		},
		{
			question: 'What are the keyboard shortcuts?',
			answer:
				'Space - Show word details, Enter - Mark as memorized, Ctrl - Move to next word without memorizing.',
		},
		{
			question: 'How do I track my progress?',
			answer:
				"Visit the 'My Lessons' section to see your learning statistics and completed lessons.",
		},
	]

	const contactMethods = [
		{
			icon: MessageSquare,
			title: 'Live Chat',
			description: 'Get instant help through our support chat',
			action: 'Chat Now',
		},
		{
			icon: Mail,
			title: 'Email Support',
			description: 'Send us detailed questions via email',
			action: 'support@wordspdf.com',
		},
		{
			icon: Phone,
			title: 'Phone Support',
			description: 'Talk to our support team directly',
			action: '+1 (555) 123-4567',
		},
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header Section */}
				<div className='text-center mb-12'>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6'>
						<HelpCircle className='h-10 w-10 text-white' />
					</div>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Help & Support</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						We're here to help you make the most of your vocabulary learning journey
					</p>
				</div>

				{/* Quick Links */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
					<Card className='p-6 hover:shadow-lg transition-shadow cursor-pointer'>
						<BookOpen className='h-8 w-8 text-blue-600 mb-4' />
						<h3 className='text-lg font-semibold mb-2'>Getting Started</h3>
						<p className='text-gray-600'>Learn the basics of using our platform</p>
					</Card>
					<Card className='p-6 hover:shadow-lg transition-shadow cursor-pointer'>
						<Users className='h-8 w-8 text-green-600 mb-4' />
						<h3 className='text-lg font-semibold mb-2'>Community</h3>
						<p className='text-gray-600'>Connect with other learners</p>
					</Card>
					<Card className='p-6 hover:shadow-lg transition-shadow cursor-pointer'>
						<Settings className='h-8 w-8 text-purple-600 mb-4' />
						<h3 className='text-lg font-semibold mb-2'>Account Settings</h3>
						<p className='text-gray-600'>Manage your preferences</p>
					</Card>
				</div>

				{/* Contact Form */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<Card className='p-8'>
						<h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
							<MessageSquare className='h-6 w-6 text-blue-600' />
							Send us a Message
						</h2>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
									Phone Number
								</label>
								<Input
									type='tel'
									id='phone'
									name='phone'
									value={formData.phone}
									onChange={handleInputChange}
									placeholder='+1 (555) 123-4567'
								/>
							</div>
							<div>
								<label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
									Message *
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									rows={4}
									className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
									placeholder='How can we help you?'
									required
								/>
							</div>
							<Button type='submit' className='w-full' disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className='h-4 w-4 animate-spin mr-2' />
										Sending...
									</>
								) : (
									<>
										<Send className='h-4 w-4 mr-2' />
										Send Message
									</>
								)}
							</Button>
						</form>
					</Card>

					{/* Contact Methods */}
					<div className='space-y-6'>
						<h2 className='text-2xl font-bold text-gray-900'>Other Ways to Reach Us</h2>
						{contactMethods.map((method, index) => (
							<Card key={index} className='p-6'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-blue-100 rounded-full'>
										<method.icon className='h-6 w-6 text-blue-600' />
									</div>
									<div className='flex-1'>
										<h3 className='font-semibold text-gray-900 mb-1'>{method.title}</h3>
										<p className='text-gray-600 mb-2'>{method.description}</p>
										<p className='text-blue-600 font-medium'>{method.action}</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>

				{/* FAQ Section */}
				<Card className='p-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>Frequently Asked Questions</h2>
					<div className='space-y-6'>
						{faqItems.map((item, index) => (
							<div key={index} className='border-b border-gray-200 pb-6 last:border-b-0'>
								<h3 className='text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2'>
									<CheckCircle className='h-5 w-5 text-green-600' />
									{item.question}
								</h3>
								<p className='text-gray-600 ml-7'>{item.answer}</p>
							</div>
						))}
					</div>
				</Card>

				{/* Status Banner */}
				<Card className='p-6 bg-green-50 border-green-200'>
					<div className='flex items-center gap-3'>
						<CheckCircle className='h-6 w-6 text-green-600' />
						<div>
							<h3 className='font-semibold text-green-900'>All Systems Operational</h3>
							<p className='text-green-700'>
								Our platform is running smoothly with no known issues.
							</p>
						</div>
					</div>
				</Card>

				{/* Footer */}
				<div className='text-center text-gray-500 text-sm py-8'>
					<p>© 2025 Vocabulary Learning Platform. Made with ❤️ for educators and learners.</p>
				</div>
			</div>
		</div>
	)
}
