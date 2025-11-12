'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'

interface CountdownModalProps {
	isOpen: boolean
	onComplete: () => void
}

export const CountdownModal: React.FC<CountdownModalProps> = ({ isOpen, onComplete }) => {
	const [mounted, setMounted] = useState(false)
	const [count, setCount] = useState(3)
	const { setIsOpen } = useStore()

	// Handle hydration
	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted || !isOpen) {
			setCount(3)
			setIsOpen(false)
			return
		}

		const timer = setInterval(() => {
			setCount(prev => {
				if (prev === 1) {
					clearInterval(timer)
					setTimeout(() => {
						onComplete()
					}, 500) // Small delay before closing
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [isOpen, onComplete, mounted])

	if (!mounted) {
		return null
	}

	return (
		<Dialog open={isOpen}>
			<DialogContent className='text-center max-w-md' showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold'>Test is starting...</DialogTitle>
					<DialogDescription className='text-lg'>Get ready! Test will begin in:</DialogDescription>
				</DialogHeader>
				<div className='py-8 flex flex-col items-center'>
					<div className='relative mb-4'>
						<svg className='w-32 h-32 transform -rotate-90' viewBox='0 0 100 100'>
							<circle
								cx='50'
								cy='50'
								r='45'
								stroke='currentColor'
								strokeWidth='8'
								fill='transparent'
								className='text-gray-200'
							/>
							<circle
								cx='50'
								cy='50'
								r='45'
								stroke='currentColor'
								strokeWidth='8'
								fill='transparent'
								strokeDasharray={`${2 * Math.PI * 45}`}
								strokeDashoffset={`${2 * Math.PI * 45 * (1 - (4 - count) / 3)}`}
								className='text-blue-600 transition-all duration-1000'
								strokeLinecap='round'
							/>
						</svg>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='text-6xl font-bold text-blue-600'>{count > 0 ? count : '🚀'}</div>
						</div>
					</div>
					{count === 0 && (
						<div className='text-2xl font-bold text-green-600 animate-bounce'>GO!</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
