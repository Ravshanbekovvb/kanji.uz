'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Section } from '@/components/ui/section'
import { useAuth } from '@/contexts/auth-context'
import { useDeleteLesson, useFindLessonsByUserId } from '@/hooks/useLessons'
import { LessonWithWords } from '@/types/types'
import { Brain, Delete, EllipsisVertical, MonitorDown, Pencil } from 'lucide-react'
import Link from 'next/link'
import { DeleteDialog } from '../delete-dialog'
import { DialogSelectTypePdf } from '../dialog-select-type-pdf/dialog-select-type-pdf'
import { PageTitle } from '../title'
import { DialogTitleEdit } from './dialog-title-edit'
export const MyLessons: React.FC = () => {
	const { user } = useAuth()
	const { data, error, isPending } = useFindLessonsByUserId(user?.id)
	const { mutate: deleteLessonById, isPending: deleteIsPending } = useDeleteLesson()
	if (error) {
		return <div className='text-red-500'>Error loading documents: {error.message}</div>
	}

	// if (isPending) {
	// 	return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	// }

	return (
		<Section>
			<div className='flex items-center justify-between mb-4'>
				<PageTitle title='My Lessons' />
				<Link href={'/create-lesson'}>
					<Button className='w'>Create lesson</Button>
				</Link>
			</div>
			{isPending ? (
				<>
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className='p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer flex justify-between items-center group mb-3'
						>
							<div className='animate-pulse'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='w-6 h-6 bg-gray-200 rounded'></div>
									{/* <div className='h-6 bg-gray-200 rounded w-3/4'></div> */}
								</div>
								{/* <div className='space-y-2 mb-4'> 
									<div className='h-4 bg-gray-200 rounded w-full'></div>
									<div className='h-4 bg-gray-200 rounded w-2/3'></div>
								</div> */}
								<div className='flex justify-between items-center'>
									<div className='h-4 bg-gray-200 rounded w-20'></div>
									{/* <div className='h-4 bg-gray-200 rounded w-24'></div> */}
								</div>
							</div>
						</div>
					))}
				</>
			) : data?.lessons.length > 0 ? (
				<div className='grid gap-4'>
					{data?.lessons.map((lesson: LessonWithWords) => (
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
									<Button variant='outline'>
										<EllipsisVertical />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align='end'
									className='w-56'
									onClick={e => e.stopPropagation()}
								>
									<Link href={'/memorize'}>
										<DropdownMenuItem
											className='cursor-pointer'
											onClick={() => {
												localStorage.setItem('words-for-memorize', JSON.stringify(lesson))
											}}
										>
											MEMORIZE
											<DropdownMenuShortcut>
												<Brain />
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</Link>
									<DialogTitleEdit
										lessonId={lesson.id}
										currentTitle={lesson.title}
										trigger={
											<DropdownMenuItem
												className='cursor-pointer'
												onSelect={e => e.preventDefault()}
											>
												EDIT TITLE
												<DropdownMenuShortcut>
													<Pencil />
												</DropdownMenuShortcut>
											</DropdownMenuItem>
										}
									/>
									<DialogSelectTypePdf
										lesson={lesson}
										trigger={
											<DropdownMenuItem
												className='cursor-pointer'
												onSelect={e => e.preventDefault()}
											>
												Download PDF
												<DropdownMenuShortcut>
													<MonitorDown />
												</DropdownMenuShortcut>
											</DropdownMenuItem>
										}
									/>
									<DropdownMenuSeparator />
									<DeleteDialog
										isPending={deleteIsPending}
										deleteItemFn={deleteLessonById}
										itemId={lesson.id}
										dialogTrigger={
											<DropdownMenuItem
												className='cursor-pointer flex items-center gap-2 text-red-400 '
												onSelect={e => e.preventDefault()}
											>
												DELETE
												<DropdownMenuShortcut>
													<Delete className='text-red-400 ' />
												</DropdownMenuShortcut>
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
