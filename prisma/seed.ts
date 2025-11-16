import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'

async function seed() {
	// --- Users ---
	const user1 = await prisma.user.create({
		data: {
			email: 'bekhruz@gmail.com',
			userName: 'Bekhruz',
			password: hashSync('admin', 10),
			role: 'ADMIN',
			userLang: 'UZ',
		},
	})

	const user2 = await prisma.user.create({
		data: {
			email: 'sensei@gmail.com',
			userName: 'Sensei',
			password: hashSync('sensei', 10),
			role: 'TEACHER',
			userLang: 'UZ',
		},
	})

	const user3 = await prisma.user.create({
		data: {
			email: 'user@gmail.com',
			userName: 'Karimova',
			password: hashSync('user', 10),
			role: 'USER',
			userLang: 'UZ',
		},
	})

	// --- Tokens ---
	await prisma.token.create({
		data: {
			userId: user1.id,
			accessToken: 'access-token-admin',
			refreshToken: 'refresh-token-admin',
		},
	})

	await prisma.token.create({
		data: {
			userId: user2.id,
			accessToken: 'access-token-aliyev',
			refreshToken: 'refresh-token-aliyev',
		},
	})

	// --- Lessons & Words ---
	const lesson1 = await prisma.lesson.create({
		data: {
			title: 'Kanji Basics',
			userId: user2.id,
			words: {
				create: [
					{
						kanji: '山',
						translation: 'tog‘',
						transcription: 'やま',
						example: '山に登ります。',
						jlptLevel: 'N5',
					},
					{
						kanji: '川',
						translation: 'daryo',
						transcription: 'かわ',
						example: '川で泳ぎます。',
						jlptLevel: 'N5',
					},
					{
						kanji: '日',
						translation: 'kun',
						transcription: 'ひ',
						example: '今日はいい日です。',
						jlptLevel: 'N5',
					},
				],
			},
		},
	})

	const lesson2 = await prisma.lesson.create({
		data: {
			title: 'Animals Kanji',
			userId: user3.id,
			words: {
				create: [
					{
						kanji: '犬',
						translation: 'it',
						transcription: 'いぬ',
						example: '犬が走っています。',
						jlptLevel: 'N5',
					},
					{
						kanji: '猫',
						translation: 'mushuk',
						transcription: 'ねこ',
						example: '猫が寝ています。',
						jlptLevel: 'N5',
					},
				],
			},
		},
	})

	// --- Notifications ---
	const notification1 = await prisma.notification.create({
		data: {
			message: 'Welcome to the app!',
			userId: user1.id,
		},
	})

	const notification2 = await prisma.notification.create({
		data: {
			message: 'New lesson available!',
			userId: null, // public
		},
	})

	// --- NotificationReadStatus ---
	await prisma.notificationReadStatus.create({
		data: {
			notificationId: notification1.id,
			userId: user2.id,
		},
	})

	// --- SignupRequest ---
	await prisma.signupRequest.create({
		data: {
			email: 'newstudent@example.com',
			name: 'New Student',
			note: 'I want to join the course',
		},
	})

	// --- Reading Sections ---
	const section1 = await prisma.readingSection.create({
		data: {
			title: 'N5 Reading Section',
			jlptLevel: 'N5',
		},
	})

	// --- Reading Tests ---
	const test1 = await prisma.readingTest.create({
		data: {
			mainQuestion: 'Select the correct meaning of the kanji',
			text: '次の文の意味は何ですか？',
			difficulty: 'EASY',
			authorId: user3.id,
			sectionId: section1.id,
		},
	})

	// --- Reading Test Questions ---
	await prisma.readingTestQuestion.create({
		data: {
			testId: test1.id,
			question: '「山」の意味は？',
			options: ['tog‘', 'daryo', 'kun'],
			correctAnswer: 0,
		},
	})

	await prisma.readingTestQuestion.create({
		data: {
			testId: test1.id,
			question: '「犬」の意味は？',
			options: ['it', 'mushuk', 'qush'],
			correctAnswer: 0,
		},
	})

	// --- Reading Progress ---
	await prisma.readingProgress.create({
		data: {
			userId: user2.id,
			testLevel: 'EASY',
			isCorrect: true,
			solvedTime: 35,
		},
	})

	await prisma.readingProgress.create({
		data: {
			userId: user3.id,
			testLevel: 'EASY',
			isCorrect: false,
			solvedTime: 50,
		},
	})

	console.log('✅ Seed data created successfully!')
}

async function main() {
	try {
		await prisma.$executeRaw`TRUNCATE TABLE "ReadingProgress" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "ReadingSection" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "ReadingTest" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "ReadingTestQuestion" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "SignupRequest" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "lessons" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "notification_read_status" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "notifications" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "tokens" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
		await prisma.$executeRaw`TRUNCATE TABLE "words" RESTART IDENTITY CASCADE;`

		await seed()

		console.log('Finish with: SUCCESS 🍀')
	} catch (error) {
		console.log('Finish with: FAIL', error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
