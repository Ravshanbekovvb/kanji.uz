import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, Eye, X } from 'lucide-react'

interface KeyboardButtonsProps {
	onMemorized: () => void
	onNotMemorized: () => void
	onShowWordDetails: () => void
	showWordDetails: boolean
	currentWord: any
}

export const KeyboardButtons: React.FC<KeyboardButtonsProps> = ({
	onMemorized,
	onNotMemorized,
	onShowWordDetails,
	showWordDetails,
	currentWord,
}) => {
	return (
		<Popover open={showWordDetails} onOpenChange={onShowWordDetails}>
			<div>
				{/* Desktop - Keyboard style button */}
				<div className='flex items-center justify-center gap-18 max-lg:gap-3 max-lg:flex-col max-md:hidden'>
					<Button
						onClick={() => {
							if (!showWordDetails) {
								onNotMemorized()
							}
						}}
						variant={'keyboard_Button_space'}
						tooltip="Can't memorize"
						className='hidden md:flex min-h-12 text-lg font-medium'
						id='space'
					>
						space
					</Button>

					<PopoverTrigger asChild>
						<Button
							variant={'keyboard_Button'}
							tooltip='View word details'
							className='hidden md:flex min-h-12 text-lg font-medium w-full'
							id='ctrl'
						>
							ctrl
						</Button>
					</PopoverTrigger>

					<Button
						variant={'keyboard_Button'}
						className='hidden md:flex min-h-12 text-lg font-medium min-w-26'
						tooltip='Memorized!'
						onClick={() => onMemorized()}
						id='enter'
					>
						↵ enter
					</Button>
				</div>

				{/* Mobile - Colored button */}
				<div className='flex flex-col items-center gap-3 md:hidden'>
					<Button
						onClick={() => {
							if (!showWordDetails) {
								onNotMemorized()
							}
						}}
						variant={'destructive'}
						className='flex md:hidden w-full min-h-12 text-lg font-medium'
					>
						<X className='w-5 h-5 mr-2' />
						<span>Don't know</span>
					</Button>

					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className='flex md:hidden min-h-12 text-lg font-medium w-full'
						>
							<Eye className='w-5 h-5 mr-2' />
							<span>View</span>
						</Button>
					</PopoverTrigger>

					<Button
						className='flex md:hidden w-full min-h-12 text-lg font-medium bg-green-600 hover:bg-green-700'
						onClick={() => onMemorized()}
					>
						<Check className='w-5 h-5 mr-2' />
						<span>Got it!</span>
					</Button>
				</div>
			</div>

			<PopoverContent
				className='w-80 p-6 mx-4 max-w-[calc(100vw-2rem)]'
				side='top'
				align='center'
				sideOffset={10}
			>
				{currentWord && (
					<div className='space-y-4'>
						<div className='text-center'>
							<h3 className='text-3xl md:text-4xl font-bold mb-2'>{currentWord.kanji}</h3>
							<p className='text-lg md:text-xl text-gray-600'>{currentWord.translation}</p>
						</div>
						<div className='space-y-2 text-sm'>
							<div>
								<span className='font-semibold'>Reading:</span> {currentWord.transcription}
							</div>
							<div>
								<span className='font-semibold'>Example:</span> {currentWord.example}
							</div>
							<div>
								<span className='font-semibold'>Level:</span> {currentWord.jlptLevel}
							</div>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}
