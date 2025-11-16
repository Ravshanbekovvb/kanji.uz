interface SkletonProps {
	variant?: 'reading-test-text' | 'reading-test-question' | 'reading-section' | 'profile' | 'lesson'
}
export const Skleton: React.FC<SkletonProps> = ({ variant }) => {
	if (variant === 'reading-test-text') {
		return (
			<div className='bg-gray-50 p-6 rounded-xl mb-5'>
				{/* Author section */}
				<div className='flex items-center gap-3 mb-5'>
					<div className='w-6 h-6 bg-gray-200 rounded'></div>
					<div className='h-6 bg-gray-200 rounded w-24'></div>
				</div>

				{/* Problem header */}
				<div className='mb-5 flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='bg-gray-300 rounded-md w-10 h-10'></div>
						<div className='h-6 bg-gray-200 rounded w-16'></div>
						<div className='h-6 bg-gray-200 rounded w-80 ml-5'></div>
					</div>
					<div className='h-6 bg-gray-200 rounded w-20'></div>
				</div>

				{/* Reading text lines */}
				<div className='space-y-3'>
					<div className='h-5 bg-gray-200 rounded w-full'></div>
					<div className='h-5 bg-gray-200 rounded w-11/12'></div>
					<div className='h-5 bg-gray-200 rounded w-full'></div>
					<div className='h-5 bg-gray-200 rounded w-10/12'></div>
					<div className='h-5 bg-gray-200 rounded w-full'></div>
					<div className='h-5 bg-gray-200 rounded w-9/12'></div>
				</div>
			</div>
		)
	}
	if (variant === 'reading-test-question') {
		return (
			<>
				{/* Question title */}
				<div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>

				{/* Answer options */}
				<div className='space-y-3'>
					{[...Array(4)].map((_, oIndex) => (
						<div key={oIndex} className='w-full p-4 rounded-lg border border-gray-200'>
							<div className='flex items-center'>
								<div className='h-5 bg-gray-200 rounded w-6 mr-3'></div>
								<div className='h-5 bg-gray-200 rounded w-2/3'></div>
							</div>
						</div>
					))}
				</div>
			</>
		)
	}
	return <div className='h-12 bg-gray-200 rounded w-32 mx-auto'></div>
}
