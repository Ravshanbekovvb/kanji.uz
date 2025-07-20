import Groq from 'groq-sdk'

const groq = new Groq({
	apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
})

export const getTranscription = async (kanji: string): Promise<string> => {
	let transcription: string = ''
	await groq.chat.completions
		.create({
			messages: [
				{
					role: 'user',
					content: `Please transliterate the following Japanese word into Hiragana only. Provide only the Hiragana transliteration and nothing else. Do not include any additional information, explanation, or formatting.please, only HIRAGANA. The word to transliterate is: "${kanji}".`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})
		.then(chatCompletion => {
			const hiraganaContent = chatCompletion.choices[0]?.message?.content || ''
			transcription = hiraganaContent
		})
		.catch(err => {
			return 'error in transcription'
		})
	return transcription
}

export const getExample = async (kanji: string): Promise<string> => {
	let transcription: string = ''
	await groq.chat.completions
		.create({
			messages: [
				{
					role: 'user',
					content: `Please provide a sentence or example that uses the following Japanese word: "${kanji}". The example should be a natural, everyday sentence that demonstrates the word's usage. Do not provide any additional information or explanations, just the sentence. Only in japanese. The word to use is: "${kanji}"`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})
		.then(chatCompletion => {
			const hiraganaContent = chatCompletion.choices[0]?.message?.content || ''
			transcription = hiraganaContent
		})
		.catch(err => {
			return 'error in transcription'
		})
	return transcription
}

export const getLevel = async (kanji: string): Promise<string> => {
	let level: string = ''
	await groq.chat.completions
		.create({
			messages: [
				{
					role: 'user',
					content: `You must strictly identify the JLPT level of the following Japanese word: "${kanji}". Only return a single digit: 1, 2, 3, 4, or 5 — representing N1, N2, N3, N4, or N5 respectively. Do NOT include any letters (like "N"), words, or explanations. ONLY respond with one of these digits: 1, 2, 3, 4, or 5. If unknown, respond with "0".`,
				},
			],
			model: 'llama-3.3-70b-versatile',
		})
		.then(chatCompletion => {
			const jlptLevel = chatCompletion.choices[0]?.message?.content || ''
			level = jlptLevel.trim()
		})
		.catch(err => {
			return 'error in JLPT level check'
		})
	return level
}
