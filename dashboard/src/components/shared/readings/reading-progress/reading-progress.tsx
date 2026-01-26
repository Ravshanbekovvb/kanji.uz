'use client'
import { ReadingProgressCharts } from '@/components/shared/charts'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { useReadingProgress } from '@/hooks/useReadings'
import { BackLink } from '../../back-link'
import { PageTitle } from '../../title'

export const ReadingProgress: React.FC = () => {
	const { user } = useAuth()

	if (!user?.id) {
		return (
			<Section>
				<div className='text-center py-8'>
					<p className='text-gray-500'>Sizning ID ingiz topilmadi!</p>
				</div>
			</Section>
		)
	}

	const { data: progressData, isPending, error } = useReadingProgress(user.id)

	if (isPending) {
		return (
			<Section>
				<div className='text-center py-8'>
					<p className='text-gray-500'>Yuklanmoqda...</p>
				</div>
			</Section>
		)
	}

	if (error) {
		return (
			<Section>
				<div className='text-center py-8'>
					<p className='text-red-500'>Xatolik: {error.message}</p>
				</div>
			</Section>
		)
	}

	console.log(progressData)

	return (
		<Section>
			<div>
				<BackLink href='/readings' text='back to readings' />
				<PageTitle title='Reading Progress' className='mb-8' />

				{progressData && progressData.length > 0 ? (
					<div className='space-y-8'>
						{/* Charts Section */}
						<ReadingProgressCharts data={progressData} />

						{/* Detailed List */}
						<div>
							<h3 className='text-lg font-semibold mb-4'>So'nggi Testlar</h3>
							<div className='grid gap-4'>
								{progressData
									.slice(-10)
									.reverse()
									.map((progress: any, index: number) => (
										<div key={progress.id || index} className='p-4 border rounded-lg bg-white'>
											<div className='flex justify-between items-center'>
												<div className='flex items-center gap-4'>
													<span
														className={`px-3 py-1 rounded-full text-sm font-medium ${
															progress.testLevel === 'EASY'
																? 'bg-green-100 text-green-700'
																: progress.testLevel === 'MEDIUM'
																	? 'bg-yellow-100 text-yellow-700'
																	: 'bg-red-100 text-red-700'
														}`}
													>
														{progress.testLevel}
													</span>
													<span
														className={`px-3 py-1 rounded-full text-sm font-medium ${
															progress.isCorrect
																? 'bg-green-100 text-green-700'
																: 'bg-red-100 text-red-700'
														}`}
													>
														{progress.isCorrect ? "To'g'ri" : "Noto'g'ri"}
													</span>
												</div>
												<div className='flex items-center gap-4 text-sm text-gray-600'>
													<span>
														Vaqt: {Math.floor(progress.solvedTime / 60)}:
														{(progress.solvedTime % 60).toString().padStart(2, '0')}
													</span>
													<span>
														{new Date(progress.createdAt).toLocaleDateString('uz-UZ', {
															day: 'numeric',
															month: 'short',
															hour: '2-digit',
															minute: '2-digit',
														})}
													</span>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				) : (
					<div className='text-center py-8'>
						<p className='text-gray-500'>Hozircha hech qanday progress yo\'q</p>
					</div>
				)}
			</div>
		</Section>
	)
}
