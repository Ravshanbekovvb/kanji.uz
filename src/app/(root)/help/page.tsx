'use client'

import { ReqiredStar } from '@/components/shared/reqiredStar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { ArrowRight, Globe, HelpCircle, Loader2, Mail, MessageSquare, Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Page() {
	const { user } = useAuth()
	const [formData, setFormData] = useState({
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
				body: JSON.stringify({
					...formData,
					name: user?.userName || 'Anonymous',
				}),
			})

			const result = await response.json()

			if (result.success) {
				toast.success('Your message has been sent successfully!')
				setFormData({ phone: '', message: '' })
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
			image_url: '/telegram-icon.webp',
			title: 'Live Chat',
			description: 'Get instant help through our support chat',
			action: 'https://t.me/+WFMxQyBvsu8xOTRi',
		},
		{
			icon: Mail,
			title: 'Email Support',
			description: 'Send us detailed questions via email',
			action: 'https://mailto:ravshanbekovbehruz79@gmail.com',
		},
		{
			icon: Globe,
			title: 'Official Website',
			description: 'Visit our official website for more information',
			action: 'https://ravshanbekov.uz',
		},
	]
	return (
		<Section className='bg-gradient-to-br from-blue-50 to-indigo-100 relative h-full'>
			<div className='space-y-6'>
				{/* Header Section */}
				<div className='flex items-center gap-5'>
					<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'>
						<HelpCircle className='h-10 w-10 text-white' />
					</div>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900'>Help & Support</h1>
				</div>

				{/* Contact Form */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
					<Card className='p-4'>
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
									Message <ReqiredStar />
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									rows={7}
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
							<Card key={index} className='p-4'>
								<div className='flex items-start gap-4'>
									<div className='p-3 bg-blue-100 rounded-full'>
										{method.icon && <method.icon className='h-6 w-6 text-blue-600' />}
										{method.image_url && (
											<Image alt={method.title} src={method.image_url} width={30} height={30} />
										)}
									</div>
									<div className='flex-1'>
										<h3 className='font-semibold text-gray-900 mb-1'>{method.title}</h3>
										<p className='text-gray-600 mb-2'>{method.description}</p>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href={method.action}
											className='text-blue-600 font-medium wrap-anywhere underline flex items-center gap-5'
										>
											{method.title} <ArrowRight />
										</a>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</Section>
	)
}
