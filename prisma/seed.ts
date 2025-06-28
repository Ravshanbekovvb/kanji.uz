import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'

async function up() {
	await prisma.user.createMany({
		data: [
			{
				userName: "Mullaboyev Nodirbek Ravshanbek o'g'li",
				email: 'fishberg2020@mail.ru',
				password: hashSync('11111111', 10),
				role: 'ADMIN',
			},
			{
				userName: 'Xasanova Navruza Farxodovna',
				email: 'navruza@mail.ru',
				password: hashSync('11111111', 10),
				role: 'ADMIN',
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
