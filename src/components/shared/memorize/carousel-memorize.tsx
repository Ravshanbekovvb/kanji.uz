'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { setTextSize } from '@/lib/create-pdf'
import { DarsData } from '@/types/types'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
interface CarouselMemorizeProps {
	words: DarsData
	currentIndex: number
	setCarouselApi: (api: CarouselApi) => void
}
export const CarouselMemorize = ({
	words,
	currentIndex,
	setCarouselApi,
}: CarouselMemorizeProps) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}
		if (api) {
			api.scrollTo(currentIndex)
		}
		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [currentIndex, api])

	useEffect(() => {
		if (api) {
			setCarouselApi(api)
		}
	}, [api, setCarouselApi])
	return (
		<Carousel className='w-full max-w-[400px] m-10 max-sm:m-5 mx-auto' setApi={setApi}>
			<CarouselContent>
				{words.words.map((item, ind) => {
					const kanjiSize = setTextSize({ word: item.kanji })
					return (
						<CarouselItem key={ind}>
							<div>
								<Card>
									<CardContent className='flex items-center justify-center p-4 h-[250px] max-md:h-[200px] max-lg:h-[210px]'>
										<span
											className={clsx('font-semibold whitespace-nowrap select-none', kanjiSize)}
										>
											{item.kanji}
										</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					)
				})}
			</CarouselContent>
			<div className='text-muted-foreground py-1 text-center text-sm select-none'>
				Word {current} of {count}
			</div>
		</Carousel>
	)
}
