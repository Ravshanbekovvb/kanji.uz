import translate from 'translate'
import { getExample, getLevel, getTranscription } from './groqAi'

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
		const translatedWord: string = await translate(word, { to: to, from: from })
		const transcription: string = await getTranscription(word)
		const example: string = await getExample(word)
		const jlptLevel: string = await getLevel(word)

		return { translatedWord, transcription, example, jlptLevel }
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Непредвиденная ошибка'

		return {
			translatedWord: '',
			transcription: '',
			example: '',
			error: errorMessage,
			jlptLevel: '',
		}
	}
}
