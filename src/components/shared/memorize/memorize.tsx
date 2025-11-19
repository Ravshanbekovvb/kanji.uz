'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CarouselApi } from '@/components/ui/carousel'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { useFindLessonsByUserId } from '@/hooks/useLessons'
import { DarsData } from '@/types/types'
import clsx from 'clsx'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Congratulations } from '../congratulations/congratulations'
import { CarouselMemorize } from './carousel-memorize'
import { KeyboardButtons } from './keyboard-buttons'
import { MemorizeHeader } from './memorize-header'
export const Memorize: React.FC = () => {
	const [needHelp, setNeedHelp] = useState<boolean>(false)
	const [words, setWords] = useState<any[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [showWordDetails, setShowWordDetails] = useState<boolean>(false)
	const [currentLessonTitle, setCurrentLessonTitle] = useState<string>('')
	const [showCongratulations, setShowCongratulations] = useState<boolean>(false)
	const [carouselApi, setCarouselApi] = useState<CarouselApi>()
	const { user } = useAuth()
	const { data, error, isPending } = useFindLessonsByUserId(user?.id)

	const handleMemorized = () => {
		if (words.length === 0) return
		const updatedWords = words.filter((_, idx) => idx !== currentIndex)
		setWords(updatedWords)
		localStorage.setItem('words-for-memorize', JSON.stringify({ words: updatedWords }))

		if (updatedWords.length === 0) {
			// Show congratulations when all words are memorized
			setShowCongratulations(true)
			setCurrentIndex(0)
		} else if (currentIndex >= updatedWords.length) {
			const newIndex = updatedWords.length - 1
			setCurrentIndex(newIndex)
			// Update carousel position
			if (carouselApi) {
				carouselApi.scrollTo(newIndex)
			}
		} else {
			// Update carousel position
			if (carouselApi) {
				carouselApi.scrollTo(currentIndex)
			}
		}
	}

	const handleShowWordDetails = () => {
		setShowWordDetails(prev => !prev)
	}

	const handleNotMemorized = () => {
		if (words.length <= 1) return
		const nextIndex = (currentIndex + 1) % words.length
		setCurrentIndex(nextIndex)

		// Update carousel position
		if (carouselApi) {
			carouselApi.scrollTo(nextIndex)
		}
	}

	const handleCloseCongratulations = () => {
		setShowCongratulations(false)
		setCurrentLessonTitle('')
		localStorage.removeItem('words-for-memorize')
	}

	useEffect(() => {
		const parsed: DarsData = JSON.parse(
			localStorage.getItem('words-for-memorize') || '{"words": []}'
		)
		setWords(parsed.words || [])
		setCurrentLessonTitle(parsed.title || '')
		setCurrentIndex(0)
	}, [])

	// Carousel API listener
	useEffect(() => {
		if (!carouselApi) return

		carouselApi.on('select', () => {
			setCurrentIndex(carouselApi.selectedScrollSnap())
		})
	}, [carouselApi])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				e.preventDefault()
				const spaceBtn = document.getElementById('space') as HTMLButtonElement | null
				if (spaceBtn) {
					spaceBtn.classList.add('active')
					spaceBtn.click()
					setTimeout(() => {
						spaceBtn.classList.remove('active')
					}, 100)
				}
			} else if (e.key === 'Enter') {
				e.preventDefault()
				const enterBtn = document.getElementById('enter') as HTMLButtonElement | null
				if (enterBtn) {
					enterBtn.classList.add('active')
					enterBtn.click()
					setTimeout(() => {
						enterBtn.classList.remove('active')
					}, 100)
				}
			} else if (e.key === 'Control') {
				e.preventDefault()
				const ctrlBtn = document.getElementById('ctrl') as HTMLButtonElement | null
				if (ctrlBtn) {
					ctrlBtn.classList.add('active')
					ctrlBtn.click()
					setTimeout(() => {
						ctrlBtn.classList.remove('active')
					}, 100)
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [words.length, currentIndex, carouselApi])

	if (error) {
		return 'Error getting Lessons..'
	}
	if (isPending) {
		return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	}
	if (!data) {
		return 'lessons is not defined'
	}

	return (
		<Section>
			{/* HEADER */}
			<MemorizeHeader
				needHelp={needHelp}
				setNeedHelp={setNeedHelp}
				wordsLength={words.length > 0}
				setWords={setWords}
			/>
			{/* MAIN CONTENT */}
			<div className='relative'>
				{words.length > 0 ? (
					<div
						className={clsx(
							'flex flex-col items-center transition-all duration-700 ease-in-out w-full'
						)}
					>
						<div className='font-bold'>{currentLessonTitle}</div>
						<CarouselMemorize
							words={{ id: '', title: '', user: { userName: '' }, words, createdAt: '' }}
							currentIndex={currentIndex}
							setCarouselApi={setCarouselApi}
						/>
						<KeyboardButtons
							onMemorized={handleMemorized}
							onNotMemorized={handleNotMemorized}
							onShowWordDetails={handleShowWordDetails}
							showWordDetails={showWordDetails}
							currentWord={words[currentIndex]}
						/>
					</div>
				) : (
					<div className='grid gap-3'>
						<h2 className='text-xl font-semibold text-gray-800 mt-5'>Select the lesson:</h2>
						{data.lessons.length > 0
							? data.lessons.map((lesson: any, ind: number) => (
									<Card
										className='hover:bg-gray-100/60 mb-4'
										key={ind}
										onClick={() => {
											localStorage.setItem('words-for-memorize', JSON.stringify(lesson))
											setWords(lesson.words)
											setCurrentLessonTitle(lesson.title)
											setCurrentIndex(0)
										}}
									>
										<CardHeader className='flex flex-row items-center justify-between p-4'>
											<div>
												<CardTitle>{lesson.title}</CardTitle>
											</div>
											<Badge
												variant={
													lesson.words.length < 10
														? 'destructive'
														: lesson.words.length < 20
															? 'pending'
															: 'approved'
												}
											>
												{lesson.words.length} words
											</Badge>
										</CardHeader>
									</Card>
								))
							: "You haven't created any documents yet."}
					</div>
				)}
			</div>

			{/* CONGRATULATIONS MODAL */}
			{showCongratulations && (
				<Congratulations lessonTitle={currentLessonTitle} onClose={handleCloseCongratulations} />
			)}
		</Section>
	)
}
