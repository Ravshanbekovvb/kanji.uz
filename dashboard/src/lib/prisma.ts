import { PrismaClient } from '../../prisma/__generated__'

declare global {
	var __prisma: PrismaClient | undefined
}

const prisma = globalThis.__prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalThis.__prisma = prisma
}

export { prisma, PrismaClient }
