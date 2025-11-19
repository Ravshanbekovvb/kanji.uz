import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/store/store'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface KanjiEntry {
	kanji: string
	translation: string
	transcription: string
	jlptLevel: string
	example: string
	lineNumber: number
	hasError: boolean
	errorMessage?: string
	isBulkAtWord: true
}

interface ParseResult {
	words: KanjiEntry[]
	hasErrors: boolean
	totalLines: number
	validLines: number
}

interface DialogBulkAtProps {
	triger: ReactNode
	lessonId: string | null
}

function parseKanjiLines(text: string): ParseResult {
	const lines = text
		.split('\n')
		.map((l, index) => ({ content: l.trim(), lineNumber: index + 1 }))
		.filter(l => l.content.length > 0)

	const entries: KanjiEntry[] = []
	let validLines = 0

	lines.forEach(({ content, lineNumber }) => {
		// Remove number prefix if exists: "1. "
		const cleaned = content.replace(/^\d+\.\s*/, '')

		// Split by "–" character
		const parts = cleaned.split(/[-–]/).map(p => p.trim())

		let hasError = false
		let errorMessage = ''

		// Validate number of parts
		if (parts.length < 5) {
			hasError = true
			const missingFields = []
			if (parts.length < 2) missingFields.push('translation')
			if (parts.length < 3) missingFields.push('transcription')
			if (parts.length < 4) missingFields.push('JLPT level')
			if (parts.length < 5) missingFields.push('example')
			errorMessage = `Missing: ${missingFields.join(', ')}`
		} else if (parts.length > 5) {
			hasError = true
			errorMessage = 'Too many fields (expected 5)'
		}

		// Validate individual fields
		if (!hasError) {
			const [kanji, translation, transcription, jlptLevel, example] = parts

			if (!kanji || kanji.length === 0) {
				hasError = true
				errorMessage = 'Kanji field is empty'
			} else if (!translation || translation.length === 0) {
				hasError = true
				errorMessage = 'Translation field is empty'
			} else if (!transcription || transcription.length === 0) {
				hasError = true
				errorMessage = 'Transcription field is empty'
			} else if (!jlptLevel || jlptLevel.length === 0) {
				hasError = true
				errorMessage = 'JLPT level field is empty'
			} else if (!example || example.length === 0) {
				hasError = true
				errorMessage = 'Example field is empty'
			} else if (!jlptLevel.match(/^N[1-5]$/i)) {
				hasError = true
				errorMessage = 'JLPT level must be N1, N2, N3, N4, or N5'
			}
		}

		if (!hasError) {
			validLines++
		}

		entries.push({
			kanji: parts[0] || '',
			translation: parts[1] || '',
			transcription: parts[2] || '',
			jlptLevel: parts[3] || '',
			example: parts[4] || '',
			isBulkAtWord: true,
			lineNumber,
			hasError,
			errorMessage,
		})
	})

	return {
		words: entries,
		hasErrors: entries.some(entry => entry.hasError),
		totalLines: lines.length,
		validLines,
	}
}

export const DialogBulkAt: React.FC<DialogBulkAtProps> = ({ triger, lessonId }) => {
	const [isOpen, setIsopen] = useState<boolean>(false)
	const { setIsUpdate, setEmblaActiveIndex } = useStore()
	const [parseResult, setParseResult] = useState<ParseResult | null>(null)
	const [inputText, setInputText] = useState('')

	const handleInputChange = (text: string) => {
		setInputText(text)
		if (text.trim()) {
			const result = parseKanjiLines(text)
			setParseResult(result)
		} else {
			setParseResult(null)
		}
	}

	const handleSubmit = () => {
		if (parseResult && !parseResult.hasErrors) {
			const currentWordsJson = localStorage.getItem('words')
			const currentWords = currentWordsJson ? JSON.parse(currentWordsJson) : []
			const currentNewWordsJson = localStorage.getItem('newWords')
			const currentNewWords = currentNewWordsJson ? JSON.parse(currentNewWordsJson) : []

			setIsUpdate(Math.random())
			setIsopen(false)
			toast.success(`${parseResult.words.length} ta so'z qo'shildi!`)

			if (lessonId && typeof lessonId === 'string') {
				// Agar lessonId mavjud bo'lsa, newWords ga qo'shamiz
				const updatedNewWords = [...currentNewWords, ...parseResult.words]
				localStorage.setItem('newWords', JSON.stringify(updatedNewWords))
				setEmblaActiveIndex([...currentWords, ...updatedNewWords].length)
			} else {
				// Agar lessonId yo'q bo'lsa, words ga qo'shamiz
				const updatedWords = [...currentWords, ...parseResult.words]
				localStorage.setItem('words', JSON.stringify(updatedWords))
				setEmblaActiveIndex(updatedWords.length)
			}
		}
	}

	return (
		<Dialog onOpenChange={setIsopen} open={isOpen}>
			<DialogTrigger asChild>{triger}</DialogTrigger>
			<DialogContent className='sm:max-w-[1300px] h-[90vh] py-4'>
				<DialogHeader>
					<DialogTitle>Bulk Add Kanji</DialogTitle>
					<DialogDescription>Birdaniga 100 talab so`z qoshing!</DialogDescription>
				</DialogHeader>
				<div className='flex-1 overflow-hidden'>
					<div className='font-light mb-2 text-sm text-gray-600'>
						<span className='font-medium'>Format:</span> kanji - translation - transcription -
						jlptlevel - example
					</div>

					{/* Status Bar */}
					{parseResult && (
						<div className='mb-3 p-2 bg-gray-50 rounded-lg border'>
							<div className='flex justify-between text-sm'>
								<span>
									Words: {parseResult.totalLines} | Valid:{' '}
									<span className='text-green-600 font-medium'>{parseResult.validLines}</span>
								</span>
								{parseResult.hasErrors && (
									<span className='text-red-600 font-medium'>
										{parseResult.totalLines - parseResult.validLines} errors
									</span>
								)}
							</div>
						</div>
					)}

					<div className='flex gap-4 h-[60vh]'>
						{/* Input Area */}
						<div className='flex-1 p-2'>
							<Textarea
								className='h-full border-gray-300 font-mono text-sm resize-none'
								value={inputText}
								onChange={e => handleInputChange(e.target.value)}
								placeholder={`1. 山 – tog' – やま – N5 – 山に登るのは大変だけど、頂上の景色はとても美しい。
2. 食 – yeymoq – しょく, たべる – N5 – 朝ごはんをしっかり食べると、一日中元気に過ごせます。
3. 新 – yangi – しん, あたらしい – N5 – 新しいスマホを買ったけど、機能が多すぎてまだ慣れていません。`}
							/>
						</div>

						{/* Error Display */}
						{parseResult && parseResult.hasErrors && (
							<div className='w-80 border-l pl-4'>
								<h3 className='font-medium text-red-700 mb-2'>Errors:</h3>
								<div className='space-y-2 max-h-full overflow-y-auto'>
									{parseResult.words
										.filter(entry => entry.hasError)
										.map(entry => (
											<div
												key={entry.lineNumber}
												className='p-2 bg-red-50 border border-red-200 rounded text-sm'
											>
												<div className='font-medium text-red-700'>Line {entry.lineNumber}:</div>
												<div className='text-red-600 text-xs mt-1'>{entry.errorMessage}</div>
												<div className='text-gray-600 text-xs mt-1 truncate'>
													{entry.kanji || '(empty)'} – {entry.translation || '(empty)'} – ...
												</div>
											</div>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button
						type='submit'
						disabled={!parseResult || parseResult.hasErrors || parseResult.validLines === 0}
						onClick={() => {
							handleSubmit()
						}}
						// className='bg-blue-600 hover:bg-blue-700'
					>
						Add {parseResult?.validLines || 0} Entries
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
