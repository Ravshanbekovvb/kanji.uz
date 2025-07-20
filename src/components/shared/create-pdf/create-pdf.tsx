'use client'

import { Container } from '@/components/ui/container'
import { useFindLessonById } from '@/hooks/useLessons'
import { translateText } from '@/lib/translate'
import { useStore } from '@/store/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Carousels } from './carousels'
import { Form } from './form'
import { Reset } from './reset'
import { SwitchInputs } from './switch-inputs'

// Local word interface for localStorage (without id and lessonId)
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
	const [settings, setSettings] = useState({
		autoTranslate: true,
		autoAddingExample: true,
	})
	const [isLoading, setIsLoading] = useState(false)
	const { setEmblaActiveIndex, setIsUpdate, isUpdate } = useStore()

	const searchParams = useSearchParams()
	const router = useRouter()
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

		await translateText(word, to, from)
			.then(({ translatedWord, transcription, example, jlptLevel }) => {
				const newWord: LocalWord = {
					kanji: word,
					translation: translatedWord,
					transcription: transcription,
					example: example,
					jlptLevel: jlptLevel,
				}
				setWordsLength(words.length)
				setIsUpdate(Math.random())

				if (existingLessonId) {
					// When adding to existing lesson, only save new words to localStorage
					const storedNewWords = localStorage.getItem('newWords')
					const newWords = storedNewWords ? JSON.parse(storedNewWords) : []
					newWords.push(newWord)
					localStorage.setItem('newWords', JSON.stringify(newWords))
				} else {
					// Normal mode - add to main words array
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

	const handleSwitchChange = (key: string, checked: boolean) => {
		setSettings(prevState => ({
			...prevState,
			[key]: checked!,
		}))
	}

	const handleTitleChange = (newTitle: string) => {
		if (existingLessonId) {
			return
		}
		setLessonTitle(newTitle)
		localStorage.setItem('lessonTitle', newTitle)
	}

	return (
		<Container className='max-sm:px-2 overflow-x-hidden'>
			<div className='flex justify-between items-center'>
				<h2 className='text-4xl font-semibold mb-4'>
					{existingLessonId ? `Add Words to: ${lessonTitle}` : 'Create PDF'}
				</h2>
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
			<SwitchInputs settings={settings} handleSwitchChange={handleSwitchChange} />
			<Form
				isLoading={isLoading}
				settings={settings}
				translateFetch={translateFetch}
				lessonTitle={lessonTitle}
				words={words}
				existingLessonId={existingLessonId}
			/>
		</Container>
	)
}
