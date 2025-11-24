'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Brain, Delete, EllipsisVertical, MonitorDown, Pencil, Plus } from 'lucide-react'
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
					{[...Array(5)].map((_, i) => (
						<Card className='hover:bg-gray-100/60 mb-4' key={i}>
							<CardHeader className='flex flex-row items-center justify-between p-4'>
								<div>
									<CardTitle className='w-6 h-6 bg-gray-200 rounded mb-2' />
									<CardDescription className='h-4 bg-gray-200 rounded w-20' />
								</div>
								<div className='flex justify-between items-center'>
									<div className='h-10 bg-gray-200 rounded w-10'></div>
								</div>
							</CardHeader>
						</Card>
					))}
				</>
			) : data?.lessons.length > 0 ? (
				<div className='grid gap-4'>
					{data?.lessons.map((lesson: LessonWithWords) => (
						<Link href={`my-lessons/${lesson.id}`} key={lesson.id}>
							<Card className='hover:bg-gray-100/60'>
								<CardHeader className='flex flex-row items-center justify-between p-4'>
									<div>
										<CardTitle className='mb-2'>{lesson.title}</CardTitle>
										<CardDescription>
											<Badge
												variant={
													lesson.words.length < 10
														? 'destructive'
														: lesson.words.length < 20
															? 'pending'
															: 'approved'
												}
											>
												{lesson.words.length} words
											</Badge>
										</CardDescription>
									</div>
									<div>
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
														Memorize
														<DropdownMenuShortcut>
															<Brain />
														</DropdownMenuShortcut>
													</DropdownMenuItem>
												</Link>
												<Link href={`/create-lesson?lessonId=${lesson.id}`}>
													<DropdownMenuItem
														className='cursor-pointer'
														onClick={() => {
															localStorage.setItem('words-for-memorize', JSON.stringify(lesson))
														}}
													>
														Add Word
														<DropdownMenuShortcut>
															<Plus />
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
															Update Title
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
									</div>
								</CardHeader>
								{/* <CardContent></CardContent>
								<CardFooter></CardFooter>  */}
							</Card>
						</Link>
					))}
				</div>
			) : (
				<div className='text-gray-500'>You haven't created any documents yet.</div>
			)}
		</Section>
	)
}
