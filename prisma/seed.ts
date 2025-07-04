import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'

async function up() {
	const usersData = [
		{
			userName: 'Aliyev',
			email: 'b@mail.ru',
			words: [
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
				{
					kanji: '火',
					translation: 'olov',
					transcription: 'ひ',
					example: '火をつけます。',
					jlptLevel: 'N5',
				},
				{
					kanji: '木',
					translation: 'daraxt',
					transcription: 'き',
					example: '木の下にいます。',
					jlptLevel: 'N5',
				},
			],
		},
		{
			userName: 'Karimova',
			email: 'karimova@example.com',
			words: [
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
				{
					kanji: '魚',
					translation: 'baliq',
					transcription: 'さかな',
					example: '魚を食べます。',
					jlptLevel: 'N5',
				},
				{
					kanji: '鳥',
					translation: 'qush',
					transcription: 'とり',
					example: '鳥が鳴いています。',
					jlptLevel: 'N5',
				},
				{
					kanji: '牛',
					translation: 'sigir',
					transcription: 'うし',
					example: '牛を見ました。',
					jlptLevel: 'N5',
				},
				{
					kanji: '馬',
					translation: 'ot',
					transcription: 'うま',
					example: '馬が走っています。',
					jlptLevel: 'N5',
				},
				{
					kanji: '羊',
					translation: 'qo‘y',
					transcription: 'ひつじ',
					example: '羊が草を食べています。',
					jlptLevel: 'N5',
				},
				{
					kanji: '豚',
					translation: 'cho‘chqa',
					transcription: 'ぶた',
					example: '豚が寝ています。',
					jlptLevel: 'N5',
				},
				{
					kanji: '象',
					translation: 'fil',
					transcription: 'ぞう',
					example: '象は大きいです。',
					jlptLevel: 'N5',
				},
				{
					kanji: '熊',
					translation: 'ayiq',
					transcription: 'くま',
					example: '熊を見たことがありますか？',
					jlptLevel: 'N5',
				},
				{
					kanji: '鹿',
					translation: 'bug‘u',
					transcription: 'しか',
					example: '鹿が森にいます。',
					jlptLevel: 'N5',
				},
			],
		},
		{
			userName: 'Rustam',
			email: 'rustam@example.com',
			words: [
				{
					kanji: '電車',
					translation: 'poyezd',
					transcription: 'でんしゃ',
					example: '電車で行きます。',
					jlptLevel: 'N5',
				},
				{
					kanji: '車',
					translation: 'mashina',
					transcription: 'くるま',
					example: '車を運転します。',
					jlptLevel: 'N5',
				},
				{
					kanji: '駅',
					translation: 'vokzal',
					transcription: 'えき',
					example: '駅で待ちます。',
					jlptLevel: 'N5',
				},
				{
					kanji: '道',
					translation: 'yo‘l',
					transcription: 'みち',
					example: '道に迷いました。',
					jlptLevel: 'N5',
				},
				{
					kanji: '橋',
					translation: 'ko‘prik',
					transcription: 'はし',
					example: '橋を渡ります。',
					jlptLevel: 'N5',
				},
			],
		},
		// 🎯 Shu yerga qolgan 7 foydalanuvchini ham shunga o‘xshab qo‘shing
	]
	for (const user of usersData) {
		await prisma.user.create({
			data: {
				email: user.email,
				password: hashSync('admin', 10),
				userName: user.userName,
				role: 'USER',
				userLang: 'UZ',
				lesson: {
					create: {
						title: '100-dars',
						words: {
							create: user.words,
						},
					},
				},
			},
		})
	}
	await prisma.user.create({
		data: {
			email: 'behruz@gmail.com',
			password: hashSync('admin', 10),
			userName: 'Bekhruz',
			role: 'ADMIN',
			userLang: 'UZ',
		},
	})
}

// await prisma.user.createMany({
// 	data: [
// 		{
// 			userName: 'Hakim',
// 			email: 'b@mail.ru',
// 			password: hashSync('admin', 10),
// 			role: 'ADMIN',
// 		},
// 		{
// 			userName: 'Ibgorimov',
// 			email: 'behruz@gmail.com',
// 			password: hashSync('admin', 10),
// 			role: 'ADMIN',
// 		},
// 		{
// 			userName: 'Karimov',
// 			email: 'karimov@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Aliyeva',
// 			email: 'aliya@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Toirov',
// 			email: 'toirov@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Juraeva',
// 			email: 'juraeva@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Sattorov',
// 			email: 'sattorov@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Hamidova',
// 			email: 'hamidova@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Rustamov',
// 			email: 'rustamov@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Islomova',
// 			email: 'islomova@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 		{
// 			userName: 'Bekmurodov',
// 			email: 'bekmurodov@example.com',
// 			password: hashSync('admin', 10),
// 			role: 'USER',
// 		},
// 	],
// })

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "tokens" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "words" RESTART IDENTITY CASCADE;`
}

async function main() {
	try {
		await down()
		await up()

		console.log('Next step with: SUCCESS🍃')
	} catch (error) {
		console.log('Next step with: FAIL' + error)
	}
}

main()
	.then(() => {
		console.log('Finish with: SUCCESS🍃')
	})
	.catch(err => {
		console.log('Finish with: FAIL')
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
