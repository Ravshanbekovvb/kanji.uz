import Groq from 'groq-sdk'
import OpenAI from 'openai'

const groq = new Groq({
	apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
})

const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
	defaultHeaders: {
		'HTTP-Referer': 'https://words-pdf-2.vercel.app/', // Optional. Site URL for rankings on openrouter.ai.
		'X-Title': 'TSUKUROU', // Optional. Site title for rankings on openrouter.ai.
	},
})

// Helper function to get AI completion based on current AI setting
const getAICompletion = async (prompt: string, currentAi: 'chatgpt' | 'groq') => {
	if (currentAi === 'chatgpt') {
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 100,
		})
		return completion.choices[0]?.message?.content || ''
	} else {
		const completion = await groq.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: 'llama-3.3-70b-versatile',
		})
		return completion.choices[0]?.message?.content || ''
	}
}

export const getTranscription = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<string> => {
	try {
		const prompt =
			currentAi === 'chatgpt'
				? `Return only the hiragana reading of "${kanji}". No romaji, no kanji, no extra text.`
				: `Please transliterate the following Japanese word into Hiragana only. Provide only the Hiragana transliteration and nothing else. Do not include any additional information, explanation, or formatting.please, only HIRAGANA. The word to transliterate is: "${kanji}".`
		const result = await getAICompletion(prompt, currentAi)
		return result.trim()
	} catch (error) {
		console.error('Error getting transcription:', error)
		throw new Error('Failed to get transcription from AI')
	}
}

export const getExample = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<string> => {
	try {
		const prompt =
			currentAi === 'chatgpt'
				? `One Japanese sentence with "${kanji}". Japanese only, no translation.`
				: `Please provide a sentence or example that uses the following Japanese word: "${kanji}". The example should be a natural, everyday sentence that demonstrates the word's usage. Do not provide any additional information or explanations, just the sentence. Only in japanese. The word to use is: "${kanji}"`
		const result = await getAICompletion(prompt, currentAi)
		return result.trim()
	} catch (error) {
		console.error('Error getting example:', error)
		throw new Error('Failed to get example from AI')
	}
}

export const getLevel = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<string> => {
	try {
		const prompt =
			currentAi === 'chatgpt'
				? `Return only a single digit (1–5) for JLPT level of "${kanji}", or 0 if unknown. No text.`
				: `You must strictly identify the JLPT level of the following Japanese word: "${kanji}". Only return a single digit: 1, 2, 3, 4, or 5 — representing N1, N2, N3, N4, or N5 respectively. Do NOT include any letters (like "N"), words, or explanations. ONLY respond with one of these digits: 1, 2, 3, 4, or 5. If unknown, respond with "0".`
		const result = await getAICompletion(prompt, currentAi)
		return result.trim()
	} catch (error) {
		console.error('Error getting JLPT level:', error)
		throw new Error('Failed to get JLPT level from AI')
	}
}

// Manual fallback functions for when AI fails
export const getTranscriptionWithFallback = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getTranscription(kanji, currentAi)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI transcription failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}

export const getExampleWithFallback = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getExample(kanji, currentAi)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI example failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}

export const getLevelWithFallback = async (
	kanji: string,
	currentAi: 'chatgpt' | 'groq' = 'groq'
): Promise<{ value: string; isManual: boolean }> => {
	try {
		const aiResult = await getLevel(kanji, currentAi)
		return { value: aiResult, isManual: false }
	} catch (error) {
		console.error('AI level detection failed, falling back to manual input:', error)
		return { value: '', isManual: true }
	}
}
