'use client'

import { Section } from '@/components/ui/section'
import { useFindLessonById } from '@/hooks/useLessons'
import { translateText } from '@/lib/translate'
import { useStore } from '@/store/store'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageTitle } from '../title'
import { Carousels } from './carousels'
import { Form } from './form'
import { Reset } from './reset'

interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

export const CreatePdf: React.FC = () => {
	const [wordsLength, setWordsLength] = useState(0)
	const [words, setWords] = useState<LocalWord[]>([])
	const [lessonTitle, setLessonTitle] = useState<string>('')
	const [existingLessonId, setExistingLessonId] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const { setEmblaActiveIndex, setIsUpdate, isUpdate, currentAi } = useStore()

	const searchParams = useSearchParams()
	const lessonId = searchParams.get('lessonId')

	// Fetch existing lesson if lessonId is provided
	const { data: existingLesson, isPending: isLoadingLesson } = useFindLessonById(
		lessonId || undefined
	)

	useEffect(() => {
		if (lessonId && existingLesson) {
			// We're in "add words to existing lesson" mode
			setExistingLessonId(lessonId)
			setLessonTitle(existingLesson.title)

			// Load existing words from the lesson
			const existingWords = existingLesson.words || []

			// Convert database words to LocalWord format
			const localExistingWords = existingWords.map((word: any) => ({
				kanji: word.kanji,
				translation: word.translation,
				transcription: word.transcription,
				example: word.example,
				jlptLevel: word.jlptLevel,
			}))

			// Load new words from localStorage
			const storedNewWords = localStorage.getItem('newWords')
			const newWords = storedNewWords ? JSON.parse(storedNewWords) : []

			// Combine existing words with new words
			const allWords = [...localExistingWords, ...newWords]
			setWords(allWords)
		} else {
			// Normal create lesson mode
			setExistingLessonId(null)
			const storedWords = localStorage.getItem('words')
			const storedTitle = localStorage.getItem('lessonTitle')
			const words = storedWords ? JSON.parse(storedWords) : []
			setWords(words)
			setLessonTitle(storedTitle || '')
		}
	}, [lessonId, existingLesson, isUpdate])

	const translateFetch = async (
		word: string,
		to: 'uz' | 'ru' | 'en',
		e: FormEvent<HTMLFormElement>,
		from = 'ja'
	) => {
		e.preventDefault()
		const form = e.currentTarget

		if (!word) {
			return toast.warning('Please enter your word or lesson title.')
		}

		if (
			/^[\x00-\xFF]*$/.test(word) ||
			/^[\x00-\x7F]*$/.test(word) ||
			/^[A-Za-zА-Яа-яЁё]*$/.test(word)
		) {
			return toast.warning('Please enter only kanji or hiragana or katakana.')
		}

		if (words.some((w: LocalWord) => w.kanji.includes(word))) {
			const ind = words.findIndex((item: LocalWord) => item.kanji === word)
			setEmblaActiveIndex(ind)
			return toast.warning('There is such a kanji:' + word)
		}

		setIsLoading(true)

		await translateText(word, to, from, currentAi)
			.then(({ translatedWord, transcription, example, jlptLevel }) => {
				const newWord: LocalWord = {
					kanji: word,
					translation: translatedWord, // Use auto translation from Google
					transcription: transcription,
					example: example,
					jlptLevel: jlptLevel,
				}
				setWordsLength(words.length)
				setIsUpdate(Math.random())

				if (existingLessonId) {
					const storedNewWords = localStorage.getItem('newWords')
					const newWords = storedNewWords ? JSON.parse(storedNewWords) : []
					newWords.push(newWord)
					localStorage.setItem('newWords', JSON.stringify(newWords))
				} else {
					words.push(newWord)
					localStorage.setItem('words', JSON.stringify(words))
				}

				toast.success('Added: ' + word)
			})
			.catch(err => toast.error(`failed ${err}`, err))
			.finally(() => {
				form.reset()
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (wordsLength > 0) {
			setTimeout(() => {
				setEmblaActiveIndex(wordsLength)
			}, 0)
		}
	}, [wordsLength])

	const handleTitleChange = (newTitle: string) => {
		if (existingLessonId) {
			return
		}
		setLessonTitle(newTitle)
		localStorage.setItem('lessonTitle', newTitle)
	}

	return (
		<Section className='overflow-x-hidden'>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex items-center gap-5'>
					<PageTitle title={existingLessonId ? `Add Words to: ${lessonTitle}` : 'Create PDF'} />
					{currentAi === 'groq' ? (
						<Image alt='groq logo' src={'groq.png'} width={80} height={80} className='mt-2' />
					) : (
						<Image alt='chat-gpt logo' src={'chat-gpt.png'} width={60} height={60} />
					)}
				</div>
				<Reset existingLessonId={existingLessonId} />
			</div>
			<div>
				<input
					type='text'
					value={lessonTitle}
					onChange={e => handleTitleChange(e.target.value)}
					placeholder='Enter lesson title...'
					disabled={!!existingLessonId}
					className={`w-full border-2 rounded-lg px-4 py-2 text-lg transition-all outline-none ${
						existingLessonId
							? 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500'
							: 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300'
					}`}
				/>
				{existingLessonId && (
					<p className='text-sm text-gray-500 mt-1'>
						You are adding words to an existing lesson. The title cannot be changed.
					</p>
				)}
			</div>

			<Carousels existingLessonId={existingLessonId} allWords={words} lessonTitle={lessonTitle} />
			<Form
				isLoading={isLoading}
				translateFetch={translateFetch}
				lessonTitle={lessonTitle}
				words={words}
				existingLessonId={existingLessonId}
			/>
		</Section>
	)
}
