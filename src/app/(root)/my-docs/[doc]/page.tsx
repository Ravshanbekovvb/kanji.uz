'use client'
import { DeleteDialog, Loader } from '@/components/shared'
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
import { useDeleteWord } from '@/hooks/useWord'
import { createPdf } from '@/lib/create-pdf'
import { ArrowLeft, Download, Edit, Trash2 } from 'lucide-react'
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
	const { mutate: DeleteWord, isPending: deleteWordIsPending } = useDeleteWord()
	const params = useParams()
	if (!params.doc) {
		return 'loading..'
	}
	const { data, error, isPending } = useFindLessonById(params.doc)
	if (isPending) {
		return (
			<div className='p-6'>
				<div className='text-center'>Loading Lesson words...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='p-6'>
				<div className='text-center text-red-500'>Error Lesson words</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div className='p-6'>
				<div className='text-center'>words not found</div>
			</div>
		)
	}

	return (
		<div>
			<Link
				href='/my-docs'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4'
			>
				<ArrowLeft size={18} />
				<span>Back to My documents</span>
			</Link>

			<h2 className='mb-4 text-4xl font-semibold'>{data.title}</h2>

			<div className='max-h-89 overflow-y-auto'>
				<table className='min-w-full border rounded-md text-left text-sm'>
					<thead className='bg-gray-100 text-gray-700 '>
						<tr>
							<th className='px-4 py-2 border'>#</th>
							<th className='px-4 py-2 border'>Kanji</th>
							<th className='px-4 py-2 border'>Tarjima</th>
							<th className='px-4 py-2 border'>Transkripsiya</th>
							<th className='px-4 py-2 border'>Misol</th>
							<th className='px-4 py-2 border'>JLPT</th>
							<th className='py-2 border text-center'>A</th>
						</tr>
					</thead>
					<tbody>
						{data.words.map((item: Word, index: number) => (
							<tr key={item.id} className='hover:bg-gray-200/80 group'>
								<td className='px-4 py-2 border font-medium'>{index + 1}</td>
								<td className='px-4 py-2 border text-xl flex items-center justify-between'>
									{item.kanji}
									<Edit
										className='group-hover:opacity-100 opacity-0 transition-opacity duration-200 cursor-pointer'
										size={20}
									/>
								</td>
								<td className='px-4 py-2 border'>{item.translation}</td>
								<td className='px-4 py-2 border'>{item.transcription}</td>
								<td className='px-4 py-2 border'>{item.example}</td>
								<td className='px-4 py-2 border'>{item.jlptLevel}</td>
								<td className='px-4 py-2 border'>
									<DeleteDialog
										itemId={item.id}
										isPending={deleteWordIsPending}
										deleteItemFn={DeleteWord}
										dialogTrigger={
											<Trash2 className='mx-auto cursor-pointer hover:text-red-500 transition-colors' />
										}
									/>
								</td>
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
