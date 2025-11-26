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
	if (variant === 'profile') {
		return (
			<div className='space-y-6'>
				{/* Profile Header Card */}
				<div className='flex flex-col md:flex-row items-center gap-8'>
					{/* Avatar Section */}
					<div className=''>
						<div className='w-16 h-16 bg-gray-200 rounded-full shadow-xl border-4 border-white animate-pulse'></div>
						<div className='absolute bottom-2 right-2 max-md:hidden'>
							<div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'></div>
						</div>
					</div>

					{/* User Info */}
					<div className='flex-1 text-center md:text-left space-y-2'>
						<div className='h-6 bg-gray-200 rounded w-20 animate-pulse'></div>
						<div className='h-5 bg-gray-200 rounded w-32 animate-pulse'></div>
					</div>
				</div>

				{/* Joined date */}
				<div className='h-5 bg-gray-200 rounded w-40 animate-pulse'></div>

				{/* Form Fields */}
				<div className='grid grid-cols-2 grid-rows-2 max-lg:grid-cols-1 gap-5'>
					{/* Email Field */}
					<div className='space-y-2 w-full'>
						<div className='h-5 bg-gray-200 rounded w-16 animate-pulse'></div>
						<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
					</div>

					{/* Username Field */}
					<div className='space-y-2'>
						<div className='h-5 bg-gray-200 rounded w-20 animate-pulse'></div>
						<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
					</div>

					{/* Current Password Field */}
					<div className='space-y-2'>
						<div className='h-5 bg-gray-200 rounded w-32 animate-pulse'></div>
						<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
					</div>

					{/* New Password Field */}
					<div className='space-y-2'>
						<div className='h-5 bg-gray-200 rounded w-28 animate-pulse'></div>
						<div className='h-12 bg-gray-200 rounded animate-pulse'></div>
					</div>
				</div>

				{/* Submit Button */}
				<div className='my-4'>
					<div className='h-12 bg-gray-200 rounded max-lg:w-full w-40 animate-pulse'></div>
				</div>
			</div>
		)
	}
	return <div className='h-12 bg-gray-200 rounded w-32 mx-auto'></div>
}
