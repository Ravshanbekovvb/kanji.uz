import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { createPdf } from '@/lib/func/create-pdf'
import { LessonWithWords } from '@/types/types'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Loader } from '../loader'

interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

interface DialogSelectTypePdfProps {
	lesson?: LessonWithWords
	customWords?: LocalWord[]
	lessonTitle?: string
	trigger: ReactNode
	onDownload?: (pdfType: 'table' | 'card' | 'beginner') => Promise<void>
}
export const DialogSelectTypePdf: React.FC<DialogSelectTypePdfProps> = ({
	lesson,
	customWords,
	lessonTitle,
	trigger,
	onDownload,
}) => {
	const t = useTranslations('createLesson')
	const [pdfType, setPdfType] = useState<'table' | 'card' | 'beginner'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-3xl flex flex-col items-center'>
				<DialogHeader>
					<DialogTitle className='text-3xl font-bold text-center mb-6 max-sm:mb-9 max-sm:text-xl'>
						{t('selectPdfType')}
					</DialogTitle>
					<DialogDescription asChild></DialogDescription>
				</DialogHeader>
				<div>
					<div className='flex items-center justify-center gap-6 max-h-[220px] max-sm:flex-col max-sm:max-h-[400px]'>
						<div
							className={`border-2 rounded-xl p-3 max-sm:w-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
								pdfType === 'table'
									? 'border-blue-500 bg-blue-50 shadow-md'
									: 'border-gray-300 hover:border-gray-400'
							}`}
							onClick={() => setPdfType('table')}
						>
							<div className='flex flex-col items-center text-center'>
								<span className='font-semibold text-xl mb-2 text-gray-800'>{t('tableFormat')}</span>

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
							className={`border-2 rounded-xl p-3 max-sm:w-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
								pdfType === 'card'
									? 'border-blue-500 bg-blue-50 shadow-md'
									: 'border-gray-300 hover:border-gray-400'
							}`}
							onClick={() => setPdfType('card')}
						>
							<div className='flex flex-col items-center text-center'>
								<span className='font-semibold text-xl mb-2 text-gray-800'>{t('cardFormat')}</span>

								<Image
									src='/card-image.png'
									alt='card-format'
									width={180}
									height={90}
									className='rounded-lg border shadow-sm object-cover min-h-[160px] min-w-[200px]'
								/>
							</div>
						</div>
						<div
							className={`border-2 rounded-xl p-3 max-sm:w-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
								pdfType === 'beginner'
									? 'border-blue-500 bg-blue-50 shadow-md'
									: 'border-gray-300 hover:border-gray-400'
							}`}
							onClick={() => setPdfType('beginner')}
						>
							<div className='flex flex-col items-center text-center'>
								<span className='font-semibold text-xl mb-2 text-gray-800'>
									{t('beginnerFormat')}
								</span>

								<Image
									src='/beginner-format.png'
									alt='beginner-format'
									width={180}
									height={90}
									className='rounded-lg border shadow-sm object-cover min-h-[160px] min-w-[200px]'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full'>
					{isDownloading ? (
						<Loader className='mt-10 w-full' />
					) : (
						<Button
							className='mt-10 w-full'
							onClick={async () => {
								setIsDownloading(true)
								setTimeout(async () => {
									try {
										if (onDownload) {
											// Custom download handler (for dialog-pdf.tsx case)
											await onDownload(pdfType)
										} else if (lesson) {
											// Default behavior (for existing usage)
											await createPdf({
												words: lesson.words,
												title: lesson.title,
												type: pdfType,
											})
										} else if (customWords && lessonTitle) {
											// Custom words case
											await createPdf({
												words: customWords,
												title: lessonTitle,
												type: pdfType,
											})
										}
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
							<Download />
							{t('downloadPdf')}
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
