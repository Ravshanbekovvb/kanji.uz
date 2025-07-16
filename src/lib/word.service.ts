import { NotFoundError } from '@/types/errors'
import { prisma, PrismaClient, Word } from './prisma'

class WordService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<Word | null> {
		const existingWord = await this.prisma.word.findUnique({
			where: {
				id,
			},
		})

		return existingWord
	}

	async deleteById(id: string): Promise<Word> {
		const existingWord = await this.findById(id)

		if (!existingWord) throw new NotFoundError(`Word with this ID not found: #${id}`)

		const deletedWord = await this.prisma.word.delete({
			where: {
				id: existingWord.id,
			},
		})

		return deletedWord
	}

	async update(id: string, data: Partial<Omit<Word, 'id' | 'lessonId'>>): Promise<Word> {
		const existingWord = await this.findById(id)

		if (!existingWord) throw new NotFoundError(`Word with this ID not found: #${id}`)

		const updatedWord = await this.prisma.word.update({
			where: {
				id: existingWord.id,
			},
			data,
		})

		return updatedWord
	}
}

const wordService = new WordService(prisma)
type WordServiceType = typeof wordService

export { wordService, type WordServiceType }
