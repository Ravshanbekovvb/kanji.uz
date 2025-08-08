import Groq from 'groq-sdk'

const groq = new Groq({
	apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
})

export const getTranscription = async (kanji: string): Promise<string> => {
	try {
		const chatCompletion = await groq.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `Please transliterate the following Japanese word into Hiragana only. Provide only the Hiragana transliteration and nothing else. Do not include any additional information, explanation, or formatting.please, only HIRAGANA. The word to transliterate is: "${kanji}".`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})

		const hiraganaContent = chatCompletion.choices[0]?.message?.content || ''
		return hiraganaContent.trim()
	} catch (error) {
		console.error('Error getting transcription:', error)
		throw new Error('Failed to get transcription from AI')
	}
}

export const getExample = async (kanji: string): Promise<string> => {
	try {
		const chatCompletion = await groq.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `Please provide a sentence or example that uses the following Japanese word: "${kanji}". The example should be a natural, everyday sentence that demonstrates the word's usage. Do not provide any additional information or explanations, just the sentence. Only in japanese. The word to use is: "${kanji}"`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})

		const exampleContent = chatCompletion.choices[0]?.message?.content || ''
		return exampleContent.trim()
	} catch (error) {
		console.error('Error getting example:', error)
		throw new Error('Failed to get example from AI')
	}
}

export const getLevel = async (kanji: string): Promise<string> => {
	try {
		const chatCompletion = await groq.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: `You must strictly identify the JLPT level of the following Japanese word: "${kanji}". Only return a single digit: 1, 2, 3, 4, or 5 — representing N1, N2, N3, N4, or N5 respectively. Do NOT include any letters (like "N"), words, or explanations. ONLY respond with one of these digits: 1, 2, 3, 4, or 5. If unknown, respond with "0".`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})

		const jlptLevel = chatCompletion.choices[0]?.message?.content || ''
		return jlptLevel.trim()
	} catch (error) {
		console.error('Error getting JLPT level:', error)
		throw new Error('Failed to get JLPT level from AI')
	}
}

// Manual fallback functions for when AI fails
export const getTranscriptionWithFallback = async (
	kanji: string
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getTranscription(kanji)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI transcription failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}

export const getExampleWithFallback = async (
	kanji: string
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getExample(kanji)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI example failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}

export const getLevelWithFallback = async (
	kanji: string
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getLevel(kanji)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI level detection failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}
