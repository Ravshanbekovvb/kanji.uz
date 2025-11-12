'use client'
import {
	CarouselApi,
	Carousel as CarouselBlock,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { setTextSize } from '@/lib/func/create-pdf'
import { cn } from '@/lib/func/utils'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'

// Local word interface for localStorage (without id and lessonId)
interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

type Props = {
	words: LocalWord[]
	translationCarousel?: boolean
	lessonTitle?: string
}

export const Carousel: React.FC<Props> = ({
	translationCarousel = false,
	words,
	lessonTitle = '',
}) => {
	const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null)
	const { emblaActiveIndex: activeIndex, setEmblaActiveIndex: setActiveIndex } = useStore()

	useEffect(() => {
		if (!emblaApi) return

		const onSelect = () => {
			const index = emblaApi.selectedScrollSnap()
			setActiveIndex(index)
		}

		emblaApi.on('select', onSelect)

		return () => {
			emblaApi.off('select', onSelect)
		}
	}, [emblaApi, setActiveIndex])

	useEffect(() => {
		if (emblaApi) emblaApi.scrollTo(activeIndex)
	}, [activeIndex, emblaApi])
	const windowWidth = window.innerWidth
	return (
		<div className='p-10 select-none max-xl:p-5'>
			<CarouselBlock
				className='w-[380px] p-3 border-2 border-dashed border-black max-sm:w-[280px]'
				setApi={(e: CarouselApi) => {
					setEmblaApi(e)
				}}
			>
				<CarouselContent className='h-[180px] max-sm:h-[140px]'>
					{words.map((item, ind) => {
						const kanjiSize = setTextSize({ word: item.kanji })

						const transcriptionSize = setTextSize({
							word: item.transcription ?? '',
							transcription: true,
						})

						const translationSize = setTextSize({
							word: item.translation,
							translation: true,
						})

						const exampleSize = setTextSize({ word: item.example, example: true })

						const content = translationCarousel ? (
							<>
								<div className={cn(transcriptionSize)}>{item.transcription}</div>
								<div className={cn('font-semibold first-letter:uppercase', translationSize)}>
									{item.translation}
								</div>
								<div className={cn(exampleSize)}>{item.example}</div>
							</>
						) : (
							<div className='flex flex-col'>
								<div className='flex justify-between font-light mx-2'>
									<div>
										{lessonTitle ? (
											lessonTitle
										) : (
											<div className='underline text-red-500'>ENTER LESSON TITLE</div>
										)}
									</div>
									<div>N{item.jlptLevel}</div>
								</div>

								<div
									className={cn(
										'font-semibold text-center',
										windowWidth > 640
											? kanjiSize
											: item.kanji.length >= 10
												? 'text-xl'
												: item.kanji.length >= 8
													? 'text-2xl pt-10'
													: item.kanji.length >= 6
														? 'text-4xl pt-7'
														: item.kanji.length >= 4
															? 'text-5xl pt-6'
															: item.kanji.length >= 2
																? 'text-7xl pt-4'
																: 'text-7xl pt-5'
									)}
								>
									{item.kanji}
								</div>
							</div>
						)

						return (
							<CarouselItem
								key={ind}
								className={cn(
									translationCarousel &&
										'text-center flex flex-col justify-center gap-5 max-sm:gap-1'
								)}
							>
								{content}
							</CarouselItem>
						)
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</CarouselBlock>
		</div>
	)
}
