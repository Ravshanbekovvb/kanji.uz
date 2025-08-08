import translate from 'translate'
import {
	getExampleWithFallback,
	getLevelWithFallback,
	getTranscriptionWithFallback,
} from './groqAi'

export const translateText = async (
	word: string,
	to: string,
	from?: string
): Promise<{
	translatedWord: string
	transcription: string
	example: string
	jlptLevel: string
	error?: string
}> => {
	translate.engine = 'google'

	try {
		// Always try to translate the word first
		const translatedWord: string = await translate(word, { to: to, from: from })

		// Try AI functions with fallback
		const transcriptionResult = await getTranscriptionWithFallback(word)
		const exampleResult = await getExampleWithFallback(word)
		const jlptLevelResult = await getLevelWithFallback(word)

		return {
			translatedWord,
			transcription: transcriptionResult.value,
			example: exampleResult.value,
			jlptLevel: jlptLevelResult.value,
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unexpected error'

		return {
			translatedWord: '',
			transcription: '',
			example: '',
			error: errorMessage,
			jlptLevel: '',
		}
	}
}
