'use client'

import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'
import { Carousel } from './carousel'

// Local word interface for localStorage (without id and lessonId)
interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

type Props = {
	className?: string
	existingLessonId?: string | null
	allWords?: LocalWord[] // Combined words passed from parent
	lessonTitle?: string
}

export const Carousels: React.FC<Props> = ({
	className,
	existingLessonId,
	allWords,
	lessonTitle: propLessonTitle,
}) => {
	const [wordsInLocaleStorage, setWordsInLocaleStorage] = useState<LocalWord[]>([])
	const [wordsLength, setWordsLength] = useState(0)
	const [lessonTitle, setLessonTitle] = useState('')
	const { isUpdate } = useStore()

	useEffect(() => {
		if (existingLessonId && allWords) {
			// Use combined words passed from parent (existing + new)
			setWordsInLocaleStorage(allWords)
			setWordsLength(allWords.length)
			setLessonTitle(propLessonTitle || '')
		} else {
			// Normal mode - read from localStorage
			const storedList = localStorage.getItem('words')
			const storedTitle = localStorage.getItem('lessonTitle')
			const words: LocalWord[] = storedList ? JSON.parse(storedList) : []
			setWordsInLocaleStorage(words)
			setWordsLength(words.length)
			setLessonTitle(storedTitle || '')
		}
	}, [isUpdate, existingLessonId, allWords, propLessonTitle])

	return (
		<div
			className={cn(
				'flex justify-evenly items-center gap-3 max-xl:flex-col max-xl:gap-0',
				className
			)}
		>
			<Carousel words={wordsInLocaleStorage} lessonTitle={lessonTitle} />

			<div className='flex flex-col items-center'>
				<div className='w-13 h-13 rounded-full bg-yellow-600 text-white flex justify-center items-center text-2xl font-bold shadow-md max-xl:text-lg max-xl:w- max-xl:h-10'>
					{wordsLength}
				</div>
			</div>

			<Carousel translationCarousel words={wordsInLocaleStorage} lessonTitle={lessonTitle} />
		</div>
	)
}
