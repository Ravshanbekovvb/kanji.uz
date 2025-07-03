import { NotFoundError } from '@/types/errors'
import { Lesson, prisma, PrismaClient, User } from './prisma'

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

	async findByUserId(userId: string): Promise<User & { lesson: Lesson[] }> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				lesson: true,
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
			},
		})

		return existingLessons
	}

	async create() {}

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

	async findWordsByLessonId(id: string) {
		const existingLesson = await this.findById(id)

		if (!existingLesson) throw new NotFoundError(`Lesson with this ID not found: #${id}`)

		const words = await this.prisma.lesson.findMany({
			where: {
				id: existingLesson.id,
			},
			select: {
				words: true,
			},
		})

		return words
	}
}

const lessonService = new LessonService(prisma)
type LessonServiceType = typeof lessonService

export { lessonService, type LessonServiceType }
