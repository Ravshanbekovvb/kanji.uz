'use client'
import { Loader } from '@/components/shared'
import { PageTitle } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useFindLessonById } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { ArrowLeft, Download, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
interface Word {
	id: string
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}
export default function Page() {
	const [pdfType, setPdfType] = useState<'table' | 'card'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const params = useParams()
	if (!params.doc) {
		return 'loading..'
	}
	const { data, error, isPending } = useFindLessonById(params.doc)
	if (isPending) {
		return (
			<div className='text-center flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading document...
			</div>
		)
	}

	if (error) {
		return (
			<div className='p-6'>
				<div className='text-center text-red-500'>Error loading user profile</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div className='p-6'>
				<div className='text-center'>lesson not found</div>
			</div>
		)
	}

	return (
		<div>
			<Link
				href='/all-docs'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4'
			>
				<ArrowLeft size={18} />
				<span>Back to All documents</span>
			</Link>
			<PageTitle title={data.title} />
			<div className='max-h-89 overflow-y-auto'>
				<table className='min-w-full border border-gray-800 rounded-md text-left text-sm'>
					<thead className='bg-gray-100 text-gray-700 '>
						<tr>
							<th className='px-4 py-2 border'>#</th>
							<th className='px-4 py-2 border'>Kanji</th>
							<th className='px-4 py-2 border'>Tarjima</th>
							<th className='px-4 py-2 border'>Transkripsiya</th>
							<th className='px-4 py-2 border'>Misol</th>
							<th className='px-4 py-2 border'>JLPT</th>
						</tr>
					</thead>
					<tbody>
						{data.words.map((item: Word, index: number) => (
							<tr key={item.id} className='hover:bg-gray-50'>
								<td className='px-4 py-2 border font-medium'>{index + 1}</td>
								<td className='px-4 py-2 border text-xl'>{item.kanji}</td>
								<td className='px-4 py-2 border'>{item.translation}</td>
								<td className='px-4 py-2 border'>{item.transcription}</td>
								<td className='px-4 py-2 border'>{item.example}</td>
								<td className='px-4 py-2 border'>{item.jlptLevel}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button className='mt-10'>
						<Download className='mr-2' />
						Download PDF
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
									className={`border-2 rounded-xl p-3 min-h-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
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
							<Loader className='mt-10' />
						) : (
							<Button
								className='mt-10'
								onClick={async () => {
									setIsDownloading(true)
									setTimeout(() => {
										try {
											createPdf({
												words: data.words,
												title: data.title,
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
								<Download className='mr-2' />
								Download PDF
							</Button>
						)}
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}
