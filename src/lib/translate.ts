import translate from 'translate'
import {
	getExampleWithFallback,
	getLevelWithFallback,
	getTranscriptionWithFallback,
} from './groqAi'

export const translateText = async (
	word: string,
	to: string,
	from?: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
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
		const transcriptionResult = await getTranscriptionWithFallback(word, currentAi)
		const exampleResult = await getExampleWithFallback(word, currentAi)
		const jlptLevelResult = await getLevelWithFallback(word, currentAi)

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
