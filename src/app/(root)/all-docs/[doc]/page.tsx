'use client'
import { Loader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { useFindLessonById } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { ArrowLeft, Download } from 'lucide-react'
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
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const params = useParams()
	if (!params.doc) {
		return 'loading..'
	}
	const { data, error, isPending } = useFindLessonById(params.doc)
	if (isPending) {
		return (
			<div className='p-6'>
				<div className='text-center'>Loading user profile...</div>
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
	console.log(data)

	return (
		<div>
			<Link
				href='/all-docs'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4'
			>
				<ArrowLeft size={18} />
				<span>Back to All documents</span>
			</Link>
			<h2 className='mb-4 text-4xl font-semibold'>{data.title}</h2>
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

			{isDownloading ? (
				<Loader title='downloading...' className='mt-10' />
			) : (
				<Button
					className='mt-10'
					onClick={async () => {
						setIsDownloading(true)
						setTimeout(() => {
							try {
								createPdf({ words: data.words, title: data.title })
							} catch (error) {
								console.error('PDF yaratishda xatolik:', error)
							} finally {
								setTimeout(() => setIsDownloading(false), 200)
							}
						}, 100)
					}}
					disabled={isDownloading}
				>
					<Download />
					Download PDF
				</Button>
			)}
		</div>
	)
}
