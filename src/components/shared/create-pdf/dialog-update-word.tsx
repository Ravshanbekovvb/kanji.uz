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
import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { Edit } from 'lucide-react'
import { useRef } from 'react'
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
}

interface Word {
	kanji: string
	transcription: string
	translation: string
	example: string
	type: 'kanji' | 'transcription' | 'translation' | 'example' | 'jlptLevel'
	ind: number
}

export const DialogUpdateKanji = ({ word, className, datas }: DialogUpdateKanjiProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { setIsUpdate } = useStore()

	const saveChange = () => {
		const storegedWords = localStorage.getItem('words')
		const words: Words[] = storegedWords ? JSON.parse(storegedWords) : []
		const index = datas?.ind
		const datasType = datas?.type
		const currentValue = inputRef?.current?.value

		if (typeof index === 'number' && inputRef && datasType && currentValue) {
			words[index][datasType] = currentValue
			localStorage.setItem('words', JSON.stringify(words))
			setIsUpdate(Math.random())
			toast.success('saved changes ' + currentValue)
		}
	}
	return (
		<Dialog>
			<DialogTrigger className={cn(className)}>
				<Edit />
			</DialogTrigger>
			<DialogContent className='flex flex-col gap-3'>
				<DialogHeader>
					<DialogTitle>Edit {datas?.type}</DialogTitle>
					<DialogDescription>
						{datas?.kanji} - {datas?.transcription} - {datas?.translation} - {datas?.example}
					</DialogDescription>
					<Input
						type='text'
						className='border border-black p-1'
						defaultValue={word}
						ref={inputRef}
					/>
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
