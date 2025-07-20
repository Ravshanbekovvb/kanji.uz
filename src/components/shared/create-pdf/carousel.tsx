import {
	CarouselApi,
	Carousel as CarouselBlock,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { setTextSize } from '@/lib/create-pdf'
import { cn } from '@/lib/utils'
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

	return (
		<div className='p-10 select-none max-xl:p-5'>
			<CarouselBlock
				className='w-[380px] p-3 border-2 border-dashed border-black'
				setApi={(e: CarouselApi) => {
					setEmblaApi(e)
				}}
			>
				<CarouselContent className='h-[180px]'>
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
							<>
								<div className='flex justify-center gap-5 font-light'>
									<div>{lessonTitle ? lessonTitle + ' ー N' + item.jlptLevel : ''}</div>
									{/* <div>日本語直前対第 ー N {'2'} 語彙</div>
									<div>第 {'2'} 回</div> */}
								</div>
								<div className={cn('font-semibold text-center p-0 m-0', kanjiSize)}>
									{item.kanji}
								</div>
							</>
						)

						return (
							<CarouselItem
								key={ind}
								className={cn(
									translationCarousel && 'text-center flex flex-col justify-center gap-5'
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
