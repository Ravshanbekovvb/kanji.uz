import { JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { userService } from '../services/user.service'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

/**
 * JWT token orqali foydalanuvchi admin ekanligini tekshiradi
 * @param token - JWT access token
 * @returns boolean - Admin bo'lsa true, aks holda false
 */
export async function isAdmin(token: string): Promise<boolean> {
	try {
		// Token validligini tekshirish
		const decoded = jwt.verify(token, JWT_SECRET_KEY) as JWTType

		if (!decoded || !decoded.email) {
			return false
		}

		// Foydalanuvchi ma'lumotlarini olish
		const user = await userService.findByEmail(decoded.email)

		if (!user) {
			return false
		}

		// Admin role tekshiruvi
		return user.role === 'ADMIN'
	} catch (error) {
		// Token yaroqsiz yoki boshqa xatolik
		console.error('isAdmin error:', error)
		return false
	}
}

/**
 * NextRequest cookie'sidan token olib, admin ekanligini tekshiradi
 * @param request - NextRequest object
 * @returns boolean - Admin bo'lsa true, aks holda false
 */
export async function isAdminFromRequest(request: Request): Promise<boolean> {
	try {
		// Cookie'dan access token olish
		const cookieHeader = request.headers.get('cookie')
		if (!cookieHeader) return false

		const cookies = cookieHeader.split(';').reduce(
			(acc, cookie) => {
				const [key, value] = cookie.trim().split('=')
				acc[key] = value
				return acc
			},
			{} as Record<string, string>
		)

		const accessToken = cookies.accessToken
		if (!accessToken) return false

		return await isAdmin(accessToken)
	} catch (error) {
		console.error('isAdminFromRequest error:', error)
		return false
	}
}

/**
 * Foydalanuvchi emaili bo'yicha admin ekanligini tekshiradi
 * @param email - User email
 * @returns boolean - Admin bo'lsa true, aks holda false
 */
export async function isAdminByEmail(email: string): Promise<boolean> {
	try {
		const user = await userService.findByEmail(email)

		if (!user) {
			return false
		}

		return user.role === 'ADMIN'
	} catch (error) {
		console.error('isAdminByEmail error:', error)
		return false
	}
}

/**
 * User ID bo'yicha admin ekanligini tekshiradi
 * @param userId - User ID
 * @returns boolean - Admin bo'lsa true, aks holda false
 */
export async function isAdminById(userId: string): Promise<boolean> {
	try {
		const user = await userService.findById(userId)

		if (!user) {
			return false
		}

		return user.role === 'ADMIN'
	} catch (error) {
		console.error('isAdminById error:', error)
		return false
	}
}
