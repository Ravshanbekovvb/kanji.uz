import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Loader } from '../loader'
import { Button } from '@/components/ui/button'
import { createPdf } from '@/lib/create-pdf'
import { Download } from 'lucide-react'
import { LessonWithWords } from '@/types/types'
interface DialogSelectTypePdfProps {
	lesson: LessonWithWords
	trigger: ReactNode
}
export const DialogSelectTypePdf: React.FC<DialogSelectTypePdfProps> = ({ lesson, trigger }) => {
	const [pdfType, setPdfType] = useState<'table' | 'card'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='min-w-[530px] max-sm:min-w-auto'>
				<DialogHeader>
					<DialogTitle className='text-3xl font-bold text-center mb-6 max-sm:mb-9 max-sm:text-xl'>
						Select the type of PDF
					</DialogTitle>
					<DialogDescription asChild>
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
									<span className='font-semibold text-xl mb-2 text-gray-800'>Table Format</span>

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
									<span className='font-semibold text-xl mb-2 text-gray-800'>Card Format</span>

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
						<Loader className='mt-10 w-full' />
					) : (
						<Button
							className='mt-10 w-full'
							onClick={async () => {
								setIsDownloading(true)
								setTimeout(() => {
									try {
										createPdf({
											words: lesson.words,
											title: lesson.title,
											type: pdfType,
										})
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
							Download PDF
						</Button>
					)}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
