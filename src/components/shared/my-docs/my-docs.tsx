'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { useDeleteLesson, useFindLessonsByUserId } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { LessonWithWords } from '@/types/types'
import { Download, EllipsisVertical, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DeleteDialog } from '../delete-dialog'
import { Loader } from '../loader'
import { PageTitle } from '../title'
import { DialogTitleEdit } from './dialog-title-edit'
export const MyDocs: React.FC = () => {
	const [pdfType, setPdfType] = useState<'table' | 'card'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { user } = useAuth()
	const { data, error, isPending } = useFindLessonsByUserId(user?.id)
	const { mutate: deleteLessonById, isPending: deleteIsPending } = useDeleteLesson()
	if (error) {
		return <div className='text-red-500'>Error loading documents: {error.message}</div>
	}

	if (isPending) {
		return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	}

	if (!data || !data.lessons) {
		return <div>No documents found</div>
	}
	return (
		<div>
			<div className='flex items-center justify-between mb-4'>
				<PageTitle title='My Lessons' />
				<Link href={'/create-lesson'}>
					<Button className='w'>Create lesson</Button>
				</Link>
			</div>
			{data.lessons.length > 0 ? (
				<div className='grid gap-4'>
					{data.lessons.map((lesson: LessonWithWords) => (
						<Link
							href={`my-lessons/${lesson.id}`}
							key={lesson.id}
							className='p-4 border border-gray-300 rounded-lg hover:bg-gray-200 cursor-pointer flex justify-between items-center group'
						>
							<div>
								<h3 className='text-xl font-medium relative'>{lesson.title} </h3>
								<p className='text-sm font-semibold text-purple-600 bg-indigo-100 px-3 py-1 rounded-full group-hover:bg-indigo-200'>
									Words: {lesson.words?.length || 0}
								</p>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<EllipsisVertical className='h-10 w-10 p-2 bg-white group-hover:border border-black rounded-full cursor-default' />
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end' onClick={e => e.stopPropagation()}>
									<Link href={'/memorize'}>
										<DropdownMenuItem
											className='cursor-pointer flex items-center gap-2'
											onClick={() => {
												localStorage.setItem('words-for-memorize', JSON.stringify(lesson))
											}}
										>
											<Image src={'/target-icon.webp'} alt='target-icon' height={8} width={23} />
											MEMORIZE
										</DropdownMenuItem>
									</Link>
									<DialogTitleEdit
										lessonId={lesson.id}
										currentTitle={lesson.title}
										trigger={
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2'
												onSelect={e => e.preventDefault()}
											>
												<Image src={'/edit-icon.webp'} alt='target-icon' height={8} width={23} />
												EDIT TITLE
											</DropdownMenuItem>
										}
									/>
									<Dialog open={isOpen} onOpenChange={setIsOpen}>
										<DialogTrigger asChild>
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2'
												onSelect={e => e.preventDefault()}
											>
												<Image
													src={'/download-icon.webp'}
													alt='target-icon'
													height={8}
													width={23}
												/>
												Download PDF
											</DropdownMenuItem>
										</DialogTrigger>
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
															className={`border-2 rounded-xl p-3 max-sm:w-full cursor-pointer transition-all duration-200 hover:shadow-lg ${
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
									<DeleteDialog
										isPending={deleteIsPending}
										deleteItemFn={deleteLessonById}
										itemId={lesson.id}
										dialogTrigger={
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
												onSelect={e => e.preventDefault()}
											>
												<Image src={'/delete-icon.webp'} alt='delete-icon' width={20} height={20} />
												DELETE
											</DropdownMenuItem>
										}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						</Link>
					))}
				</div>
			) : (
				<div className='text-gray-500'>You haven't created any documents yet.</div>
			)}
		</div>
	)
}
