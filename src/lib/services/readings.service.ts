import { ReadingType } from '@/types/types'
import { prisma, PrismaClient } from '../prisma'

import { ConflictError, NotFoundError } from '@/types/errors'
import { ReadingSection } from '../../../prisma/__generated__'

class ReadingsService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<ReadingSection> {
		const existingReadingSection = await this.prisma.readingSection.findUnique({
			where: {
				id,
			},
		})

		if (!existingReadingSection)
			throw new NotFoundError(`There is no Reading Section with this ID: #${id}`)

		return existingReadingSection
	}
	async findReadingSectionWithTestsById(id: string): Promise<ReadingSection> {
		const existingReadingSectionWithTests = await this.prisma.readingSection.findUnique({
			where: {
				id: id,
			},
			include: {
				readingTests: {
					include: {
						author: {
							select: {
								userName: true,
								id: true,
							},
						},
						questions: true,
					},
				},
			},
		})
		if (!existingReadingSectionWithTests) {
			throw new NotFoundError(`Reading Section with ID "${id}" not found`)
		}

		return existingReadingSectionWithTests
	}

	async findReadingSectionTitlesByJlptLevel(level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5') {
		const existingReadingSections = await this.prisma.readingSection.findMany({
			where: {
				jlptLevel: level,
			},
			include: {
				_count: {
					select: { readingTests: true },
				},
				readingTests: {
					include: {
						_count: { select: { questions: true } },
					},
				},
			},
		})

		return existingReadingSections
	}

	async create(payload: ReadingType & { teacherId: string }): Promise<ReadingSection> {
		const { title, teacherId, readingTests, jlptLevel } = payload

		const existingTeacher = await prisma.user.findUnique({ where: { id: teacherId } })

		if (!existingTeacher) throw new ConflictError(`Teacher with ID "${teacherId}" does not exist`)

		// Transaction ichida yaratamiz
		return await this.prisma.$transaction(async tx => {
			// 1. Section yaratish
			const section = await tx.readingSection.create({
				data: { title, jlptLevel },
			})

			// 2. Testlarni yaratish
			for (const test of readingTests) {
				const createdTest = await tx.readingTest.create({
					data: {
						sectionId: section.id,
						text: test.text,
						difficulty: test.difficulty,
						mainQuestion: test.mainQuestion,
						authorId: test.authorId,
					},
				})
				// 3. Savollarni yaratish (createMany ishlatish mumkin)
				await tx.readingTestQuestion.createMany({
					data: test.questions.map(q => ({
						testId: createdTest.id,
						question: q.question,
						options: q.options,
						correctAnswer: q.correctAnswer,
					})),
				})
			}

			// 4. Yakuniy natijani qaytarish
			const result = await tx.readingSection.findUnique({
				where: { id: section.id },
				include: {
					readingTests: {
						include: {
							questions: true,
						},
					},
				},
			})

			// Null check qo'shamiz
			if (!result) {
				throw new Error('Failed to create reading section')
			}
			return result
		})
	}

	async updateTitle(id: string, payload: { title: string }): Promise<ReadingSection> {
		await this.findById(id)

		const updatedReadingSection = await this.prisma.readingSection.update({
			where: {
				id: id,
			},
			data: {
				title: payload.title,
			},
		})

		return updatedReadingSection
	}

	async updateSection(
		id: string,
		payload: {
			title?: string
			jlptLevel?: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
		}
	): Promise<ReadingSection> {
		await this.findById(id)

		const updatedReadingSection = await this.prisma.readingSection.update({
			where: {
				id: id,
			},
			data: {
				...(payload.title && { title: payload.title }),
				...(payload.jlptLevel && { jlptLevel: payload.jlptLevel }),
			},
		})

		return updatedReadingSection
	}

	async deleteById(id: string): Promise<ReadingSection> {
		const existingReadingTest = await this.findById(id)

		const deletedReadingTest = await this.prisma.readingSection.delete({
			where: {
				id: existingReadingTest.id,
			},
		})

		return deletedReadingTest
	}

	async findAll(): Promise<{}[]> {
		const N1 = await this.findReadingSectionTitlesByJlptLevel('N1')
		const N2 = await this.findReadingSectionTitlesByJlptLevel('N2')
		const N3 = await this.findReadingSectionTitlesByJlptLevel('N3')
		const N4 = await this.findReadingSectionTitlesByJlptLevel('N4')
		const N5 = await this.findReadingSectionTitlesByJlptLevel('N5')

		// const asd = N1[0]._count
		const data: {}[] = [
			{
				level: 'N1',
				sectionCount: N1.length,
				readingCount: N1.reduce((sum, item) => sum + item._count.readingTests, 0),
				readingSections: N1,
			},
			{
				level: 'N2',
				sectionCount: N2.length,
				readingCount: N2.reduce((sum, item) => sum + item._count.readingTests, 0),
				readingSections: N2,
			},
			{
				level: 'N3',
				sectionCount: N3.length,
				readingCount: N3.reduce((sum, item) => sum + item._count.readingTests, 0),
				readingSections: N3,
			},
			{
				level: 'N4',
				sectionCount: N4.length,
				readingCount: N4.reduce((sum, item) => sum + item._count.readingTests, 0),
				readingSections: N4,
			},
			{
				level: 'N5',
				sectionCount: N5.length,
				readingCount: N5.reduce((sum, item) => sum + item._count.readingTests, 0),
				readingSections: N5,
			},
		]

		// const existingReadingSections = await this.prisma.readingSection.findMany({
		// 	include: {
		// 		_count: {
		// 			select: { readingTests: true },
		// 		},
		// 		readingTests: {
		// 			include: {
		// 				author: {
		// 					select: {
		// 						userName: true,
		// 						id: true,
		// 					},
		// 				},
		// 				questions: true,
		// 			},
		// 		},
		// 	},
		// })

		return data
	}

	async addReadingToSection(
		sectionId: string,
		readingData: {
			text: string
			difficulty: 'EASY' | 'MEDIUM' | 'HARD'
			mainQuestion: string
			authorId: string
			questions: {
				question: string
				options: string[]
				correctAnswer: number
			}[]
		}
	) {
		// Section mavjudligini tekshirish
		const section = await this.prisma.readingSection.findUnique({
			where: { id: sectionId },
		})

		if (!section) {
			throw new NotFoundError(`Reading Section with ID "${sectionId}" not found`)
		}

		// Transaction ichida reading test va questionlarni yaratish
		return await this.prisma.$transaction(async tx => {
			// Reading testni yaratish
			const createdTest = await tx.readingTest.create({
				data: {
					sectionId: sectionId,
					text: readingData.text,
					difficulty: readingData.difficulty,
					mainQuestion: readingData.mainQuestion,
					authorId: readingData.authorId,
				},
			})

			// Questionlarni yaratish
			await tx.readingTestQuestion.createMany({
				data: readingData.questions.map(q => ({
					testId: createdTest.id,
					question: q.question,
					options: q.options,
					correctAnswer: q.correctAnswer,
				})),
			})

			// Yaratilgan testni questionlar bilan qaytarish
			return await tx.readingTest.findUnique({
				where: { id: createdTest.id },
				include: {
					questions: true,
				},
			})
		})
	}
}

const readingsService = new ReadingsService(prisma)
type ReadingsServiceType = typeof readingsService

export { readingsService, type ReadingsServiceType }
