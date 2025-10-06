'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { useDeleteLesson, useFindLessonsByUserId } from '@/hooks/useLessons'
import { LessonWithWords } from '@/types/types'
import { EllipsisVertical, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DeleteDialog } from '../delete-dialog'
import { DialogSelectTypePdf } from '../dialog-select-type-pdf/dialog-select-type-pdf'
import { PageTitle } from '../title'
import { DialogTitleEdit } from './dialog-title-edit'
export const MyDocs: React.FC = () => {
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
		<Section>
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
									<DialogSelectTypePdf
										lesson={lesson}
										trigger={
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
										}
									/>

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
		</Section>
	)
}
