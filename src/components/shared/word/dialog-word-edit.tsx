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
import { useUpdateWord } from '@/hooks/useWord'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

interface DialogWordEditProps {
	trigger: ReactNode
	word: {
		id: string
		kanji: string
		translation: string
		transcription: string
		example: string
		jlptLevel: string
	}
}

export const DialogWordEdit: React.FC<DialogWordEditProps> = ({ trigger, word }) => {
	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		kanji: word.kanji,
		translation: word.translation,
		transcription: word.transcription,
		example: word.example,
		jlptLevel: word.jlptLevel,
	})

	const updateWord = useUpdateWord()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Check if any field has changed
		const hasChanges = Object.keys(formData).some(
			key => formData[key as keyof typeof formData] !== word[key as keyof typeof word]
		)

		if (!hasChanges) {
			setOpen(false)
			return
		}

		// Only send changed fields
		const changedData: any = {}
		Object.keys(formData).forEach(key => {
			const typedKey = key as keyof typeof formData
			if (formData[typedKey] !== word[typedKey]) {
				changedData[key] = formData[typedKey]
			}
		})

		updateWord.mutate(
			{ wordId: word.id, data: changedData },
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}))
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Image src={'/edit-icon.webp'} alt='edit-icon' height={35} width={35} />
						Edit Word
					</DialogTitle>
					<DialogDescription>Edit the word details below</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<label htmlFor='kanji' className='text-sm font-medium'>
							Kanji
						</label>
						<Input
							id='kanji'
							value={formData.kanji}
							onChange={e => handleInputChange('kanji', e.target.value)}
							placeholder='Enter kanji'
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='transcription' className='text-sm font-medium'>
							Transcription
						</label>
						<Input
							id='transcription'
							value={formData.transcription}
							onChange={e => handleInputChange('transcription', e.target.value)}
							placeholder='Enter transcription'
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='translation' className='text-sm font-medium'>
							Translation
						</label>
						<Input
							id='translation'
							value={formData.translation}
							onChange={e => handleInputChange('translation', e.target.value)}
							placeholder='Enter translation'
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='example' className='text-sm font-medium'>
							Example
						</label>
						<Input
							id='example'
							value={formData.example}
							onChange={e => handleInputChange('example', e.target.value)}
							placeholder='Enter example'
							required
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='jlptLevel' className='text-sm font-medium'>
							JLPT Level
						</label>
						<Input
							id='jlptLevel'
							value={formData.jlptLevel}
							onChange={e => handleInputChange('jlptLevel', e.target.value)}
							placeholder='Enter JLPT level (1-5)'
							required
						/>
					</div>

					<div className='flex items-center gap-3 pt-4'>
						<Button type='submit' disabled={updateWord.isPending}>
							{updateWord.isPending ? 'Saving...' : 'Save Changes'}
						</Button>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
