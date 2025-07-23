import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SendHorizontal } from 'lucide-react'
import { FormEvent } from 'react'
import { Loader } from '../loader/loader'
import DialogPdf from './dialog-pdf'

// Local word interface for localStorage (without id and lessonId)
interface LocalWord {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

type Props = {
	settings: {
		autoTranslate: boolean
		autoAddingExample: boolean
	}
	isLoading: boolean
	translateFetch: (word: string, to: 'uz' | 'ru' | 'en', e: FormEvent<HTMLFormElement>) => void
	lessonTitle: string
	words: LocalWord[]
	existingLessonId?: string | null
}

export const Form: React.FC<Props> = ({
	settings,
	isLoading,
	translateFetch,
	lessonTitle,
	words,
	existingLessonId,
}) => {
	return (
		<form
			className={cn(
				'w-full flex justify-center items-center gap-4 mt-auto max-xl:flex-col',
				settings.autoAddingExample && settings.autoTranslate ? 'flex-row' : 'flex-col'
			)}
			onSubmit={e => {
				e.preventDefault()
				const formData = new FormData(e.currentTarget)
				const word = formData.get('kanji') as string
				const example = !settings.autoAddingExample ? (formData.get('example') as string) : null
				const translate = !settings.autoTranslate ? (formData.get('translation') as string) : null
				translateFetch(word, 'uz', e)
			}}
		>
			<input
				type='text'
				name='kanji'
				placeholder='Enter your kanji...'
				className='border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 text-base transition-all focus:ring-2 focus:ring-blue-300 outline-none w-full'
			/>

			{!settings.autoTranslate && (
				<input
					required
					type='text'
					name='translation'
					placeholder='Enter your translation...'
					className='border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 text-base shadow-md transition-all focus:ring-2 focus:ring-blue-300 outline-none w-full'
				/>
			)}
			{!settings.autoAddingExample && (
				<input
					required
					type='text'
					name='example'
					placeholder='Enter your example...'
					className='border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 text-base shadow-md transition-all focus:ring-2 focus:ring-blue-300 outline-none w-full'
				/>
			)}

			<div
				className={cn(
					'flex gap-2 max-xl:gap-5 max-xl:w-full max-sm:flex-col',
					settings.autoAddingExample && settings.autoTranslate ? '' : 'w-full'
				)}
			>
				{isLoading ? (
					<Loader className='py-6' title='Adding...' />
				) : (
					<Button type='submit' className={cn('max-md:w-full h-full py-3')}>
						<span className='whitespace-nowrap'>Add Word</span>
						<SendHorizontal size={20} />
					</Button>
				)}

				<DialogPdf lessonTitle={lessonTitle} words={words} existingLessonId={existingLessonId} />
			</div>
		</form>
	)
}
