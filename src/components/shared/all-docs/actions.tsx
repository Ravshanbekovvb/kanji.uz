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
import { useDeleteLesson } from '@/hooks/useLessons'
import { createPdf } from '@/lib/create-pdf'
import { DarsData } from '@/types/types'
import { Row } from '@tanstack/react-table'
import { Download, EllipsisVertical, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteDialog } from '../delete-dialog'
import { Loader } from '../loader'

interface Props {
	row: Row<DarsData>
}

export const Actions: React.FC<Props> = ({ row }) => {
	const { mutate: deleteUser, isPending } = useDeleteLesson()
	const [pdfType, setPdfType] = useState<'table' | 'card'>('table')
	const [isDownloading, setIsDownloading] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleDeleteUser = (
		id: string,
		callbacks?: { onSuccess?: () => void; onError?: (error: any) => void }
	) => {
		deleteUser(id, {
			onSuccess: () => {
				callbacks?.onSuccess?.()
			},
			onError: error => {
				callbacks?.onError?.(error)
			},
		})
	}

	const downloadPdf = async () => {
		setIsDownloading(true)
		setTimeout(() => {
			try {
				createPdf({
					words: row.original.words,
					title: row.original.title,
					type: pdfType,
				})
				toast.success('PDF downloaded successfully!')
			} catch (error) {
				console.error('PDF yaratishda xatolik:', error)
				toast.error('Error creating PDF')
			} finally {
				setTimeout(() => {
					setIsOpen(false)
					setIsDownloading(false)
				}, 200)
			}
		}, 100)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='hover:bg-gray-100' onClick={e => e.stopPropagation()}>
					<EllipsisVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' onClick={e => e.stopPropagation()}>
				<DeleteDialog
					deleteItemFn={handleDeleteUser}
					dialogTrigger={
						<DropdownMenuItem
							className='cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600'
							onSelect={e => e.preventDefault()}
						>
							<Trash2 color='red' />
							DELETE
						</DropdownMenuItem>
					}
					itemId={row.original.id}
					isPending={isPending}
				/>

				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<DropdownMenuItem
							className='cursor-pointer flex items-center gap-2'
							onSelect={e => e.preventDefault()}
						>
							<Download color='black' />
							DOWNLOAD
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
										className={`border-2 rounded-xl p-3 min-h-full cursor-pointer transition-all duration-200 hover:shadow-lg max-sm:w-full ${
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
										className={`border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-lg max-sm:w-full ${
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
								<Button className='mt-10 w-full' onClick={downloadPdf} disabled={isDownloading}>
									<Download className='mr-2' />
									Download PDF
								</Button>
							)}
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
