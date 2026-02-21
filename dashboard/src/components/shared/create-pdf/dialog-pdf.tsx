'use client'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useAddWordsToLesson, useCreateLesson } from '@/hooks/useLessons'
import { createPdf } from '@/lib/func/create-pdf'
import { useStore } from '@/store/store'
import { CircleStop, Download, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DialogSelectTypePdf } from '../dialog-select-type-pdf/dialog-select-type-pdf'
import { DialogUpdateKanji } from './dialog-update-word'

// Local word interface for localStorage (without id and lessonId)
export interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
	isBulkAtWord: true
}

type DialogPdfProps = {
	lessonTitle: string
	words: LocalWord[]
	existingLessonId?: string | null
}

export default function DialogPdf({
	lessonTitle,
	words: propWords,
	existingLessonId,
}: DialogPdfProps) {
	const [isDownload, setIsDownload] = useState<boolean>(true)
	const [isWords, setWords] = useState<LocalWord[]>([])
	const { isUpdate, setIsUpdate } = useStore()
	const createLesson = useCreateLesson()
	const addWordsToLesson = useAddWordsToLesson()
	const router = useRouter()
	const t = useTranslations('createLesson')
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (existingLessonId) {
				// For existing lessons, combine existing lesson words (propWords) with new words from localStorage
				const storedNewWords = localStorage.getItem('newWords')
				const newWords: LocalWord[] = storedNewWords ? JSON.parse(storedNewWords) : []

				// propWords contains only existing lesson words from database
				// newWords contains new words that are not yet saved to database
				const combinedWords = [...propWords, ...newWords]
				setWords(combinedWords)
			} else {
				// For new lessons, get words from localStorage
				const storegedList = localStorage.getItem('words')
				const parsedWords: LocalWord[] = storegedList ? JSON.parse(storegedList) : []
				setWords(parsedWords)
			}
		}
	}, [isUpdate, existingLessonId, propWords])

	const canShowDialog = lessonTitle.trim().length > 0 && propWords.length > 0

	const handleDialogClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		return toast.warning('Add lesson title')
	}

	let words = isWords

	const saveToDatabase = async () => {
		try {
			if (existingLessonId) {
				const storedNewWords = localStorage.getItem('newWords')
				const newWords = storedNewWords ? JSON.parse(storedNewWords) : []

				if (newWords.length === 0) {
					toast.warning('No new words to add to the lesson.')
					return false
				}

				await addWordsToLesson.mutateAsync({
					lessonId: existingLessonId,
					words: newWords,
				})

				localStorage.removeItem('newWords')
			} else {
				await createLesson.mutateAsync({
					title: lessonTitle,
					words: words,
				})

				localStorage.removeItem('words')
				localStorage.removeItem('lessonTitle')
			}
			setIsUpdate(Math.random())
			return true
		} catch (error) {
			console.error('Error saving to database:', error)
			return false
		}
	}

	const savePdf = async (pdfType: 'table' | 'card' | 'beginner') => {
		const create_pdf = await createPdf({ words: words, title: lessonTitle, type: pdfType })
		if (create_pdf) {
			const savedToDb = await saveToDatabase()
			if (savedToDb) {
				const message = existingLessonId
					? 'Words added to lesson and PDF downloaded successfully!'
					: 'Lesson saved and PDF downloaded successfully!'
				toast.success(message)
				if (existingLessonId) {
					setTimeout(() => {
						router.push(`/my-lessons/${existingLessonId}`)
					}, 1000)
				}
			}
		}
	}

	const saveOnly = async () => {
		const savedToDb = await saveToDatabase()
		if (savedToDb) {
			const message = existingLessonId
				? 'Words added to lesson successfully!'
				: 'Lesson saved successfully!'
			toast.success(message)

			if (existingLessonId) {
				setTimeout(() => {
					router.push(`/my-lessons`)
				}, 1000)
			}
		}
	}

	const deleteFromKanjies = (kanji: string): void => {
		if (existingLessonId) {
			const storedNewWords = localStorage.getItem('newWords')
			const newWords = storedNewWords ? JSON.parse(storedNewWords) : []
			const newWordIndex = newWords.findIndex((word: LocalWord) => word.kanji === kanji)

			if (newWordIndex >= 0) {
				const updatedNewWords = newWords.filter((word: LocalWord) => word.kanji !== kanji)
				localStorage.setItem('newWords', JSON.stringify(updatedNewWords))
				setIsUpdate(Math.random())
				toast.success(`Deleted ${kanji}`)
			} else {
				toast.warning(
					`Cannot delete existing word "${kanji}". You can only delete newly added words.`,
				)
			}
		} else {
			const updatedWords = isWords.filter(item => item.kanji !== kanji)
			setIsUpdate(Math.random())
			localStorage.setItem('words', JSON.stringify(updatedWords))
			toast.success(`Deleted ${kanji}`)
		}
	}

	return (
		<>
			{canShowDialog ? (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant={'destructive'} className='p-6'>
							<CircleStop size={20} />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className='min-w-[1450px] max-h-[600px] max-sm:min-w-full max-sm:min-h-full max-sm:rounded-none flex flex-col justify-between rounded-4xl'>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{existingLessonId
									? 'Check new words before adding to lesson. Adding words to existing lesson'
									: t('checkEverything')}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{t('totalWords')}: <span className='font-black'>{isWords.length}</span> {'   '}
								{t('title')}: <span className='font-black'> {lessonTitle}</span>
								{existingLessonId && (
									<span className='text-sm text-blue-600 mt-1'>
										Adding words to existing lesson
										{(() => {
											const storedNewWords = localStorage.getItem('newWords')
											const newWords = storedNewWords ? JSON.parse(storedNewWords) : []
											return ` • New words: ${newWords.length} • Existing words: ${
												isWords.length - newWords.length
											}`
										})()}
									</span>
								)}
							</AlertDialogDescription>
							<div className='overflow-auto h-[400px] relative'>
								<table className='w-full border-collapse border border-gray-300'>
									<thead className='bg-gray-300'>
										<tr>
											<th className='border border-gray-300 px-4 py-2'>Kanji</th>
											<th className='border border-gray-300 px-4 py-2'>Transcription</th>
											<th className='border border-gray-300 px-4 py-2'>Translation</th>
											<th className='border border-gray-300 px-4 py-2'>Example</th>
											<th className='border border-gray-300 px-4 py-2 w-25 whitespace-nowrap'>
												JLPT level
											</th>
											<th className='border border-gray-300 px-4 py-2 w-5 text-center'>*</th>
										</tr>
									</thead>
									<tbody>
										{isWords.map((item, index) => {
											// Calculate correct index for localStorage
											let storageIndex = index
											let isNewWord = false

											if (existingLessonId) {
												// If this word is beyond existing lesson words, it's a new word
												if (index >= propWords.length) {
													storageIndex = index - propWords.length
													isNewWord = true
												}
											}

											return (
												<tr
													key={index}
													className={`group hover:bg-gray-100 transition-all relative ${isNewWord ? 'bg-blue-50' : ''}`}
												>
													<td className='border border-gray-300  '>
														{isNewWord && (
															<span className='text-[8px] text-blue-600 font-semibold absolute left-0 top-2'>
																NEW
															</span>
														)}
														{item.isBulkAtWord && (
															<span className='text-[8px] text-green-600 font-semibold absolute left-0 top-0'>
																Bulk
															</span>
														)}
														<DialogUpdateKanji
															datas={{
																example: item.example,
																kanji: item.kanji,
																transcription: item.transcription,
																translation: item.translation,
																type: 'kanji',
																ind: storageIndex,
																isNewWord,
															}}
															word={item.kanji}
															className='group-hover:opacity-100 transition-opacity cursor-pointer  hover:bg-gray-200 px-4 py-2'
															currentText={item.kanji}
															isNewWord={isNewWord}
														/>
													</td>
													<td className='border border-gray-300'>
														<DialogUpdateKanji
															datas={{
																example: item.example,
																kanji: item.kanji,
																transcription: item.transcription,
																translation: item.translation,
																type: 'transcription',
																ind: storageIndex,
																isNewWord,
															}}
															word={item.transcription}
															className='group-hover:opacity-100 transition-opacity cursor-pointer  hover:bg-gray-200 px-4 py-2'
															currentText={item.transcription}
															isNewWord={isNewWord}
														/>
													</td>
													<td className='border border-gray-300'>
														<DialogUpdateKanji
															datas={{
																example: item.example,
																kanji: item.kanji,
																transcription: item.transcription,
																translation: item.translation,
																type: 'translation',
																ind: storageIndex,
																isNewWord,
															}}
															word={item.translation}
															className='group-hover:opacity-100 transition-opacity cursor-pointer  hover:bg-gray-200 px-4 py-2'
															currentText={item.translation}
															isNewWord={isNewWord}
														/>
													</td>
													<td className='border border-gray-300'>
														<DialogUpdateKanji
															datas={{
																example: item.example,
																kanji: item.kanji,
																transcription: item.transcription,
																translation: item.translation,
																type: 'example',
																ind: storageIndex,
																isNewWord,
															}}
															word={item.example}
															className='group-hover:opacity-100 transition-opacity cursor-pointer  hover:bg-gray-200 px-4 py-2'
															currentText={item.example}
															isNewWord={isNewWord}
														/>
													</td>
													<td className='border border-gray-300 text-center'>
														<DialogUpdateKanji
															datas={{
																example: item.example,
																kanji: item.kanji,
																transcription: item.transcription,
																translation: item.translation,
																type: 'jlptLevel',
																ind: storageIndex,
																isNewWord,
															}}
															word={item.jlptLevel}
															className='group-hover:opacity-100 transition-opacity cursor-pointer  hover:bg-gray-200 px-4 py-2'
															currentText={item.jlptLevel}
															isNewWord={isNewWord}
														/>
													</td>
													<td className='border border-gray-300 px-4 text-center'>
														<Trash2
															color='#9a0000'
															className='cursor-pointer'
															onClick={() => deleteFromKanjies(item.kanji)}
														/>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</AlertDialogHeader>
						<div className='flex justify-end max-sm:justify-center items-center gap-2'>
							<input
								type='checkbox'
								defaultChecked={isDownload}
								className='mt-1'
								onChange={e => {
									setIsDownload(!isDownload)
								}}
							/>
							<div>{t('downloadImmediate')}</div>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
							{isDownload ? (
								<DialogSelectTypePdf
									customWords={words}
									lessonTitle={lessonTitle}
									onDownload={savePdf}
									trigger={
										<Button>
											<Download />
											{t('saveAndDownload')}
										</Button>
									}
								/>
							) : (
								<Button
									onClick={saveOnly}
									disabled={createLesson.isPending || addWordsToLesson.isPending}
								>
									<Download />
									{createLesson.isPending || addWordsToLesson.isPending
										? 'Saving...'
										: existingLessonId
											? 'Add Words'
											: 'Save Words'}
								</Button>
							)}
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			) : (
				<Button variant={'destructive'} onClick={handleDialogClick} className='p-6'>
					<CircleStop size={20} />
				</Button>
			)}
		</>
	)
}
