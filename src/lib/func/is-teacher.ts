import { JWTType } from '@/types/types'
import * as jwt from 'jsonwebtoken'
import { userService } from '../services/user.service'

const JWT_SECRET_KEY = process.env.JWT_SECRET!

/**
 * JWT token orqali foydalanuvchi Teacher ekanligini tekshiradi
 * @param token - JWT access token
 * @returns boolean - Teacher bo'lsa true, aks holda false
 */
export async function isTeacher(token: string): Promise<boolean> {
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

		// Teacher role tekshiruvi
		return user.role === 'TEACHER'
	} catch (error) {
		// Token yaroqsiz yoki boshqa xatolik
		console.error('isTeacher error:', error)
		return false
	}
}
