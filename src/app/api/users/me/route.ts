import { apiResponse, apiResponseError, userService } from '@/lib'

export async function GET(request: Request) {
	try {
		const user = await userService.getMe(request)

		const { createdAt, password, updatedAt, ...safeUser } = user

		return apiResponse(
			{ success: true, message: 'User returned successfully', data: safeUser },
			{ status: 200 }
		)
	} catch (error) {
		return apiResponseError(error)
	}
}
