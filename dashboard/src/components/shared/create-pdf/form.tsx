import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FormEvent } from 'react'
import { Loader } from '../loader/loader'
import DialogPdf, { LocalWord } from './dialog-pdf'

// Local word interface for localStorage (without id and lessonId)

type Props = {
	isLoading: boolean
	translateFetch: (word: string, e: FormEvent<HTMLFormElement>) => void
	lessonTitle: string
	words: LocalWord[]
	existingLessonId?: string | null
}

export const Form: React.FC<Props> = ({
	isLoading,
	translateFetch,
	lessonTitle,
	words,
	existingLessonId,
}) => {
	const t = useTranslations('createLesson')
	return (
		<form
			className='w-full flex justify-center items-center gap-4 mt-auto max-xl:flex-col'
			onSubmit={e => {
				e.preventDefault()
				const formData = new FormData(e.currentTarget)
				const word = formData.get('kanji') as string
				translateFetch(word, e)
			}}
		>
			<input
				type='text'
				name='kanji'
				placeholder={t('enterYourKanji')}
				className='border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 text-base transition-all focus:ring-2 focus:ring-blue-300 outline-none w-full'
				required
			/>

			<div className='flex gap-2 max-xl:gap-5 max-xl:w-full max-xl:justify-between items-center'>
				{isLoading ? (
					<Loader className='py-6 w-full' title='Adding...' />
				) : (
					<Button type='submit' className='p-6'>
						<span className='whitespace-nowrap'>{t('addWord')}</span>
						<SendHorizontal size={20} />
					</Button>
				)}

				<DialogPdf lessonTitle={lessonTitle} words={words} existingLessonId={existingLessonId} />
			</div>
		</form>
	)
}
