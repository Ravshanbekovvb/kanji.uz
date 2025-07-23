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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAddWordsToLesson, useCreateLesson } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { CircleStop, Download, Trash2, UserRound } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader } from '../loader'
import { DialogUpdateKanji } from './dialog-update-word'

// Local word interface for localStorage (without id and lessonId)
interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
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
	const [pdfType, setPdfType] = useState<'table' | 'card'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isDownload, setIsDownload] = useState<boolean>(true)
	const [isWords, setWords] = useState<LocalWord[]>([])
	const { isUpdate, setIsUpdate, isKanjiCardTitle } = useStore()
	const createLesson = useCreateLesson()
	const addWordsToLesson = useAddWordsToLesson()
	const router = useRouter()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (existingLessonId) {
				setWords(propWords)
			} else {
				const storegedList = localStorage.getItem('words')
				const parsedWords: LocalWord[] = storegedList ? JSON.parse(storegedList) : []
				setWords(parsedWords)
			}
		}
	}, [isUpdate, existingLessonId, propWords])

	const canShowDialog = lessonTitle.trim().length > 0 && propWords.length > 0

	const handleDialogClick = () => {
		return true
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

	const savePdf = async () => {
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
						router.push(`/my-docs/${existingLessonId}`)
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
					router.push(`/my-docs/${existingLessonId}`)
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
					`Cannot delete existing word "${kanji}". You can only delete newly added words.`
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
						<Button variant={'destructive'} className='max-sm:w-full h-full'>
							<CircleStop size={20} />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className='min-w-[1450px] max-h-[600px] max-sm:min-w-full max-sm:min-h-full max-sm:rounded-none flex flex-col justify-between rounded-4xl'>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{existingLessonId
									? 'Check new words before adding to lesson. Adding words to existing lesson'
									: 'Check everything before saving.'}
							</AlertDialogTitle>
							<AlertDialogDescription>
								Total words: <span className='font-black'>{isWords.length}</span> {'   '}
								Title: <span className='font-black'> {lessonTitle}</span>
								{'  '}
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
											<th className='border border-gray-300 px-4 py-2'>JLPT level</th>
											<th className='border border-gray-300 px-4 py-2 w-5 text-center'>*</th>
										</tr>
									</thead>
									<tbody>
										{isWords.map((item, index) => (
											<tr key={index} className='group hover:bg-gray-100 transition-all relative'>
												<td className='border border-gray-300 px-4 py-2 relative'>
													{item.kanji}
													<DialogUpdateKanji
														datas={{
															example: item.example,
															kanji: item.kanji,
															transcription: item.transcription,
															translation: item.translation,
															type: 'kanji',
															ind: index,
														}}
														word={item.kanji}
														className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black'
													/>
												</td>
												<td className='border border-gray-300 px-4 py-2 relative'>
													{item.transcription}

													<DialogUpdateKanji
														datas={{
															example: item.example,
															kanji: item.kanji,
															transcription: item.transcription,
															translation: item.translation,
															type: 'transcription',
															ind: index,
														}}
														word={item.transcription}
														className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black'
													/>
												</td>
												<td className='border border-gray-300 px-4 py-2 relative'>
													{item.translation}
													<DialogUpdateKanji
														datas={{
															example: item.example,
															kanji: item.kanji,
															transcription: item.transcription,
															translation: item.translation,
															type: 'translation',
															ind: index,
														}}
														word={item.translation}
														className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black'
													/>
												</td>
												<td className='border border-gray-300 px-4 py-2 relative'>
													{item.example}
													<DialogUpdateKanji
														datas={{
															example: item.example,
															kanji: item.kanji,
															transcription: item.transcription,
															translation: item.translation,
															type: 'example',
															ind: index,
														}}
														word={item.example}
														className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black'
													/>
												</td>
												<td className='border border-gray-300 px-4 py-2 relative'>
													{item.jlptLevel}
													<DialogUpdateKanji
														datas={{
															example: item.example,
															kanji: item.kanji,
															transcription: item.transcription,
															translation: item.translation,
															type: 'jlptLevel',
															ind: index,
														}}
														word={item.jlptLevel}
														className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-500 hover:text-black'
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
										))}
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
							<div>Download immediately</div>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							{isDownload ? (
								<Dialog open={isOpen} onOpenChange={setIsOpen}>
									<DialogTrigger asChild>
										<Button>
											<Download />
											Save and Download
										</Button>
									</DialogTrigger>
									<DialogContent className='min-w-[530px]'>
										<DialogHeader>
											<DialogTitle className='text-3xl font-bold text-center mb-6'>
												Select the type of PDF
											</DialogTitle>
											<DialogDescription asChild>
												<div className='flex items-center justify-center gap-6 max-h-[220px]'>
													<div
														className={`border-2 rounded-xl p-3 min-h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
															pdfType === 'table'
																? 'border-blue-500 bg-blue-50 shadow-md'
																: 'border-gray-300 hover:border-gray-400'
														}`}
														onClick={() => setPdfType('table')}
													>
														<div className='flex flex-col items-center text-center'>
															<span className='font-semibold text-xl mb-2 text-gray-800'>
																Table Format
															</span>

															<Image
																src='/table-image.png'
																alt='table-format'
																width={180}
																height={70}
																className='rounded-lg border shadow-sm object-cover min-h-[160px] min-w-[200px]'
															/>
														</div>
													</div>
													<div
														className={`border-2 rounded-xl p-3 min-h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
															pdfType === 'card'
																? 'border-blue-500 bg-blue-50 shadow-md'
																: 'border-gray-300 hover:border-gray-400'
														}`}
														onClick={() => setPdfType('card')}
													>
														<div className='flex flex-col items-center text-center'>
															<span className='font-semibold text-xl mb-2 text-gray-800'>
																Card Format
															</span>

															<Image
																src='/card-image.png'
																alt='card-format'
																width={180}
																height={90}
																className='rounded-lg border shadow-sm object-cover min-h-[160px] min-w-[200px]'
															/>
														</div>
													</div>
												</div>
											</DialogDescription>

											{isDownloading ? (
												<Loader className='mt-10' />
											) : (
												<Button
													className='mt-10'
													onClick={async () => {
														setIsDownloading(true)
														setTimeout(() => {
															try {
																savePdf()
															} catch (error) {
																console.error('PDF yaratishda xatolik:', error)
															}
															// try-catch tashqarisida ishlashi kerak
															setTimeout(() => {
																setIsOpen(false)
																setIsDownloading(false)
															}, 200)
														}, 100)
													}}
													disabled={isDownloading}
												>
													<Download className='mr-2' />
													Download PDF
												</Button>
											)}
										</DialogHeader>
									</DialogContent>
								</Dialog>
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
				<Button
					variant={'destructive'}
					onClick={handleDialogClick}
					className='py-6 max-md:w-full max-sm:w-full h-full'
				>
					<CircleStop size={20} />
				</Button>
			)}
		</>
	)
}
