import { NotFoundError } from '@/types/errors'
import { Lesson, prisma, PrismaClient, User, Word } from './prisma'

type LessonWithUser = Lesson & {
	user: User
}

class LessonService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<LessonWithUser | null> {
		const existingLesson = await this.prisma.lesson.findUnique({
			where: {
				id,
			},
			include: {
				user: true,
			},
		})

		return existingLesson
	}

	async findByUserId(userId: string): Promise<User & { lesson: (Lesson & { words: Word[] })[] }> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				lesson: {
					include: {
						words: true,
					},
				},
			},
		})

		if (!existingUser) throw new NotFoundError(`User not found with this ID: #${userId}`)

		return existingUser
	}

	async findAllForAdmin(): Promise<Pick<LessonWithUser, 'user' | 'id' | 'title' | 'userId'>[]> {
		const existingLessons = await this.prisma.lesson.findMany({
			select: {
				id: true,
				title: true,
				user: true,
				userId: true,
				words: true,
			},
		})

		return existingLessons
	}

	async create() {}

	async createLessonWithWords(
		userId: string,
		title: string,
		words: Array<{
			kanji: string
			translation: string
			transcription: string
			example: string
			jlptLevel: string
		}>
	): Promise<Lesson & { words: Word[] }> {
		const newLesson = await this.prisma.lesson.create({
			data: {
				title,
				userId,
				words: {
					create: words.map(word => ({
						kanji: word.kanji,
						translation: word.translation,
						transcription: word.transcription,
						example: word.example,
						jlptLevel: word.jlptLevel,
					})),
				},
			},
			include: {
				words: true,
			},
		})

		return newLesson
	}

	async deleteById(id: string) {
		const existingLesson = await this.findById(id)

		if (!existingLesson) throw new NotFoundError(`Lesson with this ID not found: #${id}`)

		const deletedLesson = await this.prisma.lesson.delete({
			where: {
				id: existingLesson.id,
			},
		})

		return deletedLesson
	}

	async update() {}

	async updateTitle(id: string, title: string): Promise<Lesson> {
		const existingLesson = await this.findById(id)

		if (!existingLesson) throw new NotFoundError(`Lesson with this ID not found: #${id}`)

		const updatedLesson = await this.prisma.lesson.update({
			where: {
				id: existingLesson.id,
			},
			data: {
				title,
			},
		})

		return updatedLesson
	}

	async findWordsByLessonId(id: string) {
		const existingLesson = await this.findById(id)

		if (!existingLesson) throw new NotFoundError(`Lesson with this ID not found: #${id}`)

		const words = await this.prisma.lesson.findMany({
			where: {
				id: existingLesson.id,
			},
			select: {
				words: true,
				title: true,
			},
		})

		return words
	}

	async addWordsToLesson(
		lessonId: string,
		words: Array<{
			kanji: string
			translation: string
			transcription: string
			example: string
			jlptLevel: string
		}>
	): Promise<Lesson & { words: Word[] }> {
		const existingLesson = await this.findById(lessonId)

		if (!existingLesson) throw new NotFoundError(`Lesson with this ID not found: #${lessonId}`)

		const updatedLesson = await this.prisma.lesson.update({
			where: {
				id: lessonId,
			},
			data: {
				words: {
					create: words.map(word => ({
						kanji: word.kanji,
						translation: word.translation,
						transcription: word.transcription,
						example: word.example,
						jlptLevel: word.jlptLevel,
					})),
				},
			},
			include: {
				words: true,
			},
		})

		return updatedLesson
	}
}

const lessonService = new LessonService(prisma)
type LessonServiceType = typeof lessonService

export { lessonService, type LessonServiceType }
