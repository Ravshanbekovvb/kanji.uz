import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
	getExampleWithFallback,
	getLevelWithFallback,
	getTranscriptionWithFallback,
} from '@/lib/func/groqAi'
import { cn } from '@/lib/func/utils'
import { useStore } from '@/store/store'
import { Loader2, Wand2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
interface Words {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}
interface DialogUpdateKanjiProps {
	datas?: Word
	className?: string
	word: string
	currentText: string
	isNewWord?: boolean
}

interface Word {
	kanji: string
	transcription: string
	translation: string
	example: string
	type: 'kanji' | 'transcription' | 'translation' | 'example' | 'jlptLevel'
	ind: number
	isNewWord?: boolean
}

export const DialogUpdateKanji = ({
	word,
	className,
	datas,
	currentText,
	isNewWord = false,
}: DialogUpdateKanjiProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLoading, setIsLoading] = useState(false)
	const { setIsUpdate, currentAi } = useStore()

	const generateWithAI = async () => {
		if (!datas?.kanji || !datas?.type) return

		setIsLoading(true)
		try {
			let result = { value: '', isManual: false }

			switch (datas.type) {
				case 'transcription':
					result = await getTranscriptionWithFallback(datas.kanji, currentAi)
					break
				case 'example':
					result = await getExampleWithFallback(datas.kanji, currentAi)
					break
				case 'jlptLevel':
					result = await getLevelWithFallback(datas.kanji, currentAi)
					break
				default:
					toast.error('AI generation not available for this field')
					return
			}

			if (result.isManual) {
				toast.warning(`AI failed to generate ${datas.type}. Please enter manually.`)
			} else if (result.value && inputRef.current) {
				inputRef.current.value = result.value
				toast.success(`AI generated ${datas.type} successfully!`)
			} else {
				toast.error(`Failed to generate ${datas.type}`)
			}
		} catch (error) {
			console.error('Error generating with AI:', error)
			toast.error(`Failed to generate ${datas.type}. Please enter manually.`)
		} finally {
			setIsLoading(false)
		}
	}

	const saveChange = () => {
		const index = datas?.ind
		const datasType = datas?.type
		const currentValue = inputRef?.current?.value

		if (typeof index === 'number' && inputRef && datasType && currentValue) {
			// Use isNewWord flag or check if datas has isNewWord property
			const shouldUpdateNewWords = isNewWord || datas?.isNewWord

			if (shouldUpdateNewWords) {
				// Update newWords localStorage (for new words in existing lessons)
				const storedNewWords = localStorage.getItem('newWords')
				const newWords: Words[] = storedNewWords ? JSON.parse(storedNewWords) : []

				if (index < newWords.length) {
					newWords[index][datasType] = currentValue
					localStorage.setItem('newWords', JSON.stringify(newWords))
					setIsUpdate(Math.random())
					toast.success('saved changes ' + currentValue)
					return
				}
			}

			// Update regular words localStorage (for new lessons or existing lesson words)
			const storegedWords = localStorage.getItem('words')
			const words: Words[] = storegedWords ? JSON.parse(storegedWords) : []

			if (index < words.length) {
				words[index][datasType] = currentValue
				localStorage.setItem('words', JSON.stringify(words))
				setIsUpdate(Math.random())
				toast.success('saved changes ' + currentValue)
			} else {
				toast.error('Could not find word to update')
			}
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className={cn(className)}>{currentText}</div>
			</DialogTrigger>
			<DialogContent className='flex flex-col gap-3'>
				<DialogHeader>
					<DialogTitle>Edit {datas?.type}</DialogTitle>
					<DialogDescription>
						{datas?.kanji} - {datas?.transcription} - {datas?.translation} - {datas?.example}
					</DialogDescription>
					<div className='flex gap-2'>
						<Input
							type='text'
							className='border border-black p-1 flex-1'
							defaultValue={word}
							ref={inputRef}
						/>
						{(datas?.type === 'transcription' ||
							datas?.type === 'example' ||
							datas?.type === 'jlptLevel') && (
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={generateWithAI}
								disabled={isLoading}
								className='shrink-0'
							>
								{isLoading ? (
									<Loader2 className='h-4 w-4 animate-spin' />
								) : (
									<Wand2 className='h-4 w-4' />
								)}
								{isLoading ? 'Generating...' : 'AI'}
							</Button>
						)}
					</div>
				</DialogHeader>

				<DialogClose asChild>
					<Button
						onClick={() => {
							saveChange()
						}}
					>
						Save changes
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	)
}
