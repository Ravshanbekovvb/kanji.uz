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
import { useDeleteReadingSection, useReadingSectionByJlptLevel } from '@/hooks/useReadings'
import { useStore } from '@/store/store'
import { Delete, EllipsisVertical, Folder, Pen, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BackLink } from '../../back-link'
import { DeleteDialog } from '../../delete-dialog'
import { ButtonVisibleForRole } from '../button-visible-for-role'
import { DialogUpdateReading } from './dialog-update-reading'
import { DialogUpdateTitle } from './dialog-update-title'
interface JlptLevelProps {
	params: { level: string }
}

export const JlptLevel: React.FC<JlptLevelProps> = ({ params }) => {
	const { setAddingReading } = useStore()
	const { user } = useAuth()
	const { mutate: deleteReadingSection, isPending: isPedingDeleteReading } =
		useDeleteReadingSection()
	const jlptLevelparams = useParams()
	if (!jlptLevelparams.jlptLevel) {
		return <Section>param is not defined</Section>
	}
	const { data, error, isPending } = useReadingSectionByJlptLevel(
		jlptLevelparams.jlptLevel as 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
	)

	if (error) return <Section>error {error.message}</Section>

	const level = params.level as string

	return (
		<Section>
			<BackLink href='/readings' text='Back to Readings' />

			<div className='mt-6'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-gray-900  '>
						{level.toUpperCase()} Reading Tests
					</h1>
					<ButtonVisibleForRole
						title='+ Add Reading'
						visibleRole='TEACHER'
						href='/readings/create-reading'
					/>
				</div>

				{/* {level.toLowerCase() === 'n2' ? ( */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
					{isPending ? (
						<>
							{[...Array(6)].map((_, i) => (
								<div key={i} className='p-6 rounded-2xl border border-gray-200 shadow-sm bg-white'>
									<div className='animate-pulse'>
										<div className='flex items-center gap-3 mb-3'>
											<div className='w-6 h-6 bg-gray-200 rounded'></div>
											<div className='h-6 bg-gray-200 rounded w-3/4'></div>
										</div>
										<div className='space-y-2 mb-4'>
											<div className='h-4 bg-gray-200 rounded w-full'></div>
											<div className='h-4 bg-gray-200 rounded w-2/3'></div>
										</div>
										<div className='flex justify-between items-center'>
											<div className='h-4 bg-gray-200 rounded w-20'></div>
											<div className='h-4 bg-gray-200 rounded w-24'></div>
										</div>
									</div>
								</div>
							))}
						</>
					) : data?.length > 0 ? (
						data.map(section => (
							<Link
								key={section.id}
								href={`/readings/${level}/test/${section.id}`}
								className='p-6 rounded-2xl border border-gray-200 shadow-sm bg-white hover:bg-blue-50 transition-all duration-200 group flex flex-col justify-between'
							>
								<div>
									<div className='flex justify-between items-start mb-3'>
										<div className='flex items-center gap-3'>
											<Folder />
											<h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600'>
												{section.title}
											</h3>
										</div>
										{user?.role === 'TEACHER' && (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant='outline'>
														<EllipsisVertical />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													className='w-56'
													align='start'
													onClick={e => {
														e.stopPropagation()
													}}
												>
													<Link href={'/readings/create-reading'}>
														<DropdownMenuItem
															onClick={() => {
																setAddingReading(section.id, section.title, section.jlptLevel)
															}}
														>
															Add Reading
															<DropdownMenuShortcut>
																<Plus />
															</DropdownMenuShortcut>
														</DropdownMenuItem>
													</Link>
													<DialogUpdateTitle
														trigger={
															<DropdownMenuItem onSelect={e => e.preventDefault()}>
																Update title
																<DropdownMenuShortcut>
																	<Pen />
																</DropdownMenuShortcut>
															</DropdownMenuItem>
														}
														data={section.title}
														id={section.id}
													/>
													<DialogUpdateReading
														trigger={
															<DropdownMenuItem onSelect={e => e.preventDefault()}>
																Update Tests
																<DropdownMenuShortcut>
																	<Pencil />
																</DropdownMenuShortcut>
															</DropdownMenuItem>
														}
														sectionId={section.id}
														sectionTitle={section.title}
													/>

													<DropdownMenuSeparator />
													<DeleteDialog
														itemId={section.id}
														deleteItemFn={deleteReadingSection}
														dialogTrigger={
															<DropdownMenuItem
																onSelect={e => {
																	e.stopPropagation()
																	e.preventDefault()
																}}
																className='text-red-400'
															>
																Delete
																<DropdownMenuShortcut>
																	<Delete className='text-red-400' />
																</DropdownMenuShortcut>
															</DropdownMenuItem>
														}
														isPending={isPedingDeleteReading}
													/>
												</DropdownMenuContent>
											</DropdownMenu>
										)}
									</div>
								</div>
								<div className='flex justify-between items-center mt-2 '>
									<span className='text-sm text-gray-500'>
										{section._count.readingTests} reading
									</span>
									<span className='text-blue-600 font-medium group-hover:text-blue-700'>
										Start Test →
									</span>
								</div>
							</Link>
						))
					) : (
						<div className='text-gray-500 '>
							Bu darajadagi testlar hali tayyorlanmoqda. Tez orada yangi o‘qish mashqlari bilan
							qaytamiz 💪
						</div>
					)}
				</div>
			</div>
		</Section>
	)
}
