'use client'
import { DeleteDialog } from '@/components/shared'
import { BackLink } from '@/components/shared/back-link'
import { DialogSelectTypePdf } from '@/components/shared/dialog-select-type-pdf/dialog-select-type-pdf'
import { DialogWordEdit } from '@/components/shared/word/dialog-word-edit'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { useFindLessonById } from '@/hooks/useLessons'
import { useDeleteWord } from '@/hooks/useWord'
import { Download, Edit, LoaderIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
interface Word {
	id: string
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}
export const LessonId = () => {
	const { mutate: DeleteWord, isPending: deleteWordIsPending } = useDeleteWord()
	const params = useParams()
	if (!params.lessonId) {
		return 'loading..'
	}

	const { data, error, isPending } = useFindLessonById(params.lessonId)
	if (isPending) {
		return (
			<Section className='text-center flex items-center gap-5'>
				<LoaderIcon className='rotate-right' size={40} />
				Loading Lesson words...
			</Section>
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
		<Section>
			<BackLink href='/my-lessons' text='Back to My documents' />

			<div className='mb-4 flex items-center justify-between '>
				<h2 className='mb-4 text-4xl font-semibold'>{data.title}</h2>
				<Link href={`/create-lesson?lessonId=${params.lessonId}`}>
					<Button variant={'outline'}> + Add Word</Button>
				</Link>
			</div>

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
							<th className='py-2 border text-center'>*</th>
						</tr>
					</thead>
					<tbody>
						{data.words.map((item: Word, index: number) => (
							<tr key={item.id} className='hover:bg-gray-200/80 group'>
								<td className='px-4 py-2 border font-medium'>{index + 1}</td>
								<td className='px-4 py-2 border text-xl flex items-center justify-between'>
									{item.kanji}
									<DialogWordEdit
										word={item}
										trigger={
											<Edit
												className='group-hover:opacity-100 opacity-0 transition-opacity duration-200 cursor-pointer'
												size={16}
											/>
										}
									/>
								</td>
								<td className='px-4 py-2 border relative group cursor-pointer'>
									{item.translation}
									<DialogWordEdit
										word={item}
										trigger={
											<Edit
												className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-gray-500 hover:text-black'
												size={16}
											/>
										}
									/>
								</td>
								<td className='px-4 py-2 border relative group cursor-pointer'>
									{item.transcription}
									<DialogWordEdit
										word={item}
										trigger={
											<Edit
												className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-gray-500 hover:text-black'
												size={16}
											/>
										}
									/>
								</td>
								<td className='px-4 py-2 border relative group cursor-pointer'>
									{item.example}
									<DialogWordEdit
										word={item}
										trigger={
											<Edit
												className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-gray-500 hover:text-black'
												size={16}
											/>
										}
									/>
								</td>
								<td className='px-4 py-2 border relative group cursor-pointer'>
									{item.jlptLevel}
									<DialogWordEdit
										word={item}
										trigger={
											<Edit
												className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-gray-500 hover:text-black'
												size={16}
											/>
										}
									/>
								</td>
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
			<DialogSelectTypePdf
				lesson={data as any}
				trigger={
					<Button className='mt-10'>
						<Download className='mr-2' />
						Download PDF
					</Button>
				}
			/>
		</Section>
	)
}
