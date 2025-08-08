import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import clsx from 'clsx'
import { Check, Eye, HelpCircle, RefreshCcw, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { PageTitle } from '../title'
interface Props {
	needHelp: boolean
	setNeedHelp: Dispatch<SetStateAction<boolean>>
	wordsLength: boolean
	setWords: Dispatch<SetStateAction<any[]>>
}
export const MemorizeHeader: React.FC<Props> = ({
	needHelp,
	setNeedHelp,
	wordsLength,
	setWords,
}) => {
	return (
		<div className='flex items-center gap-5 justify-between'>
			<PageTitle title='Memorize' />

			<div
				className={clsx(
					'flex items-center gap-5 max-sm:justify-center max-sm:w-full',
					wordsLength ? '' : 'hidden'
				)}
			>
				<Button
					variant={'outline'}
					className='cursor-pointer'
					onClick={() => {
						setWords([])
					}}
				>
					<RefreshCcw size={15} />
				</Button>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className='text-gray-500 hover:text-black transition-colors'
							onClick={() => setNeedHelp(!needHelp)}
						>
							<HelpCircle size={24} className='cursor-pointer' />
						</Button>
					</PopoverTrigger>

					<PopoverContent className='w-[90vw] max-w-[500px] p-4 mr-10 max-md:mr-5'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg sm:text-xl font-semibold text-gray-800'>About the Buttons</h3>
							<PopoverClose asChild>
								<button
									className='text-gray-500 hover:text-red-500 transition-colors'
									onClick={() => setNeedHelp(false)}
								>
									<X className='w-5 h-5' />
								</button>
							</PopoverClose>
						</div>

						<div className='text-gray-600 text-sm flex flex-col gap-5'>
							{/* Don't Know */}
							<div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3'>
								<Button variant='keyboard_Button' className='hidden md:flex min-h-10 px-4'>
									space
								</Button>
								<Button
									variant='destructive'
									className='flex md:hidden items-center gap-2 min-h-10 px-4'
									disabled
								>
									<X className='w-4 h-4' />
									<span>Don't know</span>
								</Button>
								<span>
									Press when you couldn't remember the word. The word will be shown again.
								</span>
							</div>

							{/* View */}
							<div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3'>
								<Button variant='keyboard_Button' className='hidden md:flex min-h-10 px-4'>
									ctrl
								</Button>
								<Button
									variant='outline'
									className='flex md:hidden items-center gap-2 min-h-10 px-4'
									disabled
								>
									<Eye className='w-4 h-4 mr-2' />
									<span>View</span>
								</Button>
								<span>View word details and hints.</span>
							</div>

							{/* Got it */}
							<div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3'>
								<Button variant='keyboard_Button' className='hidden md:flex min-h-10 min-w-25 px-4'>
									↵ enter
								</Button>
								<Button
									variant='default'
									className='flex md:hidden items-center gap-2 min-h-10 px-4 bg-green-600 hover:bg-green-700'
									disabled
								>
									<Check className='w-4 h-4' />
									<span>Got it!</span>
								</Button>
								<span>Press when you successfully remembered the word.</span>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
