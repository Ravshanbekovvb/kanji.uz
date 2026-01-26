'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { useReadingAll, useReadingSectionByJlptLevelPrefetch } from '@/hooks/useReadings'
import { ChartNoAxesCombined } from 'lucide-react'
import Link from 'next/link'
import { PageTitle } from '../title'
import { ButtonVisibleForRole } from './button-visible-for-role'

export const Reading: React.FC = () => {
	const { data, isPending } = useReadingAll()

	// Prefetch all JLPT levels data - these will run once when component mounts
	// and cache the data for when user navigates to specific JLPT pages
	useReadingSectionByJlptLevelPrefetch('N1')
	useReadingSectionByJlptLevelPrefetch('N2')
	useReadingSectionByJlptLevelPrefetch('N3')
	useReadingSectionByJlptLevelPrefetch('N4')
	useReadingSectionByJlptLevelPrefetch('N5')
	return (
		<Section>
			<div className='flex items-center justify-between'>
				<PageTitle title='Readings' />
				<div className='flex items-center gap-3'>
					<ButtonVisibleForRole
						title='+ Add Reading'
						visibleRole='TEACHER'
						href='/readings/create-reading'
					/>
					<Link href={'readings/reading-progress'}>
						<Button variant={'outline'}>
							<ChartNoAxesCombined />
						</Button>
					</Link>
				</div>
			</div>
			<div className='mt-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{isPending ? (
						<>
							{[...Array(5)].map((_, i) => (
								<div key={i} className='p-6 rounded-2xl border border-gray-200 shadow-sm bg-white'>
									<div className='animate-pulse'>
										<div className='flex items-center justify-center gap-3 mb-3'>
											<div className='h-6 bg-gray-200 rounded w-10'></div>
										</div>

										<div className='flex justify-center items-center gap-2'>
											<div className='h-4 bg-gray-200 rounded w-30'></div>
											<div className='h-4 bg-gray-200 rounded w-30'></div>
										</div>
									</div>
								</div>
							))}
						</>
					) : data && data?.length > 0 ? (
						data.map((item, index) => (
							<Link
								href={`/readings/${item.level}`}
								key={index}
								className='p-6 rounded-2xl border border-gray-200 shadow-sm bg-white hover:bg-indigo-50 transition-all duration-200 flex flex-col items-center justify-center text-center group'
							>
								<div className='text-2xl font-bold text-gray-700 group-hover:text-indigo-600 mb-3'>
									{item.level}
								</div>
								<div className='flex gap-2 text-sm text-gray-500'>
									<Badge variant='approved'>{item.sectionCount} sections</Badge>
									<Badge variant='destructive'>{item.readingCount} Readings</Badge>
								</div>
							</Link>
						))
					) : (
						''
					)}
				</div>
				{/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 max-w-2xl mx-auto'>
					{jlptData.slice(3, 5).map((item, index) => (
						<Link
							href={`/readings/${item.level}`}
							key={index}
							className='p-6 rounded-2xl border border-gray-200 shadow-sm bg-white hover:bg-indigo-50 transition-all duration-200 flex flex-col items-center justify-center text-center group'
						>
							<div className='text-2xl font-bold text-gray-700 group-hover:text-indigo-600 mb-3'>
								{item.level}
							</div>
							<div className='flex gap-2 text-sm text-gray-500'>
								<Badge variant='secondary'>{item.sections} sections</Badge>
								<Badge variant='secondary'>{item.tests} tests</Badge>
							</div>
						</Link>
					))}
				</div> */}
			</div>
		</Section>
	)
}
