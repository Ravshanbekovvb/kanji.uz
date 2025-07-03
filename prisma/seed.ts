import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'

async function up() {
	await prisma.user.createMany({
		data: [
			{
				userName: 'Hakim',
				email: 'b@mail.ru',
				password: hashSync('admin', 10),
				role: 'ADMIN',
			},
			{
				userName: 'Ibgorimov',
				email: 'behruz@gmail.com',
				password: hashSync('admin', 10),
				role: 'ADMIN',
			},
			{
				userName: 'Karimov',
				email: 'karimov@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Aliyeva',
				email: 'aliya@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Toirov',
				email: 'toirov@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Juraeva',
				email: 'juraeva@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Sattorov',
				email: 'sattorov@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Hamidova',
				email: 'hamidova@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Rustamov',
				email: 'rustamov@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Islomova',
				email: 'islomova@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
			{
				userName: 'Bekmurodov',
				email: 'bekmurodov@example.com',
				password: hashSync('admin', 10),
				role: 'USER',
			},
		],
	})
}

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
