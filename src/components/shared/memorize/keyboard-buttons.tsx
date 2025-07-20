import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
		<div className='flex items-end justify-center gap-15 '>
			<Button
				onClick={() => onNotMemorized()}
				variant={'keyboard_Button_space'}
				tooltip="Can't memorize"
				id='space'
			>
				space
			</Button>
			<Popover open={showWordDetails} onOpenChange={onShowWordDetails}>
				<PopoverTrigger asChild>
					<Button
						variant={'keyboard_Button'}
						tooltip='View word'
						onClick={onShowWordDetails}
						id='ctrl'
					>
						ctrl
					</Button>
				</PopoverTrigger>
				<PopoverContent className='p-6 absolute -top-140 -left-180'>
					{currentWord && (
						<div className='space-y-4'>
							<div className='text-center'>
								<h3 className='text-6xl font-bold mb-4'>{currentWord.kanji}</h3>
								<p className='text-2xl text-gray-600'>{currentWord.translation}</p>
							</div>
							<div className='space-y-2'>
								<div>
									<span className='font-semibold'>reading:</span> {currentWord.transcription}
								</div>
								<div>
									<span className='font-semibold'>example:</span> {currentWord.example}
								</div>
								<div>
									<span className='font-semibold'>Level:</span> {currentWord.jlptLevel}
								</div>
							</div>
						</div>
					)}
				</PopoverContent>
			</Popover>

			<Button
				variant={'keyboard_Button'}
				className='min-w-20'
				tooltip='Memorized!'
				onClick={() => onMemorized()}
				id='enter'
			>
				↵ enter
			</Button>
		</div>
	)
}
