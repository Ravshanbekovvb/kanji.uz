import Confetti from 'react-confetti-boom'

interface CongratulationsProps {
	lessonTitle?: string
	onClose?: () => void
}

export const Congratulations: React.FC<CongratulationsProps> = ({
	lessonTitle = 'lesson',
	onClose,
}) => {
	return (
		<div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-2xl p-8 max-w-md mx-4 text-center relative'>
				<Confetti
					mode='fall'
					colors={[
						'#FF0000',
						'#FF7F00',
						'#FFFF00',
						'#00FF00',
						'#0000FF',
						'#4B0082',
						'#8B00FF',
						'#00FFFF',
						'#FF1493',
						'#FFD700',
					]}
				/>

				<div className='space-y-4'>
					<div className='text-6xl'>🎉</div>

					<h2 className='text-2xl font-bold text-gray-800'>Congratulations!</h2>

					<p className='text-lg text-gray-600'>
						You have successfully memorized{' '}
						<span className='font-semibold text-indigo-600'>"{lessonTitle}"</span>
					</p>

					<p className='text-sm text-gray-500'>Great job! Keep up the excellent work!</p>

					{onClose && (
						<button
							onClick={onClose}
							className='mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200'
						>
							Continue Learning
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
