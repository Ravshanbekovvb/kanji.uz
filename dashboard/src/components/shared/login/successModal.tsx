'use client'
import { useEffect, useState } from 'react'

interface Props {
	onClose: () => void
	email: string
}

export function SignupSuccessModal({ onClose, email }: Props) {
	const [secondsLeft, setSecondsLeft] = useState(24 * 60 * 60) // 24 soat

	useEffect(() => {
		const timer = setInterval(() => {
			setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	const formatTime = (sec: number) => {
		const h = Math.floor(sec / 3600)
		const m = Math.floor((sec % 3600) / 60)
		const s = sec % 60
		return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
			.toString()
			.padStart(2, '0')}`
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
			<div className='bg-white rounded-2xl shadow-2xl h-full flex flex-col justify-center items-center p-8 w-full max-w-lg text-center animate-fadeIn'>
				<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
					✅ Request Submitted Successfully!
				</h2>

				<p className='text-gray-600 mb-6 leading-relaxed'>
					Your sign-up request has been received.
					<br />
					Our admin team will review it and send your login credentials to your email{' '}
					<strong>{email}</strong> within <strong>24 hours</strong>.
				</p>

				<div className='text-4xl font-mono text-blue-600 mb-6'>{formatTime(secondsLeft)}</div>

				<button
					type='button'
					onClick={onClose}
					className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200'
				>
					Close
				</button>
			</div>
		</div>
	)
}
